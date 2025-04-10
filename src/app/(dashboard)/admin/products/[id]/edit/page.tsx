"use client";

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, AlertCircle, Save } from 'lucide-react';
import { use } from 'react';

interface Product {
  id: number;
  sku: string;
  nombre: string;
  precio: number;
  tipoProducto: 'CORE' | 'NO_CORE';
  unidadDeVenta: 'PESO' | 'UNIDAD';
  presentacion: 'VIDRIO' | 'PLANTA' | 'EMPAQUETADO';
  unidadMedida: 'GR' | 'KG' | 'ML' | 'UNIDAD';
  contenido: number;
  stock: number;
  imagen: string | null;
  margenCommission: number;
  marca: {
    id: number;
    nombre: string;
  };
  categoria: {
    id: number;
    nombre: string;
  };
}

interface Marca {
  id: number;
  nombre: string;
}

interface Categoria {
  id: number;
  nombre: string;
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product data
        const productResponse = await fetch(`/api/admin/products/${resolvedParams.id}`);
        if (!productResponse.ok) {
          throw new Error('Error al cargar el producto');
        }
        const productData = await productResponse.json();
        setProduct(productData);

        // Fetch brands and categories
        const [brandsResponse, categoriesResponse] = await Promise.all([
          fetch('/api/admin/brands'),
          fetch('/api/admin/categories')
        ]);

        if (!brandsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Error al cargar marcas o categorías');
        }

        const [brandsData, categoriesData] = await Promise.all([
          brandsResponse.json(),
          categoriesResponse.json()
        ]);

        setMarcas(brandsData);
        setCategorias(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/products/${resolvedParams.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los cambios');
      }

      router.push('/admin/products');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar los cambios');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!product) return;

    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

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
        <Link 
          href="/admin/products" 
          className="text-blue-600 hover:text-blue-800"
        >
          Volver a Productos
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Producto no encontrado</h2>
        <Link 
          href="/admin/products" 
          className="text-blue-600 hover:text-blue-800"
        >
          Volver a Productos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/admin/products" className="mr-4 text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold">Editar Producto</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">SKU</label>
              <input
                type="text"
                name="sku"
                value={product.sku}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={product.nombre}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Precio</label>
              <input
                type="number"
                name="precio"
                value={product.precio}
                onChange={handleChange}
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Tipo de Producto</label>
              <select
                name="tipoProducto"
                value={product.tipoProducto}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="CORE">CORE</option>
                <option value="NO_CORE">NO_CORE</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Unidad de Venta</label>
              <select
                name="unidadDeVenta"
                value={product.unidadDeVenta}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="PESO">PESO</option>
                <option value="UNIDAD">UNIDAD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Presentación</label>
              <select
                name="presentacion"
                value={product.presentacion}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="VIDRIO">VIDRIO</option>
                <option value="PLANTA">PLANTA</option>
                <option value="EMPAQUETADO">EMPAQUETADO</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Unidad de Medida</label>
              <select
                name="unidadMedida"
                value={product.unidadMedida}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                <option value="GR">GR</option>
                <option value="KG">KG</option>
                <option value="ML">ML</option>
                <option value="UNIDAD">UNIDAD</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Contenido</label>
              <input
                type="number"
                name="contenido"
                value={product.contenido}
                onChange={handleChange}
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Margen de Comisión (%)</label>
              <input
                type="number"
                name="margenCommission"
                value={product.margenCommission}
                onChange={handleChange}
                step="0.01"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Marca</label>
              <select
                name="marcaId"
                value={product.marca.id}
                onChange={(e) => setProduct({ ...product, marca: { id: Number(e.target.value), nombre: '' } })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                {marcas.map((marca) => (
                  <option key={marca.id} value={marca.id}>
                    {marca.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Categoría</label>
              <select
                name="categoriaId"
                value={product.categoria.id}
                onChange={(e) => setProduct({ ...product, categoria: { id: Number(e.target.value), nombre: '' } })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              >
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <Link
              href="/admin/products"
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={saving}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 