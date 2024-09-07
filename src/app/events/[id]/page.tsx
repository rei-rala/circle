import { Suspense } from 'react';
import Loading from '@/components/Loading';
import { EventDetailsPageComponent } from '@/pages/EventsDetailsPage';


export default function EventDetailsPage({ params: { id } }: { params: { id: string } }) {
    return (
        <Suspense fallback={<Loading title="Evento" />}>
            <EventDetailsPageComponent id={id} />
        </Suspense>
    );
};
