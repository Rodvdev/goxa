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

    // Get all products with their relationships
    const products = await prisma.producto.findMany({
      include: {
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
        id: 'desc'
      }
    });

    return NextResponse.json({ products });
    
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { 
        error: 'Error al obtener los productos',
        details: (error as Error).message
      },
      { status: 500 }
    );
  }
} 