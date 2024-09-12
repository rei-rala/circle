"use server";

import { NextResponse } from 'next/server';
import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { User } from 'next-auth';

export async function PUT(request: Request): Promise<NextApiResponse<User>> {
    const session = await auth();

    if (!session?.user.id) {
        return NextResponse.json({ error: "No se ha iniciado sesión" }, { status: 401 });
    }

    if (session.user.banned) {
        return NextResponse.json({ error: 'Estás bloqueado. No puedes editar tu perfil.' }, { status: 403 });
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

        if (updated) {
            return NextResponse.json({ data: updated, message: 'Perfil actualizado correctamente' });
        }
        return NextResponse.json({ error: 'No se ha podido actualizar el perfil' }, { status: 500 });


    } catch (error) {
        console.error('Error updating user profile:', error);
        return NextResponse.json({ error: 'Failed to update profile' }, { status: 500 });
    }
}