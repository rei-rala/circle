import { SocialEventForm } from "@/components/socialEventForm/SocialEventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSocialEventById } from "@/services/socialEvents.services";

export default async function EditEventPage({
    params,
}: {
    params: { id: string };
}) {
    const { data: socialEvent } = await getSocialEventById(params.id);

    return (
        <Card className="bg-[#222222] p-4 rounded-lg">
            <CardHeader>
                <CardTitle>Editar Evento</CardTitle>
            </CardHeader>
            <CardContent>
                <SocialEventForm socialEvent={socialEvent} />
            </CardContent>
        </Card>
    );
}
