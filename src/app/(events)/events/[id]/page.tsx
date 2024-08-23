import { EventCardProps } from '@/components/EventCard';
import Link from 'next/link';
import { EventCardCustom as EventCardCustom } from './EventCardCustom';
import { Suspense } from 'react';


async function EventDetailsPage({ params }: { params: { id: string } }) {
    const id = params.id;
    const res = await fetch("http://localhost:3000/events.json")
    const events: EventCardProps[] = await res.json()
    const event = events.find(e => e.id === id)

    if (!event) {
        return <h1 className='text-white'>no encontrado {id}</h1>
    }
    return (
        <div className="overflow-auto">
            <div className="grid gap-4">
                <Suspense fallback="Cargando card de evento">
                    <EventCardCustom event={event} />
                </Suspense>
                <Link href="/events" prefetch={false} className="m-auto p-4 text-[#aaa] hover:text-white">Volver a eventos</Link>
            </div>

        </div>
    );
};

export default EventDetailsPage;
