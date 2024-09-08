import { SocialEventForm } from "@/components/forms/socialEventForm/SocialEventForm";
import { LayoutCard } from "@/components/LayoutCard";
import getServerSession from "@/lib/getServerSession";
import { redirect } from "next/navigation";

export default async function NewEventPage() {
    const session = await getServerSession();

    if (!session) redirect("/api/auth/signin?callbackUrl=/events/new");

    return (
        <LayoutCard
            title="Crear Evento"
            content={<SocialEventForm user={session?.user} />}
        />
    );
}
