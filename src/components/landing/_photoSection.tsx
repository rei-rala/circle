/* eslint-disable @next/next/no-img-element */
"use client";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import AutoPlay from "embla-carousel-autoplay"
import { generatePlaceholderLink } from "@/lib/utils";
import { useRef } from "react";

const defaultPhotos = new Array(5).fill(null).map((_, i) => ({
    src: generatePlaceholderLink({
        text: (i+1).toString()
    }),
    alt: `Foto ${i+1} de la comunidad`
}))

export function PhotoSection({ photos = defaultPhotos }: { photos?: { src: string, alt: string }[] }) {
    const plugin = useRef(
        AutoPlay({ delay: 4000, stopOnInteraction: true })
      )

    return (
        <section id="photos" className="grid gap-4">
            <div className="text-2xl font-semibold">Fotos de la Comunidad</div>
            <Carousel 
             className="m-auto max-w-[600px] px-4"
             plugins={[
                plugin.current
             ]}
             >
                <CarouselContent>
                    {
                        photos.map((photo, i) => (
                            <CarouselItem key={`community-photo:${i}`}>
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    width={600}
                                    height={600}
                                    className="aspect-square object-cover rounded-lg"
                                />
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </section>
    )
}