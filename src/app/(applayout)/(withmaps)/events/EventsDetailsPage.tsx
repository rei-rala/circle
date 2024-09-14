import Link from 'next/link';
import { SocialEventCard } from '@/components/SocialEvent/SocialEventCard';
import { notFound, redirect } from 'next/navigation';
import { isDateInPast } from '@/lib/date-fns';
import { SocialEventAttendeesCard } from '@/components/SocialEvent/SocialEventAttendeesCard';
import { dummyUser } from '@/constants';
import { SocialEventJoin } from '@/components/SocialEvent/SocialEventJoin';
import { SocialEventBannedFrom } from '@/components/SocialEvent/SocialEventBannedFrom';
import { hasElevatedRole } from '@/lib/utils';
import { Session } from 'next-auth';


export function EventDetailsPageComponent({ socialEvent, session }: { socialEvent: SocialEvent, session: Session | null }) {
    if (!session?.user || session?.user?.banned || !session?.user?.admitted) {
        socialEvent.owner = dummyUser;
    }

    if (!socialEvent || !socialEvent.owner.id) return notFound();
    if (!socialEvent.public && !session?.user?.id) return redirect(`/login?callbackUrl=/events/${socialEvent.id}`);

    if (socialEvent.owner) {
        if (socialEvent.owner.hideEmail) socialEvent.owner.email = "";
        if (socialEvent.owner.hideImage) socialEvent.owner.image = "";
        if (socialEvent.owner.hidePhone) socialEvent.owner.phone = "";
    }
    if (!session?.user.id) {
        socialEvent.publicAttendees = false;
    }

    const isEventFinished = isDateInPast(socialEvent.date);
    const isUserLoggedIn = !!session?.user;
    const isUserAdmin = hasElevatedRole(session?.user);

    const bannedOrNotAdmitted = session?.user?.banned || !session?.user?.admitted;
    const isUserOwner = session?.user?.id === socialEvent.ownerId;
    const canEditEvent = !bannedOrNotAdmitted && !isEventFinished && isUserLoggedIn && (isUserAdmin || isUserOwner);

    const eventUserAttendee = socialEvent.attendees?.filter(attendee => attendee.user.id === session?.user?.id);
    const isUserAttending = eventUserAttendee?.length > 0;
    const attendeeBanCheck = eventUserAttendee?.find(attendee => attendee.user.id === session?.user?.id && attendee.bannedFromEvent);
    const canAttendEvent = !bannedOrNotAdmitted && !isEventFinished && isUserLoggedIn && !isUserOwner && !attendeeBanCheck;


    return (
        <div className="flex flex-col gap-4">
            <div className='flex flex-col gap-2 text-center font-bold'>
                {isEventFinished && <span>Evento finalizado</span>}
                {canEditEvent && (
                    <Link
                        className='hover:underline cursor-pointer'
                        href={`/events/${socialEvent.id}/edit`}
                    >
                        {isUserAdmin ? "Editar como Administrador" : "Editar tu evento"}
                    </Link>
                )}
            </div>

            <SocialEventCard event={socialEvent} session={session} />

            {socialEvent.publicAttendees && (
                <SocialEventAttendeesCard event={socialEvent} />
            )}

            {
                canAttendEvent && !isUserAttending && <SocialEventJoin event={socialEvent} />
            }

            <SocialEventBannedFrom attendee={attendeeBanCheck} />
        </div>
    );
};
