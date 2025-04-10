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