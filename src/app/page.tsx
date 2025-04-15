"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquare, Instagram, BookOpen, ChevronRight, Leaf, Droplet, UtensilsCrossed, Flower, ExternalLink } from "lucide-react";
import Link from "next/link";

// Items duplicados para el efecto de scroll infinito
const categoryItems = [
  { icon: Droplet, bg: "bg-amber-500", name: "Mieles" },
  { icon: Leaf, bg: "bg-green-600", name: "Productos Orgánicos" },
  { icon: UtensilsCrossed, bg: "bg-red-600", name: "Hamburguesas y Chorizos" },
  { icon: Flower, bg: "bg-purple-500", name: "Orquídeas" },
];

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [contentWidth, setContentWidth] = useState(0);

  useEffect(() => {
    // Get references to the container and inner content
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    
    // Calculate the widths needed for the infinite scroll effect
    const updateWidths = () => {
      const containerWidth = scrollContainer.clientWidth;
      const contentWidth = scrollContainer.scrollWidth / 2; // We only need half the width since we duplicate once
      
      setContainerWidth(containerWidth);
      setContentWidth(contentWidth);
    };
    
    // Initial measurement
    updateWidths();
    
    // Setup a resize observer to recalculate on window resize
    const resizeObserver = new ResizeObserver(updateWidths);
    resizeObserver.observe(scrollContainer);
    
    // Handle the infinite scroll effect by resetting position when needed
    const handleScroll = () => {
      if (!scrollContainer) return;
      
      // When scrolled to near the end, jump back to the first set of items
      if (scrollContainer.scrollLeft >= contentWidth - 50) {
        scrollContainer.scrollLeft = 0;
      }
      
      // If the user scrolls back too far left, jump to the second set
      if (scrollContainer.scrollLeft <= 0 && scrollContainer.scrollLeft > -5) {
        scrollContainer.scrollLeft = 1; // Just enough to keep scrolling
      }
    };
    
    scrollContainer.addEventListener('scroll', handleScroll);
    
    // Auto-scroll animation for a smooth experience
    let scrollInterval: NodeJS.Timeout;
    
    const startAutoScroll = () => {
      scrollInterval = setInterval(() => {
        // Always scroll without checking for hover to ensure continuous movement
        if (scrollContainer) {
          scrollContainer.scrollLeft += 1;
        }
      }, 20); // Slightly faster scroll speed
    };
    
    startAutoScroll();
    
    return () => {
      resizeObserver.disconnect();
      scrollContainer.removeEventListener('scroll', handleScroll);
      clearInterval(scrollInterval);
    };
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center pt-12 pb-24 bg-white text-black">
      
      <h1 className="text-4xl font-bold mb-2 font-poppins text-black">GOXA</h1>
      <p className="text-lg mb-8 text-center text-black max-w-sm">
        Productos naturales y gourmet seleccionados
      </p>
      
      {/* Product Categories - Infinitely Scrolling */}
      <div className="relative w-full max-w-screen-md mb-8">
        <div 
          ref={scrollContainerRef}
          className="w-full overflow-x-auto scrollbar-hide py-4 no-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div className="flex px-4 md:px-8 gap-6 md:gap-10 animate-infinite-scroll">
            {/* First set of items */}
            {categoryItems.map((item, index) => (
              <div key={`item-${index}`} className="flex flex-col items-center flex-shrink-0">
                <div className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center ${item.bg} text-white rounded-full mb-2 shadow-md`}>
                  <item.icon size={24} className="md:w-8 md:h-8" />
                </div>
                <p className="text-center font-medium text-black w-24">{item.name}</p>
              </div>
            ))}
            
            {/* Duplicate set for seamless looping */}
            {categoryItems.map((item, index) => (
              <div key={`duplicate-${index}`} className="flex flex-col items-center flex-shrink-0">
                <div className={`w-16 h-16 md:w-20 md:h-20 flex items-center justify-center ${item.bg} text-white rounded-full mb-2 shadow-md`}>
                  <item.icon size={24} className="md:w-8 md:h-8" />
                </div>
                <p className="text-center font-medium text-black w-24">{item.name}</p>
              </div>
            ))}
          </div>
        </div>
        
        {/* Add gradient overlays for a fading effect on the sides */}
        <div className="absolute left-0 top-0 h-full w-12 bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>
      
      {/* Quick Links Button - Redirects to the dedicated links page */}
      <div className="w-full max-w-md flex flex-col items-center gap-4 px-6 mb-8">
        <Link 
          href="/enlaces-rapidos/goxa/productos-organicos-de-oxapampa-miel-y-parrillas-en-peru" 
          className="flex items-center justify-between w-full bg-gradient-to-r from-amber-500 to-orange-500 p-4 rounded-xl shadow-sm transition-all hover:shadow-md text-white"
        >
          <div className="flex items-center gap-4">
            <div className="bg-white/20 p-3 rounded-full">
              <ExternalLink size={24} className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-lg">Enlaces Rápidos</h2>
              <p className="text-sm">Contáctanos y explora nuestro catálogo</p>
            </div>
          </div>
          <ChevronRight className="text-white" />
        </Link>
      </div>
      
      {/* Product Highlight */}
        {/* <div className="mt-10 w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
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
        </div> */}
      
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
