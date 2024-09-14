"use client"

import { Button } from "../ui/button";
import { useState } from "react";
import { cn, scrollToId } from "@/lib/utils";
import { useFeatureContext } from "@/contexts/FeatureProvider";
import { BRAND, SHORT_BRAND } from "@/constants";
import Image from "next/image";

import placeholderHeroImage from "./placeholder-hero.png";
import { useAuth } from "@/contexts/AuthProvider";
export function HeroSection() {
    const { status } = useAuth();

    const { features: { instagramCarousel } } = useFeatureContext();

    const [isHovered, setIsHovered] = useState(false);
    const [imageLoaded, setImageLoaded] = useState(false);

    const isUnauthenticated = status === "unauthenticated"

    return (
        <section className="w-full h-[50vh] relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-300/10 animate-pulse aspect-square h-full" />
            )}
            <div className="absolute inset-0 h-[380px] w-[380px]">
                <Image
                    priority={true}
                    fill
                    src="/icon.png"
                    alt={""} // decorative
                    placeholder="blur"
                    blurDataURL={placeholderHeroImage.blurDataURL}
                    onLoad={() => setImageLoaded(true)}
                    className={cn(
                        "absolute inset-0 h-full w-full object-contain object-center transition-all duration-300 ease-in-out",
                        isHovered ? "scale-105 opacity-50" : "scale-100 opacity-75",
                        !imageLoaded && "opacity-0"
                    )}
                />
                {/* 
            <picture>
                <source srcSet="/icon.webp" type="image/webp" />
                <source srcSet="/icon.png" type="image/png" />
                <img
                    src="/icon.avif"
                    alt={""}
                    // si esto no mejora el performance, byebye <img /> hola <Image />
                    loading="lazy"
                    className={cn(
                        "absolute inset-0 h-full w-full object-contain object-center transition-all duration-300 ease-in-out",
                        isHovered ? "scale-105 opacity-50" : "scale-100 opacity-75"
                    )}
                />
            </picture>
            */}
            </div>

            <div className={"relative z-10 h-full flex flex-col gap-4 justify-center items-center"}>
                <h1 className="text-4xl font-bold mb-4" id="main-title">{BRAND}</h1>
                <p className="text-lg max-w-[600px] text-center mb-8">
                    {SHORT_BRAND} es una comunidad social en Buenos Aires que organiza eventos para conectar personas y
                    disfrutar de la ciudad. Únete y participa en experiencias únicas.
                </p>
                <div className="grid w-[50%] gap-4 place-items-center">
                    {isUnauthenticated && <Button className="w-full" onClick={() => scrollToId("footer")}>Unirse</Button>}
                    <div className={cn(
                        "grid grid-cols-2 gap-4 w-full",
                        instagramCarousel ? "grid-cols-2" : "grid-cols-1"
                    )}>
                        <Button variant="secondary" onClick={() => scrollToId("about")} className="w-full">Info</Button>
                        {instagramCarousel && <Button variant="secondary" onClick={() => scrollToId("photos")} className="w-full">Fotos</Button>}
                    </div>
                </div>
            </div>
        </section>
    )
}