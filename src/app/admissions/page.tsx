import { UserAdmissionCard } from "@/components/admissions/UserAdmissionCard"
import { LayoutCard } from "@/components/LayoutCard"
import { prisma } from "@/prisma"
import { User } from "next-auth"
import { admitUser } from "./actions"
import getServerSession from "@/lib/getServerSession"
import { redirect } from "next/navigation"
import { UserStatusAlert } from "@/components/UserAlert"

export default async function AdmissionsPage() {
    const session = await getServerSession();

    if (!session) {
        redirect("/login?callbackUrl=/admissions");
    }
    const admitted = session.user?.admitted;
    const banned = session.user?.banned;
    const invalidStatus = !(admitted) || banned;

    if (session.user.role?.toUpperCase() !== "ADMIN") {
        redirect("/");
    }
    if (banned) {
        redirect("/profile/banned");
    }
    if (!admitted) {
        redirect("/profile/pending");
    }

    let users: User[] = [];

    try {
        if (invalidStatus) {
            throw new Error("No tienes permisos para acceder a esta página");
        };

        users = await prisma.user.findMany({
            where: {
                admitted: false,
                banned: false,
            },
        }) as User[]

    } catch (error) {
        console.log(error);
        users = [];
    }

    return (
        <>
            <UserStatusAlert />
            <LayoutCard
                title="Usuarios Pendientes de Admisión"
                content={
                    <div className="flex flex-col gap-4">
                        {
                            users.length === 0
                                ? (
                                    <div className="flex items-center justify-center">
                                        <span className="text-sm text-gray-500">No hay usuarios pendientes de admisión</span>
                                    </div>
                                )
                                : users.map((user) => (
                                    !user.id
                                        ? null
                                        : (
                                            <UserAdmissionCard
                                                key={user.id}
                                                user={user}
                                                admitUserAction={admitUser}
                                            />
                                        )
                                ))
                        }

                    </div>
                }
            />
        </>
    )
}
