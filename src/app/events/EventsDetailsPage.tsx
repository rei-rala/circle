import Link from 'next/link';
import { SocialEventCard } from '@/components/SocialEvent/SocialEventCard';
import { notFound, redirect } from 'next/navigation';
import getServerSession from '@/lib/getServerSession';
import { isDateInPast } from '@/lib/date-fns';
import { prisma } from '@/prisma';
import { SocialEventAttendeesCard } from '@/components/SocialEvent/SocialEventAttendeesCard';


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
                    hideEmail: true,
                    hideImage: true,
                    hidePhone: true,
                }
            }
        }
    }) as SocialEvent;


    if (!event || !event.owner.id) return notFound();
    if (!event.public && !session?.user?.id) return redirect(`/api/auth/signin?callbackUrl=/events/${id}`);

    if (event.owner) {
        if (event.owner.hideEmail) event.owner.email = "";
        if (event.owner.hideImage) event.owner.image = "";
        if (event.owner.hidePhone) event.owner.phone = "";
    }
    if (!session?.user.id) {
        event.publicAttendees = false;
    }

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
            {
                event.publicAttendees && (
                    <SocialEventAttendeesCard event={event} />
                )
            }
        </div>
    );
};
