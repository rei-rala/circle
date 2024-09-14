"use client"

import { Button } from "../ui/button";
import { cn, scrollToId } from "@/lib/utils";
import { useFeatureContext } from "@/contexts/FeatureProvider";
import { BRAND, SHORT_BRAND } from "@/constants";
import { ImageWithLoader } from "../ImageWithLoader";

import placeholderHeroImage from "./placeholder-hero.png";
import { useAuth } from "@/contexts/AuthProvider";
import { useState } from "react";

export function HeroSection() {
    const { status } = useAuth();
    const { features: { instagramCarousel } } = useFeatureContext();
    const isUnauthenticated = status === "unauthenticated"

    const [isHovering, setIsHovering] = useState(false);

    return (
        <section className="w-full h-[60vh] relative" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <div className="absolute inset-0 flex items-center justify-center">
                <ImageWithLoader
                    className={cn(
                        "inset-0 w-[300px] h-[300px]",
                    )}
                    containerClassName={cn(
                        "transition-all duration-700 ease-in-out",
                        isHovering ? "scale-110" : "scale-100"
                    )}
                    priority={true}
                    src="/icon.png"
                    alt=""
                    fill
                    width={380}
                    height={380}
                    placeholder="blur"
                    blurDataURL={placeholderHeroImage.blurDataURL}
                    placeholderProps={{
                        className: "rounded-full"
                    }}
                />
            </div>

            <div className="relative z-10 h-full flex flex-col gap-4 justify-center items-center">
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