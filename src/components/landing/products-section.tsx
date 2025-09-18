"use client";

import { Droplet, UtensilsCrossed, Flower, Leaf } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import WhatsAppButton from "@/components/ui/whatsapp-button";

const featuredProducts = [
  {
    id: 1,
    name: "Miel de Oxapampa",
    description: "100% natural, sin aditivos",
    icon: Droplet,
    color: "bg-amber-500",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    image: "/logo.png", // Placeholder - would be actual product image
    price: "Desde S/ 25",
  },
  {
    id: 2,
    name: "Hamburguesas Artesanales",
    description: "Preparación tradicional",
    icon: UtensilsCrossed,
    color: "bg-red-600",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    image: "/logo.png",
    price: "Desde S/ 35",
  },
  {
    id: 3,
    name: "Orquídeas Selva Central",
    description: "Cultivo responsable",
    icon: Flower,
    color: "bg-purple-500",
    bgColor: "bg-purple-50",
    textColor: "text-purple-700",
    image: "/logo.png",
    price: "Desde S/ 45",
  },
  {
    id: 4,
    name: "Chorizos para Parrilla",
    description: "Sabor auténtico",
    icon: Leaf,
    color: "bg-green-600",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    image: "/logo.png",
    price: "Desde S/ 30",
  },
];

export default function ProductsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold text-gray-900 mb-4">
            Nuestros Productos Estrella
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Descubre la calidad y sabor auténtico de nuestros productos naturales de Oxapampa
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => {
            const IconComponent = product.icon;
            return (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                <CardContent className="p-6 text-center">
                  {/* Product image placeholder */}
                  <div className="relative mb-6 overflow-hidden rounded-lg">
                    <div className={`w-full h-48 ${product.bgColor} flex items-center justify-center`}>
                      <IconComponent className={`w-16 h-16 ${product.textColor}`} />
                    </div>
                    {/* Price badge */}
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                      <span className="text-sm font-semibold text-gray-900">{product.price}</span>
                    </div>
                  </div>

                  {/* Product info */}
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-6 text-sm">
                    {product.description}
                  </p>

                  {/* WhatsApp button */}
                  <WhatsAppButton 
                    size="sm" 
                    variant="outline"
                    className="w-full"
                    message={`Hola GOXA, me interesa el ${product.name}. ¿Podrían enviarme más información y precios?`}
                  >
                    Ver en WhatsApp
                  </WhatsAppButton>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-6">
            ¿No encuentras lo que buscas? Contáctanos para más opciones
          </p>
          <WhatsAppButton size="md" variant="outline">
            Ver Catálogo Completo
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
