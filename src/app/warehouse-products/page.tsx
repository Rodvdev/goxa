'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Warehouse {
  id: number;
  nombre: string;
  ubicacion: string;
  productCount: number;
}

interface Product {
  id: number;
  sku: string;
  nombre: string;
  precio: number;
  stock: number;
  marca: {
    nombre: string;
  };
  categoria: {
    nombre: string;
  };
}

export default function WarehouseProductsPage() {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch warehouses
  useEffect(() => {
    async function fetchWarehouses() {
      try {
        const response = await fetch('/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query {
                almacenes {
                  id
                  nombre
                  ubicacion
                  productCount
                }
              }
            `,
          }),
        });

        const { data } = await response.json();
        setWarehouses(data.almacenes);
      } catch (error) {
        console.error('Error fetching warehouses:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchWarehouses();
  }, []);

  // Fetch products by warehouse
  useEffect(() => {
    if (!selectedWarehouse) return;

    async function fetchProductsByWarehouse() {
      setLoading(true);
      try {
        const response = await fetch('/api/graphql', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            query: `
              query ProductosPorAlmacen($almacenId: Int!) {
                productosPorAlmacen(almacenId: $almacenId) {
                  id
                  sku
                  nombre
                  precio
                  stock
                  marca {
                    nombre
                  }
                  categoria {
                    nombre
                  }
                }
              }
            `,
            variables: {
              almacenId: selectedWarehouse,
            },
          }),
        });

        const { data } = await response.json();
        setProducts(data.productosPorAlmacen);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductsByWarehouse();
  }, [selectedWarehouse]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Productos por Almacén</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Almacenes</h2>
        
        {loading && !warehouses.length ? (
          <p>Cargando almacenes...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {warehouses.map((warehouse) => (
              <div 
                key={warehouse.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedWarehouse === warehouse.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white hover:bg-gray-100'
                }`}
                onClick={() => setSelectedWarehouse(warehouse.id)}
              >
                <h3 className="font-bold">{warehouse.nombre}</h3>
                <p className="text-sm">{warehouse.ubicacion}</p>
                <p className="mt-2">
                  <span className="font-medium">{warehouse.productCount}</span> productos
                </p>
              </div>
            ))}
          </div>
        )}

        {warehouses.length === 0 && !loading && (
          <div className="mb-4">
            <p className="text-red-500">No hay almacenes registrados.</p>
            <p className="mt-2">
              Primero necesitas crear un almacén usando GraphQL Mutation:
            </p>
            <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
              {`mutation {
  createAlmacen(
    nombre: "Almacén Central", 
    ubicacion: "Lima"
  ) {
    id
    nombre
    ubicacion
  }
}`}
            </pre>
          </div>
        )}
      </div>

      {selectedWarehouse && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Productos en Almacén {warehouses.find(w => w.id === selectedWarehouse)?.nombre}
          </h2>
          
          {loading ? (
            <p>Cargando productos...</p>
          ) : (
            <>
              {products.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 border-b">SKU</th>
                        <th className="py-2 px-4 border-b">Nombre</th>
                        <th className="py-2 px-4 border-b">Marca</th>
                        <th className="py-2 px-4 border-b">Categoría</th>
                        <th className="py-2 px-4 border-b">Precio</th>
                        <th className="py-2 px-4 border-b">Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="py-2 px-4 border-b">{product.sku}</td>
                          <td className="py-2 px-4 border-b">{product.nombre}</td>
                          <td className="py-2 px-4 border-b">{product.marca.nombre}</td>
                          <td className="py-2 px-4 border-b">{product.categoria.nombre}</td>
                          <td className="py-2 px-4 border-b">S/ {product.precio.toFixed(2)}</td>
                          <td className="py-2 px-4 border-b">{product.stock}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div>
                  <p className="text-red-500">No hay productos en este almacén.</p>
                  <p className="mt-2">
                    Puedes asignar productos a este almacén con la siguiente mutación:
                  </p>
                  <pre className="bg-gray-100 p-3 rounded mt-2 overflow-x-auto">
                    {`mutation {
  assignProductToWarehouse(
    productoId: 1, 
    almacenId: ${selectedWarehouse}
  ) {
    id
    nombre
    almacen {
      nombre
    }
  }
}`}
                  </pre>
                </div>
              )}
            </>
          )}
        </div>
      )}

      <div className="mt-8">
        <Link 
          href="/"
          className="inline-block px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
} 