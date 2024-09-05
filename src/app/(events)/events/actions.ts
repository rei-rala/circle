"use server";

import { auth } from "@/auth";
import { isDateInPast } from "@/lib/date-fns";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";


export async function updateEvent(values: SocialEventDTO) {
    try {
        const session = await auth();

        if (!(session?.user.id)) {
            return false;
        }

        const event = await prisma.socialEvent.findUnique({
            where: { id: values.id },
        });

        if ((!event || event.ownerId !== session.user.id) && session.user.role !== 'admin') {
            return false;
        }

        const { id, title, photo, description, date, place } = values;
        let { time } = values;
        time = time || "00:00";

        const minAttendees = Math.min(values.minAttendees, 0);

        if (!title || !description || !date) return false;


        const dateUpdated = date
        const [hours, minutes] = time.split(":").map(Number);
        dateUpdated.setHours(hours);
        dateUpdated.setMinutes(minutes);

        if (isDateInPast(dateUpdated)) {
            return false;
        }

        const updated = await prisma.socialEvent.update({
            where: { id },
            data: {
                status: "PUBLISHED",
                title,
                photo,
                description,
                date: dateUpdated,
                time,
                place: place as any,
                minAttendees,
            }
        });


        if (updated) {
            revalidatePath(`/events/${id}`, "layout");
            revalidatePath(`/events/${id}/edit`, "layout");

            return updated;
        }
    }
    catch (error: any) {
        console.error(error);
    }

    return false;
}

export async function createEvent(values: SocialEventDTO) {
    try {
        const session = await auth();

        if (!(session?.user.id)) {
            return false;
        }

        const { title, photo, description, date, time, place } = values;
        const minAttendees = Math.min(values.minAttendees, 0);

        if (!title || !description || !date) return false;

        // const dateUpdated = new Date(date)
        // dateUpdated.setHours(
        //     Number(time.split(":")[0]),
        //     Number(time.split(":")[1])
        // );

        if (isDateInPast(date)) {
            return false;
        }

        const created = await prisma.socialEvent.create({
            data: {
                publicAttendees: true,
                status: "PUBLISHED",
                title,
                photo,
                description,
                date,
                time,
                place: place as any,
                minAttendees,
                owner: { connect: { id: session.user.id } }
            }
        });

        if (created) {
            return created;
        }
    }
    catch (error: any) {
        console.error(error);
    }

    return false;
}

export async function joinEvent(values: UserProfileDTO) {
}

export async function leaveEvent(values: UserProfileDTO) {
}
