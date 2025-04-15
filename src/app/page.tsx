import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Instagram, BookOpen, ChevronRight, Warehouse, Leaf } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-12 pb-24 px-6">
      {/* Logo and Header */}
      <div className="w-32 h-32 mb-6 flex items-center justify-center rounded-full bg-green-600 text-white">
        <Leaf size={64} />
      </div>
      
      <h1 className="text-4xl font-bold mb-2 font-poppins text-green-800">GOXA</h1>
     
      
      {/* Link Tree */}
      <div className="w-full max-w-md flex flex-col gap-4">
        {/* WhatsApp Link */}
        <a 
          href="https://wa.me/51998855069" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white hover:bg-green-50 border border-green-200 p-4 rounded-xl shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="bg-green-500 text-white p-3 rounded-full">
              <MessageSquare size={24} />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Contáctanos por WhatsApp</h2>
              <p className="text-gray-500 text-sm">Respuesta rápida a tus consultas</p>
            </div>
          </div>
          <ChevronRight className="text-gray-400" />
        </a>
        
        {/* Instagram Link */}
        <a 
          href="https://www.instagram.com/goxa_pe" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white hover:bg-pink-50 border border-pink-200 p-4 rounded-xl shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-tr from-purple-500 to-pink-500 text-white p-3 rounded-full">
              <Instagram size={24} />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Síguenos en Instagram</h2>
              <p className="text-gray-500 text-sm">@goxa_pe</p>
            </div>
          </div>
          <ChevronRight className="text-gray-400" />
        </a>
        
        {/* Catalog PDF Link */}
        <a 
          href="/catalogo.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white hover:bg-blue-50 border border-blue-200 p-4 rounded-xl shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 text-white p-3 rounded-full">
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Catálogo Digital</h2>
              <p className="text-gray-500 text-sm">Descubre nuestra colección completa</p>
            </div>
          </div>
          <ChevronRight className="text-gray-400" />
        </a>
        
        {/* Warehouse Products Link */}
        {/* <Link
          href="/warehouse-products"
          className="flex items-center justify-between bg-white hover:bg-amber-50 border border-amber-200 p-4 rounded-xl shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-4">
            <div className="bg-amber-500 text-white p-3 rounded-full">
              <Warehouse size={24} />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Inventario</h2>
              <p className="text-gray-500 text-sm">Gestión de almacenes</p>
            </div>
          </div>
          <ChevronRight className="text-gray-400" />
        </Link> */}
      </div>
      
      {/* Footer */}
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} GOXA. Todos los derechos reservados.</p>
        <p className="mt-1">Lima, Perú</p>
      </footer>
    </main>
  );
} 