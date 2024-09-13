"use client"

import { PRODUCTION_READY } from "@/constants";
import { useAuth } from "@/contexts/AuthProvider";
import { redirect, usePathname } from "next/navigation";

export const BetaWall = () => {
    const { user } = useAuth();
    const pathname = usePathname();


    if (!PRODUCTION_READY && pathname !== "/beta" && (!user || !user.admitted)) {

        console.log({
            user,
            pathname,
            admitted: user?.admitted,
            productionReady: PRODUCTION_READY,
        })

        redirect("/beta");
    }

    return null;
}