"use client"

import { cn } from "@/lib/utils"
import { MoveLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export const GoBackButton = ({ className }: {
    className?: string
}) => {
    const router = useRouter()

    return (
        <button className={cn(className, "z-50 flex items-center gap-2 bg-[#333333] text-white px-4 py-2 rounded-md hover:bg-[#444444]")} onClick={() => router.back()}>
            <MoveLeftIcon className="w-5 h-5" />
            <span>
                Volver
            </span>
        </button>
    )
}