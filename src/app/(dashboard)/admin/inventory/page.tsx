"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { ArrowLeft, AlertCircle } from 'lucide-react';

interface InventoryItem {
  id: string;
  sku: string;
  nombre: string;
  stock: number;
  precio: number;
  tipoProducto: string;
  marca: {
    nombre: string;
  };
  categoria: {
    nombre: string;
  };
  presentacion: string;
  unidadMedida: string;
  contenido: number;
}

// Función para formatear el SKU
function formatSKU(item: InventoryItem): string {
  const category = item.categoria.nombre.slice(0, 3).toUpperCase();
  const brand = item.marca.nombre.slice(0, 3).toUpperCase();
  const name = item.nombre.slice(0, 3).toUpperCase();
  const content = item.contenido.toString().padStart(3, '0');
  const unit = item.unidadMedida.slice(0, 3).toUpperCase();
  const presentation = item.presentacion.slice(0, 3).toUpperCase();
  const type = item.tipoProducto === 'NO_CORE' ? 'NC' : 'CO';

  return `${category}-${brand}-${name}-${content}-${unit}-${presentation}-${type}`;
}

export default function InventoryPage() {
  const { data: session, status } = useSession();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch('/api/admin/inventory');
        if (!response.ok) {
          throw new Error('Error al cargar el inventario');
        }
        const data = await response.json();
        setInventory(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

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
          href="/admin" 
          className="text-blue-600 hover:text-blue-800"
        >
          Volver al Panel
        </Link>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Error</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="text-blue-600 hover:text-blue-800"
        >
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/admin" className="mr-4 text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold">Inventario</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {inventory.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{formatSKU(item)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.marca.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.categoria.nombre}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">{item.tipoProducto}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.stock > 10 ? 'bg-green-100 text-green-800' : 
                      item.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-red-100 text-red-800'
                    }`}>
                      {item.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">${item.precio.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 