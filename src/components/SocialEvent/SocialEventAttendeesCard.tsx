"use client"

import { UserHoverCard } from '../UserHoverCard';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { UserAvatar } from '../UserAvatar';
import { LayoutCard } from '../LayoutCard';

export const SocialEventAttendeesCard = ({ event }: { event: SocialEvent }) => {
    if (!event.publicAttendees) return null;

    const ownerDisplayText = event.owner.role?.toUpperCase() === "ADMIN" ? event.owner.alias || "Administrador" : (event.owner.alias || event.owner.name || event.owner.email)

    return (
        <LayoutCard
            className="mt-6"
            title="Quienes asistirán"
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
                                    <h3 className='text-lg font-semibold w-full'>Otros asistentes ({event.attendees.length})</h3>
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
