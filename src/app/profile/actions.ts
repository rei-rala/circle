"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export async function updateUserProfile(values: UserProfileDTO) {
    const session = await auth();
    const { alias, bio, location, socialMedia, hideEmail, hideImage } = values;

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
            socialMedia,
            hideEmail,
            hideImage
        }
    })

    console.log(updated)

    return Boolean(updated)
}