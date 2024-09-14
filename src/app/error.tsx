"use client"

import { GoBackButton } from "@/components/GoBackButton"
import Loading from "@/components/Loading"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Suspense } from "react"

export default function Error() {
    return (
        <main className="grid place-items-center min-h-svh min-w-svw overflow-auto p-4 bg-[url('/icon.png')] bg-no-repeat bg-center bg-contain">
            <div className="p-8 rounded-lg text-center bg-black bg-opacity-70">
                <div className="text-4xl font-bold mb-4">Ups</div>
                <div className="text-lg mb-4">Ha ocurrido un error</div>
                <div className="text-sm text-[#cccccc] mb-4">
                    Por favor, contacta con el administrador si el error persiste.
                </div>

                <div className="flex gap-4 align-center justify-center mt-4">
                    <Suspense fallback={<Loading />}>
                        <GoBackButton />
                    </Suspense>
                    <Link href="/">
                        <Button variant="link">
                            Ir a la home
                        </Button>
                    </Link>
                </div>
            </div>
        </main>
    )
}