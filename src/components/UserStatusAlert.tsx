import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { AdminCard } from "./AdminCard";
import getServerSession from "@/lib/getServerSession";
import { cn } from "@/lib/utils";

export const UserStatusAlert = async () => {
    const session = await getServerSession();
    const user = session?.user;

    if (user && user.admitted && !user.banned) {
        return null;
    } 

    let statusTitle = "";
    let statusMessage = "";
    let statusColor = "";

    if (!user) {
        statusTitle = "Sesión no iniciada";
        statusMessage = "Inicia sesión para acceder a todas las funcionalidades.";
    } else if (user.banned) {
        statusTitle = "Cuenta bloqueada";
        statusMessage = "Tu cuenta ha sido bloqueada. Contacta al administrador para más información.";
        statusColor = "border-red-600";
    } else if (!user.admitted) {
        statusTitle = "Cuenta pendiente de admisión";
        statusMessage = "Tu acceso a la plataforma es limitado. Espera la aprobación del administradors.";
        statusColor = "border-yellow-600";
    } else if (user.role === "admin") {
       return <AdminCard user={user} />
    }

    return (
        <Card className={cn("text-center p-4 rounded-lg border-2", statusColor)}>
            <CardHeader className="p-0">
                <CardTitle>{statusTitle}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-[#aaa]">{statusMessage}</p>
            </CardContent>
        </Card>
    );
    
}