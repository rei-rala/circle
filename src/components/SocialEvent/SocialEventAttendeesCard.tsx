"use client"

import { UserHoverCard } from '../UserHoverCard';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { UserAvatar } from '../UserAvatar';
import { LayoutCard } from '../LayoutCard';

export const SocialEventAttendeesCard = ({ event }: { event: SocialEvent }) => {
    if (!event.publicAttendees) return null;

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
                                    {event.owner.alias || event.owner.name}
                                    <i className='text-gray-400'> Organizador</i>
                                </p>
                            </Button>
                        </UserHoverCard>
                    </div>

                    {
                        event.attendees?.length && event.attendees.length > 0
                            ? <Separator className="my-2" />
                            : null
                    }

                    <div className="flex flex-wrap justify-around gap-3">
                        {(event.attendees.concat(event.attendees, event.attendees, event.attendees, event.attendees, event.attendees, event.attendees))?.map((attendee) => (
                            <UserHoverCard user={attendee.user} key={attendee.id}/>
                            
                        ))}
                    </div>
                </div>
            }
        />
    );
};
