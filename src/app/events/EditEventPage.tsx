import { SocialEventForm } from "@/components/forms/socialEventForm/SocialEventForm";
import { LayoutCard } from "@/components/LayoutCard";
import { isDateInPast } from "@/lib/date-fns";
import getServerSession from "@/lib/getServerSession";
import { cn } from "@/lib/utils";
import { prisma } from "@/prisma";
import { notFound, redirect } from "next/navigation";

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
            deleted: false,
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

    const isAdmin = session?.user.role?.toUpperCase() === "ADMIN";
    const isUserBannedOrPendingAdmission = !session?.user.admitted || session?.user.banned
    const isOwner = socialEvent?.ownerId === session?.user.id;

    if (
        (session === null || socialEvent === null) &&
        !(isAdmin || isOwner )
    ) {
        return notFound();
    }

    if (isUserBannedOrPendingAdmission) {
        const redirectUrl = "/profile" + (session?.user.admitted ? "/banned" : "/pending");
        redirect(redirectUrl);
    }

    return (
        <>
            {
                isDateInPast(socialEvent?.date) && (
                    <LayoutCard
                        className={cn(
                            "text-center rounded-lg",
                            isAdmin ? "border-yellow-600" : "border-red-600 pb-6"
                        )}
                        title="Este evento ya ha pasado"
                        content={
                            isAdmin
                                ? null
                                : (
                                    <p className="text-[#aaa]">
                                        No puedes editar eventos que ya han pasado.
                                    </p>
                                )
                        }
                    />
                )
            }

            <LayoutCard
                title="Editar Evento"
                content={
                    <SocialEventForm
                        socialEvent={socialEvent}
                        mode={mode}
                        adminOptions={isAdmin}
                        disabled={isDateInPast(socialEvent?.date)}
                    />
                }
            />
        </>
    );
}
