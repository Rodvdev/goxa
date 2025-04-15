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
  title: "GOXA - Productos Naturales y Gourmet",
  description: "Especialistas en mieles, productos de Oxapampa, carnes y chorizos para parrilla, y hermosas orquídeas. Productos naturales seleccionados para tu hogar y mesa.",
  keywords: ["miel", "orquídeas", "plantas", "Oxapampa", "carnes", "chorizos", "parrilla", "productos naturales", "gourmet", "Perú"],
  authors: [{ name: "GOXA" }],
  creator: "GOXA",
  publisher: "GOXA",
  formatDetection: {
    telephone: true,
    email: true,
  },
  openGraph: {
    title: "GOXA - Productos Naturales y Gourmet",
    description: "Mieles, productos de Oxapampa, carnes y chorizos para parrilla, y hermosas orquídeas.",
    url: "https://goxa.pe",
    siteName: "GOXA",
    locale: "es_PE",
    type: "website",
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
