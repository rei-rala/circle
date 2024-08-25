import { GoBackButton } from "@/components/GoBackButton";
import { SocialEventForm } from "@/components/socialEventForm/SocialEventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isDateInPast } from "@/lib/date-fns";
import { getSocialEventById } from "@/services/socialEvents.services";

export default async function EditEventPage({
    params,
}: {
    params: { id: string };
}) {
    const { data: socialEvent } = await getSocialEventById(params.id);

    return (
        <>
            {
                socialEvent?.date && isDateInPast(socialEvent.date) && (
                    <Card className="text-center p-4 rounded-lg mb-2 border-red-600">
                        <CardHeader className="p-0">
                            <CardTitle>Este evento ya ha pasado</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[#aaa]">
                                No puedes editar eventos que ya han pasado.
                            </p>
                        </CardContent>
                    </Card>
                )
            }

            <Card className="bg-[#222222] p-4 rounded-lg">
                <CardHeader>
                    <CardTitle>Editar Evento</CardTitle>
                </CardHeader>
                <CardContent>
                    <SocialEventForm socialEvent={socialEvent} />
                </CardContent>
            </Card>
        </>
    );
}
