"use client"

import { cn } from "@/lib/utils"
import { ChevronLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"

export const GoBackButton = ({ className }: {
    className?: string
}) => {
    const router = useRouter()

    return (
        <button className={cn(className, "z-50 flex items-center bg-[#333333] text-white p-2 rounded-md hover:bg-[#444444] w-fit")} onClick={() => router.back()}>
            <ChevronLeftIcon className="relative left-[-5%] w-5 h-5" />
            <span>
                Volver
            </span>
        </button>
    )
}