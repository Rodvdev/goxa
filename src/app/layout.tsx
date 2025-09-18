import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ApolloWrapper } from "@/components/providers/apollo-provider";
import { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "GOXA - Productos Naturales de Oxapampa | Comprar por WhatsApp",
  description: "Mieles 100% naturales, carnes artesanales y orquídeas únicas de Oxapampa. Envío gratis a Lima. Calidad garantizada. ¡Compra por WhatsApp!",
  keywords: ["miel natural", "orquídeas", "Oxapampa", "carnes artesanales", "chorizos parrilla", "productos naturales", "gourmet", "Perú", "WhatsApp", "envío gratis Lima"],
  authors: [{ name: "GOXA" }],
  creator: "GOXA",
  publisher: "GOXA",
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    title: "GOXA - Productos Naturales de Oxapampa | Comprar por WhatsApp",
    description: "Mieles 100% naturales, carnes artesanales y orquídeas únicas de Oxapampa. Envío gratis a Lima. ¡Compra por WhatsApp!",
    url: "https://goxa.pe",
    siteName: "GOXA",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "GOXA - Productos Naturales de Oxapampa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GOXA - Productos Naturales de Oxapampa",
    description: "Mieles 100% naturales, carnes artesanales y orquídeas únicas. Envío gratis a Lima. ¡Compra por WhatsApp!",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" data-theme="light">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased bg-white min-h-screen`}>
        <ApolloWrapper>
          <Providers>{children}</Providers>
        </ApolloWrapper>
      </body>
    </html>
  );
}
