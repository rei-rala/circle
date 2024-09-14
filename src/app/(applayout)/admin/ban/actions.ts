"use server";

import { auth } from "@/auth";
import { hasElevatedRole } from "@/lib/utils";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";


export async function banUser(formData: FormData) {
    'use server'
    try {
        const userId = formData.get("userId") as string;
        const banReason = formData.get("banReason") as string;
        const session = await auth()

        const isAdmin = hasElevatedRole(session);
        const isUserBanned = session?.user.banned;

        if (!isAdmin || isUserBanned) {
            return { error: "No tienes permisos para admitir usuarios." + (isUserBanned ? " Tu usuario está bloqueado." : "") }
        }

        const userToBan = await prisma.user.findUnique({
            where: { id: userId },
            select: { role: true }
        });

        if (userToBan?.role === "MASTER") {
            return { error: "No se puede banear a este usuario." }
        }

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                banned: true,
                banReason,
                bannedAt: new Date()
            }
        })

        if (user.banned) {
            revalidatePath("/admissions")
            return { message: "Usuario baneado correctamente" }
        } else {
            return { error: "Error al banear el usuario" }
        }

    } catch (error) {
        console.log(error)
        return {
            error: "Unexpected error"
        }
    }
}
