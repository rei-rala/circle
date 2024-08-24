"use client"

import { useFeatureContext } from "@/contexts/FeatureProvider";
import { usePopoverManagerContext } from "@/contexts/PopoverManagerProvider";
import { SettingsIcon } from "lucide-react"
import Link from "next/link"

const POPOVER_ID = "#user-settings";

export const UserSettings = () => {
    const { features: { userSettings } } = useFeatureContext();
    const { setCurrentPopoverId } = usePopoverManagerContext();

    const clearCurrentPopoverId = () => setCurrentPopoverId(null);

    if (!userSettings) return null;

    return (
        <Link href={POPOVER_ID} className="p-2 rounded-full hover:bg-[#333333]" prefetch={false} onClick={clearCurrentPopoverId}>
            <SettingsIcon className="w-6 h-6" />
            <span className="sr-only">Ajustes</span>
        </Link>
    )
}