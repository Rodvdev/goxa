"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Download, Eye, Calendar, User, Building, Target, Palette, Settings, ShoppingCart, Camera, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface ClientePreferencias {
  id: string;
  createdAt: string;
  updatedAt: string;
  nombreCliente: string;
  emailCliente: string;
  telefonoCliente?: string;
  empresa?: string;
  cargo?: string;
  tipoNegocio?: string;
  tamanioEmpresa?: string;
  anosExperiencia?: number;
  ubicacion?: string;
  objetivoPrincipal?: string;
  publicoObjetivo?: string;
  presupuestoAproximado?: string;
  estiloVisual?: string;
  coloresPreferidos?: string;
  tonoComunicacion?: string;
  necesitaEcommerce: boolean;
  necesitaCarrito: boolean;
  necesitaPagos: boolean;
  necesitaInventario: boolean;
  necesitaCRM: boolean;
  necesitaWhatsapp: boolean;
  necesitaSEO: boolean;
  necesitaResponsive: boolean;
  cantidadProductos?: number;
  categoriasProductos?: string;
  necesitaCatalogo: boolean;
  necesitaFiltros: boolean;
  necesitaBusqueda: boolean;
  tieneLogo: boolean;
  tieneImagenes: boolean;
  necesitaFotografia: boolean;
  necesitaCopywriting: boolean;
  palabrasClave?: string;
  competidores?: string;
  necesitaGoogleAds: boolean;
  necesitaFacebookAds: boolean;
  presupuestoDiseno?: string;
  presupuestoDesarrollo?: string;
  presupuestoMarketing?: string;
  fechaLanzamiento?: string;
  urgencia?: string;
  comentariosAdicionales?: string;
  completado: boolean;
  fechaCompletado?: string;
  versionFormulario: string;
}

