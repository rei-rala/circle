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
const betaAllowedPathnames = ["/beta", "/"];

export const BetaWall = () => {
    const { user } = useAuth();
    const pathname = usePathname();

    if (PRODUCTION_READY) return null;

    // Check if the current pathname is a static file
    const isStaticFile = staticFiles.some(file => pathname.startsWith(file));

    // Allow access to static files and valid pathnames without restrictions
    if (isStaticFile || betaAllowedPathnames.find(path => pathname === path)) return null;

    // Redirect unadmitted users or non-users to beta page
    if (user?.admitted) {
        redirect("/beta?callbackUrl=" + pathname);
    }

    // If user is admitted, allow access to all pages
    return null;
}