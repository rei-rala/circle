import { ProfileForm } from "@/components/forms/profileForm/ProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserStatusAlert } from "@/components/UserStatusAlert";
import getServerSession from "@/lib/getServerSession";
import { redirect } from "next/navigation";
import React from "react";

export default async function ProfilePage() {
    const session = await getServerSession();
    if (!session) redirect("/login?callbackUrl=/profile");

    return (
        <>
            <UserStatusAlert />
            <div className="flex items-center justify-between">
                <div className="text-2xl font-semibold">Mi perfil</div>
            </div>

            <Card className="bg-[#222222] p-4 rounded-lg mt-4">
                <CardHeader>
                    <CardTitle>Editar Perfil</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProfileForm />
                </CardContent>
            </Card>
        </>
    );
}