"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react';
import * as XLSX from 'xlsx';
import { useSession } from 'next-auth/react';

interface ProductPreview {
  sku: string;
  nombre: string;
  precio: string | number;
  tipoProducto: string;
  unidadDeVenta: string;
  stock: string | number;
  marca: string;
  categoria: string;
}

interface ImportResult {
  success: boolean;
  message: string;
  details?: {
    totalProducts: number;
    newProducts: number;
    updatedProducts: number;
    newBrands: number;
    newCategories: number;
    errors: { row: number; message: string }[];
  };
}

interface ParsedData {
  SKU?: string;
  Nombre: string;
  Precio: string;
  TipoProducto: string;
  UnidadDeVenta: string;
  Presentacion: string;
  UnidadMedida: string;
  Contenido: string;
  Stock: string;
  MargenCommission: string;
  Marca: string;
  Categoria: string;
}

// Function to generate SKU preview
function generateSKUPreview(row: ParsedData): string {
  const category = row.Categoria?.slice(0, 3).toUpperCase() || 'CAT';
  const brand = row.Marca?.slice(0, 3).toUpperCase() || 'BRD';
  const name = row.Nombre?.slice(0, 3).toUpperCase() || 'PRD';
  const content = row.Contenido?.toString().padStart(3, '0') || '000';
  const unit = row.UnidadMedida?.slice(0, 3).toUpperCase() || 'UNI';
  const presentation = row.Presentacion?.slice(0, 3).toUpperCase() || 'PRE';
  const type = row.TipoProducto?.toUpperCase() === 'NO_CORE' ? 'NC' : 'CO';

  return `${category}-${brand}-${name}-${content}-${unit}-${presentation}-${type}`;
}

