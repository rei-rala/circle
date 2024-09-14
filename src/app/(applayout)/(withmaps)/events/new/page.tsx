import { SocialEventForm } from "@/components/forms/socialEventForm/SocialEventForm";
import { LayoutCard } from "@/components/LayoutCard";
import getServerSession from "@/lib/getServerSession";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crear Nuevo Evento",
  description: "Crea un nuevo evento social en nuestra plataforma.",
};

export default async function NewEventPage() {
    // Fetch the user session
    const session = await getServerSession();

    // Redirect to login if there's no session
    if (!session) {
        redirect("/login?callbackUrl=/events/new");
    }

    const { user } = session;
    const isAdmin = user.role?.toUpperCase() === "ADMIN";

    // Check user status and redirect if necessary
    if (user.banned) {
        redirect("/profile/banned");
    } else if (!user.admitted) {
        redirect("/profile/pending");
    }

    // For non-admin users, check if they have any upcoming events
    if (!isAdmin) {
        try {
            const upcomingEvents = await prisma.socialEvent.findFirst({
                where: {
                    ownerId: user.id,
                    date: { gte: new Date() },
                    deleted: false
                },
                orderBy: { date: 'asc' }
            });

            // If there's an upcoming event, redirect to that event's page
            if (upcomingEvents) {
                redirect(`/events/${upcomingEvents.id}`);
            }
        } catch (error) {
            console.error("Error fetching upcoming events:", error);
            // You might want to add more sophisticated error handling here
            // For example, redirecting to an error page or showing an error message
        }
    }

    // Render the new event form
    return (
        <LayoutCard
            title="Crear Evento"
            content={<SocialEventForm adminOptions={isAdmin} />}
        />
    );
}