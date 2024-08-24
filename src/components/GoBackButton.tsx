"use client"

import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export const GoBackButton = ({ className }: {
    className?: string
}) => {
    const router = useRouter()

    return (
        <button className={cn(className, "fixed right-4 bottom-16 bg-[#333333] text-white px-4 py-2 rounded-md hover:bg-[#444444]")} onClick={() => router.back()}>
            Volver
        </button>
    )
}