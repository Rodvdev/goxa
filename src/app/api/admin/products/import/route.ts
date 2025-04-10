import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

// Using string literals for the enum types since we don't have direct access to the generated types
type TipoProducto = 'CORE' | 'NO_CORE';
type UnidadDeVenta = 'PESO' | 'UNIDAD';
type Presentacion = 'VIDRIO' | 'PLANTA' | 'EMPAQUETADO';
type UnidadMedida = 'GR' | 'KG' | 'ML' | 'UNIDAD';

// Function to generate SKU
function generateSKU(product: ProductImportData): string {
  const category = product.Categoria?.slice(0, 3).toUpperCase() || 'CAT';
  const brand = product.Marca?.slice(0, 3).toUpperCase() || 'BRD';
  const presentation = product.Presentacion?.slice(0, 3).toUpperCase() || 'PRS';
  const type = product.TipoProducto?.toUpperCase() === 'NO_CORE' ? 'NC' : (product.TipoProducto?.toUpperCase() === 'CORE' ? 'COR' : (product.TipoProducto?.slice(0, 3).toUpperCase() || 'TYP'));
  const name = product.Nombre?.slice(0, 3).toUpperCase() || 'PRD';
  
  // Generate a random number between 1000 and 9999
  const randomNum = Math.floor(Math.random() * 9000) + 1000;
  
  return `${category}-${brand}-${presentation}-${type}-${name}-${randomNum}`;
}

interface ProductImportData {
  SKU?: string;
  sku?: string;
  Nombre?: string;
  nombre?: string;
  Precio?: number;
  precio?: number;
  TipoProducto?: string;
  tipoProducto?: string;
  UnidadDeVenta?: string;
  unidadDeVenta?: string;
  Presentacion?: string;
  presentacion?: string;
  UnidadMedida?: string;
  unidadMedida?: string;
  Contenido?: number;
  contenido?: number;
  Stock?: number;
  stock?: number;
  MargenCommission?: number;
  margenCommission?: number;
  Marca?: string;
  marca?: string;
  Categoria?: string;
  categoria?: string;
}

// Helper function to normalize tipoProducto values
function normalizeTipoProducto(value: string): TipoProducto {
  const normalized = value.trim().toUpperCase();
  if (normalized === 'CORE' || normalized === 'NO_CORE') {
    return normalized as TipoProducto;
  }
  // Handle variations
  if (normalized === 'NO-CORE' || normalized === 'NOCORE') {
    return 'NO_CORE';
  }
  // Default to CORE if value doesn't match expected values
  return 'CORE';
}

// Helper function to normalize presentacion values
function normalizePresentacion(value: string): Presentacion {
  const normalized = value.trim().toUpperCase();
  if (normalized === 'VIDRIO' || normalized === 'PLANTA' || normalized === 'EMPAQUETADO') {
    return normalized as Presentacion;
  }
  // Default to EMPAQUETADO if value doesn't match expected values
  return 'EMPAQUETADO';
}

// Helper function to normalize unidadMedida values
function normalizeUnidadMedida(value: string): UnidadMedida {
  const normalized = value.trim().toUpperCase();
  if (normalized === 'GR' || normalized === 'KG' || normalized === 'ML' || normalized === 'UNIDAD') {
    return normalized as UnidadMedida;
  }
  // Default to UNIDAD if value doesn't match expected values
  return 'UNIDAD';
}

// Helper function to normalize unidadDeVenta values
function normalizeUnidadDeVenta(value: string): UnidadDeVenta {
  const normalized = value.trim().toUpperCase();
  if (normalized === 'PESO' || normalized === 'UNIDAD') {
    return normalized as UnidadDeVenta;
  }
  // Default to UNIDAD if value doesn't match expected values
  return 'UNIDAD';
}

export async function POST(req: NextRequest) {
  try {
    // Verify session
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      );
    }

    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No se ha proporcionado ningún archivo' },
        { status: 400 }
      );
    }

    // Initialize results object
    const results = {
      totalProducts: 0,
      newProducts: 0,
      updatedProducts: 0,
      newBrands: 0,
      newCategories: 0,
      errors: [] as { row: number; message: string }[]
    };

    // Read file buffer
    const buffer = await file.arrayBuffer();
    const workbook = XLSX.read(buffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(worksheet) as ProductImportData[];

    results.totalProducts = data.length;

    // Process each product
    for (let i = 0; i < data.length; i++) {
      const row = data[i];
      try {
        // Generate SKU if not provided
        const sku = row.SKU || row.sku || generateSKU(row);

        // Normalize data (handle both uppercase and lowercase keys)
        const productData = {
          sku: sku,
          nombre: row.Nombre || row.nombre || '',
          precio: Number(row.Precio || row.precio || 0),
          tipoProducto: normalizeTipoProducto(String(row.TipoProducto || row.tipoProducto || 'CORE')),
          unidadDeVenta: normalizeUnidadDeVenta(String(row.UnidadDeVenta || row.unidadDeVenta || 'UNIDAD')),
          presentacion: normalizePresentacion(String(row.Presentacion || row.presentacion || 'EMPAQUETADO')),
          unidadMedida: normalizeUnidadMedida(String(row.UnidadMedida || row.unidadMedida || 'UNIDAD')),
          contenido: Number(row.Contenido || row.contenido || 0),
          stock: Number(row.Stock || row.stock || 0),
          margenCommission: Number(row.MargenCommission || row.margenCommission || 0),
          marca: row.Marca || row.marca || '',
          categoria: row.Categoria || row.categoria || ''
        };

        // Validate product data
        if (!productData.nombre || productData.precio <= 0) {
          results.errors.push({
            row: i + 2, // +2 because Excel rows start at 1 and we have a header row
            message: 'Faltan datos obligatorios (Nombre o Precio)'
          });
          continue;
        }

        // Find or create marca (brand)
        let marca = await prisma.marca.findFirst({
          where: { nombre: productData.marca }
        });

        if (!marca) {
          marca = await prisma.marca.create({
            data: { nombre: productData.marca }
          });
          results.newBrands++;
        }

        // Find or create categoria (category)
        let categoria = await prisma.categoria.findFirst({
          where: { nombre: productData.categoria }
        });

        if (!categoria) {
          categoria = await prisma.categoria.create({
            data: { nombre: productData.categoria }
          });
          results.newCategories++;
        }

        // Check if product already exists
        const existingProduct = await prisma.producto.findUnique({
          where: { sku: productData.sku }
        });

        const productToSave = {
          nombre: productData.nombre,
          precio: productData.precio,
          tipoProducto: productData.tipoProducto,
          unidadDeVenta: productData.unidadDeVenta,
          presentacion: productData.presentacion,
          unidadMedida: productData.unidadMedida,
          contenido: productData.contenido,
          stock: productData.stock,
          margenCommission: productData.margenCommission,
          categoriaId: categoria.id,
          marcaId: marca.id
        };

        if (existingProduct) {
          // Update existing product and add stock
          await prisma.producto.update({
            where: { id: existingProduct.id },
            data: {
              ...productToSave,
              stock: existingProduct.stock + productData.stock
            }
          });
          results.updatedProducts++;
        } else {
          // Create new product
          await prisma.producto.create({
            data: {
              sku: productData.sku,
              ...productToSave,
              createdById: session.user.id
            }
          });
          results.newProducts++;
        }
      } catch (error) {
        console.error(`Error processing row ${i + 2}:`, error);
        results.errors.push({
          row: i + 2,
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
        error: 'Error durante la importación',
        details: (error as Error).message
      },
      { status: 500 }
    );
  }
} 