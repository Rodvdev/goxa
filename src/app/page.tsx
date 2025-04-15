import Link from "next/link";
import Image from "next/image";
import { MessageSquare, Instagram, BookOpen, ChevronRight, Leaf, Droplet, UtensilsCrossed, Flower } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center pt-12 pb-24 px-6 bg-white text-black">
      {/* Logo and Header */}
      <div className="w-32 h-32 mb-6 flex items-center justify-center rounded-full bg-green-600 text-white">
        <Leaf size={64} />
      </div>
      
      <h1 className="text-4xl font-bold mb-2 font-poppins text-black">GOXA</h1>
      <p className="text-lg mb-8 text-center text-black max-w-sm">
        Productos naturales y gourmet seleccionados
      </p>
      
      {/* Product Categories */}
      <div className="w-full max-w-xl grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="flex flex-col items-center p-4 bg-white border border-amber-200 rounded-xl">
          <div className="w-12 h-12 flex items-center justify-center bg-amber-500 text-white rounded-full mb-2">
            <Droplet size={24} />
          </div>
          <p className="text-center font-medium text-black">Mieles</p>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-white border border-green-200 rounded-xl">
          <div className="w-12 h-12 flex items-center justify-center bg-green-600 text-white rounded-full mb-2">
            <Leaf size={24} />
          </div>
          <p className="text-center font-medium text-black">Productos de Oxapampa</p>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-white border border-red-200 rounded-xl">
          <div className="w-12 h-12 flex items-center justify-center bg-red-600 text-white rounded-full mb-2">
            <UtensilsCrossed size={24} />
          </div>
          <p className="text-center font-medium text-black">Hamburguesas y Chorizos</p>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-white border border-purple-200 rounded-xl">
          <div className="w-12 h-12 flex items-center justify-center bg-purple-500 text-white rounded-full mb-2">
            <Flower size={24} />
          </div>
          <p className="text-center font-medium text-black">Orquídeas</p>
        </div>
      </div>
      
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
              <h2 className="font-semibold text-lg text-black">Contáctanos por WhatsApp</h2>
              <p className="text-sm text-black">Pide tus productos naturales y gourmet</p>
            </div>
          </div>
          <ChevronRight className="text-black" />
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
              <h2 className="font-semibold text-lg text-black">Síguenos en Instagram</h2>
              <p className="text-sm text-black">@goxa_pe</p>
            </div>
          </div>
          <ChevronRight className="text-black" />
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
              <h2 className="font-semibold text-lg text-black">Catálogo Digital</h2>
              <p className="text-sm text-black">Mieles, orquídeas, hamburguesas y más</p>
            </div>
          </div>
          <ChevronRight className="text-black" />
        </a>
        
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
      
      {/* Product Highlight */}
      <div className="mt-10 w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold text-black mb-2">Destacados</h2>
          <p className="text-black mb-4">Productos de temporada seleccionados para ti</p>
        </div>
        <div className="bg-white p-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <Droplet className="text-amber-700" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-black">Miel de Oxapampa</h3>
              <p className="text-sm text-black">100% natural, sin aditivos</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full">
              <UtensilsCrossed className="text-red-700" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-black">Hamburguesas para Parrilla</h3>
              <p className="text-sm text-black">Preparación artesanal</p>
            </div>
          </div>
        </div>
        <div className="bg-white p-4 border-t border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-purple-100 p-3 rounded-full">
              <Flower className="text-purple-700" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-black">Orquídeas Selva Central</h3>
              <p className="text-sm text-black">Cultivo responsable</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="mt-16 text-center text-black text-sm">
        <p>&copy; {new Date().getFullYear()} GOXA. Todos los derechos reservados.</p>
        <p className="mt-1">Lima, Perú</p>
      </footer>
    </main>
  );
} 