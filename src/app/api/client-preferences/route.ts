import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

// Schema de validación para las preferencias del cliente
const ClientePreferenciasSchema = z.object({
  // Información Básica
  nombreCliente: z.string().min(1, 'Nombre es requerido'),
  emailCliente: z.string().email('Email inválido'),
  telefonoCliente: z.string().optional(),
  empresa: z.string().optional(),
  cargo: z.string().optional(),
  
  // Información del Negocio
  tipoNegocio: z.string().optional(),
  tamanioEmpresa: z.string().optional(),
  anosExperiencia: z.number().optional(),
  ubicacion: z.string().optional(),
  
  // Objetivos del Sitio Web
  objetivoPrincipal: z.string().optional(),
  publicoObjetivo: z.string().optional(),
  presupuestoAproximado: z.string().optional(),
  
  // Preferencias de Diseño
  estiloVisual: z.string().optional(),
  coloresPreferidos: z.array(z.string()).optional(),
  tonoComunicacion: z.string().optional(),
  
  // Funcionalidades
  necesitaEcommerce: z.boolean().optional(),
  necesitaCarrito: z.boolean().optional(),
  necesitaPagos: z.boolean().optional(),
  necesitaInventario: z.boolean().optional(),
  necesitaCRM: z.boolean().optional(),
  necesitaWhatsapp: z.boolean().optional(),
  necesitaSEO: z.boolean().optional(),
  necesitaResponsive: z.boolean().optional(),
  
  // Productos
  cantidadProductos: z.number().optional(),
  categoriasProductos: z.array(z.string()).optional(),
  necesitaCatalogo: z.boolean().optional(),
  necesitaFiltros: z.boolean().optional(),
  necesitaBusqueda: z.boolean().optional(),
  
  // Contenido
  tieneLogo: z.boolean().optional(),
  tieneImagenes: z.boolean().optional(),
  necesitaFotografia: z.boolean().optional(),
  necesitaCopywriting: z.boolean().optional(),
  
  // Marketing
  palabrasClave: z.array(z.string()).optional(),
  competidores: z.array(z.string()).optional(),
  necesitaGoogleAds: z.boolean().optional(),
  necesitaFacebookAds: z.boolean().optional(),
  
  // Presupuesto
  presupuestoDiseno: z.string().optional(),
  presupuestoDesarrollo: z.string().optional(),
  presupuestoMarketing: z.string().optional(),
  
  // Plazos
  fechaLanzamiento: z.string().optional(),
  urgencia: z.string().optional(),
  comentariosAdicionales: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar los datos
    const validationResult = ClientePreferenciasSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          message: 'Datos inválidos', 
          errors: validationResult.error.flatten().fieldErrors 
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // Crear el registro en la base de datos
    const preferencias = await prisma.clientePreferencias.create({
      data: {
        // Información Básica
        nombreCliente: data.nombreCliente,
        emailCliente: data.emailCliente,
        telefonoCliente: data.telefonoCliente,
        empresa: data.empresa,
        cargo: data.cargo,
        
        // Información del Negocio
        tipoNegocio: data.tipoNegocio,
        tamanioEmpresa: data.tamanioEmpresa,
        anosExperiencia: data.anosExperiencia,
        ubicacion: data.ubicacion,
        
        // Objetivos del Sitio Web
        objetivoPrincipal: data.objetivoPrincipal,
        publicoObjetivo: data.publicoObjetivo,
        presupuestoAproximado: data.presupuestoAproximado,
        
        // Preferencias de Diseño
        estiloVisual: data.estiloVisual,
        coloresPreferidos: data.coloresPreferidos ? JSON.stringify(data.coloresPreferidos) : null,
        tonoComunicacion: data.tonoComunicacion,
        
        // Funcionalidades
        necesitaEcommerce: data.necesitaEcommerce || false,
        necesitaCarrito: data.necesitaCarrito || false,
        necesitaPagos: data.necesitaPagos || false,
        necesitaInventario: data.necesitaInventario || false,
        necesitaCRM: data.necesitaCRM || false,
        necesitaWhatsapp: data.necesitaWhatsapp || false,
        necesitaSEO: data.necesitaSEO || false,
        necesitaResponsive: data.necesitaResponsive || true,
        
        // Productos
        cantidadProductos: data.cantidadProductos,
        categoriasProductos: data.categoriasProductos ? JSON.stringify(data.categoriasProductos) : null,
        necesitaCatalogo: data.necesitaCatalogo || false,
        necesitaFiltros: data.necesitaFiltros || false,
        necesitaBusqueda: data.necesitaBusqueda || false,
        
        // Contenido
        tieneLogo: data.tieneLogo || false,
        tieneImagenes: data.tieneImagenes || false,
        necesitaFotografia: data.necesitaFotografia || false,
        necesitaCopywriting: data.necesitaCopywriting || false,
        
        // Marketing
        palabrasClave: data.palabrasClave ? JSON.stringify(data.palabrasClave) : null,
        competidores: data.competidores ? JSON.stringify(data.competidores) : null,
        necesitaGoogleAds: data.necesitaGoogleAds || false,
        necesitaFacebookAds: data.necesitaFacebookAds || false,
        
        // Presupuesto
        presupuestoDiseno: data.presupuestoDiseno,
        presupuestoDesarrollo: data.presupuestoDesarrollo,
        presupuestoMarketing: data.presupuestoMarketing,
        
        // Plazos
        fechaLanzamiento: data.fechaLanzamiento ? new Date(data.fechaLanzamiento) : null,
        urgencia: data.urgencia,
        comentariosAdicionales: data.comentariosAdicionales,
        
        // Estado
        completado: true,
        fechaCompletado: new Date(),
      },
    });

    return NextResponse.json(
      { 
        message: 'Preferencias guardadas exitosamente',
        id: preferencias.id 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error al guardar preferencias:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const preferencias = await prisma.clientePreferencias.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10, // Últimas 10 preferencias
    });

    return NextResponse.json(preferencias);
  } catch (error) {
    console.error('Error al obtener preferencias:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
