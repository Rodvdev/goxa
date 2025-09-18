# Guías de Sitio Web - GOXA Landing Page

**Versión:** 1.0  
**Fecha:** 2024-12-19  
**Propósito:** Convertir la página principal en una landing page efectiva que redirija a WhatsApp para compras

---

## 1. Objetivo Principal

Transformar la página principal de GOXA en una **landing page de conversión** que:
- Presente los productos de manera atractiva
- Genere confianza en la marca
- Dirija efectivamente a WhatsApp para realizar compras
- Maximice las conversiones y ventas

---

## 2. Estructura de la Landing Page

### 2.1 Hero Section (Sección Principal)
**Objetivo:** Captar atención inmediata y comunicar valor

#### Elementos Requeridos:
- **Headline Principal**: "Productos Naturales y Gourmet de Oxapampa"
- **Subheadline**: "Mieles 100% naturales, carnes artesanales y orquídeas únicas"
- **CTA Principal**: Botón grande "Comprar por WhatsApp" (verde WhatsApp)
- **Imagen Hero**: Collage de productos principales o imagen de Oxapampa
- **Elementos de Confianza**: "Envíos a Lima" | "Productos Frescos" | "Calidad Garantizada"

#### Diseño:
```css
- Fondo: Gradiente sutil o imagen de fondo
- Colores: Verde WhatsApp (#25D366), naranja/ámbar para miel
- Tipografía: Poppins bold para headlines
- Altura: 100vh en móvil, 80vh en desktop
```

### 2.2 Sección de Productos Destacados
**Objetivo:** Mostrar productos principales con llamadas a la acción

#### Estructura:
- **Título**: "Nuestros Productos Estrella"
- **Grid de Productos**: 3-4 productos principales
- **Por cada producto**:
  - Imagen de alta calidad
  - Nombre del producto
  - Descripción breve (1 línea)
  - Precio (opcional)
  - Botón "Ver en WhatsApp"

#### Productos a Destacar:
1. **Miel de Oxapampa** - "100% natural, sin aditivos"
2. **Hamburguesas Artesanales** - "Preparación tradicional"
3. **Orquídeas Selva Central** - "Cultivo responsable"
4. **Chorizos para Parrilla** - "Sabor auténtico"

### 2.3 Sección de Beneficios/Valor
**Objetivo:** Construir confianza y diferenciación

#### Elementos:
- **Título**: "¿Por qué elegir GOXA?"
- **Beneficios en Grid**:
  - 🍯 **Productos 100% Naturales**
  - 🚚 **Envío Gratis a Lima**
  - ⭐ **Calidad Garantizada**
  - 🌱 **Origen Oxapampa**
  - 💬 **Atención Personalizada**
  - 🔄 **Frescos Semanalmente**

### 2.4 Sección de Testimonios
**Objetivo:** Generar confianza social

#### Estructura:
- **Título**: "Lo que dicen nuestros clientes"
- **3-4 Testimonios** con:
  - Foto del cliente (o avatar)
  - Nombre y ubicación
  - Testimonio breve
  - Calificación con estrellas

#### Ejemplo de Testimonio:
> "La miel de GOXA es increíble, nunca había probado algo tan puro. El envío fue súper rápido y la atención al cliente excelente." 
> 
> **- María G., San Isidro**

### 2.5 Sección de Proceso de Compra
**Objetivo:** Simplificar el proceso y reducir fricción

#### Pasos:
1. **📱 Contacta por WhatsApp** - "Escríbenos tu pedido"
2. **🛒 Confirma tu pedido** - "Te enviamos lista de precios"
3. **💳 Paga de forma segura** - "Transferencia o Yape"
4. **🚚 Recibe en casa** - "Envío gratis a Lima"

### 2.6 CTA Final (Call to Action)
**Objetivo:** Conversión final

#### Elementos:
- **Título**: "¿Listo para probar nuestros productos?"
- **Subtítulo**: "Contáctanos ahora y recibe tu pedido en 24-48 horas"
- **Botón Principal**: "Comprar por WhatsApp" (grande, verde)
- **Botón Secundario**: "Ver Catálogo Completo"
- **Elementos de Urgencia**: "Stock limitado" | "Envío gratis hoy"

