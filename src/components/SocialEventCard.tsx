"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePlaceholderLink } from '@/lib/utils';
import { CopyIcon, LandPlotIcon, RouteIcon, UsersIcon } from 'lucide-react';
import { ExternalLinkIcon, CalendarIcon, ClockIcon } from 'lucide-react'
import Image from 'next/image';

import { CustomGoogleMaps } from '@/components/CustomGoogleMaps';
import { getDistanceFromNow, getFullDate, getHour, isDateInPast } from '@/lib/date-fns';
import Link from 'next/link';
import { UserHoverCard } from './UserHoverCard';
import type { Session } from 'next-auth';
import { toast } from 'sonner';
import { useCallback } from 'react';
import { Separator } from './ui/separator';

export const SocialEventCard = ({ event, session }: { event: SocialEvent, session: Session | null }) => {
    const handleCopyClick = useCallback(() => {
        if (!event.place?.formatted_address) {
            toast.error("No hay dirección disponible para copiar");
            return;
        }

        navigator.clipboard.writeText(event.place.formatted_address)
            .then(() => {
                toast.success("Dirección copiada al portapapeles");
            })
            .catch((error) => {
                console.error("Error al copiar la dirección:", error);
                toast.error("No se pudo copiar la dirección");
            });
    }, [event.place]);

    const onLinkClick = useCallback((_e: React.MouseEvent<HTMLAnchorElement>) => {
        toast.info("Abriendo enlace en una nueva pestaña")
    }, [])

    return (
        <Card className="bg-[#222222] p-4 rounded-lg text-white">
            <CardHeader className="flex flex-col gap-4">
                <CardTitle>
                    <div>{event.title}</div>
                    {event.date && <p className='text-sm capitalize'>{getDistanceFromNow(event.date)} </p>}
                </CardTitle>

            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="flex flex-col items-start gap-4">
                        {
                            event.photo &&
                            <Image
                                src={event.photo || generatePlaceholderLink({ text: "Evento sin foto" })}
                                alt={`Imagen de evento: ${event.title}`}
                                width={300}
                                height={200}
                                className="rounded-lg object-cover min-w-full max-w-[500px]"
                                style={{ aspectRatio: "300/200", objectFit: "cover" }}
                            />
                        }
                        <div className="flex-1 text-sm text-muted-foreground mt-2">
                            {event.description}
                        </div>
                    </div>

                    <div className="flex flex-col gap-1 text-sm text-muted-foreground mt-2">
                        <div className="flex gap-2">
                            <span className="my-auto">Organizado por:</span>
                            <UserHoverCard user={event.owner} hoverCardProps={{ openDelay: 100 }} />
                        </div>
                    </div>


                    <Separator />
                    <div className="grid gap-2">
                        <div className="font-medium">Detalles del Evento</div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="min-w-5 min-h-5" />
                                <div>
                                    {event.date && getFullDate(event.date)}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <ClockIcon className="min-w-5 min-h-5" />
                                <div>{event.date && getHour(event.date)}</div>
                            </div>

                            {
                                event.minAttendees && event.minAttendees !== 0
                                    ? (
                                        <div className="flex items-center gap-2">
                                            <UsersIcon className="min-w-5 min-h-5" />
                                            <div>
                                                Mínimo de asistentes: {event.minAttendees}
                                            </div>
                                        </div>
                                    )
                                    : null
                            }

                            {event.place &&
                                <>
                                    <div className="flex items-center gap-2">
                                        <p className='flex flex-1 gap-2 items-center'>
                                            <LandPlotIcon className="min-w-5 min-h-5" />
                                            {event.place.name}
                                        </p>
                                        <Link
                                            href={event.place.url || "#"}
                                            onClick={onLinkClick}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="text-[#aaa] hover:text-white hover:underline"
                                        >
                                            <span className='relative md:bottom-1 flex gap-1 text-xs'>
                                                <ExternalLinkIcon className="w-4 h-4" />
                                                Abrir en Maps
                                            </span>
                                        </Link>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <p className='flex flex-1 gap-2 items-center'>
                                            <RouteIcon className="min-w-5 min-h-5" />
                                            {event.place.formatted_address}
                                        </p>
                                        <span
                                            onClick={handleCopyClick}
                                            className='relative md:bottom-1 flex gap-1 text-xs cursor-pointer text-[#aaa] hover:text-white hover:underline'
                                        >
                                            <CopyIcon className="w-4 h-4" />
                                            Copiar
                                        </span>
                                    </div>
                                </>
                            }
                        </div>
                        {
                            session?.user &&
                            !isDateInPast(event.date) &&
                            <div className="flex items-center gap-2">
                                <CustomGoogleMaps initialPlace={event.place} />
                            </div>
                        }
                    </div>
                </div>
            </CardContent>

            {
                event.public && (
                        <CardFooter className='mt-4'>
                            <p className="italic text-center text-sm">
                                Este evento es público, aún para usuarios no registrados
                            </p>
                        </CardFooter>
                )
            }
        </Card >
    )
}
