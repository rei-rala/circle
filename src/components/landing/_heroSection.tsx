"use client"

import { Button } from "../ui/button";
import { useState } from "react";
import { cn, scrollToId } from "@/lib/utils";
import { useSession } from "next-auth/react";

export function HeroSection() {
    const { status } = useSession();
    const [isHovered, setIsHovered] = useState(false);

    const isUnauthenticated = status === "unauthenticated"
    console.log(status)
    return (
        <section className="w-full h-[50vh] relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={cn(
                    "absolute inset-0 bg-[url('/icon.png')] h-full bg-contain bg-center bg-no-repeat transition-transform duration-300 ease-in-out",
                    isHovered ? "scale-105" : "scale-100"
                )}
            />
            <div
                className="relative z-10 h-full flex flex-col gap-4 justify-center items-center"
            >
                <h1 className="text-4xl font-bold mb-4" id="main-title">⭕The CIRCLE 🇦🇷</h1>
                <p className="text-lg max-w-[600px] text-center mb-8">
                    THE CIRCLE es una comunidad social en Buenos Aires que organiza eventos para conectar personas y
                    disfrutar de la ciudad. Únete y participa en experiencias únicas.
                </p>
                <div className="grid grid-rows-2 w-[50%] gap-4">
                    {isUnauthenticated && <Button className="w-full">Unirse</Button>}
                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="secondary" onClick={() => scrollToId("about")} className="w-full">Info</Button>
                        <Button variant="secondary" onClick={() => scrollToId("photos")} className="w-full">Fotos</Button>
                    </div>
                </div>
            </div>
        </section>
    )
}