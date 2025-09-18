"use client";

import { MessageCircle, ShoppingCart, CreditCard, Truck } from "lucide-react";

const processSteps = [
  {
    step: 1,
    icon: MessageCircle,
    title: "Contacta por WhatsApp",
    description: "Escríbenos tu pedido",
    color: "text-whatsapp",
    bgColor: "bg-green-100",
  },
  {
    step: 2,
    icon: ShoppingCart,
    title: "Confirma tu pedido",
    description: "Te enviamos lista de precios",
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    step: 3,
    icon: CreditCard,
    title: "Paga de forma segura",
    description: "Transferencia o Yape",
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  {
    step: 4,
    icon: Truck,
    title: "Recibe en casa",
    description: "Envío gratis a Lima",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
            Cómo comprar es súper fácil
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Solo 4 simples pasos para recibir tus productos naturales de Oxapampa
          </p>
        </div>

        {/* Process steps */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={step.step} className="relative">
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 bg-whatsapp rounded-full flex items-center justify-center text-white font-bold text-sm z-10">
                    {step.step}
                  </div>

                  {/* Step card */}
                  <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 h-full hover:shadow-lg hover:border-gray-200 transition-all duration-300">
                    {/* Icon */}
                    <div className={`w-16 h-16 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6`}>
                      <IconComponent className={`w-8 h-8 ${step.color}`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3 text-center">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Arrow connector (except for last item) */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <div className="w-8 h-0.5 bg-gray-300"></div>
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-gray-300 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-amber-50 to-green-50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-poppins font-bold text-gray-900 mb-4">
              ¿Tienes dudas sobre el proceso?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Nuestro equipo está listo para ayudarte en cada paso del proceso de compra
            </p>
            
            {/* Contact info */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-gray-700">
                <MessageCircle className="w-5 h-5 text-whatsapp" />
                <span>WhatsApp: +51 987 654 321</span>
              </div>
              <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
              <div className="flex items-center gap-2 text-gray-700">
                <Truck className="w-5 h-5 text-green-600" />
                <span>Envío gratis a Lima</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
