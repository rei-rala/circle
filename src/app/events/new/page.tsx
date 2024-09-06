import { SocialEventForm } from "@/components/forms/socialEventForm/SocialEventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function NewEventPage() {
    return (
        <Card className="bg-[#222222] p-4 rounded-lg">
            <CardHeader>
                <CardTitle>Crear Evento</CardTitle>
            </CardHeader>
            <CardContent>
                <SocialEventForm />
            </CardContent>
        </Card>
    );
}
