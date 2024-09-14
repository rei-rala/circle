import "server-only"
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

export async function joinEvent(formData: FormData): Promise<ApiResponse<boolean>> {
    "use server";
    const session = await auth();
    const eventId = formData.get("eventId");

    if (!session?.user?.id) {
        return { error: "No hay sesión" };
    }

    if (!eventId) {
        return { error: "Verifique los datos ingresados" };
    }

    if (!session.user.admitted) {
        return { error: 'No puedes unirte a eventos. Tu cuenta no está admitida.' };
    } else if (session.user.banned) {
        return { error: 'Estás bloqueado. No puedes unirte a eventos.' };
    }

    try {
        const event = await prisma.socialEvent.findFirst({
            where: {
                id: String(eventId),
                deleted: false,
                date: {
                    gt: new Date(),
                },
            },
            include: {
                attendees: true,
            }
        });

        if (!event) {
            return { error: "No se encontró el evento o ya no se puede unir" };
        }

        if (event.attendees.find(a => a.userId === session.user.id && !a.leftAt)) {
            return { error: "Ya te has unido a este evento" }
        }

        const updatedSocialEvent = await prisma.socialEvent.update({
            where: {
                id: String(eventId),
            },
            data: {
                attendees: {
                    create: {
                        userId: session.user.id,
                        joinedAt: new Date(),
                    }
                }
            }
        });

        if (updatedSocialEvent) {
            revalidatePath(`/events/${eventId}`);

            return { data: true };
        }

        return { error: "No se pudo actualizar el evento" };
    } catch (error) {
        console.error("Error al unirse al evento:", error);
        return { error: "Failed to join event" };
    }
}