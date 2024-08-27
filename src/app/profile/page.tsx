import { ProfileForm } from "@/components/forms/profileForm/ProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import getServerSession from "@/lib/getServerSession";
import { redirect } from "next/navigation";
import React from "react";

// using auth.js session
export default async function ProfilePage() {
    const session = await getServerSession();
    if (!session) redirect("/api/auth/signin?callbackUrl=/profile");

    return (
        <div className="p-4 grid gap-4">
            {
                session.user.role === "admin" &&
                (
                    <Card className="text-center p-4 rounded-lg mb-2 border-red-600">
                        <CardHeader className="p-0">
                            <CardTitle>Eres administrador</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-[#aaa]">
                                Tienes permisos adicionales sobre usuarios y eventos
                            </p>
                        </CardContent>
                    </Card>
                )
            }

            <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold">Mi perfil</div>
            </div>

            <Card className="bg-[#222222] p-4 rounded-lg">
                <CardHeader>
                    <CardTitle>Editar Perfil</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProfileForm />
                </CardContent>
            </Card>
        </div>
    );
}