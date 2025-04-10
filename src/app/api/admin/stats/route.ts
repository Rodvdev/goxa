import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Verify session
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Get total sales
    const totalSales = await prisma.venta.aggregate({
      _sum: {
        precioTotal: true
      }
    });

    // Get new customers (users created in the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const newCustomers = await prisma.user.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        },
        role: 'USER' // Only count regular users, not admins or other roles
      }
    });

    // Get total number of products (not total units in stock)
    const totalProducts = await prisma.producto.count();

    // Get total units in stock
    const totalUnitsInStock = await prisma.producto.aggregate({
      _sum: {
        stock: true
      }
    });

    // Get opportunities (products with low stock)
    const opportunities = await prisma.producto.count({
      where: {
        stock: {
          lt: 5
        }
      }
    });

    // Get recent sales
    const recentSales = await prisma.venta.findMany({
      take: 5,
      orderBy: {
        fecha: 'desc'
      },
      include: {
        vendedor: {
          select: {
            nombre: true
          }
        },
        producto: {
          select: {
            nombre: true
          }
        }
      }
    });

    // Get low stock items
    const lowStockItems = await prisma.producto.findMany({
      where: {
        stock: {
          lt: 5
        }
      },
      take: 5,
      orderBy: {
        stock: 'asc'
      },
      select: {
        nombre: true,
        stock: true,
        categoria: {
          select: {
            nombre: true
          }
        }
      }
    });

    return NextResponse.json({
      stats: {
        totalSales: totalSales._sum?.precioTotal || 0,
        newCustomers,
        productsInStock: totalProducts,
        totalUnitsInStock: totalUnitsInStock._sum?.stock || 0,
        opportunities
      },
      recentSales: recentSales.map(sale => ({
        customer: sale.vendedor?.nombre || 'N/A',
        product: sale.producto?.nombre || 'N/A',
        status: 'COMPLETADA',
        total: sale.precioTotal
      })),
      lowStockItems: lowStockItems.map(item => ({
        name: item.nombre,
        currentStock: item.stock,
        minimumStock: 5,
        status: item.stock < 2 ? 'Crítico' : 'Bajo',
        category: item.categoria.nombre
      }))
    });
    
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json(
      { error: 'Error al obtener las estadísticas' },
      { status: 500 }
    );
  }
} 