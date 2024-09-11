import { Suspense } from 'react';
import Loading from '@/components/Loading';
import { EventDetailsPageComponent } from '../EventsDetailsPage';
import { Metadata, ResolvingMetadata } from 'next';
import { prisma } from "@/prisma"
import { BRAND } from '@/constants';

type Props = {
    params: { id: string }
}
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = params.id;
    const event = await prisma.socialEvent.findUnique({
        where: {
            id: id,
            public: true,
            deletedAt: null,
        }
    })

    if (!event) {
        return {
            title: 'Event Not Found',
        }
    }

    return {
        title: event.title,
        description: event.description,
        openGraph: {
            title: event.title,
            description: event.description,
            type: 'article',
            url: `https://thecircle.com.ar/events/${id}`,
            images: event.photo ? [
                {
                    url: event.photo,
                    width: 1200,
                    height: 630,
                    alt: event.title,
                }
            ] : [],
            siteName: BRAND,
            locale: 'es_AR',
            publishedTime: event.createdAt.toISOString(),
            modifiedTime: event.updatedAt.toISOString(),
            authors: [BRAND],
            section: 'Events',
            tags: ['social', 'event', 'Buenos Aires'],
        },
        twitter: {
            card: 'summary_large_image',
            title: event.title,
            description: event.description,
            images: event.photo ? [event.photo] : [],
        },
        alternates: {
            canonical: `https://thecircle.com.ar/events/${id}`,
        },
    }
}

export default function EventDetailsPage({ params: { id } }: Props) {
    return (
        <Suspense fallback={<Loading title="Evento" />}>
            <EventDetailsPageComponent id={id} />
        </Suspense>
    );
};
