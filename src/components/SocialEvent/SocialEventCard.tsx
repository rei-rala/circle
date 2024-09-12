"use client"

import { generatePlaceholderLink } from '@/lib/utils';
import { CopyIcon, LandPlotIcon, RouteIcon, UsersIcon } from 'lucide-react';
import { ExternalLinkIcon, CalendarIcon, ClockIcon } from 'lucide-react'
import Image from 'next/image';

import { CustomGoogleMaps } from '@/components/CustomGoogleMaps';
import { getDistanceFromNow, getFullDateLocale, getHour, isDateInPast } from '@/lib/date-fns';
import Link from 'next/link';
import { UserHoverCard } from '../UserHoverCard';
import type { Session } from 'next-auth';
import { toast } from 'sonner';
import { useCallback, useMemo } from 'react';
import { Separator } from '../ui/separator';
import { LayoutCard } from '../LayoutCard';


export const SocialEventCard = ({ event, session }: { event: SocialEvent, session: Session | null }) => {
    const isUserAdmittedAndNotBanned = session?.user?.admitted && !session?.user?.banned;

    const eventDate = useMemo(() => event.date && getFullDateLocale(event.date), [event.date]);
    const eventTime = useMemo(() => event.date && getHour(event.date), [event.date]);
    const isEventInPast = useMemo(() => event.date && isDateInPast(event.date), [event.date]);
    const attendeesCount = useMemo(() => (event.attendees?.length || 0) + 1, [event.attendees]);

    const attendeesInfo = useMemo(() => {
        const hasMinAttendees = event.minAttendees && event.minAttendees !== 0;
        const getEmoji = (count: number, min?: number) => {
            if (min) return count >= min ? "😊" : count >= min / 2 ? "🙂" : "🥺";
            return count <= 1 ? "🥺" : count <= 5 ? "🙂" : "😊";
        };

        return hasMinAttendees
            ? `Mínimo de asistentes: ${attendeesCount}/${event.minAttendees} ${getEmoji(attendeesCount, event.minAttendees)}`
            : `Asistentes: ${attendeesCount} ${getEmoji(attendeesCount)}`;
    }, [attendeesCount, event.minAttendees]);

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

    return (
        <LayoutCard
            title={
                <>
                    <div>{event.title}</div>
                    {event.date && <p className='text-sm capitalize'>{getDistanceFromNow(event.date)} </p>}
                </>
            }
            content={

                <div className="grid gap-4 overflow-x-hidden">
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
                        <p className="max-w-full text-sm text-muted-foreground mt-2 text-ellipsis break-all overflow-hidden">
                            {event.description}
                        </p>
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
                            <div className="flex items-center gap-2 capitalize">
                                <CalendarIcon className="min-w-5 min-h-5" />
                                <div>{eventDate}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <ClockIcon className="min-w-5 min-h-5" />
                                <div>{eventTime}</div>
                            </div>

                            <div className="flex items-center gap-2 sm:col-span-2">
                                <UsersIcon className="min-w-5 min-h-5" />
                                <div>{attendeesInfo}</div>
                            </div>

                            {event.place
                                ? <>
                                    <div className="flex items-center gap-2">
                                        <p className='flex flex-1 gap-2 items-center'>
                                            <LandPlotIcon className="min-w-5 min-h-5" />
                                            {event.place.name}
                                        </p>
                                        <Link
                                            href={event.place.url || "#"}
                                            onClick={() => toast.info("Abriendo enlace en una nueva pestaña")}
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
                                : <div className="flex items-center gap-2 sm:col-span-2">
                                    <p className='flex flex-1 gap-2 items-center'>
                                        <LandPlotIcon className="min-w-5 min-h-5" />
                                        A definir
                                    </p>
                                </div>
                            }
                        </div>
                        {
                            session?.user &&
                            !isEventInPast &&
                            isUserAdmittedAndNotBanned &&
                            event.place &&
                            <div className="flex items-center gap-2">
                                <CustomGoogleMaps initialPlace={event.place} />
                            </div>
                        }
                    </div>
                </div>
            }
            footer={
                event.public &&
                session?.user && (
                    <p className="italic mx-auto text-center text-sm">
                        Este evento es público y puede ser visto por usuarios no registrados
                    </p>
                )
            }
        />
    )
}