import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function PUT(request: Request) {
    const session = await auth();
    if (!session?.user.id) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const isAdmin = session.user.role?.toUpperCase() === 'ADMIN';
    const values: UserProfileDTO = await request.json();
    const { alias, bio, location, phone, socialMedia, hideEmail, hideImage, hidePhone } = values;

    if (socialMedia.length > 5) socialMedia.length = 5;

    try {
        const updated = await prisma.user.update({
            where: { id: session.user.id },
            data: {
                alias,
                bio,
                location,
                phone,
                socialMedia,
                hideEmail: isAdmin ? hideEmail : false,
                hideImage: isAdmin ? hideImage : false,
                hidePhone: isAdmin ? hidePhone : false,
            }
        });

        return NextResponse.json({ success: true, user: updated, message: 'Perfil actualizado correctamente' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}