import { SocialEventForm } from "@/components/forms/socialEventForm/SocialEventForm";
import { LayoutCard } from "@/components/LayoutCard";
import getServerSession from "@/lib/getServerSession";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";

export default async function NewEventPage() {
    const session = await getServerSession();
    const isAdmin = session?.user.role?.toUpperCase() === "ADMIN";

    if (!session) redirect("/login?callbackUrl=/events/new");

    if (session.user.banned) {
        redirect("/profile/banned");
    } else if (!session.user.admitted) {
        redirect("/profile/pending");
    }

    if (!isAdmin) {
        const upcomingEvents = await prisma.socialEvent.findFirst({
            where: {
                ownerId: session.user.id,
                date: { gte: new Date() },
                deleted: false
            },
            orderBy: { date: 'asc' }
        });

        if (upcomingEvents) {
            redirect(`/events/${upcomingEvents.id}`);
        }
    }

    return (
        <LayoutCard
            title="Crear Evento"
            content={<SocialEventForm adminOptions={isAdmin} />}
        />
    );
}
