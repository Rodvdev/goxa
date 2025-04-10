import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';

const prisma = new PrismaClient();

// Using string literals for the enum types since we don't have direct access to the generated types
type TipoProducto = 'CORE' | 'NO_CORE';
type UnidadDeVenta = 'PESO' | 'UNIDAD';
type Presentacion = 'VIDRIO' | 'PLANTA' | 'EMPAQUETADO';
type UnidadMedida = 'GR' | 'KG' | 'ML' | 'UNIDAD';

export async function POST(req: NextRequest) {
  try {
    // Check authorization
    const session = await getServerSession();
    if (!session || !session.user || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado para importar productos' },
        { status: 401 }
      );
    }

    // Parse multipart form data to get the Excel file
    const formData = await req.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No se encontró un archivo para importar' },
        { status: 400 }
      );
    }

    // In a real implementation, we would use a library to parse the Excel/CSV file
    // For this example, we'll simulate processing with dummy data
    
    // Process results tracking
    const results = {
      totalProducts: 0,
      newProducts: 0,
      updatedProducts: 0,
      newBrands: 0,
      newCategories: 0,
      errors: [] as { row: number; message: string }[]
    };

    // Simulated data - in a real implementation, this would come from the uploaded file
    const productsToImport = [
      {
        row: 2,
        data: {
          sku: 'PRD101',
          nombre: 'Producto Importado 1',
          precio: 199.99,
          tipoProducto: 'CORE' as TipoProducto,
          unidadDeVenta: 'UNIDAD' as UnidadDeVenta,
          presentacion: 'EMPAQUETADO' as Presentacion,
          unidadMedida: 'UNIDAD' as UnidadMedida,
          contenido: null,
          stock: 25,
          margenCommission: 12.5,
          marca: 'Nueva Marca',
          categoria: 'Nueva Categoría'
        }
      },
      {
        row: 3,
        data: {
          sku: 'PRD102',
          nombre: 'Producto Importado 2',
          precio: 49.99,
          tipoProducto: 'NO_CORE' as TipoProducto,
          unidadDeVenta: 'PESO' as UnidadDeVenta,
          presentacion: 'VIDRIO' as Presentacion,
          unidadMedida: 'GR' as UnidadMedida,
          contenido: 500,
          stock: 50,
          margenCommission: 8,
          marca: 'Marca Existente',
          categoria: 'Categoría Existente'
        }
      }
    ];

    results.totalProducts = productsToImport.length;

    // Process each product
    for (const product of productsToImport) {
      try {
        // Validate product data
        if (!product.data.sku || !product.data.nombre || !product.data.precio) {
          results.errors.push({
            row: product.row,
            message: 'Faltan datos obligatorios (SKU, Nombre o Precio)'
          });
          continue;
        }

        // Find or create marca (brand)
        let marca = await prisma.marca.findFirst({
          where: { nombre: product.data.marca }
        });

        if (!marca) {
          marca = await prisma.marca.create({
            data: { nombre: product.data.marca }
          });
          results.newBrands++;
        }

        // Find or create categoria (category)
        let categoria = await prisma.categoria.findFirst({
          where: { nombre: product.data.categoria }
        });

        if (!categoria) {
          categoria = await prisma.categoria.create({
            data: { nombre: product.data.categoria }
          });
          results.newCategories++;
        }

        // Check if product already exists
        const existingProduct = await prisma.producto.findUnique({
          where: { sku: product.data.sku }
        });

        const productData = {
          nombre: product.data.nombre,
          precio: product.data.precio,
          tipoProducto: product.data.tipoProducto,
          unidadDeVenta: product.data.unidadDeVenta,
          presentacion: product.data.presentacion,
          unidadMedida: product.data.unidadMedida,
          contenido: product.data.contenido,
          stock: product.data.stock,
          margenCommission: product.data.margenCommission,
          categoriaId: categoria.id,
          marcaId: marca.id
        };

        if (existingProduct) {
          // Update existing product
          await prisma.producto.update({
            where: { id: existingProduct.id },
            data: productData
          });
          results.updatedProducts++;
        } else {
          // Create new product
          await prisma.producto.create({
            data: {
              sku: product.data.sku,
              ...productData,
              createdById: session.user.id
            }
          });
          results.newProducts++;
        }
      } catch (error) {
        console.error(`Error processing row ${product.row}:`, error);
        results.errors.push({
          row: product.row,
          message: `Error en el procesamiento: ${(error as Error).message}`
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Importación completada con éxito',
      details: results
    });
    
  } catch (error) {
    console.error('Error during import:', error);
    return NextResponse.json(
      { 
        success: false,
        message: 'Error en el proceso de importación',
        error: (error as Error).message 
      },
      { status: 500 }
    );
  }
} 