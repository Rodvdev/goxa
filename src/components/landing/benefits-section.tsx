"use client";

import { 
  Droplet, 
  Truck, 
  Shield, 
  MapPin, 
  MessageCircle, 
  RefreshCw 
} from "lucide-react";

const benefits = [
  {
    icon: Droplet,
    title: "Productos 100% Naturales",
    description: "Sin conservantes ni aditivos artificiales",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    icon: Truck,
    title: "Envío Gratis a Lima",
    description: "Entregamos directamente a tu domicilio",
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    icon: Shield,
    title: "Calidad Garantizada",
    description: "Productos frescos y de la más alta calidad",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    icon: MapPin,
    title: "Origen Oxapampa",
    description: "Directamente de la Selva Central del Perú",
    color: "text-green-700",
    bgColor: "bg-green-100",
  },
  {
    icon: MessageCircle,
    title: "Atención Personalizada",
    description: "Asesoría directa por WhatsApp",
    color: "text-whatsapp",
    bgColor: "bg-green-100",
  },
  {
    icon: RefreshCw,
    title: "Frescos Semanalmente",
    description: "Productos frescos cada semana",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
];

export default function BenefitsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
            ¿Por qué elegir GOXA?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nos comprometemos a ofrecerte los mejores productos naturales con la calidad y frescura que mereces
          </p>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon;
            return (
              <div 
                key={index}
                className="group p-8 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all duration-300 text-center"
              >
                {/* Icon */}
                <div className={`w-16 h-16 ${benefit.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`w-8 h-8 ${benefit.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom section with additional trust elements */}
        <div className="mt-20 text-center">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-poppins font-bold text-gray-900 mb-4">
              Más de 500 clientes satisfechos
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Únete a nuestra comunidad de amantes de los productos naturales y gourmet
            </p>
            
            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-4">
              <div className="trust-badge">
                <Shield className="w-4 h-4 mr-2" />
                Envío Seguro
              </div>
              <div className="trust-badge">
                <MessageCircle className="w-4 h-4 mr-2" />
                Pago Protegido
              </div>
              <div className="trust-badge">
                <RefreshCw className="w-4 h-4 mr-2" />
                Garantía de Calidad
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
