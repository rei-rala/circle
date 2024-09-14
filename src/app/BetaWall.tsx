"use client"

import { PRODUCTION_READY } from "@/constants";
import { useAuth } from "@/contexts/AuthProvider";
import { redirect, usePathname } from "next/navigation";

const staticFiles = [
    "/favicon.ico",
    "/icon.png",
    "/android-chrome-192x192.png",
    "/android-chrome-512x512.png",
    "/apple-touch-icon.png",
    "/favicon-16x16.png",
    "/favicon-32x32.png",
    "/favicon.ico",
    "/manifest.json",
    "/robots.txt",
    "/site.webmanifest",
    "/sitemap.xml",
    "/robots.txt",
];
const validPathnames = ["/beta", "/"].concat(staticFiles);

export const BetaWall = () => {
    const { user } = useAuth();
    const pathname = usePathname();


    if (PRODUCTION_READY) return null;
    if (!validPathnames.includes(pathname) && (!user || !user.admitted)) {
        redirect("/beta");
    }
}