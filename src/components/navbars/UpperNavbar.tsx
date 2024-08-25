import Link from "next/link";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { SocialEventsSearch } from "./features/upper/SocialEventsSearch";
import { UserMenuTempWrapper } from "./features/UserMenuTempWrapper";
import { BurgerMenu } from "./features/upper/BurgerMenu";

const BRAND = "The Circle ⭕";

export function UpperNavbar({ className }: { className?: ClassValue }) {
    return (
        <header className={cn("relative bg-[#111111] flex items-center justify-center px-6 py-4 shadow", className)}>
            <div className="flex items-center gap-2">
                <BurgerMenu />
            </div>
            <div className="font-semibold text-lg">
                <Link href="/" prefetch={false}>
                    {BRAND}
                </Link>
            </div>
            <div className="flex items-center gap-2">
                <SocialEventsSearch />
            </div>
            <UserMenuTempWrapper isUpper className="absolute right-0 p-4 rounded-full hover:bg-[#333333]" />
        </ header>
    )
}