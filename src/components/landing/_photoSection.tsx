/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import useEmblaCarousel from "embla-carousel-react";

const defaultPhotos = [
    {
        src: "/placeholder.svg",
        alt: "Foto de la comunidad"
    },
    {
        src: "/placeholder.svg",
        alt: "Foto de la comunidad"
    },
    {
        src: "/placeholder.svg",
        alt: "Foto de la comunidad"
    },
    {
        src: "/placeholder.svg",
        alt: "Foto de la comunidad"
    },
]

export function PhotoSection({ photos = defaultPhotos }: { photos?: { src: string, alt: string }[] }) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    useEffect(() => {
        if (emblaApi) {
            const autoplay = () => {
                if (emblaApi.canScrollNext()) {
                    emblaApi.scrollNext();
                } else {
                    emblaApi.scrollTo(0);
                }
            };

            const intervalId = setInterval(autoplay, 3000);

            return () => clearInterval(intervalId);
        }
    }, [emblaApi]);

    return (
        <section id="photos" className="grid gap-4">
            <div className="text-2xl font-semibold">Fotos de la Comunidad</div>
            <Carousel ref={emblaRef} className="m-auto max-w-[600px] px-4">
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