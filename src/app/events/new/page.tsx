import { SocialEventForm } from "@/components/forms/socialEventForm/SocialEventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getServerSession from "@/lib/getServerSession";

export default async function NewEventPage() {
    const session = await getServerSession();

    return (
        <Card className="bg-[#222222] p-4 rounded-lg">
            <CardHeader>
                <CardTitle>Crear Evento</CardTitle>
            </CardHeader>
            <CardContent>
                <SocialEventForm user={session?.user} />
            </CardContent>
        </Card>
    );
}
