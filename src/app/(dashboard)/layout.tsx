import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-4 font-bold text-xl">OXA Admin</div>
        <nav className="mt-6">
          <ul>
            <li>
              <Link href="/admin/products" className="block py-2 px-4 hover:bg-gray-800">
                Productos
              </Link>
            </li>
            <li>
              <Link href="/admin/inventory" className="block py-2 px-4 hover:bg-gray-800">
                Inventario
              </Link>
            </li>
            <li>
              <Link href="/admin/customers" className="block py-2 px-4 hover:bg-gray-800">
                Clientes
              </Link>
            </li>
            <li>
              <Link href="/admin/sales" className="block py-2 px-4 hover:bg-gray-800">
                Ventas
              </Link>
            </li>
            <li>
              <Link href="/admin/reports" className="block py-2 px-4 hover:bg-gray-800">
                Reportes
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      
      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
} 