"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useEffect, useState } from "react";
import { cn, hasElevatedRole } from "@/lib/utils";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { User } from "next-auth";


export const AdminCard = ({ user }: { user?: User }) => {
    const isUserAdmin = hasElevatedRole(user);

    const [hide, setHide] = useState(false);

    useEffect(() => {
        const adminCardHidePreference = localStorage.getItem("adminCardHidePreference");
        if (adminCardHidePreference === "true") setHide(true);
    }, [])

    const handleHideButtonClick = () => {
        setHide(true);
    }

    const handleNotShowAgainButtonClick = () => {
        localStorage.setItem("adminCardHidePreference", "true");
        setHide(true);

        toast.info(`Cartel de Admin ocultado. Para volver a mostrarlo, modifica las opciones de administrador en tu perfil.`)
    }

    return isUserAdmin && !hide &&
        (
            <Card className={cn(hide && "hidden", "text-center p-4 rounded-lg border-red-600")}>
                <CardHeader className="p-0">
                    <CardTitle>Eres administrador</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-[#aaa]">
                        Tienes permisos sobre usuarios y eventos
                    </p>

                    <div className="flex justify-around gap-2 mt-1">
                        <Button onClick={handleHideButtonClick}>Ocultar</Button>
                        <Button onClick={handleNotShowAgainButtonClick}>No volver a mostrar</Button>
                    </div>
                </CardContent>
            </Card>
        )
}