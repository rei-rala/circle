"use server";

import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { isDateInPast } from '@/lib/date-fns';
import { prisma } from '@/prisma';
import { revalidatePath } from 'next/cache';
import { isValid } from 'date-fns';
import { hasElevatedRole } from '@/lib/utils';

export async function POST(request: Request): Promise<NextApiResponse<SocialEvent>> {
    try {
        const session = await auth();

        // Check if user is authenticated
        if (!session?.user.id) {
            return NextResponse.json({ error: "No se encontró sesión de usuario" }, { status: 401 });
        }

        const isAdmin = hasElevatedRole(session);
        const isUserBanned = session.user.banned;

        if (isUserBanned) {
            return NextResponse.json({ error: "No tienes permisos para crear eventos. Tu usuario está bloqueado." }, { status: 403 });
        }

        if (!isAdmin) {
            // Check if the user already has an active SocialEvent
            const existingEvent = await prisma.socialEvent.findFirst({
                where: {
                    ownerId: session.user.id,
                    status: "PUBLISHED",
                    date: {
                        gte: new Date()
                    },
                    deleted: false
                }
            });

            if (existingEvent) {
                // Redirect the user to their existing event
                return NextResponse.json({ redirect: `/events/${existingEvent.id}`, message: "Ya tienes un evento activo. Solo puedes tener un evento activo a la vez." }, { status: 303 });
            }
        }

        const body: SocialEventDTO = await request.json();
        const { title, photo, description, date, time, place, public: isPublic, minAttendees, publicAttendees } = body;

        // Validate required fields
        if (!title.trim() || !description.trim() || !date || isValid(date)) {
            return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
        }

        const eventDate = new Date(date);
        // Check if the event date is in the past
        if (isDateInPast(eventDate)) {
            return NextResponse.json({ error: "La fecha está en el pasado" }, { status: 400 });
        }

        // Create the event in the database
        const created = await prisma.socialEvent.create({
            data: {
                status: "PUBLISHED",
                title: title.trim(),
                photo,
                description: description.trim(),
                date: eventDate,
                time,
                place: place as any,
                minAttendees: Math.max(minAttendees, 0),
                public: isAdmin ? isPublic : false,
                publicAttendees: isAdmin ? publicAttendees : true,
                owner: { connect: { id: session.user.id } }
            }
        });

        if (created) {
            revalidatePath('/events');

            if (created.public) {
                revalidatePath('/');
            }

            return NextResponse.json({ data: created, message: "Evento creado exitosamente" }, { status: 201 });
        } else {
            return NextResponse.json({ error: "Error al crear el evento" }, { status: 500 });
        }
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}


export async function PUT(request: Request): Promise<NextApiResponse<SocialEvent>> {
    try {
        const session = await auth();

        // Check if user is authenticated
        if (!session?.user.id) {
            return NextResponse.json({ error: "No se encontró sesión de usuario" }, { status: 401 });
        }

        const isAdmin = hasElevatedRole(session);
        const isUserBanned = session.user.banned;

        if (isUserBanned) {
            return NextResponse.json({ error: "No tienes permisos para crear eventos. Tu usuario está bloqueado." }, { status: 403 });
        }

        const body: SocialEventDTO = await request.json();
        const { id, title, photo, description, date, time, place, public: isPublic, minAttendees, publicAttendees } = body;

        // Validate required fields
        if (!id || !title || !description || !date) {
            return NextResponse.json({ error: "Faltan campos requeridos" }, { status: 400 });
        }

        // Parse and set the event date and time
        const dateUpdated = new Date(date);
        const [hours, minutes] = time.split(":").map(Number);
        dateUpdated.setHours(hours);
        dateUpdated.setMinutes(minutes);

        // Check if the updated date is in the past
        if (isDateInPast(dateUpdated)) {
            return NextResponse.json({ error: "La fecha está en el pasado" }, { status: 400 });
        }

        // Update the event in the database
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
                minAttendees: Math.max(minAttendees, 0),
                publicAttendees: isAdmin ? publicAttendees : true,
            }
        });

        if (updated) {
            revalidatePath(`/events/${id}`);
            revalidatePath('/events');

            if (updated.public) {
                revalidatePath('/');
            }

            return NextResponse.json({ data: updated, message: "Evento actualizado exitosamente" }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Error al actualizar el evento" }, { status: 500 });
        }
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}

export async function DELETE(request: Request): Promise<NextApiResponse<boolean>> {
    try {
        const session = await auth();

        // Check if user is authenticated
        if (!session?.user.id) {
            return NextResponse.json({ error: "No se encontró sesión de usuario" }, { status: 401 });
        }

        const isAdmin = hasElevatedRole(session);
        const isUserBanned = session.user.banned;

        if (isUserBanned) {
            return NextResponse.json({ error: "No tienes permisos para eliminar eventos. Tu usuario está bloqueado." }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        // Validate event ID
        if (!id) {
            return NextResponse.json({ error: "Falta el ID del evento" }, { status: 400 });
        }

        let event: SocialEvent | null = null;

        if (isAdmin) {
            event = await prisma.socialEvent.findUnique({
                where: { id, deleted: false },
                include: { owner: true }
            }) as SocialEvent | null;
        } else {
            event = await prisma.socialEvent.findUnique({
                where: { id, ownerId: session.user.id, deleted: false },
                include: { owner: true }
            }) as SocialEvent | null;
        }

        if (!event) {
            return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
        }

        // Check if the user has permission to delete the event
        if (!isAdmin && event.ownerId !== session.user.id) {
            return NextResponse.json({ error: "No tienes permiso para eliminar este evento" }, { status: 403 });
        }

        // Soft delete the event by updating its status and setting deletedAt
        const deleted = await prisma.socialEvent.update({
            where: { id },
            data: {
                status: "CANCELLED",
                deletedAt: new Date()
            }
        });

        if (deleted) {
            revalidatePath('/events');
            revalidatePath(`/events/${id}`);

            if (deleted.public) {
                revalidatePath('/');
            }

            return NextResponse.json({ data: true, message: "Evento eliminado exitosamente" }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Error al eliminar el evento" }, { status: 500 });
        }
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
