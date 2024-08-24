"use client"

import { useFeatureContext } from "@/contexts/FeatureProvider";
import { cn } from "@/lib/utils";
import { UsersIcon } from "lucide-react"
import Link from "next/link"

export const SocialEventsGroups = ({ className }: { className?: string }) => {
    const { features: { socialEventsGroups } } = useFeatureContext();

    if (!socialEventsGroups) return null;

    return (
        <Link href="#" className={cn(className, "p-2 rounded-full hover:bg-[#333333]")} prefetch={false}>
            <UsersIcon className="w-6 h-6" />
            <span className="sr-only">Grupos</span>
        </Link>
    )
}