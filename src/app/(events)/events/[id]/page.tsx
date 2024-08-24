import { SocialEventCard } from '../../../../components/SocialEventCard';
import { Suspense } from 'react';
import { GoBackButton } from '@/components/GoBackButton';


async function EventDetailsPage({ params }: { params: { id: string } }) {
    const id = params.id;
    const res = await fetch("http://localhost:3000/events.json")
    const events: SocialEvent[] = await res.json()
    const event = events.find(e => e.id === id)

    if (!event) {
        return <h1 className='text-white'>no encontrado {id}</h1>
    }
    return (
        <div className="overflow-auto">
            <Suspense fallback="Cargando card de evento">
                <SocialEventCard event={event} />
            </Suspense>
            <GoBackButton />
        </div>
    );
};

export default EventDetailsPage;
