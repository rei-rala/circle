import Link from 'next/link';
import { SocialEventCard } from '@/components/SocialEvent/SocialEventCard';
import { notFound, redirect } from 'next/navigation';
import getServerSession from '@/lib/getServerSession';
import { isDateInPast } from '@/lib/date-fns';
import { prisma } from '@/prisma';
import { SocialEventAttendeesCard } from '@/components/SocialEvent/SocialEventAttendeesCard';
import { dummyUser } from '@/constants';
import { SocialEventJoin } from '@/components/SocialEvent/SocialEventJoin';
import { SocialEventBannedFrom } from '@/components/SocialEvent/SocialEventBannedFrom';


export async function EventDetailsPageComponent({ id }: { id: string }) {
    const session = await getServerSession();
    let event: SocialEvent | null = null;

    try {
        if (session?.user) {
            event = await prisma.socialEvent.findUnique({
                where: { id },
                select: {
                    id: true,
                    public: true,
                    ownerId: true,
                    title: true,
                    status: true,
                    date: true,
                    time: true,
                    description: true,
                    photo: true,
                    place: true,
                    minAttendees: true,
                    publicAttendees: true,
                    createdAt: true,
                    updatedAt: true,
                    deletedAt: true,
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
                    },
                    attendees: {
                        select: {
                            user: true,
                        },
                    }
                }
            }) as unknown as SocialEvent;
        } else {
            event = await prisma.socialEvent.findUnique({
                where: { id },
            }) as SocialEvent;

            event.owner = dummyUser;
        }

    } catch (er) {
        console.error("Error fetching event:", er)
        event = null;
    }


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

    const isEventFinished = isDateInPast(event.date);
    const isUserLoggedIn = !!session?.user;
    const isUserAdmin = session?.user?.role === "admin";
    const isUserOwner = session?.user?.id === event.ownerId;
    const canEditEvent = !isEventFinished && isUserLoggedIn && (isUserAdmin || isUserOwner);

    const eventUserAttendee = event.attendees?.filter(attendee => attendee.user.id === session?.user?.id);
    const isUserAttending = eventUserAttendee?.length > 0;
    const attendeeBanCheck = eventUserAttendee?.find(attendee => attendee.user.id === session?.user?.id && attendee.bannedFromEvent);
    const canAttendEvent = !isEventFinished && isUserLoggedIn && !isUserOwner && !attendeeBanCheck;

    return (
        <div className="flex flex-col gap-4 pt-2">
            <div className='flex flex-col gap-2 text-center font-bold'>
                {isEventFinished && <span>Evento finalizado</span>}
                {canEditEvent && (
                    <Link
                        className='hover:underline cursor-pointer'
                        href={`/events/${id}/edit`}
                    >
                        {isUserAdmin ? "Editar como Administrador" : "Editar tu evento"}
                    </Link>
                )}
            </div>

            <SocialEventCard event={event} session={session} />

            {event.publicAttendees && (
                <SocialEventAttendeesCard event={event} />
            )}

            {
                canAttendEvent && !isUserAttending && <SocialEventJoin event={event} />
            }

            <SocialEventBannedFrom attendee={attendeeBanCheck} />
        </div>
    );
};
