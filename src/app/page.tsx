"use client";

import HeroSection from "@/components/landing/hero-section";
import ProductsSection from "@/components/landing/products-section";
import BenefitsSection from "@/components/landing/benefits-section";
import TestimonialsSection from "@/components/landing/testimonials-section";
import ProcessSection from "@/components/landing/process-section";
import CTASection from "@/components/landing/cta-section";
import { StickyWhatsAppButton } from "@/components/ui/whatsapp-button";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <HeroSection />
      
      {/* Products Section */}
      <ProductsSection />
      
      {/* Benefits Section */}
      <BenefitsSection />
      
      {/* Testimonials Section */}
      <TestimonialsSection />
      
      {/* Process Section */}
      <ProcessSection />
      
      {/* Final CTA Section */}
      <CTASection />
      
      {/* Sticky WhatsApp Button for Mobile */}
      <StickyWhatsAppButton />
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-poppins font-bold mb-4">GOXA</h3>
            <p className="text-gray-300 mb-4">
              Productos naturales y gourmet de Oxapampa
            </p>
            <div className="flex justify-center gap-4 text-sm text-gray-400">
              <span>📱 WhatsApp: +51 987 654 321</span>
              <span>📧 contacto@goxa.pe</span>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} GOXA. Todos los derechos reservados.
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Lima, Perú | Oxapampa, Pasco
            </p>
            <p className="text-gray-500 text-xs mt-2">
              Desarrollado por{" "}
              <a 
                href="https://rodrigovdev.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                VdeV Digital Solutions
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
