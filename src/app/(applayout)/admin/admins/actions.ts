"use server";

import { auth } from "@/auth";
import { hasElevatedRole } from "@/lib/utils";
import { prisma } from "@/prisma";
import { revalidatePath } from "next/cache";

export async function makeAdmin(formData: FormData): Promise<ApiResponse<boolean>> {
    try {
        const userId = formData.get("userId") as string;

        const session = await auth();

        const isMaster = session?.user.role?.toUpperCase() === "MASTER";

        if (!isMaster) {
            return { error: "No tienes permisos para hacer administradores." }
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
