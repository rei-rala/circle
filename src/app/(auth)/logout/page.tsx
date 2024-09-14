"use client";

import { GoBackButton } from "@/components/GoBackButton";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { ChevronLeft, LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";
import { Suspense } from "react";

export default function Logout({ searchParams: _searchParams }: { searchParams: { callbackUrl: string } }) {
    const callbackUrl = "/"

    const handleLogout = () => {
        signOut({ callbackUrl });
    };

    return (
        <main className="grid place-items-center min-h-svh min-w-svw overflow-auto p-4 bg-[url('/icon.png')] bg-no-repeat bg-center bg-contain">
            <div className="p-8 rounded-lg text-center bg-black bg-opacity-70">
                <div className="text-4xl font-bold mb-4">Cerrar Sesión en The Circle</div>
                <div className="flex gap-4 align-center justify-center mt-4">
                    <Suspense fallback={<Loading />}>
                        <GoBackButton className="flex justify-center items-center h-10 px-4 py-2">
                            <ChevronLeft className="w-5 h-5 mr-2" />
                            Volver
                        </GoBackButton>
                    </Suspense>
                    <Button
                        variant="outline"
                        className="flex justify-center items-center h-10 px-4 py-2"
                        onClick={handleLogout}
                    >
                        <LogOutIcon className="w-5 h-5 mr-2" />
                        Cerrar sesión
                    </Button>
                </div>
            </div>
        </main>
    )
}