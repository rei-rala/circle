"use client"

import { GoBackButton } from "@/components/GoBackButton"
import Loading from "@/components/Loading"
import { Suspense } from "react"

export default function Error() {
    return (
        <main className="flex-1 overflow-auto bg-[#1a1a1a] p-4">
            <div className="flex items-center justify-center h-full">
                <div className="bg-[#222222] p-8 rounded-lg text-center">
                    <div className="text-4xl font-bold mb-4">Ups</div>
                    <div className="text-lg mb-4">Ha ocurrido un error</div>
                    <div className="text-sm text-[#cccccc] mb-4">
                        Por favor, contacta con el administrador si el error persiste.
                    </div>
                    <Suspense fallback={<Loading />}>
                        <GoBackButton className="mx-auto mt-4" />
                    </Suspense>
                </div>
            </div>
        </main>
    )
}