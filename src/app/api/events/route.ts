import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { isDateInPast } from '@/lib/date-fns';
import { prisma } from '@/prisma';
import { revalidatePath } from 'next/cache';

export async function POST(request: Request) {
    try {
        const session = await auth();

        // Check if user is authenticated
        if (!session?.user.id) {
            return NextResponse.json({ error: "No user session found" }, { status: 401 });
        }

        const isAdmin = session.user.role === "admin";

        if (!isAdmin) {
            // Check if the user already has an active SocialEvent
            const existingEvent = await prisma.socialEvent.findFirst({
                where: {
                    ownerId: session.user.id,
                    status: "PUBLISHED",
                    date: {
                        gte: new Date()
                    }
                }
            });

            if (existingEvent) {
                // Redirect the user to their existing event
                return NextResponse.json({ redirect: `/events/${existingEvent.id}` }, { status: 303 });
            }
        }

        const body: SocialEventDTO = await request.json();
        const { title, photo, description, date, time, place, public: isPublic, minAttendees, publicAttendees } = body;

        // Validate required fields
        if (!title || !description || !date) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const eventDate = new Date(date);
        // Check if the event date is in the past
        if (isDateInPast(eventDate)) {
            return NextResponse.json({ error: "Date is in the past" }, { status: 400 });
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
                publicAttendees: isAdmin ? isPublic : true,
                owner: { connect: { id: session.user.id } }
            }
        });

        if (created) {
            revalidatePath('/events');
            return NextResponse.json({ data: created, message: "Event created successfully" }, { status: 201 });
        } else {
            return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
        }
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}


export async function PUT(request: Request) {
    try {
        const session = await auth();

        // Check if user is authenticated
        if (!session?.user.id) {
            return NextResponse.json({ error: "No user session found" }, { status: 401 });
        }

        const isAdmin = session.user.role === "admin";
        const body: SocialEventDTO = await request.json();
        const { id, title, photo, description, date, time, place, public: isPublic, minAttendees, publicAttendees } = body;

        // Validate required fields
        if (!id || !title || !description || !date) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Parse and set the event date and time
        const dateUpdated = new Date(date);
        const [hours, minutes] = time.split(":").map(Number);
        dateUpdated.setHours(hours);
        dateUpdated.setMinutes(minutes);

        // Check if the updated date is in the past
        if (isDateInPast(dateUpdated)) {
            return NextResponse.json({ error: "Date is in the past" }, { status: 400 });
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
            return NextResponse.json({ data: updated, message: "Event updated successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Failed to update event" }, { status: 500 });
        }
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const session = await auth();

        // Check if user is authenticated
        if (!session?.user.id) {
            return NextResponse.json({ error: "No user session found" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        // Validate event ID
        if (!id) {
            return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
        }

        // Fetch the event and its owner
        const event = await prisma.socialEvent.findUnique({
            where: { id },
            include: { owner: true }
        });

        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        // Check if the user is authorized to delete the event
        if (event.owner.id !== session.user.id && session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized to delete this event" }, { status: 403 });
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
            return NextResponse.json({ data: true, message: "Event deleted successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
        }
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
