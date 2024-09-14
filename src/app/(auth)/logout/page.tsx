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
        <main className="flex-1 overflow-auto bg-[#1a1a1a] p-4">
            <div className="flex items-center justify-center h-full">
                <div className="bg-[#222222] p-8 rounded-lg text-center">
                    <picture>
                        <source srcSet="/icon.webp" type="image/webp" />
                        <source srcSet="/icon.png" type="image/png" />
                        <source srcSet="/icon.jpg" type="image/jpg" />
                        <img src="/icon.webp" alt="The Circle" className="mx-auto w-32 h-32 mb-4" />
                    </picture>

                    <div className="text-4xl font-bold mb-4">Cerrar Sesión en The Circle</div>
                    <div className="grid grid-cols-2 gap-4">
                        <Suspense fallback={<Loading />}>
                            <GoBackButton className="min-w-full flex justify-center h-10 px-4 py-2 ">
                                <ChevronLeft className="w-5 h-5 mr-2" />
                                Volver
                            </GoBackButton>
                        </Suspense>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleLogout}
                        >
                            <LogOutIcon className="w-5 h-5 mr-2" />
                            Cerrar sesión
                        </Button>
                    </div>
                </div>
            </div>
        </main >
    )
}