import "server-only";

import { auth } from "@/auth";
import { hasElevatedRole } from "@/lib/utils";
import { prisma } from "@/prisma";
import { createUserAdmissionNotification } from "@/services/api/notifications.services";
import { revalidatePath } from "next/cache";

export async function admitUser(formData: FormData): Promise<ApiResponse<boolean>> {
    "use server";

    try {
        const userId = formData.get("userId") as string;

        const session = await auth();

        const isAdmin = hasElevatedRole(session);
        const isUserBanned = session?.user.banned;

        if (!isAdmin || isUserBanned) {
            return { error: "No tienes permisos para admitir usuarios." + (isUserBanned ? " Tu usuario está bloqueado." : "") }
        }

        const isAlreadyAdmitted = await prisma.user.findUnique({
            where: {
                id: userId,
                admitted: true
            }
        })

        if (isAlreadyAdmitted) {
            return { error: "El usuario ya está admitido." }
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
            await createUserAdmissionNotification(user, session?.user);
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
