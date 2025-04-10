"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Search, Filter, Upload } from 'lucide-react';

interface Product {
  id: number;
  sku: string;
  nombre: string;
  precio: number;
  tipoProducto: 'CORE' | 'NO_CORE';
  unidadDeVenta: 'PESO' | 'UNIDAD';
  presentacion?: 'VIDRIO' | 'PLANTA' | 'EMPAQUETADO' | null;
  unidadMedida: 'GR' | 'KG' | 'ML' | 'UNIDAD';
  stock: number;
  marca: { nombre: string };
  categoria: { nombre: string };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'CORE' | 'NO_CORE'>('ALL');

  useEffect(() => {
    // En una implementación real, aquí llamaríamos a la API
    const fetchProducts = async () => {
      try {
        // Simulamos la carga de datos para la maqueta
        setTimeout(() => {
          const dummyProducts: Product[] = [
            { id: 1, sku: 'PRD001', nombre: 'Laptop Pro X', precio: 1299.99, tipoProducto: 'CORE', unidadDeVenta: 'UNIDAD', presentacion: null, unidadMedida: 'UNIDAD', stock: 25, marca: { nombre: 'TechBrand' }, categoria: { nombre: 'Electrónicos' } },
            { id: 2, sku: 'PRD002', nombre: 'Monitor 27"', precio: 349.99, tipoProducto: 'CORE', unidadDeVenta: 'UNIDAD', presentacion: 'EMPAQUETADO', unidadMedida: 'UNIDAD', stock: 15, marca: { nombre: 'ViewClear' }, categoria: { nombre: 'Periféricos' } },
            { id: 3, sku: 'PRD003', nombre: 'Teclado Mecánico', precio: 129.99, tipoProducto: 'NO_CORE', unidadDeVenta: 'UNIDAD', presentacion: 'EMPAQUETADO', unidadMedida: 'UNIDAD', stock: 42, marca: { nombre: 'GameTech' }, categoria: { nombre: 'Periféricos' } },
            { id: 4, sku: 'PRD004', nombre: 'Mouse Inalámbrico', precio: 49.99, tipoProducto: 'NO_CORE', unidadDeVenta: 'UNIDAD', presentacion: 'EMPAQUETADO', unidadMedida: 'UNIDAD', stock: 3, marca: { nombre: 'GameTech' }, categoria: { nombre: 'Periféricos' } },
            { id: 5, sku: 'PRD005', nombre: 'Café Premium', precio: 12.99, tipoProducto: 'NO_CORE', unidadDeVenta: 'PESO', presentacion: 'VIDRIO', unidadMedida: 'GR', stock: 100, marca: { nombre: 'BeanMaster' }, categoria: { nombre: 'Alimentos' } },
          ];
          setProducts(dummyProducts);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filtrado de productos
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'ALL' || product.tipoProducto === filter;
    
    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (id: number) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      // En una implementación real, aquí llamaríamos a la API para eliminar
      setProducts(products.filter(product => product.id !== id));
      // Mostrar algún mensaje de éxito
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestión de Productos</h1>
        <div className="flex space-x-3">
          <Link href="/admin/products/import" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md flex items-center">
            <Upload className="w-4 h-4 mr-2" />
            Importar
          </Link>
          <Link href="/admin/products/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Producto
          </Link>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Buscar por nombre o SKU..."
            className="pl-10 pr-4 py-2 border rounded-md w-full"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="text-gray-400 w-5 h-5" />
          <select 
            className="border rounded-md px-3 py-2"
            value={filter}
            onChange={e => setFilter(e.target.value as 'ALL' | 'CORE' | 'NO_CORE')}
          >
            <option value="ALL">Todos los productos</option>
            <option value="CORE">Solo productos CORE</option>
            <option value="NO_CORE">Solo productos NO CORE</option>
          </select>
        </div>
      </div>

      {/* Tabla de Productos */}
      {loading ? (
        <div className="text-center py-10">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Cargando productos...</p>
        </div>
      ) : (
        <>
          {filteredProducts.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No se encontraron productos con los criterios de búsqueda actuales.</p>
            </div>
          ) : (
            <div className="overflow-x-auto bg-white shadow-md rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SKU</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unidad</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Presentación</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">U. Medida</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoría</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.sku}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.nombre}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${product.precio.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.tipoProducto === 'CORE' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                        }`}>
                          {product.tipoProducto}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.unidadDeVenta}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.presentacion ? (
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.presentacion === 'VIDRIO' ? 'bg-purple-100 text-purple-800' : 
                            product.presentacion === 'PLANTA' ? 'bg-green-100 text-green-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {product.presentacion}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          {product.unidadMedida}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          product.stock < 5 ? 'bg-red-100 text-red-800' : 
                          product.stock < 20 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.marca.nombre}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.categoria.nombre}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <Link href={`/admin/products/${product.id}`} className="text-blue-600 hover:text-blue-900">
                            <Pencil className="w-5 h-5" />
                          </Link>
                          <button 
                            onClick={() => handleDelete(product.id)} 
                            className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
} 