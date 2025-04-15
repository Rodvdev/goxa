import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0">
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">GOXA Platform</span>
            </div>
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Tienda</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px]">
                      <li className="row-span-3">
                        <NavigationMenuLink asChild>
                          <Link
                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-indigo-500 to-purple-500 p-6 no-underline outline-none focus:shadow-md"
                            href="/shop"
                          >
                            <div className="mb-2 mt-4 text-lg font-medium text-white">
                              Tienda Online
                            </div>
                            <p className="text-sm leading-tight text-white/90">
                              Explora nuestra tienda y descubre nuestros productos
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/about" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Nosotros
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/contact" className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                    Contacto
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/signin">Iniciar Sesión</Link>
              </Button>
              <Button asChild>
                <Link href="/admin">Admin Dashboard</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero section */}
      <main className="flex-1">
        <div className="relative bg-gradient-to-r from-gray-900 to-indigo-900">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent opacity-75"></div>
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              GOXA Platform
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl">
              Plataforma integral que combina ERP, E-commerce y CRM para optimizar la gestión de tu negocio.
            </p>
            <div className="mt-10 flex space-x-4">
              <Button size="lg" asChild>
                <Link href="/shop">Visitar tienda</Link>
              </Button>
              <Button size="lg" variant="outline" className="text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-white" asChild>
                <Link href="/signin">Iniciar sesión</Link>
              </Button>
            </div>
          </div>
        </div>
        
        {/* Features */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Todo lo que necesitas para tu negocio
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Una solución completa para la gestión empresarial, ventas online y relación con tus clientes.
              </p>
            </div>
            
            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>ERP</CardTitle>
                    <CardDescription>Gestión empresarial integral</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Gestión de inventario, ventas, compras y finanzas de forma centralizada.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>E-commerce</CardTitle>
                    <CardDescription>Tienda online profesional</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Tienda online integrada con tu inventario y sistema de gestión.
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>CRM</CardTitle>
                    <CardDescription>Gestión de clientes</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Gestiona tus clientes, oportunidades y seguimiento comercial.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>© {new Date().getFullYear()} GOXA Platform. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
