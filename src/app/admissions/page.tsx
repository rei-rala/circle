import { UserAdmissionCard } from "@/components/admissions/UserAdmissionCard"
import { LayoutCard } from "@/components/LayoutCard"
import { prisma } from "@/prisma"
import { User } from "next-auth"
import { admitUser } from "./actions"
import getServerSession from "@/lib/getServerSession"
import { redirect } from "next/navigation"

export default async function AdmissionsPage() {
    const session = await getServerSession();

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/admissions");
    }

    if (session.user.role?.toUpperCase() !== "ADMIN") {
        redirect("/");
    }

    let users: User[] = [];

    try {
        if (!session) return null;
        users = await prisma.user.findMany({
            where: {
                AND: [
                    {
                        admitted: {
                            equals: null
                        }
                    },
                    {
                        banned: {
                            equals: null
                        }
                    }
                ]
            },
        }) as unknown as User[]

        // why?
        users = users.filter((user) => user.admitted === null && user.banned === null);
    } catch (error) {
        console.log(error);
        users = [];
    }

    return (
        <LayoutCard
            title="Usuarios Pendientes de Admisión"
            content={
                <div className="grid gap-4">
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
    )
}
