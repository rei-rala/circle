import { SocialEventForm } from "@/components/forms/socialEventForm/SocialEventForm";
import { LayoutCard } from "@/components/LayoutCard";
import getServerSession from "@/lib/getServerSession";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

export default async function CreateEventPage() {
    const userSession = await getServerSession();

    if (!userSession) redirect("/login?callbackUrl=/events/new");
    const isUserAdmin = userSession.user.role?.toUpperCase() === "ADMIN";

    if (!isUserAdmin) {
        // por que no me busca por deletedAt === null XD
        const userUpcomingEvent = await prisma.socialEvent.findMany({
            where: {
                ownerId: userSession.user.id,
                date: {
                    gte: new Date()
                },
            },
            orderBy: {
                date: 'asc'
            }
        });

        const firstNotDeletedEvent = userUpcomingEvent.find(event => event.deletedAt === null);

        if (firstNotDeletedEvent) {
            redirect(`/events/${firstNotDeletedEvent.id}`);
        }
    }

    return (
        <LayoutCard
            title="Crear Evento"
            content={<SocialEventForm user={userSession?.user} />}
        />
    );
}
