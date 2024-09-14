import { Suspense } from 'react';
import Loading from '@/components/Loading';
import { EventDetailsPageComponent } from '../EventsDetailsPage';
import { Metadata, ResolvingMetadata } from 'next';
import { prisma } from "@/prisma"
import { BRAND } from '@/constants';
import { notFound } from "next/navigation";
import getServerSession from "@/lib/getServerSession";

type Props = {
    params: { id: string }
}

// This function generates metadata for the event page
// It's called separately for each request, allowing for dynamic metadata generation
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const id = params.id;
    const event = await prisma.socialEvent.findUnique({
        where: {
            id: id,
            public: true,
            deleted: false
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

// Revalidate this page every 10 minutes (ISR)
export const revalidate = 600; 

// This is the main page component for the event details
// It uses Suspense for better loading UX
export default async function EventDetailsPage({ params: { id } }: Props) {
    const session = await getServerSession();

    if (!session?.user) {
        return notFound();
    }

    const event = await prisma.socialEvent.findUnique({
        where: {
            id: id,
            deleted: false
        },
        include: {
            owner: true,
            attendees: {
                include: {
                    user: true
                }
            }
        }
    }) as unknown as SocialEvent | null;

    if (!event) return notFound();

    return (
        <Suspense fallback={<Loading title="Evento" />}>
            <EventDetailsPageComponent socialEvent={event} session={session} />
        </Suspense>
    );
}