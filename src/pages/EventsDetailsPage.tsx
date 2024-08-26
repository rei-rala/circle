import React from 'react';
import Link from 'next/link';
import { SocialEventCard } from '@/components/SocialEventCard';
import { getSocialEventById } from '@/services/socialEvents.services';
import { notFound } from 'next/navigation';


export async function EventDetailsPageComponent({ id }: { id: string }) {
    const { data: event } = await getSocialEventById(id);

    if (!event) {
        return notFound();
    }
    return (
        <div className="overflow-auto">
            <Link href={`/events/${id}/edit`}>[debug] Editar</Link>

            <SocialEventCard event={event} />
        </div>
    );
};