---

## 3. Elementos de Conversión

### 3.1 Botones de WhatsApp
**Diseño Estándar:**
```css
- Color: #25D366 (verde WhatsApp oficial)
- Texto: "Comprar por WhatsApp" o "Contactar por WhatsApp"
- Icono: Logo de WhatsApp
- Tamaño: Grande y visible
- Efecto hover: Sombra y escala sutil
```

**Ubicaciones Estratégicas:**
- Hero section (principal)
- Cada producto destacado
- Sticky button (fijo en móvil)
- Footer
- Sidebar (desktop)

### 3.2 Número de WhatsApp
**Formato del Enlace:**
```
https://wa.me/51987654321?text=Hola%20GOXA%2C%20me%20interesa%20conocer%20sus%20productos
```

**Mensaje Predefinido:**
"Hola GOXA, me interesa conocer sus productos naturales de Oxapampa. ¿Podrían enviarme el catálogo y precios?"

### 3.3 Elementos de Confianza
- **Badges de Seguridad**: "Envío Seguro" | "Pago Protegido"
- **Información de Contacto**: Teléfono, email
- **Redes Sociales**: Instagram, Facebook
- **Ubicación**: "Lima, Perú" | "Oxapampa, Pasco"

---

## 4. Optimización Móvil

### 4.1 Prioridades Móviles
1. **Botón WhatsApp sticky** (fijo en la parte inferior)
2. **Imágenes optimizadas** (WebP, lazy loading)
3. **Texto legible** (mínimo 16px)
4. **Botones grandes** (mínimo 44px de altura)
5. **Navegación simple** (menos opciones)

### 4.2 Performance
- **Carga rápida**: < 3 segundos
- **Imágenes comprimidas**: WebP format
- **Lazy loading**: Para imágenes fuera del viewport
- **Minimal JavaScript**: Solo lo esencial

---

## 5. Contenido y Copywriting

### 5.1 Tono de Voz
- **Cálido y personal**: Como un amigo que recomienda
- **Confiable**: Enfocado en calidad y origen
- **Urgente pero no agresivo**: "Stock limitado" vs "¡Últimas unidades!"
- **Local**: Referencias a Lima y Oxapampa

### 5.2 Palabras Clave
- **Productos**: Natural, artesanal, fresco, puro, auténtico
- **Origen**: Oxapampa, Selva Central, Perú
- **Beneficios**: Salud, sabor, calidad, tradición
- **Acción**: Comprar, probar, contactar, pedir

### 5.3 Headlines Efectivos
- "Productos Naturales de Oxapampa Directo a tu Mesa"
- "Miel Pura, Carnes Artesanales y Orquídeas Únicas"
- "Sabor Auténtico de la Selva Central"
- "Frescos, Naturales y Deliciosos"

---

## 6. Elementos Visuales

