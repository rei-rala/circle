"use client"

import { useFeatureContext } from "@/contexts/FeatureProvider";
// import { usePopoverManagerContext } from "@/contexts/PopoverManagerProvider";
import { CalendarIcon } from "lucide-react"
import Link from "next/link"

export const SocialEventsCalendar = ({ className }: { className: string }) => {
    const { features: { socialEventsCalendar } } = useFeatureContext();

    // while being implemented, this won't be used
    // const { currentPopoverId, setCurrentPopoverId } = usePopoverManagerContext();

    if (!socialEventsCalendar) return null;

    return (
        <Link href="#" className={className} prefetch={false}>
            <CalendarIcon className="w-6 h-6" />
            <span className="sr-only">Eventos</span>
        </Link>
    )
}