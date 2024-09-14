import Loading from "@/components/Loading";
import { Suspense } from "react";
import { EditEventPageComponent } from "./EditEventPage";
import { prisma } from "@/prisma";
import { notFound } from "next/navigation";

export default async function EditEventPage({ params: { id } }: { params: { id: string } }) {
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

    if (!socialEvent) {
        return notFound();
    }

    return (
        <Suspense fallback={<Loading title="tu evento" />}>
            <EditEventPageComponent mode="edit" socialEvent={socialEvent} />
        </Suspense>
    );
}