### 6.1 Paleta de Colores
- **Primario**: Verde WhatsApp (#25D366)
- **Secundario**: Ámbar/Naranja (#F59E0B) para miel
- **Acentos**: Verde natural (#10B981), Rojo terroso (#DC2626)
- **Neutros**: Blanco, gris claro, gris oscuro

### 6.2 Tipografía
- **Headlines**: Poppins Bold (700)
- **Subtítulos**: Poppins SemiBold (600)
- **Cuerpo**: Inter Regular (400)
- **CTA**: Poppins Bold (700)

### 6.3 Imágenes
- **Estilo**: Natural, cálido, auténtico
- **Calidad**: Alta resolución, bien iluminadas
- **Composición**: Productos en contexto (mesa, cocina, naturaleza)
- **Formato**: WebP para web, JPG como fallback

---

## 7. Métricas y Objetivos

### 7.1 KPIs Principales
- **Tasa de conversión**: % de visitantes que contactan por WhatsApp
- **Tiempo en página**: Mínimo 30 segundos
- **Scroll depth**: Al menos 75% de la página
- **Click-through rate**: Botones de WhatsApp

### 7.2 Objetivos Mensuales
- **Visitas**: 1,000+ visitantes únicos
- **Conversiones**: 50+ contactos por WhatsApp
- **Ventas**: 20+ pedidos completados
- **ROI**: 300%+ en marketing digital

---

## 8. Implementación Técnica

### 8.1 Componentes React Necesarios
```typescript
// Componentes principales
- HeroSection
- ProductShowcase
- BenefitsSection
- TestimonialsSection
- ProcessSection
- CTASection
- WhatsAppButton (sticky)
- TrustBadges
```

### 8.2 Optimizaciones SEO
- **Meta tags**: Título, descripción, keywords
- **Open Graph**: Para compartir en redes sociales
- **Schema markup**: Para productos y organización
- **Sitemap**: Para indexación

### 8.3 Analytics
- **Google Analytics**: Tracking de comportamiento
- **Facebook Pixel**: Para remarketing
- **WhatsApp Business API**: Para tracking de conversiones
- **Heatmaps**: Hotjar o similar

---

## 9. Checklist de Implementación

### 9.1 Contenido
- [ ] Headlines optimizados para conversión
- [ ] Descripciones de productos atractivas
- [ ] Testimonios reales de clientes
- [ ] Imágenes de alta calidad
- [ ] Información de contacto actualizada

### 9.2 Funcionalidad
- [ ] Botones de WhatsApp funcionando
- [ ] Mensajes predefinidos configurados
- [ ] Navegación móvil optimizada
- [ ] Formularios de contacto (opcional)
- [ ] Links a redes sociales

### 9.3 Técnico
- [ ] Carga rápida (< 3 segundos)
- [ ] Responsive design
- [ ] SEO optimizado
- [ ] Analytics configurado
- [ ] SSL certificado

---

## 10. Mantenimiento y Mejoras

### 10.1 Actualizaciones Regulares
- **Productos**: Actualizar catálogo mensualmente
- **Testimonios**: Agregar nuevos cada 2-3 meses
- **Precios**: Mantener actualizados
- **Imágenes**: Rotar contenido visual

### 10.2 A/B Testing
- **Headlines**: Probar diferentes mensajes
- **CTAs**: Colores, texto, ubicación
- **Imágenes**: Diferentes estilos visuales
- **Layout**: Orden de secciones

### 10.3 Monitoreo
- **Performance**: Velocidad de carga
- **Conversiones**: Tracking de WhatsApp
- **Feedback**: Comentarios de clientes
- **Competencia**: Análisis de mercado

---

## 11. Ejemplo de Estructura HTML

```html
<!-- Hero Section -->
<section class="hero-section">
  <div class="hero-content">
    <h1>Productos Naturales de Oxapampa</h1>
    <p>Mieles 100% naturales, carnes artesanales y orquídeas únicas</p>
    <a href="https://wa.me/51987654321" class="whatsapp-btn">
      Comprar por WhatsApp
    </a>
  </div>
  <div class="hero-image">
    <!-- Imagen de productos -->
  </div>
</section>

<!-- Productos Destacados -->
<section class="products-section">
  <h2>Nuestros Productos Estrella</h2>
  <div class="products-grid">
    <!-- Producto 1: Miel -->
    <div class="product-card">
      <img src="miel.jpg" alt="Miel de Oxapampa">
      <h3>Miel de Oxapampa</h3>
      <p>100% natural, sin aditivos</p>
      <a href="https://wa.me/51987654321" class="whatsapp-btn-small">
        Ver en WhatsApp
      </a>
    </div>
    <!-- Más productos... -->
  </div>
</section>

<!-- CTA Final -->
<section class="final-cta">
  <h2>¿Listo para probar nuestros productos?</h2>
  <p>Contáctanos ahora y recibe tu pedido en 24-48 horas</p>
  <a href="https://wa.me/51987654321" class="whatsapp-btn-large">
    Comprar por WhatsApp
  </a>
</section>
```

---

**Documento creado para optimizar la conversión de la landing page de GOXA hacia WhatsApp**
