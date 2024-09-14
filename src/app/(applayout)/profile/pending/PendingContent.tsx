"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthProvider"
import Loading from "@/components/Loading"
import { ForceBack } from "@/components/ForceBack"

export function PendingContent() {
    const { user, isLoadingSession } = useAuth()
    const router = useRouter()

    if (isLoadingSession) {
        return <Loading />
    }

    if (!user) {
        return <ForceBack />
    }

    if (user.admitted) {
        router.push('/profile')
        return null
    }

    if (user.banned) {
        router.push('/profile/banned')
        return null
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="bg-[#222222] p-8 rounded-lg text-center">
                <div className="text-4xl font-bold mb-4">¡Gracias por registrarte!</div>
                <div className="text-lg mb-4">Tu cuenta está pendiente de admisión.</div>
                <div className="text-sm text-[#cccccc] mb-4">
                    Por favor, espera a que un administrador revise y apruebe tu solicitud.
                </div>
            </div>
        </div>
    )
}