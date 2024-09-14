"use client"

import { PRODUCTION_READY } from "@/constants";
import { useAuth } from "@/contexts/AuthProvider";
import { redirect, usePathname } from "next/navigation";

export const BetaWall = () => {
    const { user } = useAuth();
    const pathname = usePathname();

    const validPathnames = ["/beta", "/home", "/"];

    if (!PRODUCTION_READY && !validPathnames.includes(pathname) && (!user || !user.admitted)) {
        redirect("/beta");
    }

    return null;
}