import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verificar sesión
    const session = await getServerSession(authOptions);
    const params = await context.params;
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    // Obtener el producto con sus relaciones
    const product = await prisma.producto.findUnique({
      where: { id: parseInt(params.id) },
      include: {
        marca: {
          select: {
            id: true,
            nombre: true
          }
        },
        categoria: {
          select: {
            id: true,
            nombre: true
          }
        }
      }
    });

    if (!product) {
      return NextResponse.json(
        { error: 'Producto no encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    return NextResponse.json(
      { error: 'Error al obtener el producto' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // Verificar sesión
    const session = await getServerSession(authOptions);
    const params = await context.params;
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const {
      nombre,
      precio,
      tipoProducto,
      unidadDeVenta,
      presentacion,
      unidadMedida,
      contenido,
      stock,
      margenCommission,
      marcaId,
      categoriaId
    } = body;

    // Actualizar el producto
    const updatedProduct = await prisma.producto.update({
      where: { id: parseInt(params.id) },
      data: {
        nombre,
        precio,
        tipoProducto,
        unidadDeVenta,
        presentacion,
        unidadMedida,
        contenido,
        stock,
        margenCommission,
        marcaId,
        categoriaId
      }
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    return NextResponse.json(
      { error: 'Error al actualizar el producto' },
      { status: 500 }
    );
  }
} 