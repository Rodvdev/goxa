"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, AlertCircle, TrendingUp, Users, Package, DollarSign, BarChart2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Table, TableHeader, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from "@/components/ui/progress";

interface InventoryItem {
  id: number;
  nombre: string;
  stock: number;
  stockMinimo: number;
  precio: number;
  marca: { nombre: string };
  categoria: { nombre: string };
  status: 'CRITICO' | 'BAJO' | 'NORMAL';
}

interface Product {
  id: string;
  nombre: string;
  stock: number;
  stockMinimo: number;
  precio: number;
  ventasMes: number;
  tendencia: 'up' | 'down' | 'stable';
}

interface Vendedor {
  id: string;
  nombre: string;
  ventasMes: number;
  comision: number;
  tendencia: 'up' | 'down' | 'stable';
}

interface Cliente {
  id: string;
  nombre: string;
  comprasMes: number;
  valorTotal: number;
  tendencia: 'up' | 'down' | 'stable';
}

interface VentasData {
  fecha: string;
  total: number;
}

export default function InventoryDashboard() {
  const { data: session, status } = useSession();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'ALL' | 'CRITICO' | 'BAJO' | 'NORMAL'>('ALL');
  const [products, setProducts] = useState<Product[]>([]);
  const [vendedores, setVendedores] = useState<Vendedor[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [ventasData, setVentasData] = useState<VentasData[]>([]);

  useEffect(() => {
    // Simular carga de datos
    const fetchData = async () => {
      try {
        // Datos mockeados
        const mockProducts: Product[] = [
          {
            id: "1",
            nombre: "Laptop HP",
            stock: 15,
            stockMinimo: 10,
            precio: 2500,
            ventasMes: 8,
            tendencia: "up"
          },
          {
            id: "2",
            nombre: "Monitor Dell",
            stock: 5,
            stockMinimo: 8,
            precio: 1200,
            ventasMes: 12,
            tendencia: "up"
          },
          // ... más productos
        ];

        const mockVendedores: Vendedor[] = [
          {
            id: "1",
            nombre: "Juan Pérez",
            ventasMes: 15000,
            comision: 1500,
            tendencia: "up"
          },
          {
            id: "2",
            nombre: "María García",
            ventasMes: 12000,
            comision: 1200,
            tendencia: "stable"
          },
          // ... más vendedores
        ];

        const mockClientes: Cliente[] = [
          {
            id: "1",
            nombre: "Empresa ABC",
            comprasMes: 5,
            valorTotal: 15000,
            tendencia: "up"
          },
          {
            id: "2",
            nombre: "Corporación XYZ",
            comprasMes: 3,
            valorTotal: 8000,
            tendencia: "stable"
          },
          // ... más clientes
        ];

        const mockVentasData: VentasData[] = [
          { fecha: "01/01", total: 5000 },
          { fecha: "02/01", total: 7500 },
          { fecha: "03/01", total: 6000 },
          { fecha: "04/01", total: 9000 },
          { fecha: "05/01", total: 12000 },
          { fecha: "06/01", total: 15000 },
        ];

        setInventory([
          {
            id: 1,
            nombre: "Producto 1",
            stock: 2,
            stockMinimo: 10,
            precio: 25.99,
            marca: { nombre: "Marca 1" },
            categoria: { nombre: "Categoría 1" },
            status: 'CRITICO'
          },
          // ... más datos de ejemplo
        ]);

        setProducts(mockProducts);
        setVendedores(mockVendedores);
        setClientes(mockClientes);
        setVentasData(mockVentasData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.marca.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.categoria.nombre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'ALL' || item.status === filter;
    return matchesSearch && matchesFilter;
  });

  if (status === 'loading' || loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Inventario</h1>
          <Button variant="outline" disabled>
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Ajuste
          </Button>
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
                      <TableHead className="w-[120px] px-0.5 py-1">Producto</TableHead>
                      <TableHead className="w-[80px] px-0.5 py-1">Stock</TableHead>
                      <TableHead className="w-[80px] px-0.5 py-1">Mínimo</TableHead>
                      <TableHead className="w-[80px] px-0.5 py-1">Estado</TableHead>
                      <TableHead className="w-[100px] px-0.5 py-1">Marca</TableHead>
                      <TableHead className="w-[100px] px-0.5 py-1">Categoría</TableHead>
                      <TableHead className="w-[80px] px-0.5 py-1">Precio</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {[...Array(5)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell className="px-0.5 py-1"><Skeleton className="h-4 w-[100px]" /></TableCell>
                        <TableCell className="px-0.5 py-1"><Skeleton className="h-4 w-[60px]" /></TableCell>
                        <TableCell className="px-0.5 py-1"><Skeleton className="h-4 w-[60px]" /></TableCell>
                        <TableCell className="px-0.5 py-1"><Skeleton className="h-4 w-[60px]" /></TableCell>
                        <TableCell className="px-0.5 py-1"><Skeleton className="h-4 w-[80px]" /></TableCell>
                        <TableCell className="px-0.5 py-1"><Skeleton className="h-4 w-[80px]" /></TableCell>
                        <TableCell className="px-0.5 py-1"><Skeleton className="h-4 w-[60px]" /></TableCell>
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

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventario</h1>
        <Button variant="outline" asChild>
          <Link href="/admin/inventory/adjust" className="flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Ajuste
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar por nombre, marca o categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="text-gray-400 w-5 h-5" />
              <Select value={filter} onValueChange={(value) => setFilter(value as 'ALL' | 'CRITICO' | 'BAJO' | 'NORMAL')}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ALL">Todos</SelectItem>
                  <SelectItem value="CRITICO">Crítico</SelectItem>
                  <SelectItem value="BAJO">Bajo</SelectItem>
                  <SelectItem value="NORMAL">Normal</SelectItem>
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
                  <TableHead className="w-[120px] px-0.5 py-1">Producto</TableHead>
                  <TableHead className="w-[80px] px-0.5 py-1">Stock</TableHead>
                  <TableHead className="w-[80px] px-0.5 py-1">Mínimo</TableHead>
                  <TableHead className="w-[80px] px-0.5 py-1">Estado</TableHead>
                  <TableHead className="w-[100px] px-0.5 py-1">Marca</TableHead>
                  <TableHead className="w-[100px] px-0.5 py-1">Categoría</TableHead>
                  <TableHead className="w-[80px] px-0.5 py-1">Precio</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center">
                      No se encontraron productos
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInventory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="px-0.5 py-1">{item.nombre}</TableCell>
                      <TableCell className="px-0.5 py-1">{item.stock}</TableCell>
                      <TableCell className="px-0.5 py-1">{item.stockMinimo}</TableCell>
                      <TableCell className="px-0.5 py-1">
                        <Badge 
                          variant={
                            item.status === 'CRITICO' ? 'destructive' : 
                            item.status === 'BAJO' ? 'secondary' : 'default'
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-0.5 py-1">{item.marca.nombre}</TableCell>
                      <TableCell className="px-0.5 py-1">{item.categoria.nombre}</TableCell>
                      <TableCell className="px-0.5 py-1">S/ {item.precio.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <h1 className="text-3xl font-bold mt-6">Dashboard de Inventario</h1>
      
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ventas Totales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">S/ 45,000</div>
            <p className="text-xs text-muted-foreground">
              +12% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productos en Stock</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">
              +5% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendedores Activos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes Nuevos</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +3 desde el mes pasado
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos y Análisis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Tendencia de Ventas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-end space-x-2">
              {ventasData.map((venta, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div 
                    className="w-12 bg-primary rounded-t"
                    style={{ height: `${(venta.total / 15000) * 100}%` }}
                  />
                  <span className="text-xs mt-2">{venta.fecha}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Vendedores</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {vendedores.map((vendedor) => (
                <div key={vendedor.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>{vendedor.nombre}</span>
                    <Badge variant={vendedor.tendencia === 'up' ? 'default' : 'secondary'}>
                      {vendedor.tendencia === 'up' ? '↑' : '→'}
                    </Badge>
                  </div>
                  <span className="font-medium">S/ {vendedor.ventasMes.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alertas y Productos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Productos con Stock Bajo</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
              {products.filter(p => p.stock < p.stockMinimo).map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <AlertCircle className="h-4 w-4 text-red-500" />
                <span>{product.nombre}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-muted-foreground">
                      Stock: {product.stock}/{product.stockMinimo}
                    </span>
                    <Progress 
                      value={(product.stock / product.stockMinimo) * 100} 
                      className="w-[100px]"
                    />
                  </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Top Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
              {clientes.map((cliente) => (
                <div key={cliente.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span>{cliente.nombre}</span>
                    <Badge variant={cliente.tendencia === 'up' ? 'default' : 'secondary'}>
                      {cliente.tendencia === 'up' ? '↑' : '→'}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">S/ {cliente.valorTotal.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {cliente.comprasMes} compras
                    </div>
                  </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
} 