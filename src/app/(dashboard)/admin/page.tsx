export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stats Cards */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium">Ventas Totales</h2>
          <p className="text-3xl font-bold mt-2">$24,780</p>
          <div className="flex items-center text-green-500 text-sm mt-2">
            <span>↑ 12%</span>
            <span className="text-gray-400 ml-1">desde el mes pasado</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium">Clientes Nuevos</h2>
          <p className="text-3xl font-bold mt-2">43</p>
          <div className="flex items-center text-green-500 text-sm mt-2">
            <span>↑ 8%</span>
            <span className="text-gray-400 ml-1">desde el mes pasado</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium">Productos en Stock</h2>
          <p className="text-3xl font-bold mt-2">532</p>
          <div className="flex items-center text-red-500 text-sm mt-2">
            <span>↓ 3%</span>
            <span className="text-gray-400 ml-1">desde el mes pasado</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-gray-500 text-sm font-medium">Oportunidades</h2>
          <p className="text-3xl font-bold mt-2">24</p>
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
          <a href="/admin/products/new" className="bg-white rounded-lg shadow p-4 flex items-center hover:bg-blue-50 transition-colors">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Nuevo Producto</h3>
              <p className="text-sm text-gray-500">Crear producto</p>
            </div>
          </a>
          
          <a href="/admin/products/import" className="bg-white rounded-lg shadow p-4 flex items-center hover:bg-green-50 transition-colors">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Importar Productos</h3>
              <p className="text-sm text-gray-500">Desde Excel/CSV</p>
            </div>
          </a>
          
          <a href="/admin/sales/new" className="bg-white rounded-lg shadow p-4 flex items-center hover:bg-purple-50 transition-colors">
            <div className="bg-purple-100 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Nueva Venta</h3>
              <p className="text-sm text-gray-500">Registrar venta</p>
            </div>
          </a>
          
          <a href="/admin/reports" className="bg-white rounded-lg shadow p-4 flex items-center hover:bg-yellow-50 transition-colors">
            <div className="bg-yellow-100 p-3 rounded-full mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="font-medium">Reportes</h3>
              <p className="text-sm text-gray-500">Ver informes</p>
            </div>
          </a>
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
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">Juan Pérez</td>
                  <td className="px-4 py-3 whitespace-nowrap">Laptop Pro X</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completada</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">$1,200</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">María López</td>
                  <td className="px-4 py-3 whitespace-nowrap">Monitor 27&quot;</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pendiente</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">$350</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">Carlos Ruiz</td>
                  <td className="px-4 py-3 whitespace-nowrap">Teclado Mecánico</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Completada</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">$120</td>
                </tr>
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
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">Mouse Inalámbrico</td>
                  <td className="px-4 py-3 whitespace-nowrap">3</td>
                  <td className="px-4 py-3 whitespace-nowrap">5</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Crítico</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">Auriculares Bluetooth</td>
                  <td className="px-4 py-3 whitespace-nowrap">8</td>
                  <td className="px-4 py-3 whitespace-nowrap">10</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Bajo</span>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 whitespace-nowrap">Disco SSD 500GB</td>
                  <td className="px-4 py-3 whitespace-nowrap">12</td>
                  <td className="px-4 py-3 whitespace-nowrap">15</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Bajo</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 