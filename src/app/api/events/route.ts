import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { isDateInPast } from '@/lib/date-fns';
import { prisma } from '@/prisma';

export async function POST(request: Request) {
    try {
        const session = await auth();

        if (!session?.user.id) {
            return NextResponse.json({ error: "No user session found" }, { status: 401 });
        }

        const isAdmin = session.user.role === "admin";
        const body = await request.json();
        const { title, photo, description, date, time, place, public: isPublic, minAttendees } = body;

        if (!title || !description || !date) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const eventDate = new Date(date);
        if (isDateInPast(eventDate)) {
            return NextResponse.json({ error: "Date is in the past" }, { status: 400 });
        }

        const created = await prisma.socialEvent.create({
            data: {
                publicAttendees: isAdmin ? isPublic : false,
                status: "PUBLISHED",
                title: title.trim(),
                photo,
                description: description.trim(),
                date: eventDate,
                time,
                place: place as any,
                minAttendees: Math.max(minAttendees, 0),
                owner: { connect: { id: session.user.id } }
            }
        });

        if (created) {
            return NextResponse.json({ data: created }, { status: 201 });
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

        if (!session?.user.id) {
            return NextResponse.json({ error: "No user session found" }, { status: 401 });
        }

        const isAdmin = session.user.role === "admin";
        const body = await request.json();
        const { id, title, photo, description, date, time, place, public: isPublic, minAttendees } = body;

        if (!id || !title || !description || !date) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const dateUpdated = new Date(date);
        const [hours, minutes] = time.split(":").map(Number);
        dateUpdated.setHours(hours);
        dateUpdated.setMinutes(minutes);

        if (isDateInPast(dateUpdated)) {
            return NextResponse.json({ error: "Date is in the past" }, { status: 400 });
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
                minAttendees: Math.max(minAttendees, 0),
            }
        });

        if (updated) {
            return NextResponse.json({ data: updated }, { status: 200 });
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

        if (!session?.user.id) {
            return NextResponse.json({ error: "No user session found" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
        }

        const event = await prisma.socialEvent.findUnique({
            where: { id },
            include: { owner: true }
        });

        if (!event) {
            return NextResponse.json({ error: "Event not found" }, { status: 404 });
        }

        if (event.owner.id !== session.user.id && session.user.role !== "admin") {
            return NextResponse.json({ error: "Unauthorized to delete this event" }, { status: 403 });
        }

        const deleted = await prisma.socialEvent.update({
            where: { id },
            data: { 
                status: "CANCELLED",
                deletedAt: new Date() 
            }
        });

        if (deleted) {
            return NextResponse.json({ message: "Event deleted successfully" }, { status: 200 });
        } else {
            return NextResponse.json({ error: "Failed to delete event" }, { status: 500 });
        }
    } catch (error: any) {
        console.error(error);
        return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
    }
}
