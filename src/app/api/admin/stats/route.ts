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
        total: true
      }
    });

    // Get new customers (users created in the last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const newCustomers = await prisma.usuario.count({
      where: {
        createdAt: {
          gte: thirtyDaysAgo
        }
      }
    });

    // Get total products in stock
    const productsInStock = await prisma.producto.aggregate({
      _sum: {
        stock: true
      }
    });

    // Get opportunities (products with low stock)
    const opportunities = await prisma.producto.count({
      where: {
        stock: {
          lt: 5 // Products with less than 5 units in stock
        }
      }
    });

    // Get recent sales
    const recentSales = await prisma.venta.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        usuario: {
          select: {
            nombre: true
          }
        },
        detalleVenta: {
          include: {
            producto: {
              select: {
                nombre: true
              }
            }
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
      }
    });

    return NextResponse.json({
      stats: {
        totalSales: totalSales._sum.total || 0,
        newCustomers,
        productsInStock: productsInStock._sum.stock || 0,
        opportunities
      },
      recentSales: recentSales.map(sale => ({
        customer: sale.usuario.nombre,
        product: sale.detalleVenta[0]?.producto.nombre || 'N/A',
        status: sale.estado,
        total: sale.total
      })),
      lowStockItems: lowStockItems.map(item => ({
        name: item.nombre,
        currentStock: item.stock,
        minimumStock: 5,
        status: item.stock < 2 ? 'Crítico' : 'Bajo'
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