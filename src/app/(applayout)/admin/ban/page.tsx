import { LayoutCard } from "@/components/LayoutCard"
import { prisma } from "@/prisma"
import { User } from "next-auth"
import { AdminActionContainer } from "../_components/AdminActionContainer"
import getServerSession from "@/lib/getServerSession"
import { banUser } from "./actions"

export default async function BanPage() {
    const session = await getServerSession();
    let users: User[] = [];


    try {
        const isMaster = session?.user.role === "MASTER";
        users = await prisma.user.findMany({
            where: {
                id: { not: session?.user.id },
                admitted: true,
                banned: false,
                role: isMaster ? { notIn: ["MASTER", "ADMIN"] } : undefined
            }
        }) as User[]
    } catch (error) {
    console.log(error);
    users = [];
}

return (
    <LayoutCard
        title="Banear Usuarios"
        content={
            <AdminActionContainer
                users={users}
                actionLabel="Banear"
                actionVariant="destructive"
                emptyMessage="No hay usuarios elegibles para ser baneados"
                formAction={banUser}
            />
        }
    />
)
}