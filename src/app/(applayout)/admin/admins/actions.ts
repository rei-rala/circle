import "server-only";

import { auth } from "@/auth";
import { hasElevatedRole } from "@/lib/utils";
import { prisma } from "@/prisma";
import { makeAdminNotification } from "@/services/api/notifications.services";
import { NotificationRelatedInfoType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function makeAdmin(formData: FormData): Promise<ApiResponse<boolean>> {
    "use server";
    
    try {
        const userId = formData.get("userId") as string;

        const session = await auth();

        const isMaster = session?.user.role?.toUpperCase() === "MASTER";

        if (!isMaster) {
            return { error: "No tienes permisos para hacer administradores." }
        }

        const isAlreadyAdmin = await prisma.user.findUnique({
            where: {
                id: userId,
                role: "ADMIN"
            }
        })

        if (isAlreadyAdmin) {
            return { error: "El usuario ya es administrador." }
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: "ADMIN"
            }
        })

        if (hasElevatedRole(updatedUser)) {
            revalidatePath("/admin/admins")
            await makeAdminNotification(updatedUser, session.user)
            return { message: "Usuario promovido a administrador correctamente" }
        } else {
            return { error: "Error al promover al usuario a administrador" }
        }

    } catch (error) {
        console.log(error)
        return {
            error: "Unexpected error"
        }
    }
}