export default function DeveloperPreferencesPage() {
  const [preferencias, setPreferencias] = useState<ClientePreferencias[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPreferencia, setSelectedPreferencia] = useState<ClientePreferencias | null>(null);

  useEffect(() => {
    fetchPreferencias();
  }, []);

  const fetchPreferencias = async () => {
    try {
      const response = await fetch('/api/client-preferences');
      if (response.ok) {
        const data = await response.json();
        setPreferencias(data);
      }
    } catch (error) {
      console.error('Error al cargar preferencias:', error);
      toast.error('Error al cargar las preferencias');
    } finally {
      setLoading(false);
    }
  };

  const downloadPreferencia = (preferencia: ClientePreferencias) => {
    const dataStr = JSON.stringify(preferencia, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `goxa-preferencias-${preferencia.nombreCliente}-${new Date(preferencia.createdAt).toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getUrgenciaColor = (urgencia?: string) => {
    switch (urgencia) {
      case 'critica': return 'bg-red-100 text-red-800';
      case 'alta': return 'bg-orange-100 text-orange-800';
      case 'media': return 'bg-yellow-100 text-yellow-800';
      case 'baja': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPresupuestoColor = (presupuesto?: string) => {
    switch (presupuesto) {
      case 'mas_30000': return 'bg-purple-100 text-purple-800';
      case '15000_30000': return 'bg-blue-100 text-blue-800';
      case '5000_15000': return 'bg-green-100 text-green-800';
      case 'menos_5000': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando preferencias...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Preferencias de Clientes - GOXA</h1>
        <p className="text-gray-600">Panel de desarrollador para revisar las preferencias de los clientes</p>
      </div>

      {preferencias.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">No hay preferencias guardadas aún.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Lista de Preferencias */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Lista de Preferencias ({preferencias.length})</h2>
            {preferencias.map((pref) => (
              <Card 
                key={pref.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedPreferencia?.id === pref.id ? 'ring-2 ring-blue-500' : ''
                }`}
                onClick={() => setSelectedPreferencia(pref)}
              >
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{pref.nombreCliente}</CardTitle>
                      <CardDescription>{pref.empresa || 'Sin empresa'}</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getUrgenciaColor(pref.urgencia)}>
                        {pref.urgencia || 'Sin urgencia'}
                      </Badge>
                      <Badge className={getPresupuestoColor(pref.presupuestoAproximado)}>
                        {pref.presupuestoAproximado || 'Sin presupuesto'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(pref.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPreferencia(pref);
                        }}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadPreferencia(pref);
                        }}
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Detalles de la Preferencia Seleccionada */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Detalles</h2>
            {selectedPreferencia ? (
              <div className="space-y-6">
                {/* Información Básica */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Información Básica
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div><strong>Nombre:</strong> {selectedPreferencia.nombreCliente}</div>
                    <div><strong>Email:</strong> {selectedPreferencia.emailCliente}</div>
                    <div><strong>Teléfono:</strong> {selectedPreferencia.telefonoCliente || 'No especificado'}</div>
                    <div><strong>Empresa:</strong> {selectedPreferencia.empresa || 'No especificado'}</div>
                    <div><strong>Cargo:</strong> {selectedPreferencia.cargo || 'No especificado'}</div>
                  </CardContent>
                </Card>

                {/* Información del Negocio */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      Información del Negocio
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div><strong>Tipo de Negocio:</strong> {selectedPreferencia.tipoNegocio || 'No especificado'}</div>
                    <div><strong>Tamaño:</strong> {selectedPreferencia.tamanioEmpresa || 'No especificado'}</div>
                    <div><strong>Años de Experiencia:</strong> {selectedPreferencia.anosExperiencia || 'No especificado'}</div>
                    <div><strong>Ubicación:</strong> {selectedPreferencia.ubicacion || 'No especificado'}</div>
                  </CardContent>
                </Card>

                {/* Objetivos */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Objetivos del Sitio Web
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div><strong>Objetivo Principal:</strong> {selectedPreferencia.objetivoPrincipal || 'No especificado'}</div>
                    <div><strong>Público Objetivo:</strong> {selectedPreferencia.publicoObjetivo || 'No especificado'}</div>
                    <div><strong>Presupuesto:</strong> {selectedPreferencia.presupuestoAproximado || 'No especificado'}</div>
                  </CardContent>
                </Card>

                {/* Preferencias de Diseño */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Preferencias de Diseño
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div><strong>Estilo Visual:</strong> {selectedPreferencia.estiloVisual || 'No especificado'}</div>
                    <div><strong>Tono de Comunicación:</strong> {selectedPreferencia.tonoComunicacion || 'No especificado'}</div>
                    <div><strong>Colores Preferidos:</strong> {
                      selectedPreferencia.coloresPreferidos 
                        ? JSON.parse(selectedPreferencia.coloresPreferidos).join(', ')
                        : 'No especificado'
                    }</div>
                  </CardContent>
                </Card>

                {/* Funcionalidades */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Funcionalidades Deseadas
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { key: 'necesitaEcommerce', label: 'E-commerce' },
                        { key: 'necesitaCarrito', label: 'Carrito' },
                        { key: 'necesitaPagos', label: 'Pagos' },
                        { key: 'necesitaInventario', label: 'Inventario' },
                        { key: 'necesitaCRM', label: 'CRM' },
                        { key: 'necesitaWhatsapp', label: 'WhatsApp' },
                        { key: 'necesitaSEO', label: 'SEO' },
                        { key: 'necesitaResponsive', label: 'Responsive' }
                      ].map((feature) => (
                        <div key={feature.key} className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            selectedPreferencia[feature.key as keyof ClientePreferencias] ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                          <span className="text-sm">{feature.label}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Productos */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ShoppingCart className="w-5 h-5" />
                      Productos y Contenido
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div><strong>Cantidad de Productos:</strong> {selectedPreferencia.cantidadProductos || 'No especificado'}</div>
                    <div><strong>Categorías:</strong> {
                      selectedPreferencia.categoriasProductos 
                        ? JSON.parse(selectedPreferencia.categoriasProductos).join(', ')
                        : 'No especificado'
                    }</div>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {[
                        { key: 'necesitaCatalogo', label: 'Catálogo' },
                        { key: 'necesitaFiltros', label: 'Filtros' },
                        { key: 'necesitaBusqueda', label: 'Búsqueda' },
                        { key: 'tieneLogo', label: 'Tiene Logo' },
                        { key: 'tieneImagenes', label: 'Tiene Imágenes' },
                        { key: 'necesitaFotografia', label: 'Necesita Fotografía' }
                      ].map((feature) => (
                        <div key={feature.key} className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            selectedPreferencia[feature.key as keyof ClientePreferencias] ? 'bg-green-500' : 'bg-gray-300'
                          }`}></div>
                          <span className="text-sm">{feature.label}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Presupuesto y Plazos */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="w-5 h-5" />
                      Presupuesto y Plazos
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div><strong>Presupuesto Diseño:</strong> {selectedPreferencia.presupuestoDiseno || 'No especificado'}</div>
                    <div><strong>Presupuesto Desarrollo:</strong> {selectedPreferencia.presupuestoDesarrollo || 'No especificado'}</div>
                    <div><strong>Presupuesto Marketing:</strong> {selectedPreferencia.presupuestoMarketing || 'No especificado'}</div>
                    <div><strong>Fecha de Lanzamiento:</strong> {
                      selectedPreferencia.fechaLanzamiento 
                        ? new Date(selectedPreferencia.fechaLanzamiento).toLocaleDateString()
                        : 'No especificado'
                    }</div>
                    <div><strong>Urgencia:</strong> {selectedPreferencia.urgencia || 'No especificado'}</div>
                  </CardContent>
                </Card>

                {/* Comentarios Adicionales */}
                {selectedPreferencia.comentariosAdicionales && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Comentarios Adicionales</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700">{selectedPreferencia.comentariosAdicionales}</p>
                    </CardContent>
                  </Card>
                )}

                {/* Botón de Descarga */}
                <div className="flex justify-center">
                  <Button onClick={() => downloadPreferencia(selectedPreferencia)}>
                    <Download className="w-4 h-4 mr-2" />
                    Descargar Preferencias Completas
                  </Button>
                </div>
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-gray-500">Selecciona una preferencia para ver los detalles</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
