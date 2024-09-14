import { LayoutCard } from "@/components/LayoutCard"
import { prisma } from "@/prisma"
import { User } from "next-auth"
import { AdminActionContainer } from "../_components/AdminActionContainer"
import getServerSession from "@/lib/getServerSession"
import { admitUser } from "./actions"

export default async function AdminsPage() {
    const session = await getServerSession();
    let users: User[] = [];

    try {
        users = await prisma.user.findMany({
            where: {
                id: { not: session?.user.id },
                admitted: false,
                banned: false,
            },
        }) as User[]
    } catch (error) {
        console.log(error);
        users = [];
    }

    return (
        <LayoutCard
            title="Admitir Usuarios"
            content={
                <AdminActionContainer
                    users={users}
                    actionLabel="Admitir Usuario"
                    emptyMessage="No hay usuarios elegibles para ser admitidos"
                    actionVariant="outline"
                    actionClassName="border-green-500"
                    formAction={admitUser}
                />
            }
        />
    )
}