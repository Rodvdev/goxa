"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

interface Marca {
  id: number;
  nombre: string;
}

interface Categoria {
  id: number;
  nombre: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  
  const [formData, setFormData] = useState({
    sku: '',
    nombre: '',
    precio: '',
    tipoProducto: 'CORE',
    unidadDeVenta: 'UNIDAD',
    contenido: '',
    stock: '',
    imagen: '',
    margenCommission: '',
    categoriaId: '',
    marcaId: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Cargar marcas y categorías al montar el componente
  useEffect(() => {
    // Simulamos datos para la maqueta
    const fetchData = () => {
      const dummyMarcas: Marca[] = [
        { id: 1, nombre: 'TechBrand' },
        { id: 2, nombre: 'ViewClear' },
        { id: 3, nombre: 'GameTech' },
        { id: 4, nombre: 'BeanMaster' }
      ];
      
      const dummyCategorias: Categoria[] = [
        { id: 1, nombre: 'Electrónicos' },
        { id: 2, nombre: 'Periféricos' },
        { id: 3, nombre: 'Alimentos' },
        { id: 4, nombre: 'Accesorios' }
      ];
      
      setMarcas(dummyMarcas);
      setCategorias(dummyCategorias);
    };
    
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Limpiar error al cambiar el valor
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.sku) newErrors.sku = 'El SKU es obligatorio';
    if (!formData.nombre) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.precio) newErrors.precio = 'El precio es obligatorio';
    if (parseFloat(formData.precio) <= 0) newErrors.precio = 'El precio debe ser mayor que cero';
    if (!formData.stock) newErrors.stock = 'El stock es obligatorio';
    if (parseInt(formData.stock) < 0) newErrors.stock = 'El stock no puede ser negativo';
    if (!formData.margenCommission) newErrors.margenCommission = 'El margen de comisión es obligatorio';
    if (parseFloat(formData.margenCommission) < 0 || parseFloat(formData.margenCommission) > 100) {
      newErrors.margenCommission = 'El margen debe estar entre 0 y 100%';
    }
    if (!formData.categoriaId) newErrors.categoriaId = 'Debe seleccionar una categoría';
    if (!formData.marcaId) newErrors.marcaId = 'Debe seleccionar una marca';
    
    if (formData.unidadDeVenta === 'PESO' && !formData.contenido) {
      newErrors.contenido = 'El contenido es obligatorio para productos vendidos por peso';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    
    try {
      // Aquí iría la llamada a la API para guardar el producto
      console.log('Enviando datos:', {
        ...formData,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock),
        contenido: formData.contenido ? parseFloat(formData.contenido) : null,
        margenCommission: parseFloat(formData.margenCommission),
        categoriaId: parseInt(formData.categoriaId),
        marcaId: parseInt(formData.marcaId)
      });
      
      // Simulamos una petición exitosa
      setTimeout(() => {
        setLoading(false);
        router.push('/admin/products');
      }, 1000);
      
    } catch (error) {
      console.error('Error al guardar el producto:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center mb-6">
        <Link href="/admin/products" className="mr-4 text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold">Nuevo Producto</h1>
      </div>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* SKU */}
            <div>
              <label htmlFor="sku" className="block text-sm font-medium text-gray-700 mb-1">
                SKU <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="sku"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.sku ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.sku && <p className="mt-1 text-sm text-red-500">{errors.sku}</p>}
            </div>
            
            {/* Nombre */}
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.nombre && <p className="mt-1 text-sm text-red-500">{errors.nombre}</p>}
            </div>
            
            {/* Precio */}
            <div>
              <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-1">
                Precio <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">$</span>
                <input
                  type="number"
                  id="precio"
                  name="precio"
                  min="0"
                  step="0.01"
                  value={formData.precio}
                  onChange={handleChange}
                  className={`w-full p-2 pl-8 border rounded-md ${errors.precio ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.precio && <p className="mt-1 text-sm text-red-500">{errors.precio}</p>}
            </div>
            
            {/* Tipo de Producto */}
            <div>
              <label htmlFor="tipoProducto" className="block text-sm font-medium text-gray-700 mb-1">
                Tipo de Producto <span className="text-red-500">*</span>
              </label>
              <select
                id="tipoProducto"
                name="tipoProducto"
                value={formData.tipoProducto}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="CORE">CORE</option>
                <option value="NO_CORE">NO CORE</option>
              </select>
            </div>
            
            {/* Unidad de Venta */}
            <div>
              <label htmlFor="unidadDeVenta" className="block text-sm font-medium text-gray-700 mb-1">
                Unidad de Venta <span className="text-red-500">*</span>
              </label>
              <select
                id="unidadDeVenta"
                name="unidadDeVenta"
                value={formData.unidadDeVenta}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="UNIDAD">Por Unidad</option>
                <option value="PESO">Por Peso</option>
              </select>
            </div>
            
            {/* Contenido (solo visible si la unidad de venta es por peso) */}
            {formData.unidadDeVenta === 'PESO' && (
              <div>
                <label htmlFor="contenido" className="block text-sm font-medium text-gray-700 mb-1">
                  Contenido (kg) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  id="contenido"
                  name="contenido"
                  min="0"
                  step="0.01"
                  value={formData.contenido}
                  onChange={handleChange}
                  className={`w-full p-2 border rounded-md ${errors.contenido ? 'border-red-500' : 'border-gray-300'}`}
                />
                {errors.contenido && <p className="mt-1 text-sm text-red-500">{errors.contenido}</p>}
              </div>
            )}
            
            {/* Stock */}
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">
                Stock <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="stock"
                name="stock"
                min="0"
                step="1"
                value={formData.stock}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.stock ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.stock && <p className="mt-1 text-sm text-red-500">{errors.stock}</p>}
            </div>
            
            {/* Margen de Comisión */}
            <div>
              <label htmlFor="margenCommission" className="block text-sm font-medium text-gray-700 mb-1">
                Margen de Comisión (%) <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="margenCommission"
                name="margenCommission"
                min="0"
                max="100"
                step="0.01"
                value={formData.margenCommission}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.margenCommission ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.margenCommission && <p className="mt-1 text-sm text-red-500">{errors.margenCommission}</p>}
            </div>
            
            {/* Imagen */}
            <div>
              <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-1">
                URL de la Imagen
              </label>
              <input
                type="text"
                id="imagen"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            {/* Categoría */}
            <div>
              <label htmlFor="categoriaId" className="block text-sm font-medium text-gray-700 mb-1">
                Categoría <span className="text-red-500">*</span>
              </label>
              <select
                id="categoriaId"
                name="categoriaId"
                value={formData.categoriaId}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.categoriaId ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map(categoria => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre}
                  </option>
                ))}
              </select>
              {errors.categoriaId && <p className="mt-1 text-sm text-red-500">{errors.categoriaId}</p>}
            </div>
            
            {/* Marca */}
            <div>
              <label htmlFor="marcaId" className="block text-sm font-medium text-gray-700 mb-1">
                Marca <span className="text-red-500">*</span>
              </label>
              <select
                id="marcaId"
                name="marcaId"
                value={formData.marcaId}
                onChange={handleChange}
                className={`w-full p-2 border rounded-md ${errors.marcaId ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Seleccione una marca</option>
                {marcas.map(marca => (
                  <option key={marca.id} value={marca.id}>
                    {marca.nombre}
                  </option>
                ))}
              </select>
              {errors.marcaId && <p className="mt-1 text-sm text-red-500">{errors.marcaId}</p>}
            </div>
          </div>
          
          <div className="mt-8 flex justify-end">
            <Link 
              href="/admin/products" 
              className="mr-4 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                  Guardando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Producto
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 