import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { SocialEventsSearch } from "./features/SocialEventsSearch";

const BRAND = "The Circle ⭕";

export function UpperNavbar({ className }: { className?: ClassValue }) {
    return (
        <header className={cn("relative bg-[#111111] flex items-center justify-center px-6 py-4 shadow", className)}>
            <button className="absolute left-0 p-4 rounded-full hover:bg-[#333333]">
                <MenuIcon className="w-6 h-6" />
                <span className="sr-only">Alternar menú</span>
            </button>
            <div className="font-semibold text-lg">
                <Link href="/" prefetch={false}>
                    {BRAND}
                </Link>
            </div>
            <div className="flex items-center gap-2">
                <SocialEventsSearch />
            </div>
        </ header>
    )
}