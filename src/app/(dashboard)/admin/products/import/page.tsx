"use client";

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, FileSpreadsheet, AlertCircle, CheckCircle } from 'lucide-react';
import * as XLSX from 'xlsx';

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

interface ProductPreview {
  sku: string;
  nombre: string;
  precio: string;
  tipoProducto: string;
  unidadDeVenta: string;
  stock: string;
  marca: string;
  categoria: string;
}

// Nuevo tipo para los datos de los productos importados
interface ProductImportData {
  SKU?: string;
  sku?: string;
  Nombre?: string;
  nombre?: string;
  Precio?: string;
  precio?: string;
  TipoProducto?: string;
  tipoProducto?: string;
  UnidadDeVenta?: string;
  unidadDeVenta?: string;
  Stock?: string;
  stock?: string;
  Marca?: string;
  marca?: string;
  Categoria?: string;
  categoria?: string;
  [key: string]: string | undefined;
}

export default function ImportProductsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [step, setStep] = useState<'upload' | 'preview' | 'result'>('upload');
  const [previewData, setPreviewData] = useState<ProductPreview[]>([]);
  const [parseLoading, setParseLoading] = useState(false);

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
          sku: row.SKU || row.sku || '',
          nombre: row.Nombre || row.nombre || '',
          precio: row.Precio || row.precio || '',
          tipoProducto: row.TipoProducto || row.tipoProducto || '',
          unidadDeVenta: row.UnidadDeVenta || row.unidadDeVenta || '',
          stock: row.Stock || row.stock || '',
          marca: row.Marca || row.marca || '',
          categoria: row.Categoria || row.categoria || ''
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

  const readFileData = (file: File): Promise<ProductImportData[]> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          if (!data) {
            reject(new Error('No se pudo leer el archivo'));
            return;
          }
          
          let parsedData: ProductImportData[] = [];
          
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
  
  const parseCSV = (csvText: string): ProductImportData[] => {
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(header => header.trim());
    
    return lines.slice(1).filter(line => line.trim()).map(line => {
      const values = line.split(',').map(value => value.trim());
      const row: ProductImportData = {};
      
      headers.forEach((header, index) => {
        row[header] = values[index] || '';
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
      });
      
      const result = await response.json();
      
      setLoading(false);
      
      if (!result.success) {
        setError(result.message || 'Error durante la importación');
        return;
      }
      
      setImportResult(result);
      setStep('result');
      
    } catch (error) {
      console.error('Error importing products:', error);
      setLoading(false);
      setError('Ocurrió un error durante la importación. Inténtelo de nuevo.');
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

            <div className="mb-6 border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <div className="flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-blue-500 mb-2" />
                <span className="text-gray-700 font-medium mb-4">
                  {file ? `Archivo seleccionado: ${file.name}` : 'Selecciona tu archivo Excel o CSV'}
                </span>
                
                {/* Input de archivo visible y estilizado */}
                <input
                  type="file"
                  accept=".xlsx,.xls,.csv"
                  onChange={handleFileChange}
                  className="block w-full max-w-xs text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-blue-600 file:text-white
                    hover:file:bg-blue-700
                    cursor-pointer"
                />
                
                <span className="text-gray-500 text-sm mt-2">
                  Archivos soportados: .xlsx, .xls, .csv
                </span>
              </div>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 p-4 rounded-md flex items-start">
                <AlertCircle className="text-red-500 w-5 h-5 mr-2 mt-0.5" />
                <span className="text-red-700">{error}</span>
              </div>
            )}

            <div className="border-t pt-4 mt-6">
              <h3 className="font-medium mb-2">Consideraciones importantes:</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>El archivo debe contener las columnas: SKU, Nombre, Precio, Tipo (CORE/NO_CORE), Unidad (UNIDAD/PESO), Stock, Marca y Categoría.</li>
                <li>Los productos con SKU existente se actualizarán.</li>
                <li>Las marcas y categorías se crearán automáticamente si no existen.</li>
                <li>El margen de comisión por defecto será 10% si no se especifica.</li>
              </ul>
            </div>
          </>
        )}

        {step === 'preview' && (
          <>
            <h2 className="text-xl font-semibold mb-6">Vista previa de importación</h2>
            
            {parseLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                <span className="ml-2">Procesando archivo...</span>
              </div>
            ) : (
              <>
                <div className="mb-4">
                  <p className="text-gray-700">
                    Se importarán <span className="font-semibold">{previewData.length}</span> productos
                    desde el archivo <span className="font-semibold">{file?.name}</span>.
                    {previewData.length >= 100 && ' (Mostrando primeras 100 filas)'}
                  </p>
                </div>

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
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{product.sku}</td>
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
              </>
            )}

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

        {step === 'result' && importResult && (
          <>
            <div className="text-center mb-8">
              {importResult.success ? (
                <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
              ) : (
                <AlertCircle className="mx-auto h-16 w-16 text-yellow-500 mb-4" />
              )}
              <h2 className="text-xl font-semibold mb-2">{importResult.message}</h2>
            </div>

            {importResult.details && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-3">Resumen de importación</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Productos totales:</span>
                      <span className="font-medium">{importResult.details.totalProducts}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Productos nuevos:</span>
                      <span className="font-medium text-green-600">{importResult.details.newProducts}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Productos actualizados:</span>
                      <span className="font-medium text-blue-600">{importResult.details.updatedProducts}</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gray-50 p-4 rounded-md">
                  <h3 className="font-medium mb-3">Entidades creadas</h3>
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span>Marcas nuevas:</span>
                      <span className="font-medium">{importResult.details.newBrands}</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Categorías nuevas:</span>
                      <span className="font-medium">{importResult.details.newCategories}</span>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {importResult.details?.errors.length ? (
              <div className="mb-6">
                <h3 className="font-medium mb-3 text-red-600">Errores encontrados</h3>
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
                        <tr key={index}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{error.row}</td>
                          <td className="px-4 py-3 text-sm text-red-600">{error.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : null}

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