import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AdminCard } from "./AdminCard";
import getServerSession from "@/lib/getServerSession";

export const UserStatusAlert = async () => {
    const session = await getServerSession();

    const isUserBanned = session?.user?.banned;
    const isUserAdmitted = session?.user?.admitted;

    console.log({
        ban: isUserBanned,
        admitted: isUserAdmitted,
        adm: session?.user.role === "admin"
    })

    if (isUserBanned || !isUserAdmitted) {
        return (
            <Card className="text-center p-4 rounded-lg border-yellow-600">
                <CardHeader className="p-0">
                    <CardTitle>{isUserBanned ? "Cuenta bloqueada" : "Cuenta pendiente de admision"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-[#aaa]">
                        {
                            isUserBanned
                                ? "Tu cuenta ha sido bloqueada. Contacta al administrador para más información."
                                : "Tu acceso a la plataforma es limitado. Espera la aprobación del administrador."
                        }
                    </p>
                </CardContent>
            </Card>
        )
    }

    return <AdminCard user={session?.user} /> || null;
}