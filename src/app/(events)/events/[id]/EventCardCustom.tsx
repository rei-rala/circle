"use client"

import { EventCardProps } from '@/components/EventCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePlaceholderLink } from '@/lib/utils';
import { Separator } from '@radix-ui/react-separator';
import { CalendarIcon, ClockIcon, MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';

import { CustomGoogleMaps } from '@/components/CustomGoogleMaps';
import { getDistanceFromNow, getFullDate, getHour } from '@/lib/date-fns';

export const EventCardCustom = ({ event }: { event: EventCardProps }) => {
    useEffect(() => { }, []) //fuerza render en cliente

    console.log(event)
    return (
        <Card className="bg-[#222222] p-4 rounded-lg text-white">
            <CardHeader>
                <CardTitle>
                    <div>{event.title}</div>
                </CardTitle>
                <p className='capitalize'>{getDistanceFromNow(event.date)} </p>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4">
                    <div className="flex flex-col items-start gap-4">
                        <Image
                            src={generatePlaceholderLink({ text: "prueba img" })}
                            alt={`Imagen de evento: ${event.title}`}
                            width={300}
                            height={200}
                            className="rounded-lg object-cover min-w-full max-w-[500px]"
                            style={{ aspectRatio: "300/200", objectFit: "cover" }}
                        />
                        <div className="flex-1">
                            <div className="text-lg font-medium">{event.title}</div>
                            <div className="text-sm text-[#aaa] mt-2">
                                {event.description}
                            </div>
                        </div>
                    </div>
                    <Separator />
                    <div className="grid gap-2">
                        <div className="font-medium">Detalles del Evento</div>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-5 h-5" />
                                <div>
                                    {getFullDate(event.date)}
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <ClockIcon className="w-5 h-5" />
                                <div>{getHour(event.date)}</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPinIcon className="w-5 h-5" />
                                <div>123 Main St, Anytown USA</div>
                            </div>
                            <div className="flex items-center gap-2">
                                <CustomGoogleMaps markerPosition={event.coords} />
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
