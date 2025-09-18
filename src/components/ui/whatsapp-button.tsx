"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface WhatsAppButtonProps {
  children: React.ReactNode;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "outline" | "ghost";
  className?: string;
  phoneNumber?: string;
  message?: string;
}

const WhatsAppButton = ({
  children,
  size = "md",
  variant = "default",
  className,
  phoneNumber = "51987654321", // Default number from guidelines
  message = "Hola GOXA, me interesa conocer sus productos naturales de Oxapampa. ¿Podrían enviarme el catálogo y precios?",
}: WhatsAppButtonProps) => {
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    default: "bg-[#25D366] hover:bg-[#128C7E] text-white",
    outline: "border-2 border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white",
    ghost: "text-[#25D366] hover:bg-[#25D366]/10",
  };

  return (
    <Button
      asChild
      className={cn(
        "font-poppins font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="w-4 h-4 mr-2" />
        {children}
      </a>
    </Button>
  );
};

// Sticky WhatsApp button for mobile
export const StickyWhatsAppButton = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 md:hidden">
      <WhatsAppButton size="lg" className="rounded-full shadow-2xl">
        Comprar por WhatsApp
      </WhatsAppButton>
    </div>
  );
};

export default WhatsAppButton;
