import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="font-bold text-xl">OXA Platform</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/shop" className="text-gray-700 hover:text-gray-900">Tienda</Link>
              <Link href="/about" className="text-gray-700 hover:text-gray-900">Nosotros</Link>
              <Link href="/contact" className="text-gray-700 hover:text-gray-900">Contacto</Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/signin" className="text-indigo-600 hover:text-indigo-900">
                Iniciar Sesión
              </Link>
              <Link 
                href="/admin/dashboard" 
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero section */}
      <main className="flex-1">
        <div className="relative bg-gray-900">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent opacity-75"></div>
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">OXA Platform</h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl">
              Plataforma integral que combina ERP, E-commerce y CRM para optimizar la gestión de tu negocio.
            </p>
            <div className="mt-10 flex space-x-4">
              <Link
                href="/shop"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Visitar tienda
              </Link>
              <Link
                href="/signin"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-200 bg-transparent hover:bg-gray-800"
              >
                Iniciar sesión
              </Link>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Todo lo que necesitas para tu negocio
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Una solución completa para la gestión empresarial, ventas online y relación con tus clientes.
              </p>
            </div>
            
            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900">ERP</h3>
                  <p className="mt-2 text-gray-600">
                    Gestión de inventario, ventas, compras y finanzas de forma centralizada.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900">E-commerce</h3>
                  <p className="mt-2 text-gray-600">
                    Tienda online integrada con tu inventario y sistema de gestión.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-gray-900">CRM</h3>
                  <p className="mt-2 text-gray-600">
                    Gestiona tus clientes, oportunidades y seguimiento comercial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>© {new Date().getFullYear()} OXA Platform. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
