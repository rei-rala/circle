"use client"

import { UserHoverCard } from '../UserHoverCard';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { UserAvatar } from '../UserAvatar';
import { LayoutCard } from '../LayoutCard';
import { hasElevatedRole } from '@/lib/utils';

export const SocialEventAttendeesCard = ({ event }: { event: SocialEvent }) => {
    if (!event.publicAttendees) return null;

    const ownerDisplayText = hasElevatedRole(event.owner) ? event.owner.alias || "Administrador" : (event.owner.alias || event.owner.name || event.owner.email)

    return (
        <LayoutCard
            className="mt-6"
            title={`Quienes asistirán (${(event.attendees?.length ?? 0)+ 1})`}
            content={
                <div className="flex flex-wrap gap-4">
                    <div className="w-full">
                        <UserHoverCard user={event.owner} >
                            <Button variant="link" className="m-auto flex gap-2 p-0">
                                <UserAvatar user={event.owner} />
                                <p>
                                    {ownerDisplayText}
                                    <i className='text-gray-400'> Organizador</i>
                                </p>
                            </Button>
                        </UserHoverCard>
                    </div>

                    {
                        event.attendees?.length > 0
                            ? (
                                <>
                                    <Separator className="my-2" />
                                    <div className="flex flex-wrap justify-around gap-3 w-full">
                                        {event.attendees?.map((attendee) => (
                                            <UserHoverCard user={attendee.user} key={`attendee:${attendee.id}-${attendee.user.id}`} />
                                        ))}
                                    </div>
                                </>
                            )
                            : null
                    }

                </div>
            }
        />
    );
};
