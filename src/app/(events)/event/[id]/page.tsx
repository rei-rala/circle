"use client"

import { EventCardProps } from '@/components/EventCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { generatePlaceholderLink } from '@/lib/utils';
import { Separator } from '@radix-ui/react-separator';
import { CalendarIcon, ClockIcon, MapPinIcon, UsersIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const EventDetailsPage = () => {
    const event = useSearchParams() as unknown as Record<keyof EventCardProps, any>

    return (
        <div className="flex-1 overflow-auto bg-[#1a1a1a]">
            <div className="p-4 grid gap-4">
                <Card className="bg-[#222222] p-4 rounded-lg">
                    <CardHeader>
                        <CardTitle>{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-6">
                            <div className="flex flex-col items-start gap-4">
                                <Image
                                    src={generatePlaceholderLink()}
                                    alt={`Imagen de evento: ${event.title}`}
                                    width={300}
                                    height={200}
                                    className="rounded-lg object-cover w-full max-w-[300px]"
                                    style={{ aspectRatio: "300/200", objectFit: "cover" }}
                                />
                                <div className="flex-1">
                                    <div className="text-lg font-medium">{event.title}</div>
                                    <div className="text-sm text-[#aaa]">{event.date}</div>
                                    <div className="text-sm text-[#aaa] mt-2">
                                        {event.description}
                                    </div>
                                    <div className="flex items-center gap-4 mt-4">
                                        <Link
                                            href={event.map ?? "#"}
                                            target="_blank"
                                            className="flex items-center gap-2 text-sm text-[#aaa] hover:text-white"
                                            prefetch={false}
                                        >
                                            <MapPinIcon className="w-5 h-5" />
                                            Ver en el mapa
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <Separator />
                            <div className="grid gap-2">
                                <div className="font-medium">Detalles del Evento</div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                        <CalendarIcon className="w-5 h-5" />
                                        <div>Viernes, 16 de junio</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ClockIcon className="w-5 h-5" />
                                        <div>8:00 PM - 11:00 PM</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPinIcon className="w-5 h-5" />
                                        <div>123 Main St, Anytown USA</div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <UsersIcon className="w-5 h-5" />
                                        <div>Hasta 50 personas</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Link href="/events" prefetch={false} className="m-auto p-4 text-[#aaa] hover:text-white">Volver a eventos</Link>
            </div>

        </div>
    );
};

export default EventDetailsPage;
