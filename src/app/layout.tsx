import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppWithProviders } from "./providers";
import { Suspense } from "react";

import Loading from "@/components/Loading";
import { UpperNavbar } from "@/components/navbars/UpperNavbar";
import { LowerNavbar } from "@/components/navbars/LowerNavbar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "⭕ The Circle",
  description: "⭕THE CIRCLE 🇦🇷 es una comunidad social en Buenos Aires que organiza eventos para conectar personas y disfrutar de la ciudad. Únete y participa en experiencias únicas.",
  keywords: [
    "The circle",
    "El circulo",
    "The cicle BA",
    "The Circle Buenos Aires",
    "Eventos",
    "Grupo",
    "Social",
    "Grupo social Buenos Aires",
    "Eventos y salidas en Buenos Aires",
    "Comunidad de amigos en Buenos Aires",
    "Grupo de actividades en Buenos Aires",
    "Networking social en Buenos Aires",
    "Calendario de eventos en Buenos Aires",
    "Salidas presenciales Buenos Aires",
    "Actividades sociales Argentina",
    "Conocer gente nueva en Buenos Aires",
    "Reglas de grupo WhatsApp Buenos Aires",
    "Organización de eventos Buenos Aires",
    "Comunidad inclusiva en Buenos Aires",
    "Networking y socialización BA",
    "Grupo de WhatsApp Buenos Aires eventos",
    "Participación en eventos Buenos Aires",
  ],
  icons: [
    "/icon.png"
  ]
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AppWithProviders>
          <div className="flex flex-col h-screen bg-[#1a1a1a] text-white min-h-full min-w-full max-h-[100svh]">
            <UpperNavbar className="w-full flex-shrink-0"  />
            <div className="flex flex-col flex-grow gap-4 overflow-x-hidden overflow-y-auto bg-[#1a1a1a] p-5 py-20">
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
            </div>
            <LowerNavbar className="w-full flex-shrink-0" />
          </div>
        </AppWithProviders>
      </body>
    </html>
  );
}