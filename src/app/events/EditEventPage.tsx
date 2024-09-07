import { SocialEventForm } from "@/components/forms/socialEventForm/SocialEventForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { isDateInPast } from "@/lib/date-fns";
import getServerSession from "@/lib/getServerSession";
import { prisma } from "@/prisma";
import { notFound } from "next/navigation";

export async function EditEventPageComponent({
    id,
    mode,
}: {
    id: string,
    mode: EditorMode
}) {
    const session = await getServerSession();
    const socialEvent = await prisma.socialEvent.findUnique({
        where: {
            id,
        },
        include: {
            owner: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                }
            }
        }
    }) as SocialEvent | null

    if (
        (session === null || socialEvent === null) &&
        (session?.user.role !== "admin" || !(socialEvent?.ownerId === session?.user.id))
    ) {
        return notFound();
    }

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
                    <SocialEventForm socialEvent={socialEvent} mode={mode} user={session?.user} />
                </CardContent>
            </Card>
        </>
    );
}
