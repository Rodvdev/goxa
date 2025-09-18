"use client";

import { MessageCircle, Truck, Shield, Star } from "lucide-react";
import WhatsAppButton from "@/components/ui/whatsapp-button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 hero-gradient opacity-90"></div>
      
      {/* Background pattern or image could go here */}
      <div className="absolute inset-0 bg-[url('/logo.png')] bg-center bg-no-repeat bg-contain opacity-10"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="trust-badge">
              <Truck className="w-4 h-4 mr-2" />
              Envíos a Lima
            </div>
            <div className="trust-badge">
              <Shield className="w-4 h-4 mr-2" />
              Productos Frescos
            </div>
            <div className="trust-badge">
              <Star className="w-4 h-4 mr-2" />
              Calidad Garantizada
            </div>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-poppins font-bold text-white mb-6 leading-tight">
            Productos Naturales y Gourmet de{" "}
            <span className="text-amber-300">Oxapampa</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Mieles 100% naturales, carnes artesanales y orquídeas únicas
          </p>

          {/* CTA Button */}
          <div className="mb-12">
            <WhatsAppButton size="lg" className="text-xl px-8 py-4 rounded-full shadow-2xl">
              <MessageCircle className="w-6 h-6 mr-3" />
              Comprar por WhatsApp
            </WhatsAppButton>
          </div>

          {/* Additional trust elements */}
          <div className="text-white/80 text-lg">
            <p className="mb-2">🌱 Productos 100% Naturales</p>
            <p className="mb-2">🚚 Envío Gratis a Lima</p>
            <p>⭐ Calidad Garantizada</p>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
