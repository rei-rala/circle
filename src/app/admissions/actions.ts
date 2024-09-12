"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";
//import "server-only"

export async function admitUser(formData: FormData): Promise<ApiResponse<boolean>> {
    try {
        const userId = formData.get("userId") as string;

        const session = await auth();

        const isAdmin = session?.user.role?.toUpperCase() === "ADMIN";
        const isUserBanned = session?.user.banned;

        if (!isAdmin || isUserBanned) {
            return { error: "No tienes permisos para admitir usuarios." + (isUserBanned ? " Tu usuario está bloqueado." : "") }
        }


        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                admitted: true,
                admittedAt: new Date()
            }
        })

        if (user.admitted) {
            revalidatePath("/admissions")
            return { message: "Usuario admitido correctamente" }
        } else {
            return { error: "Error al admitir el usuario" }
        }

    } catch (error) {
        console.log(error)
        return {
            error: "Unexpected error"
        }
    }
}

export async function banUser(formData: FormData) {
    try {
        const userId = formData.get("userId") as string;
        const banReason = formData.get("banReason") as string;
        const session = await auth()

        const isAdmin = session?.user.role?.toUpperCase() === "ADMIN";
        const isUserBanned = session?.user.banned;

        if (!isAdmin || isUserBanned) {
            return { error: "No tienes permisos para admitir usuarios." + (isUserBanned ? " Tu usuario está bloqueado." : "") }
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
