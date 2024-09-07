"use client"

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { UserHoverCard } from '../UserHoverCard';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { UserAvatar } from '../UserAvatar';

export const SocialEventAttendeesCard = ({ event }: { event: SocialEvent }) => {
    const { attendees } = event;

    return (
        <Card className="bg-[#222222] p-4 rounded-lg text-white mt-4">
            <CardHeader>
                <CardTitle>Quienes asistirán</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                        <UserHoverCard user={event.owner}>
                            <Button variant="link" className="flex gap-2 p-0">
                                <UserAvatar user={event.owner} />
                                <p>
                                    {event.owner.alias || event.owner.name}
                                    <i className='text-gray-400'> (Organizador)</i>
                                </p>
                            </Button>
                        </UserHoverCard>
                    </div>

                    {attendees?.length > 0 && <Separator className="my-2" />}

                    {attendees?.map((attendee) => (
                        <div key={attendee.id} className="flex items-center gap-2">
                            <Avatar>
                                <AvatarImage src={attendee.user.image || undefined} alt={attendee.user.name || "Desconocido"} />
                                <AvatarFallback>{attendee.user.name?.charAt(0) || "?"}</AvatarFallback>
                            </Avatar>
                            <span>{attendee.user.name}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card >
    );
};