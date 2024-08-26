import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { HomeIcon } from "lucide-react";
import Link from "next/link";
import { SocialEventsCalendar } from "./features/lower/SocialEventsCalendar";
import { CreateMenu } from "./features/lower/CreateMenu";
import { SocialEventsGroups } from "./features/lower/SocialEventsGroups";
import { UserMenuTempWrapper } from "./features/UserMenuTempWrapper";

export function LowerNavbar({ className }: { className?: ClassValue }) {
    return (
        <nav className={cn("bg-[#111111] flex justify-around items-center p-2", className)}>
            <Link href="/" className="p-2 rounded-full hover:bg-[#333333]" prefetch={false}>
                <HomeIcon className="w-6 h-6" />
                <span className="sr-only">Inicio</span>
            </Link>

            <SocialEventsCalendar className="p-2 rounded-full hover:bg-[#333333]" />
            <CreateMenu className="p-2 rounded-full hover:bg-[#333333]" />
            <SocialEventsGroups />
            <UserMenuTempWrapper />
        </nav>
    )
}