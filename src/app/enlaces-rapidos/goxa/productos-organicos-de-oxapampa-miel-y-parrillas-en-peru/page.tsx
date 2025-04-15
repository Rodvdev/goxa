"use client";

import { MessageSquare, Instagram, BookOpen, ChevronRight, ArrowLeft, ShoppingBag, Leaf, Droplet, UtensilsCrossed, Flower } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect } from "react";

export default function EnlacesRapidos() {
  // Animation for elements to fade in staggered
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center pt-12 pb-24 bg-gradient-to-b from-amber-50 to-white text-black">
      <motion.div 
        className="w-full max-w-md px-6 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >

        <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
          <ShoppingBag size={40} />
        </div>
        
        <h1 className="text-3xl font-bold mb-2 text-center">Descubre GOXA Naturalmente</h1>
        <p className="text-lg mb-8 text-center text-gray-700 max-w-sm">
          Sabores de Oxapampa directo a tu mesa
        </p>
      </motion.div>
      
      
      {/* Link Tree */}
      <motion.div 
        className="w-full max-w-md flex flex-col gap-4 px-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {/* WhatsApp Link */}
        <motion.a 
          href="https://wa.me/51998855069" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm transition-all hover:shadow-md hover:bg-green-50"
          variants={item}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-4">
            <div className="bg-green-500 text-white p-3 rounded-full">
              <MessageSquare size={24} />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-black">Contáctanos por WhatsApp</h2>
              <p className="text-sm text-gray-600">Pide tus productos naturales y gourmet</p>
            </div>
          </div>
          <ChevronRight className="text-gray-400" />
        </motion.a>
        
        {/* Catalog PDF Link */}
        <motion.a 
          href="/catalogo.pdf" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm transition-all hover:shadow-md hover:bg-blue-50"
          variants={item}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-4">
            <div className="bg-blue-500 text-white p-3 rounded-full">
              <BookOpen size={24} />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-black">Catálogo Digital</h2>
              <p className="text-sm text-gray-600">Mieles, orquídeas, hamburguesas y más</p>
            </div>
          </div>
          <ChevronRight className="text-gray-400" />
        </motion.a>
        
        {/* Instagram Link */}
        <motion.a 
          href="https://www.instagram.com/goxa_pe" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm transition-all hover:shadow-md hover:bg-purple-50"
          variants={item}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-tr from-purple-500 to-pink-500 text-white p-3 rounded-full">
              <Instagram size={24} />
            </div>
            <div>
              <h2 className="font-semibold text-lg text-black">Síguenos en Instagram</h2>
              <p className="text-sm text-gray-600">@goxa_pe</p>
            </div>
          </div>
          <ChevronRight className="text-gray-400" />
        </motion.a>
      </motion.div>

      {/* Product Categories Grid */}
      <motion.div 
        className="w-full max-w-md grid grid-cols-2 gap-4 px-6 mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <div className="bg-amber-100 p-4 rounded-xl shadow-sm">
          <div className="bg-amber-500 text-white p-3 rounded-full inline-flex mb-2">
            <Droplet size={20} />
          </div>
          <span className="font-medium text-base block">Mieles</span>
          <p className="text-sm text-gray-600">100% natural</p>
        </div>
        
        <div className="bg-purple-100 p-4 rounded-xl shadow-sm">
          <div className="bg-purple-500 text-white p-3 rounded-full inline-flex mb-2">
            <Flower size={20} />
          </div>
          <span className="font-medium text-base block">Orquídeas</span>
          <p className="text-sm text-gray-600">Selva Central</p>
        </div>

        
        <div className="bg-green-100 p-4 rounded-xl shadow-sm">
          <div className="bg-green-600 text-white p-3 rounded-full inline-flex mb-2">
            <Leaf size={20} />
          </div>
          <span className="font-medium text-base block">Productos Orgánicos</span>
          <p className="text-sm text-gray-600">De Oxapampa</p>
        </div>
        
        <div className="bg-red-100 p-4 rounded-xl shadow-sm">
          <div className="bg-red-600 text-white p-3 rounded-full inline-flex mb-2">
            <UtensilsCrossed size={20} />
          </div>
          <span className="font-medium text-base block">Parrillas</span>
          <p className="text-sm text-gray-600">Hamburguesas y chorizos</p>
        </div>
      </motion.div>
      
      
      {/* Footer */}
      <motion.footer 
        className="mt-16 text-center text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>&copy; {new Date().getFullYear()} GOXA. Todos los derechos reservados.</p>
        <p className="mt-1">Lima, Perú</p>
      </motion.footer>
    </main>
  );
} 