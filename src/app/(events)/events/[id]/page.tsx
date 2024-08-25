import { SocialEventCard } from '../../../../components/SocialEventCard';
import { Suspense } from 'react';
import { GoBackButton } from '@/components/GoBackButton';
import { getSocialEventById } from '@/services/socialEvents.services';
import Link from 'next/link';


async function EventDetailsPage({ params }: { params: { id: string } }) {
    const id = params.id;
    const { data: event } = await getSocialEventById(id);

    if (!event) {
        return <h1 className='text-white'>no encontrado {id}</h1>
    }
    return (
        <div className="overflow-auto">
            <Link href={`/events/${id}/edit`}>Editar</Link>

            <Suspense fallback="Cargando card de evento">
                <SocialEventCard event={event} />
            </Suspense>
            <GoBackButton />
        </div>
    );
};

export default EventDetailsPage;
