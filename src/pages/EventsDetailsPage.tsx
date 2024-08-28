import React from 'react';
import Link from 'next/link';
import { SocialEventCard } from '@/components/SocialEventCard';
import { notFound } from 'next/navigation';
import getServerSession from '@/lib/getServerSession';
import { isDateInPast } from '@/lib/date-fns';
import { prisma } from '@/prisma';


export async function EventDetailsPageComponent({ id }: { id: string }) {
    const session = await getServerSession();
    //const { data: event } = await getSocialEventById(id);
    
    const event = await prisma.socialEvent.findUnique({
        where: { id: id },
        include: {
            owner: {
                select: {
                    id: true,
                    alias: true,
                    name: true,
                    bio: true,
                    email: true,
                    role: true,
                    image: true,
                    location: true,
                    phone: true,
                    socialMedia: true,
                }
            }
        }
    }) as SocialEvent;
        

    if (!event) return notFound();

    return (
        <div className="overflow-auto">
            <div className='text-center font-bold p-2'>
                {
                    isDateInPast(event.date)
                        ? <span>Evento finalizado</span>
                        : (
                            session?.user?.role === "admin" ? (
                                <Link className='hover:underline cursor-pointer' href={`/events/${id}/edit`}>Editar como Administrador</Link>
                            ) : (session?.user?.id && event.ownerId) ? (
                                <Link className='hover:underline cursor-pointer' href={`/events/${id}/edit`}>Editar</Link>
                            ) : null)
                }
            </div>

            <SocialEventCard event={event} session={session} />
        </div>
    );
};
