//import "server-only";
"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function updateUserProfile(values: UserProfileDTO) {
    const session = await auth();
    const { alias, bio, location, phone, socialMedia, hideEmail, hideImage, hidePhone } = values;

    if (!(session?.user.id)) {
        return false;
    }

    if (socialMedia.length > 5) socialMedia.length = 5;

    const updated = await prisma.user.update({
        where: { id: session.user.id },
        data: {
            alias,
            bio,
            location,
            phone,
            socialMedia,
            hideEmail,
            hideImage,
            hidePhone,
        }
    })

    return Boolean(updated)
}