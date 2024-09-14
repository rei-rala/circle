import { LayoutCard } from "@/components/LayoutCard"
import { prisma } from "@/prisma"
import { User } from "next-auth"
import { AdminActionContainer } from "../_components/AdminActionContainer"
import getServerSession from "@/lib/getServerSession"
import { makeAdmin } from "./actions"

export default async function AdminsPage() {
    const session = await getServerSession();
    let users: User[] = [];

    try {
        users = await prisma.user.findMany({
            where: {
                id: { not: session?.user.id },
                admitted: true,
                banned: false,
                role: { notIn: ["MASTER", "ADMIN"] }
            },
        }) as User[]
    } catch (error) {
        console.log(error);
        users = [];
    }

    return (
        <LayoutCard
            title="Hacer Administradores"
            content={
                <AdminActionContainer
                    users={users}
                    actionLabel="Hacer Administrador"
                    emptyMessage="No hay usuarios elegibles para hacer administradores"
                    actionClassName="border-blue-500"
                    actionVariant="outline"
                    formAction={makeAdmin}
                />
            }
        />
    )
}