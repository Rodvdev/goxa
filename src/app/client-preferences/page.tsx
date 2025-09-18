"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, Save, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface FormData {
  // Información Básica
  nombreCliente: string;
  emailCliente: string;
  telefonoCliente: string;
  empresa: string;
  cargo: string;
  
  // Información del Negocio
  tipoNegocio: string;
  tamanioEmpresa: string;
  anosExperiencia: number | string;
  ubicacion: string;
  
  // Objetivos del Sitio Web
  objetivoPrincipal: string;
  publicoObjetivo: string;
  presupuestoAproximado: string;
  
  // Preferencias de Diseño
  estiloVisual: string;
  coloresPreferidos: string[];
  tonoComunicacion: string;
  
  // Funcionalidades
  necesitaEcommerce: boolean;
  necesitaCarrito: boolean;
  necesitaPagos: boolean;
  necesitaInventario: boolean;
  necesitaCRM: boolean;
  necesitaWhatsapp: boolean;
  necesitaSEO: boolean;
  necesitaResponsive: boolean;
  
  // Productos
  cantidadProductos: number | string;
  categoriasProductos: string[];
  necesitaCatalogo: boolean;
  necesitaFiltros: boolean;
  necesitaBusqueda: boolean;
  
  // Contenido
  tieneLogo: boolean;
  tieneImagenes: boolean;
  necesitaFotografia: boolean;
  necesitaCopywriting: boolean;
  
  // Marketing
  palabrasClave: string[];
  competidores: string[];
  necesitaGoogleAds: boolean;
  necesitaFacebookAds: boolean;
  
  // Presupuesto
  presupuestoDiseno: string;
  presupuestoDesarrollo: string;
  presupuestoMarketing: string;
  
  // Plazos
  fechaLanzamiento: string;
  urgencia: string;
  comentariosAdicionales: string;
}

const initialFormData: FormData = {
  nombreCliente: "",
  emailCliente: "",
  telefonoCliente: "",
  empresa: "",
  cargo: "",
  tipoNegocio: "",
  tamanioEmpresa: "",
  anosExperiencia: "",
  ubicacion: "",
  objetivoPrincipal: "",
  publicoObjetivo: "",
  presupuestoAproximado: "",
  estiloVisual: "",
  coloresPreferidos: [],
  tonoComunicacion: "",
  necesitaEcommerce: false,
  necesitaCarrito: false,
  necesitaPagos: false,
  necesitaInventario: false,
  necesitaCRM: false,
  necesitaWhatsapp: false,
  necesitaSEO: false,
  necesitaResponsive: true,
  cantidadProductos: "",
  categoriasProductos: [],
  necesitaCatalogo: false,
  necesitaFiltros: false,
  necesitaBusqueda: false,
  tieneLogo: false,
  tieneImagenes: false,
  necesitaFotografia: false,
  necesitaCopywriting: false,
  palabrasClave: [],
  competidores: [],
  necesitaGoogleAds: false,
  necesitaFacebookAds: false,
  presupuestoDiseno: "",
  presupuestoDesarrollo: "",
  presupuestoMarketing: "",
  fechaLanzamiento: "",
  urgencia: "",
  comentariosAdicionales: ""
};

const stepTitles = [
  "Información Básica",
  "Información del Negocio", 
  "Objetivos del Sitio Web",
  "Preferencias de Diseño",
  "Funcionalidades Deseadas",
  "Productos y Contenido",
  "Marketing y SEO",
  "Presupuesto y Plazos",
  "Información Adicional"
];

