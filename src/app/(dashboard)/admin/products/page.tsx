"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Search, Filter, Upload, AlertCircle, MoreVertical } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from 'sonner';

interface Product {
  id: number;
  sku: string;
  nombre: string;
  precio: number;
  tipoProducto: 'CORE' | 'NO_CORE';
  unidadDeVenta: 'PESO' | 'UNIDAD';
  presentacion?: 'VIDRIO' | 'PLANTA' | 'EMPAQUETADO' | null;
  unidadMedida: 'GR' | 'KG' | 'ML' | 'UNIDAD';
  contenido?: number;
  stock: number;
  margenCommission: number;
  marca: { nombre: string };
  categoria: { nombre: string };
}

export default function ProductsPage() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'CORE' | 'NO_CORE'>('ALL');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('/api/admin/products', {
          credentials: 'include'
        });
        
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        
        const data = await response.json();
        setProducts(data.products);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Error al cargar los productos. Por favor, intente nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term and type filter
  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.marca.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter = 
      filter === 'ALL' || 
      product.tipoProducto === filter;

    return matchesSearch && matchesFilter;
  });

  if (status === 'loading' || loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Productos</h1>
          <div className="flex space-x-2">
            <Button variant="outline" disabled>
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </Button>
            <Button variant="outline" disabled>
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="relative flex-1 max-w-md">
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton className="h-10 w-32" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative overflow-x-auto">
              <div className="min-w-[970px]">
                <Table>
                  <TableHeader>
                    <TableRow className="border-b">
                      <TableHead className="w-[70px] px-0.5 py-1">Nombre</TableHead>
                      <TableHead className="w-[40px] px-0.5 py-1">Precio</TableHead>
                      <TableHead className="w-[40px] px-0.5 py-1">Tipo</TableHead>
                      <TableHead className="w-[40px] px-0.5 py-1">Unidad</TableHead>
                      <TableHead className="w-[60px] px-0.5 py-1">Presentación</TableHead>
                      <TableHead className="w-[40px] px-0.5 py-1">U. Medida</TableHead>
                      <TableHead className="w-[25px] px-0.5 py-1">Stock</TableHead>
                      <TableHead className="w-[50px] px-0.5 py-1">Marca</TableHead>
                      <TableHead className="w-[50px] px-0.5 py-1">Categoría</TableHead>
                      <TableHead className="w-[25px] px-0.5 py-1">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...Array(5)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="px-0.5 py-1"><Skeleton className="h-4 w-[50px]" /></TableCell>
                        <TableCell className="px-0.5 py-1"><Skeleton className="h-4 w-[25px]" /></TableCell>
                        <TableCell className="px-0.5 py-1"><Skeleton className="h-4 w-[25px]" /></TableCell>
                        <TableCell className="px-0.5 py-1"><Skeleton className="h-4 w-[25px]" /></TableCell>
                        <TableCell className="px-0.5 py-1"><Skeleton className="h-4 w-[40px]" /></TableCell>
                        <TableCell className="px-0.5 py-1"><Skeleton className="h-4 w-[25px]" /></TableCell>
                        <TableCell className="px-0.5 py-1"><Skeleton className="h-4 w-[15px]" /></TableCell>
                        <TableCell className="px-0.5 py-1"><Skeleton className="h-4 w-[30px]" /></TableCell>
                        <TableCell className="px-0.5 py-1"><Skeleton className="h-4 w-[30px]" /></TableCell>
                        <TableCell className="px-0.5 py-1">
                          <div className="flex space-x-0.5">
                            <Skeleton className="h-4 w-2" />
                            <Skeleton className="h-4 w-2" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!session || session.user.role !== 'ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-red-500 mb-4">
          <AlertCircle className="h-12 w-12" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Acceso no autorizado</h2>
        <p className="text-gray-600">No tienes permisos para acceder a esta página.</p>
      </div>
    );
  }

  const handleDelete = async (productId: number) => {
    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: 'DELETE',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }

      toast.success('Producto eliminado correctamente');
      // Refresh the products list
      const productsResponse = await fetch('/api/admin/products', {
        credentials: 'include'
      });
      const data = await productsResponse.json();
      setProducts(data.products);
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Error al eliminar el producto');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Productos</h1>
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href="/admin/products/import">
              <Upload className="w-4 h-4 mr-2" />
              Importar
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/products/new">
              <Plus className="w-4 h-4 mr-2" />
              Nuevo Producto
            </Link>
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar por SKU, nombre, marca o categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <Select value={filter} onValueChange={(value) => setFilter(value as 'ALL' | 'CORE' | 'NO_CORE')}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Todos</SelectItem>
                  <SelectItem value="CORE">Core</SelectItem>
                  <SelectItem value="NO_CORE">No Core</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="relative overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b">
                  <TableHead className="w-[70px] px-0.5 py-1">Nombre</TableHead>
                  <TableHead className="w-[40px] px-0.5 py-1">Precio</TableHead>
                  <TableHead className="w-[40px] px-0.5 py-1">Tipo</TableHead>
                  <TableHead className="w-[40px] px-0.5 py-1">Unidad</TableHead>
                  <TableHead className="w-[60px] px-0.5 py-1">Presentación</TableHead>
                  <TableHead className="w-[40px] px-0.5 py-1">U. Medida</TableHead>
                  <TableHead className="w-[25px] px-0.5 py-1">Stock</TableHead>
                  <TableHead className="w-[50px] px-0.5 py-1">Marca</TableHead>
                  <TableHead className="w-[50px] px-0.5 py-1">Categoría</TableHead>
                  <TableHead className="w-[25px] px-0.5 py-1">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={11} className="text-center">
                      No se encontraron productos
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>{product.nombre}</TableCell>
                      <TableCell>{`S/ ${product.precio.toFixed(2)}`}</TableCell>
                      <TableCell>
                        <Badge variant={product.tipoProducto === 'CORE' ? 'default' : 'secondary'}>
                          {product.tipoProducto}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.unidadDeVenta === 'PESO' ? 'default' : 'secondary'}>
                          {product.unidadDeVenta}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {product.presentacion ? (
                          <Badge variant="outline">{product.presentacion}</Badge>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{product.unidadMedida}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={product.stock < 5 ? 'destructive' : product.stock < 20 ? 'secondary' : 'default'}>
                          {product.stock}
                        </Badge>
                      </TableCell>
                      <TableCell>{product.marca.nombre}</TableCell>
                      <TableCell>{product.categoria.nombre}</TableCell>
                      <TableCell className="sticky right-0 bg-background z-10">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/admin/products/${product.id}/edit`} className="flex items-center">
                                <Pencil className="h-4 w-4 mr-2" />
                                Editar
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive focus:text-destructive"
                              onClick={() => {
                                if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
                                  handleDelete(product.id);
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 