import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LowerNavbar } from "@/components/navbars/NavbarLower";
import { UpperNavbar } from "@/components/navbars/UpperNavbar";
import { AppWithProviders } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
            <UpperNavbar className="w-full flex-shrink-0" />
            <div className="flex-grow overflow-y-auto bg-[#1a1a1a] p-5">
              {children}
            </div>
            <LowerNavbar className="w-full flex-shrink-0" />
          </div>
        </AppWithProviders>
      </body>
    </html>
  );
}