export default function ClientPreferencesForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < stepTitles.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/client-preferences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Error al guardar las preferencias');
      }

      const result = await response.json();
      setIsCompleted(true);
      toast.success("Preferencias guardadas exitosamente");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Error al guardar las preferencias");
    } finally {
      setIsSubmitting(false);
    }
  };

  const downloadResults = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `goxa-preferencias-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return renderBasicInfo();
      case 1:
        return renderBusinessInfo();
      case 2:
        return renderObjectives();
      case 3:
        return renderDesignPreferences();
      case 4:
        return renderFeatures();
      case 5:
        return renderProducts();
      case 6:
        return renderMarketing();
      case 7:
        return renderBudget();
      case 8:
        return renderAdditional();
      default:
        return null;
    }
  };

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="nombreCliente">Nombre del Cliente *</Label>
          <Input
            id="nombreCliente"
            value={formData.nombreCliente}
            onChange={(e) => updateFormData("nombreCliente", e.target.value)}
            placeholder="Tu nombre completo"
          />
        </div>
        <div>
          <Label htmlFor="emailCliente">Email *</Label>
          <Input
            id="emailCliente"
            type="email"
            value={formData.emailCliente}
            onChange={(e) => updateFormData("emailCliente", e.target.value)}
            placeholder="tu@email.com"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="telefonoCliente">Teléfono</Label>
          <Input
            id="telefonoCliente"
            value={formData.telefonoCliente}
            onChange={(e) => updateFormData("telefonoCliente", e.target.value)}
            placeholder="+51 999 999 999"
          />
        </div>
        <div>
          <Label htmlFor="empresa">Empresa</Label>
          <Input
            id="empresa"
            value={formData.empresa}
            onChange={(e) => updateFormData("empresa", e.target.value)}
            placeholder="Nombre de tu empresa"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="cargo">Cargo</Label>
        <Input
          id="cargo"
          value={formData.cargo}
          onChange={(e) => updateFormData("cargo", e.target.value)}
          placeholder="Tu cargo en la empresa"
        />
      </div>
    </div>
  );

  const renderBusinessInfo = () => (
    <div className="space-y-6">
      <div>
        <Label>Tipo de Negocio</Label>
        <Select value={formData.tipoNegocio} onValueChange={(value) => updateFormData("tipoNegocio", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona el tipo de negocio" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="productos_naturales">Productos Naturales</SelectItem>
            <SelectItem value="ecommerce">E-commerce General</SelectItem>
            <SelectItem value="restaurante">Restaurante/Comida</SelectItem>
            <SelectItem value="distribuidor">Distribuidor</SelectItem>
            <SelectItem value="servicios">Servicios</SelectItem>
            <SelectItem value="otro">Otro</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label>Tamaño de la Empresa</Label>
          <Select value={formData.tamanioEmpresa} onValueChange={(value) => updateFormData("tamanioEmpresa", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona el tamaño" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pequena">Pequeña (1-10 empleados)</SelectItem>
              <SelectItem value="mediana">Mediana (11-50 empleados)</SelectItem>
              <SelectItem value="grande">Grande (50+ empleados)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="anosExperiencia">Años de Experiencia</Label>
          <Input
            id="anosExperiencia"
            type="number"
            value={formData.anosExperiencia}
            onChange={(e) => updateFormData("anosExperiencia", parseInt(e.target.value) || "")}
            placeholder="Años en el negocio"
          />
        </div>
      </div>
      
      <div>
        <Label htmlFor="ubicacion">Ubicación</Label>
        <Input
          id="ubicacion"
          value={formData.ubicacion}
          onChange={(e) => updateFormData("ubicacion", e.target.value)}
          placeholder="Ciudad, Región"
        />
      </div>
    </div>
  );

  const renderObjectives = () => (
    <div className="space-y-6">
      <div>
        <Label>Objetivo Principal del Sitio Web</Label>
        <Select value={formData.objetivoPrincipal} onValueChange={(value) => updateFormData("objetivoPrincipal", value)}>
          <SelectTrigger>
            <SelectValue placeholder="¿Cuál es tu principal objetivo?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ventas_online">Ventas Online</SelectItem>
            <SelectItem value="mostrar_productos">Mostrar Productos</SelectItem>
            <SelectItem value="generar_leads">Generar Leads</SelectItem>
            <SelectItem value="branding">Branding/Imagen</SelectItem>
            <SelectItem value="informacion">Información Corporativa</SelectItem>
            <SelectItem value="contacto">Generar Contactos</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Público Objetivo</Label>
        <Select value={formData.publicoObjetivo} onValueChange={(value) => updateFormData("publicoObjetivo", value)}>
          <SelectTrigger>
            <SelectValue placeholder="¿A quién te diriges?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="consumidores_finales">Consumidores Finales (B2C)</SelectItem>
            <SelectItem value="mayoristas">Mayoristas/Distribuidores (B2B)</SelectItem>
            <SelectItem value="restaurantes">Restaurantes/Hoteles</SelectItem>
            <SelectItem value="todos">Todos los Públicos</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Presupuesto Aproximado para el Proyecto</Label>
        <Select value={formData.presupuestoAproximado} onValueChange={(value) => updateFormData("presupuestoAproximado", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Selecciona tu rango de presupuesto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="menos_5000">Menos de $5,000</SelectItem>
            <SelectItem value="5000_15000">$5,000 - $15,000</SelectItem>
            <SelectItem value="15000_30000">$15,000 - $30,000</SelectItem>
            <SelectItem value="mas_30000">Más de $30,000</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const renderDesignPreferences = () => (
    <div className="space-y-6">
      <div>
        <Label>Estilo Visual Preferido</Label>
        <Select value={formData.estiloVisual} onValueChange={(value) => updateFormData("estiloVisual", value)}>
          <SelectTrigger>
            <SelectValue placeholder="¿Qué estilo prefieres?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="moderno">Moderno/Minimalista</SelectItem>
            <SelectItem value="tradicional">Tradicional/Clásico</SelectItem>
            <SelectItem value="colorido">Colorido/Vibrante</SelectItem>
            <SelectItem value="elegante">Elegante/Sofisticado</SelectItem>
            <SelectItem value="natural">Natural/Orgánico</SelectItem>
            <SelectItem value="industrial">Industrial/Urban</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label>Tono de Comunicación</Label>
        <Select value={formData.tonoComunicacion} onValueChange={(value) => updateFormData("tonoComunicacion", value)}>
          <SelectTrigger>
            <SelectValue placeholder="¿Cómo quieres comunicarte?" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="formal">Formal/Profesional</SelectItem>
            <SelectItem value="casual">Casual/Relajado</SelectItem>
            <SelectItem value="amigable">Amigable/Cercano</SelectItem>
            <SelectItem value="autoridad">Autoridad/Experto</SelectItem>
            <SelectItem value="inspirador">Inspirador/Motivador</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="space-y-2">
          <Label className="text-sm">Colores Preferidos</Label>
          {["Verde", "Azul", "Naranja", "Rojo", "Morado", "Negro", "Gris"].map((color) => (
            <div key={color} className="flex items-center space-x-2">
              <Checkbox
                id={`color-${color}`}
                checked={formData.coloresPreferidos.includes(color)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFormData("coloresPreferidos", [...formData.coloresPreferidos, color]);
                  } else {
                    updateFormData("coloresPreferidos", formData.coloresPreferidos.filter(c => c !== color));
                  }
                }}
              />
              <Label htmlFor={`color-${color}`} className="text-sm">{color}</Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFeatures = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: "necesitaEcommerce", label: "E-commerce / Tienda Online", description: "Venta de productos online" },
          { key: "necesitaCarrito", label: "Carrito de Compras", description: "Gestión de productos seleccionados" },
          { key: "necesitaPagos", label: "Sistema de Pagos", description: "Procesamiento de pagos online" },
          { key: "necesitaInventario", label: "Control de Inventario", description: "Gestión de stock en tiempo real" },
          { key: "necesitaCRM", label: "CRM / Gestión de Clientes", description: "Seguimiento de clientes y ventas" },
          { key: "necesitaWhatsapp", label: "Integración WhatsApp", description: "Botón de contacto directo" },
          { key: "necesitaSEO", label: "SEO Optimizado", description: "Posicionamiento en buscadores" },
          { key: "necesitaResponsive", label: "Responsive Design", description: "Adaptable a móviles y tablets" }
        ].map((feature) => (
          <div key={feature.key} className="flex items-start space-x-3 p-3 border rounded-lg">
            <Checkbox
              id={feature.key}
              checked={formData[feature.key as keyof FormData] as boolean}
              onCheckedChange={(checked) => updateFormData(feature.key as keyof FormData, checked)}
            />
            <div className="space-y-1">
              <Label htmlFor={feature.key} className="font-medium">{feature.label}</Label>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="cantidadProductos">Cantidad Aproximada de Productos</Label>
        <Input
          id="cantidadProductos"
          type="number"
          value={formData.cantidadProductos}
          onChange={(e) => updateFormData("cantidadProductos", parseInt(e.target.value) || "")}
          placeholder="0"
        />
      </div>
      
      <div>
        <Label>Categorías de Productos</Label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {["Mieles", "Productos Orgánicos", "Carnes y Chorizos", "Orquídeas", "Plantas", "Specials", "Nuevos", "Ofertas"].map((categoria) => (
            <div key={categoria} className="flex items-center space-x-2">
              <Checkbox
                id={`categoria-${categoria}`}
                checked={formData.categoriasProductos.includes(categoria)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    updateFormData("categoriasProductos", [...formData.categoriasProductos, categoria]);
                  } else {
                    updateFormData("categoriasProductos", formData.categoriasProductos.filter(c => c !== categoria));
                  }
                }}
              />
              <Label htmlFor={`categoria-${categoria}`} className="text-sm">{categoria}</Label>
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: "necesitaCatalogo", label: "Catálogo de Productos", description: "Página principal de productos" },
          { key: "necesitaFiltros", label: "Filtros Avanzados", description: "Filtrar por categoría, precio, etc." },
          { key: "necesitaBusqueda", label: "Búsqueda de Productos", description: "Barra de búsqueda" }
        ].map((feature) => (
          <div key={feature.key} className="flex items-start space-x-3 p-3 border rounded-lg">
            <Checkbox
              id={feature.key}
              checked={formData[feature.key as keyof FormData] as boolean}
              onCheckedChange={(checked) => updateFormData(feature.key as keyof FormData, checked)}
            />
            <div className="space-y-1">
              <Label htmlFor={feature.key} className="font-medium">{feature.label}</Label>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMarketing = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="palabrasClave">Palabras Clave (una por línea)</Label>
        <Textarea
          id="palabrasClave"
          value={formData.palabrasClave.join('\n')}
          onChange={(e) => updateFormData("palabrasClave", e.target.value.split('\n').filter(k => k.trim()))}
          placeholder="miel natural&#10;productos orgánicos&#10;oxapampa"
          rows={4}
        />
      </div>
      
      <div>
        <Label htmlFor="competidores">Competidores Principales</Label>
        <Textarea
          id="competidores"
          value={formData.competidores.join('\n')}
          onChange={(e) => updateFormData("competidores", e.target.value.split('\n').filter(c => c.trim()))}
          placeholder="Competidor 1&#10;Competidor 2&#10;..."
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: "necesitaGoogleAds", label: "Google Ads", description: "Publicidad en Google" },
          { key: "necesitaFacebookAds", label: "Facebook/Instagram Ads", description: "Publicidad en redes sociales" }
        ].map((feature) => (
          <div key={feature.key} className="flex items-start space-x-3 p-3 border rounded-lg">
            <Checkbox
              id={feature.key}
              checked={formData[feature.key as keyof FormData] as boolean}
              onCheckedChange={(checked) => updateFormData(feature.key as keyof FormData, checked)}
            />
            <div className="space-y-1">
              <Label htmlFor={feature.key} className="font-medium">{feature.label}</Label>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBudget = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label>Presupuesto para Diseño</Label>
          <Select value={formData.presupuestoDiseno} onValueChange={(value) => updateFormData("presupuestoDiseno", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Presupuesto diseño" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="menos_2000">Menos de $2,000</SelectItem>
              <SelectItem value="2000_5000">$2,000 - $5,000</SelectItem>
              <SelectItem value="5000_10000">$5,000 - $10,000</SelectItem>
              <SelectItem value="mas_10000">Más de $10,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Presupuesto para Desarrollo</Label>
          <Select value={formData.presupuestoDesarrollo} onValueChange={(value) => updateFormData("presupuestoDesarrollo", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Presupuesto desarrollo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="menos_5000">Menos de $5,000</SelectItem>
              <SelectItem value="5000_15000">$5,000 - $15,000</SelectItem>
              <SelectItem value="15000_30000">$15,000 - $30,000</SelectItem>
              <SelectItem value="mas_30000">Más de $30,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label>Presupuesto para Marketing</Label>
          <Select value={formData.presupuestoMarketing} onValueChange={(value) => updateFormData("presupuestoMarketing", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Presupuesto marketing" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="menos_1000">Menos de $1,000</SelectItem>
              <SelectItem value="1000_3000">$1,000 - $3,000</SelectItem>
              <SelectItem value="3000_5000">$3,000 - $5,000</SelectItem>
              <SelectItem value="mas_5000">Más de $5,000</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fechaLanzamiento">Fecha Deseada de Lanzamiento</Label>
          <Input
            id="fechaLanzamiento"
            type="date"
            value={formData.fechaLanzamiento}
            onChange={(e) => updateFormData("fechaLanzamiento", e.target.value)}
          />
        </div>
        
        <div>
          <Label>Urgencia del Proyecto</Label>
          <Select value={formData.urgencia} onValueChange={(value) => updateFormData("urgencia", value)}>
            <SelectTrigger>
              <SelectValue placeholder="¿Qué tan urgente es?" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="baja">Baja (Más de 6 meses)</SelectItem>
              <SelectItem value="media">Media (3-6 meses)</SelectItem>
              <SelectItem value="alta">Alta (1-3 meses)</SelectItem>
              <SelectItem value="critica">Crítica (Menos de 1 mes)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const renderAdditional = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { key: "tieneLogo", label: "Tengo Logo", description: "Ya cuentas con identidad visual" },
          { key: "tieneImagenes", label: "Tengo Imágenes", description: "Imágenes de productos disponibles" },
          { key: "necesitaFotografia", label: "Necesito Fotografía", description: "Sesión de fotos profesional" },
          { key: "necesitaCopywriting", label: "Necesito Copywriting", description: "Textos y descripciones" }
        ].map((feature) => (
          <div key={feature.key} className="flex items-start space-x-3 p-3 border rounded-lg">
            <Checkbox
              id={feature.key}
              checked={formData[feature.key as keyof FormData] as boolean}
              onCheckedChange={(checked) => updateFormData(feature.key as keyof FormData, checked)}
            />
            <div className="space-y-1">
              <Label htmlFor={feature.key} className="font-medium">{feature.label}</Label>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div>
        <Label htmlFor="comentariosAdicionales">Comentarios Adicionales</Label>
        <Textarea
          id="comentariosAdicionales"
          value={formData.comentariosAdicionales}
          onChange={(e) => updateFormData("comentariosAdicionales", e.target.value)}
          placeholder="Cualquier información adicional que consideres importante..."
          rows={6}
        />
      </div>
    </div>
  );

  if (isCompleted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl">¡Formulario Completado!</CardTitle>
            <CardDescription>
              Las preferencias han sido guardadas exitosamente. Puedes descargar el resumen para tu desarrollador.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Button onClick={downloadResults} className="w-full">
                <Download className="w-4 h-4 mr-2" />
                Descargar Resumen Completo
              </Button>
              <Button variant="outline" onClick={() => {
                setIsCompleted(false);
                setCurrentStep(0);
                setFormData(initialFormData);
              }}>
                Crear Nueva Preferencia
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Formulario de Preferencias GOXA</h1>
        <p className="text-gray-600">Completa este formulario para definir tus preferencias de desarrollo web</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progreso</span>
          <span className="text-sm text-gray-500">{currentStep + 1} de {stepTitles.length}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / stepTitles.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{stepTitles[currentStep]}</CardTitle>
          <CardDescription>
            Paso {currentStep + 1} de {stepTitles.length} - {stepTitles[currentStep]}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {renderStep()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Anterior
        </Button>

        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            <Save className="w-4 h-4 mr-2" />
            Guardar y Salir
          </Button>

          {currentStep === stepTitles.length - 1 ? (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Guardando..." : "Finalizar"}
            </Button>
          ) : (
            <Button onClick={nextStep}>
              Siguiente
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
