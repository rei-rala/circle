"use client"

import { UserHoverCard } from '../UserHoverCard';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { UserAvatar } from '../UserAvatar';
import { LayoutCard } from '../LayoutCard';

export const SocialEventAttendeesCard = ({ event }: { event: SocialEvent }) => {
    const { attendees } = event;

    return (
        <LayoutCard
            className="mt-6"
            title="Quienes asistirán"
            content={
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                        <UserHoverCard user={event.owner}>
                            <Button variant="link" className="flex gap-2 p-0">
                                <UserAvatar user={event.owner} />
                                <p>
                                    {event.owner.alias || event.owner.name}
                                    <i className='text-gray-400'> Organizador</i>
                                </p>
                            </Button>
                        </UserHoverCard>
                    </div>

                    {attendees?.length && attendees.length > 0 && <Separator className="my-2" />}

                    {attendees?.map((attendee) => (
                        <div key={attendee.id} className="flex items-center gap-2">
                            <UserAvatar key={attendee.id} user={attendee.user} />
                            <span>{attendee.user.name}</span>
                        </div>
                    ))}
                </div>
            }
        />
    );
};