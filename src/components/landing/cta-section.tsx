"use client";

import { MessageCircle, Clock, Truck, Star } from "lucide-react";
import WhatsAppButton from "@/components/ui/whatsapp-button";

export default function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-500 via-green-500 to-whatsapp">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main CTA */}
          <h2 className="text-4xl md:text-6xl font-poppins font-bold text-white mb-6">
            ¿Listo para probar nuestros productos?
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            Contáctanos ahora y recibe tu pedido en 24-48 horas
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <WhatsAppButton 
              size="lg" 
              className="text-xl px-8 py-4 rounded-full shadow-2xl bg-white text-whatsapp hover:bg-gray-50"
            >
              <MessageCircle className="w-6 h-6 mr-3" />
              Comprar por WhatsApp
            </WhatsAppButton>
            
            <WhatsAppButton 
              size="lg" 
              variant="outline"
              className="text-xl px-8 py-4 rounded-full shadow-2xl border-2 border-white text-white hover:bg-white hover:text-whatsapp"
            >
              Ver Catálogo Completo
            </WhatsAppButton>
          </div>

          {/* Urgency elements */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Clock className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Stock limitado</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Truck className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Envío gratis hoy</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <Star className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Calidad garantizada</span>
            </div>
          </div>

          {/* Trust elements */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
            <h3 className="text-2xl font-poppins font-bold text-white mb-4">
              ¿Por qué confiar en GOXA?
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-white/90">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">500+</div>
                <div className="text-sm">Clientes satisfechos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">4.9/5</div>
                <div className="text-sm">Calificación promedio</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">24-48h</div>
                <div className="text-sm">Tiempo de entrega</div>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="mt-12 text-white/80">
            <p className="mb-2">📱 WhatsApp: +51 987 654 321</p>
            <p className="mb-2">📧 Email: contacto@goxa.pe</p>
            <p>📍 Lima, Perú | Oxapampa, Pasco</p>
          </div>
        </div>
      </div>
    </section>
  );
}
