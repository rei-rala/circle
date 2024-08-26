import React from 'react';
import Link from 'next/link';
import { SocialEventCard } from '@/components/SocialEventCard';
import { getSocialEventById } from '@/services/socialEvents.services';


export async function EventDetailsPageComponent({ id }: { id: string }) {
    const { data: event } = await getSocialEventById(id);
    console.log(event)

    if (!event) {
        return <h1 className='text-white'>[debug] no encontrado {id}</h1>
    }
    return (
        <div className="overflow-auto">
            <Link href={`/events/${id}/edit`}>[debug] Editar</Link>

            <SocialEventCard event={event} />
        </div>
    );
};