export default function ImportProductsPage() {
  const { data: session, status } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [step, setStep] = useState<'upload' | 'preview' | 'result'>('upload');
  const [previewData, setPreviewData] = useState<ProductPreview[]>([]);
  const [parseLoading, setParseLoading] = useState(false);

  // Verificar si el usuario está autenticado y es admin
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!session || session.user.role !== 'ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Acceso no autorizado</h2>
        <p className="text-gray-600 mb-4">No tienes permisos para acceder a esta página.</p>
        <Link 
          href="/admin/products" 
          className="text-blue-600 hover:text-blue-800"
        >
          Volver a Productos
        </Link>
      </div>
    );
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validar tipo de archivo (xlsx, xls, csv)
    const fileType = selectedFile.name.split('.').pop()?.toLowerCase();
    if (!fileType || !['xlsx', 'xls', 'csv'].includes(fileType)) {
      setError('El archivo debe ser de tipo Excel (.xlsx, .xls) o CSV (.csv)');
      return;
    }

    setFile(selectedFile);
    setError(null);
    setParseLoading(true);
    
    try {
      // Leer el archivo real
      const data = await readFileData(selectedFile);
      if (data && data.length > 0) {
        // Tomamos solo las primeras 100 filas para la vista previa
        const preview = data.slice(0, 100).map(row => ({
          sku: row.SKU || generateSKUPreview(row),
          nombre: row.Nombre || '',
          precio: row.Precio || '0',
          tipoProducto: row.TipoProducto || 'CORE',
          unidadDeVenta: row.UnidadDeVenta || 'UNIDAD',
          stock: row.Stock || '0',
          marca: row.Marca || '',
          categoria: row.Categoria || ''
        }));
        
        setPreviewData(preview);
        setStep('preview');
      } else {
        setError('No se pudieron leer datos del archivo. Verifique que el formato sea correcto.');
      }
    } catch (err) {
      console.error('Error al leer el archivo:', err);
      setError('Error al procesar el archivo. Verifique que el formato sea correcto.');
    } finally {
      setParseLoading(false);
    }
  };

  const readFileData = (file: File): Promise<ParsedData[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          if (!data) {
            reject(new Error('No se pudo leer el archivo'));
            return;
          }
          
          let parsedData: ParsedData[] = [];
          
          // Procesar según tipo de archivo
          if (file.name.endsWith('.csv')) {
            // Para CSV usamos la función de parseado de CSV
            parsedData = parseCSV(data as string);
          } else {
            // Para Excel usamos la librería xlsx
            const workbook = XLSX.read(data, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            parsedData = XLSX.utils.sheet_to_json(worksheet);
          }
          
          resolve(parsedData);
        } catch (err) {
          reject(err);
        }
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
      
      if (file.name.endsWith('.csv')) {
        reader.readAsText(file);
      } else {
        reader.readAsBinaryString(file);
      }
    });
  };
  
  const parseCSV = (csvText: string): ParsedData[] => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    return lines.slice(1).filter(line => line.trim()).map(line => {
      const values = line.split(',').map(value => value.trim());
      const row: ParsedData = {
        SKU: '',
        Nombre: '',
        Precio: '',
        TipoProducto: '',
        UnidadDeVenta: '',
        Presentacion: '',
        UnidadMedida: '',
        Contenido: '',
        Stock: '',
        MargenCommission: '',
        Marca: '',
        Categoria: ''
      };
      
      headers.forEach((header, index) => {
        row[header as keyof ParsedData] = values[index] || '';
      });
      
      return row;
    });
  };

  const handleImport = async () => {
    if (!file) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Create form data to send to API
      const formData = new FormData();
      formData.append('file', file);
      
      // Call the API to process the file
      const response = await fetch('/api/admin/products/import', {
        method: 'POST',
        body: formData,
        credentials: 'include', // Asegura que las cookies de sesión se envíen
      });
      
      const result = await response.json();
      
      setLoading(false);
      
      if (!response.ok) {
        throw new Error(result.error || result.message || 'Error durante la importación');
      }
      
      setImportResult(result);
      setStep('result');
      
    } catch (error) {
      console.error('Error importing products:', error);
      setLoading(false);
      setError(error instanceof Error ? error.message : 'Ocurrió un error durante la importación. Inténtelo de nuevo.');
    }
  };

  const handleCancelImport = () => {
    setFile(null);
    setPreviewData([]);
    setStep('upload');
  };

  const downloadTemplate = () => {
    // Create a simple template for download
    const headers = ['SKU', 'Nombre', 'Precio', 'TipoProducto', 'UnidadDeVenta', 'Presentacion', 'UnidadMedida', 'Contenido', 'Stock', 'MargenCommission', 'Marca', 'Categoria'];
    const example = ['PRD001', 'Ejemplo Producto', '99.99', 'CORE', 'UNIDAD', 'EMPAQUETADO', 'UNIDAD', '', '10', '15', 'Marca Ejemplo', 'Categoría Ejemplo'];
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      example.join(',')
    ].join('\n');
    
    // Create a blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'plantilla_importacion_productos.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/admin/products" className="mr-4 text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold">Importar Productos</h1>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        {step === 'upload' && (
          <>
            <div className="text-center mb-8">
              <FileSpreadsheet className="mx-auto h-16 w-16 text-blue-500 mb-4" />
              <h2 className="text-xl font-semibold mb-2">Importar Productos desde Excel</h2>
              <p className="text-gray-600 mb-4">
                Sube un archivo Excel con tus productos. El sistema creará automáticamente las marcas y categorías si no existen.
              </p>
              <button 
                onClick={downloadTemplate}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Descargar plantilla de importación
              </button>
            </div>

            <div className="flex justify-center">
              <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Seleccionar archivo
                <input
                  type="file"
                  className="hidden"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
          </>
        )}

        {step === 'preview' && (
          <>
            <div className="mb-4">
              <p className="text-gray-700">
                Se importarán <span className="font-semibold">{previewData.length}</span> productos
                desde el archivo <span className="font-semibold">{file?.name}</span>.
                {previewData.length >= 100 && ' (Mostrando primeras 100 filas)'}
              </p>
            </div>

            {parseLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-2">Procesando archivo...</span>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {previewData.map((product, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 font-mono">{product.sku}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.nombre}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">${product.precio}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.tipoProducto}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.unidadDeVenta}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.stock}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.marca}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.categoria}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={handleCancelImport}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleImport}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                        Importando...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        Confirmar Importación
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </>
        )}

        {step === 'result' && importResult && (
          <>
            <div className="text-center mb-8">
              {importResult.success ? (
                <>
                  <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Importación Exitosa</h2>
                  <p className="text-gray-600 mb-4">{importResult.message}</p>
                </>
              ) : (
                <>
                  <AlertCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
                  <h2 className="text-xl font-semibold mb-2">Error en la Importación</h2>
                  <p className="text-gray-600 mb-4">{importResult.message}</p>
                </>
              )}
            </div>

            {importResult.details && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Resumen de la Importación</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Total de Productos</p>
                    <p className="text-lg font-semibold">{importResult.details.totalProducts}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Nuevos Productos</p>
                    <p className="text-lg font-semibold">{importResult.details.newProducts}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Productos Actualizados</p>
                    <p className="text-lg font-semibold">{importResult.details.updatedProducts}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Nuevas Marcas</p>
                    <p className="text-lg font-semibold">{importResult.details.newBrands}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-500">Nuevas Categorías</p>
                    <p className="text-lg font-semibold">{importResult.details.newCategories}</p>
                  </div>
                </div>
              </div>
            )}

            {importResult.details?.errors && importResult.details.errors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-medium mb-2">Errores Encontrados</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fila</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Error</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {importResult.details.errors.map((error, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{error.row}</td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-red-600">{error.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-4">
              <Link 
                href="/admin/products/import"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Nueva Importación
              </Link>
              <Link 
                href="/admin/products"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Volver a Productos
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 