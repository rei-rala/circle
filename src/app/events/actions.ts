"use server";
//import "server-only";

import { auth } from "@/auth";
import { isDateInPast } from "@/lib/date-fns";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";


export async function updateEvent(values: SocialEventDTO) {
    try {
        const session = await auth();

        if (!(session?.user.id)) {
            return {
                error: "No user session found"
            };
        }
        const isAdmin = session.user.role === "admin";

        const event = await prisma.socialEvent.findUnique({
            where: { id: values.id },
        });

        if ((!event || event.ownerId !== session.user.id) && isAdmin) {
            return {
                error: "No tienes permisos para editar este evento"
            };
        }

        const { id, title, photo, description, date, place, public: isPublic } = values;
        let { time } = values;
        time = time || "00:00";

        const minAttendees = Math.max(values.minAttendees, 0);

        if (!title || !description || !date) return {
            error: "Missing required fields"
        };


        const dateUpdated = date
        const [hours, minutes] = time.split(":").map(Number);
        dateUpdated.setHours(hours);
        dateUpdated.setMinutes(minutes);

        if (isDateInPast(dateUpdated)) {
            return {
                error: "Date is in the past"
            };
        }

        const updated = await prisma.socialEvent.update({
            where: { id },
            data: {
                status: "PUBLISHED",
                title: title.trim(),
                photo,
                description: description.trim(),
                date: dateUpdated,
                time,
                place: place as any,
                public: isAdmin ? isPublic : false,
                minAttendees,
            }
        });


        if (updated) {
            revalidatePath(`/events/${id}`, "layout");
            revalidatePath(`/events/${id}/edit`, "layout");

            return { data: updated };
        }
    }
    catch (error: any) {
        console.error(error);
        return {
            error: error.message
        };
    }

    return {
        error: "Failed to update event"
    };
}

export async function createEvent(values: SocialEventDTO) {
    try {
        const session = await auth();

        if (!(session?.user.id)) {
            return {
                error: "No user session found"
            };
        }

        const isAdmin = session.user.role === "admin";

        const { title, photo, description, date, time, place, public: isPublic } = values;
        const minAttendees = Math.max(values.minAttendees, 0);

        if (!title || !description || !date) return {
            error: "Missing required fields"
        };

        // const dateUpdated = new Date(date)
        // dateUpdated.setHours(
        //     Number(time.split(":")[0]),
        //     Number(time.split(":")[1])
        // );

        if (isDateInPast(date)) {
            return {
                error: "Date is in the past"
            };
        }

        const created = await prisma.socialEvent.create({
            data: {
                publicAttendees: isAdmin ? isPublic : false,
                status: "PUBLISHED",
                title: title.trim(),
                photo,
                description: description.trim(),
                date,
                time,
                place: place as any,
                minAttendees,
                owner: { connect: { id: session.user.id } }
            }
        });

        if (created) {
            return { data: created };
        }
    }
    catch (error: any) {
        console.error(error);
        return {
            error: error.message
        };
    }

    return {
        error: "Failed to create event"
    };
}

export async function joinEvent(values: UserProfileDTO) {
}

export async function leaveEvent(values: UserProfileDTO) {
}
