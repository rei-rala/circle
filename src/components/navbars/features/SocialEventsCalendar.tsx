"use client"

import { useFeatureContext } from "@/contexts/FeatureProvider";
import { CalendarIcon } from "lucide-react"
import Link from "next/link"

export const SocialEventsCalendar = () => {
    const { features: { socialEventsCalendar } } = useFeatureContext();

    if (!socialEventsCalendar) return null;

    return (
        <Link href="#" className="p-2 rounded-full hover:bg-[#333333]" prefetch={false}>
            <CalendarIcon className="w-6 h-6" />
            <span className="sr-only">Eventos</span>
        </Link>
    )
}