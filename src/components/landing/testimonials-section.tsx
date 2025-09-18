"use client";

import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "María González",
    location: "San Isidro, Lima",
    rating: 5,
    text: "La miel de GOXA es increíble, nunca había probado algo tan puro. El envío fue súper rápido y la atención al cliente excelente.",
    avatar: "MG",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    location: "Miraflores, Lima",
    rating: 5,
    text: "Las hamburguesas artesanales son deliciosas. Mi familia las adora y siempre pedimos más. La calidad es excepcional.",
    avatar: "CM",
  },
  {
    id: 3,
    name: "Ana Rodríguez",
    location: "La Molina, Lima",
    rating: 5,
    text: "Las orquídeas llegaron perfectas y hermosas. El cuidado en el empaque y la frescura de los productos es impresionante.",
    avatar: "AR",
  },
  {
    id: 4,
    name: "Roberto Silva",
    location: "Surco, Lima",
    rating: 5,
    text: "Los chorizos para parrilla son auténticos. Sabor único que nos recuerda a Oxapampa. Definitivamente volveremos a pedir.",
    avatar: "RS",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Testimonios reales de clientes satisfechos con nuestros productos
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardContent className="p-6">
                {/* Quote icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-whatsapp rounded-full flex items-center justify-center">
                    <Quote className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Rating */}
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial text */}
                <blockquote className="text-gray-700 text-center mb-6 leading-relaxed">
                  "{testimonial.text}"
                </blockquote>

                {/* Customer info */}
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-semibold text-lg mx-auto mb-3">
                    {testimonial.avatar}
                  </div>
                  <h4 className="font-poppins font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {testimonial.location}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg">
            <h3 className="text-2xl md:text-3xl font-poppins font-bold text-gray-900 mb-4">
              ¿Listo para ser nuestro próximo cliente satisfecho?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Únete a cientos de clientes que ya disfrutan de nuestros productos naturales de Oxapampa
            </p>
            
            {/* Average rating display */}
            <div className="flex items-center justify-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-lg font-semibold text-gray-900">4.9/5</span>
              <span className="text-gray-500">(500+ reseñas)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
