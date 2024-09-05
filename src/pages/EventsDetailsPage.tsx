import React from 'react';
import Link from 'next/link';
import { SocialEventCard } from '@/components/SocialEventCard';
import { notFound } from 'next/navigation';
import getServerSession from '@/lib/getServerSession';
import { isDateInPast } from '@/lib/date-fns';
import { prisma } from '@/prisma';


export async function EventDetailsPageComponent({ id }: { id: string }) {
    const session = await getServerSession();

    const event = await prisma.socialEvent.findUnique({
        where: { id },
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


    if (!event || !event.ownerId) return notFound();

    return (
        <div >
            <div className='text-center font-bold p-2'>
                {
                    isDateInPast(event.date)
                        ? <span>Evento finalizado</span>
                        : session?.user
                            ? (session?.user?.role === "admin" || session?.user?.id === event.ownerId) && (
                                <Link
                                    className='hover:underline cursor-pointer'
                                    href={`/events/${id}/edit`}
                                >
                                    {session.user.role === "admin" ? "Editar como Administrador" : "Editar"}
                                </Link>
                            )
                            : null
                }
            </div>

            <SocialEventCard event={event} session={session} />
        </div>
    );
};
