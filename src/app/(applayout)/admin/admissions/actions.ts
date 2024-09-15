"use server";

import { auth } from "@/auth";
import { BRAND, SHORT_BRAND } from "@/constants";
import { hasElevatedRole } from "@/lib/utils";
import { prisma } from "@/prisma";
import { createNotificationUserAdmission } from "@/services/api/notifications.services";
import { revalidatePath } from "next/cache";
//import "server-only"

export async function admitUser(formData: FormData): Promise<ApiResponse<boolean>> {
    try {
        const userId = formData.get("userId") as string;

        const session = await auth();

        const isAdmin = hasElevatedRole(session);
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
            await createNotificationUserAdmission({ content: `${user.name} ha sido admitido en ${SHORT_BRAND}!` })
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
