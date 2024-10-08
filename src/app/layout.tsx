import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GeneralProviders } from "./generalProviders";
import { API_BASE_URL, BRAND } from "@/constants";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(API_BASE_URL),
  title: BRAND,
  description: BRAND + " es una comunidad social en Buenos Aires que organiza eventos para conectar personas y disfrutar de la ciudad. Únete y participa en experiencias únicas.",
  keywords: [
    "The Circle BA",
    "The Circle Buenos Aires",
    "Círculo BA",
    "Círculo Buenos Aires",
    "Eventos sociales Buenos Aires",
    "Comunidad social Argentina",
    "Networking Buenos Aires",
    "Actividades grupales CABA",
    "Salidas y encuentros BA",
    "Experiencias únicas Buenos Aires",
    "Grupo WhatsApp eventos BA",
    "Amigos en Buenos Aires",
    "Socialización Argentina",
    "Eventos culturales CABA",
    "Actividades al aire libre BA",
    "Comunidad inclusiva Buenos Aires",
    "Calendario eventos sociales BA",
    "Conocer gente nueva Argentina",
    "Organización eventos Buenos Aires",
    "Grupo social activo CABA",
    "Diversión y networking BA",
    "Comunidad internacional Buenos Aires",
    "Expatriados en Argentina",
    "Intercambio cultural Buenos Aires",
    "Eventos para jóvenes profesionales BA",
    "Actividades después del trabajo CABA",
    "Turismo local Buenos Aires",
    "The Circle eventos",
    "The Circle comunidad",
    "The Circle networking",
    "Círculo BA actividades",
  ],
  applicationName: "The Circle BA",
  creator: "The Circle BA Team",
  authors: [
    { name: "The Circle BA Team" },
    { name: "Ramon Irala", url: "https://github.com/rei-rala" }
  ],
  icons: [
    { rel: "icon", url: "/icon.png" },
    { rel: "apple-touch-icon", url: "/icon.png" },
    { rel: "icon", url: "/icon.webp", type: "image/webp" },
    { rel: "android-chrome-192x192", url: "/android-chrome-192x192.png" },
    { rel: "android-chrome-512x512", url: "/android-chrome-512x512.png" },
  ],
  openGraph: {
    title: BRAND,
    description: BRAND + " es una comunidad social en Buenos Aires que organiza eventos para conectar personas y disfrutar de la ciudad. Únete y participa en experiencias únicas.",
    url: "https://thecircle.com.ar",
    siteName: BRAND,
    images: [
      {
        url: "/icon.png",
        width: 350,
        height: 350,
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND,
    description: BRAND + " es una comunidad social en Buenos Aires que organiza eventos para conectar personas y disfrutar de la ciudad. Únete y participa en experiencias únicas.",
    images: ["/icon.png"],
  },
  manifest: "/manifest.json",
  robots: "index, follow",
  alternates: {
    canonical: "https://thecircleba.com.ar",
    languages: {
      "es-AR": "https://thecircleba.com.ar",
    },
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <GeneralProviders>
          {children}
        </GeneralProviders>
      </body>
    </html>
  );
}