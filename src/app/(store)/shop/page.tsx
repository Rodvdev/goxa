export default function ShopPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-8">Catálogo de Productos</h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row mb-8 gap-4">
        <div className="w-full md:w-64 bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-medium mb-4">Filtros</h2>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Categorías</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input id="cat-electronics" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="cat-electronics" className="ml-2 text-sm text-gray-700">Electrónica</label>
              </div>
              <div className="flex items-center">
                <input id="cat-furniture" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="cat-furniture" className="ml-2 text-sm text-gray-700">Mobiliario</label>
              </div>
              <div className="flex items-center">
                <input id="cat-clothing" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="cat-clothing" className="ml-2 text-sm text-gray-700">Ropa</label>
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Precio</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <input id="price-1" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="price-1" className="ml-2 text-sm text-gray-700">Menos de $50</label>
              </div>
              <div className="flex items-center">
                <input id="price-2" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="price-2" className="ml-2 text-sm text-gray-700">$50 - $100</label>
              </div>
              <div className="flex items-center">
                <input id="price-3" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="price-3" className="ml-2 text-sm text-gray-700">$100 - $200</label>
              </div>
              <div className="flex items-center">
                <input id="price-4" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                <label htmlFor="price-4" className="ml-2 text-sm text-gray-700">Más de $200</label>
              </div>
            </div>
          </div>
          
          <button className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700">
            Aplicar Filtros
          </button>
        </div>
        
        {/* Products */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Product 1 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="text-lg font-medium">Laptop Pro X</h3>
                <p className="text-gray-500 text-sm mb-2">Electrónica</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">$1,200</p>
                  <button className="bg-indigo-600 text-white py-1 px-3 rounded text-sm hover:bg-indigo-700">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
            
            {/* Product 2 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="text-lg font-medium">Monitor 27&quot;</h3>
                <p className="text-gray-500 text-sm mb-2">Electrónica</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">$350</p>
                  <button className="bg-indigo-600 text-white py-1 px-3 rounded text-sm hover:bg-indigo-700">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
            
            {/* Product 3 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="text-lg font-medium">Teclado Mecánico</h3>
                <p className="text-gray-500 text-sm mb-2">Electrónica</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">$120</p>
                  <button className="bg-indigo-600 text-white py-1 px-3 rounded text-sm hover:bg-indigo-700">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
            
            {/* Product 4 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="text-lg font-medium">Mouse Inalámbrico</h3>
                <p className="text-gray-500 text-sm mb-2">Electrónica</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">$45</p>
                  <button className="bg-indigo-600 text-white py-1 px-3 rounded text-sm hover:bg-indigo-700">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
            
            {/* Product 5 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="text-lg font-medium">Auriculares Bluetooth</h3>
                <p className="text-gray-500 text-sm mb-2">Electrónica</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">$85</p>
                  <button className="bg-indigo-600 text-white py-1 px-3 rounded text-sm hover:bg-indigo-700">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
            
            {/* Product 6 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="text-lg font-medium">Disco SSD 500GB</h3>
                <p className="text-gray-500 text-sm mb-2">Electrónica</p>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">$95</p>
                  <button className="bg-indigo-600 text-white py-1 px-3 rounded text-sm hover:bg-indigo-700">
                    Añadir al carrito
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="inline-flex shadow rounded-md">
              <a href="#" className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Anterior
              </a>
              <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-indigo-600 hover:bg-gray-50">
                1
              </a>
              <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                2
              </a>
              <a href="#" className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                3
              </a>
              <a href="#" className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Siguiente
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
} 