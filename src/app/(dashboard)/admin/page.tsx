"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Upload, ShoppingCart, BarChart2 } from 'lucide-react';

interface DashboardStats {
  totalSales: number;
  newCustomers: number;
  productsInStock: number;
  opportunities: number;
}

interface RecentSale {
  customer: string;
  product: string;
  status: string;
  total: number;
}

interface LowStockItem {
  name: string;
  currentStock: number;
  minimumStock: number;
  status: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentSales, setRecentSales] = useState<RecentSale[]>([]);
  const [lowStockItems, setLowStockItems] = useState<LowStockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        if (!response.ok) {
          throw new Error('Error al cargar los datos del dashboard');
        }
        const data = await response.json();
        setStats(data.stats);
        setRecentSales(data.recentSales);
        setLowStockItems(data.lowStockItems);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Error al cargar los datos del dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium">Ventas Totales</h2>
          <p className="text-3xl font-bold mt-2">S/ {stats?.totalSales.toFixed(2)}</p>
          <div className="flex items-center text-green-500 text-sm mt-2">
            <span>↑ 12%</span>
            <span className="text-gray-400 ml-1">desde el mes pasado</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium">Clientes Nuevos</h2>
          <p className="text-3xl font-bold mt-2">{stats?.newCustomers}</p>
          <div className="flex items-center text-green-500 text-sm mt-2">
            <span>↑ 8%</span>
            <span className="text-gray-400 ml-1">desde el mes pasado</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium">Productos en Stock</h2>
          <p className="text-3xl font-bold mt-2">{stats?.productsInStock}</p>
          <div className="flex items-center text-red-500 text-sm mt-2">
            <span>↓ 3%</span>
            <span className="text-gray-400 ml-1">desde el mes pasado</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium">Oportunidades</h2>
          <p className="text-3xl font-bold mt-2">{stats?.opportunities}</p>
          <div className="flex items-center text-green-500 text-sm mt-2">
            <span>↑ 18%</span>
            <span className="text-gray-400 ml-1">desde el mes pasado</span>
          </div>
        </div>
      </div>
      
      {/* Quick Actions Section */}
      <div className="mt-8">
        <h2 className="text-lg font-medium mb-4">Acciones Rápidas</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link href="/admin/products/new" className="bg-white rounded-lg shadow p-4 flex items-center hover:bg-blue-50 transition-colors">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <Plus className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium">Nuevo Producto</h3>
              <p className="text-sm text-gray-500">Crear producto</p>
            </div>
          </Link>
          
          <Link href="/admin/products/import" className="bg-white rounded-lg shadow p-4 flex items-center hover:bg-green-50 transition-colors">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <Upload className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium">Importar Productos</h3>
              <p className="text-sm text-gray-500">Desde Excel/CSV</p>
            </div>
          </Link>
          
          <Link href="/admin/sales/new" className="bg-white rounded-lg shadow p-4 flex items-center hover:bg-purple-50 transition-colors">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <ShoppingCart className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="font-medium">Nueva Venta</h3>
              <p className="text-sm text-gray-500">Registrar venta</p>
            </div>
          </Link>
          
          <Link href="/admin/reports" className="bg-white rounded-lg shadow p-4 flex items-center hover:bg-yellow-50 transition-colors">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <BarChart2 className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="font-medium">Reportes</h3>
              <p className="text-sm text-gray-500">Ver informes</p>
            </div>
          </Link>
        </div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Sales */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Ventas Recientes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentSales.map((sale, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap">{sale.customer}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{sale.product}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        sale.status === 'COMPLETADA' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {sale.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">S/ {sale.total.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Low Stock Items */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium mb-4">Productos con Stock Bajo</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Producto</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Actual</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Mínimo</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {lowStockItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-4 py-3 whitespace-nowrap">{item.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.currentStock}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{item.minimumStock}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'Crítico' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 