"use client";

import { useEffect, useRef } from "react";
import { MessageSquare, Instagram, BookOpen, ChevronRight, Leaf, Droplet, UtensilsCrossed, Flower } from "lucide-react";

// Items duplicados para el efecto de scroll infinito
const categoryItems = [
  { icon: Droplet, bg: "bg-amber-500", name: "Mieles" },
  { icon: Leaf, bg: "bg-green-600", name: "Productos Orgánicos" },
  { icon: UtensilsCrossed, bg: "bg-red-600", name: "Hamburguesas y Chorizos" },
  { icon: Flower, bg: "bg-purple-500", name: "Orquídeas" },
];

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Configurar animación de scroll infinito
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    // Iniciar animación en intervalos para auto-scroll
    const autoScroll = setInterval(() => {
      if (scrollContainer.scrollLeft + scrollContainer.clientWidth >= scrollContainer.scrollWidth) {
        // Cuando llegue al final, volver al inicio suavemente
        scrollContainer.scrollTo({ left: 0, behavior: "auto" });
      } else {
        // Desplazar suavemente
        scrollContainer.scrollBy({ left: 2, behavior: "smooth" });
      }
    }, 50);

    return () => {
      clearInterval(autoScroll);
    };
  }, []);

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
      
      {/* Product Categories - Infinitely Scrolling */}
      <div 
        ref={scrollContainerRef}
        className="w-full max-w-full overflow-x-auto scrollbar-hide mb-8 py-4"
      >
        <div className="flex px-2 animate-scroll">
          {/* Render original items */}
          {categoryItems.map((item, index) => (
            <div key={`item-${index}`} className="flex flex-col items-center px-3 flex-shrink-0">
              <div className={`w-16 h-16 flex items-center justify-center ${item.bg} text-white rounded-full mb-2 shadow-md`}>
                <item.icon size={32} />
              </div>
              <p className="text-center font-medium text-black w-24">{item.name}</p>
            </div>
          ))}
          
          {/* Duplicated items for infinite scroll effect */}
          {categoryItems.map((item, index) => (
            <div key={`duplicate-${index}`} className="flex flex-col items-center px-3 flex-shrink-0">
              <div className={`w-16 h-16 flex items-center justify-center ${item.bg} text-white rounded-full mb-2 shadow-md`}>
                <item.icon size={32} />
              </div>
              <p className="text-center font-medium text-black w-24">{item.name}</p>
            </div>
          ))}
          
          {/* Segunda duplicación para asegurar que haya suficientes elementos */}
          {categoryItems.map((item, index) => (
            <div key={`duplicate2-${index}`} className="flex flex-col items-center px-3 flex-shrink-0">
              <div className={`w-16 h-16 flex items-center justify-center ${item.bg} text-white rounded-full mb-2 shadow-md`}>
                <item.icon size={32} />
              </div>
              <p className="text-center font-medium text-black w-24">{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Link Tree */}
      <div className="w-full max-w-md flex flex-col gap-4">
        {/* WhatsApp Link */}
        <a 
          href="https://wa.me/51998855069" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm transition-all hover:shadow-md"
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
        
        {/* Catalog PDF Link */}
        <a 
          href="/catalogo.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm transition-all hover:shadow-md"
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
        
        {/* Instagram Link */}
        <a 
          href="https://www.instagram.com/goxa_pe" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm transition-all hover:shadow-md"
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
      </div>
      
      {/* Product Highlight */}
      <div className="mt-10 w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
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
        <p className="mt-3">
          Desarrollado por{" "}
          <a 
            href="https://rodrigovdev.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="font-medium hover:underline"
          >
            VdeV Digital Solutions
          </a>
        </p>
      </footer>
    </main>
  );
}
