"use server";

import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/uploadImage';
import { auth } from '@/auth';

export async function POST(request: NextRequest) {
    try {
        const session = await auth();

        if (!session?.user.id) {
            return NextResponse.json({ error: "No se encontró sesión de usuario" }, { status: 401 });
        }

        const data = await request.json();
        const { image } = data;

        if (!image) {
            return NextResponse.json({ error: "No se proporcionó ninguna imagen" }, { status: 400 });
        }

        // Decode base64 image
        const buffer = Buffer.from(image.split(',')[1], 'base64');

        // Upload image
        const imageUrl = await uploadImage(buffer);

        return NextResponse.json({ url: imageUrl }, { status: 200 });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: "Error al subir la imagen" }, { status: 500 });
    }
}