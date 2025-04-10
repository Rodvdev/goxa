import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Verificar sesión
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Obtener todos los productos con sus relaciones
    const products = await prisma.producto.findMany({
      select: {
        id: true,
        sku: true,
        nombre: true,
        stock: true,
        precio: true,
        tipoProducto: true,
        presentacion: true,
        unidadMedida: true,
        contenido: true,
        marca: {
          select: {
            nombre: true
          }
        },
        categoria: {
          select: {
            nombre: true
          }
        }
      },
      orderBy: {
        sku: 'asc'
      }
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error('Error al obtener el inventario:', error);
    return NextResponse.json(
      { error: 'Error al obtener el inventario' },
      { status: 500 }
    );
  }
} 