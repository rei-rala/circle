"use client"

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { SocialEventsSearch } from "./features/upper/SocialEventsSearch";
import { UserMenuTempWrapper } from "./features/UserMenuTempWrapper";
import { Notifications } from "./features/upper/Notifications";
import { useEffect, useState } from "react";
import { BRAND } from "@/constants";
import { usePathname } from "next/navigation";

export function UpperNavbar({ className }: { className?: ClassValue }) {
    const pathname = usePathname();
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(!entry.isIntersecting);
            },
            {
                threshold: 0,
            }
        );

        const heroTitle = document.getElementById("main-title");

        if (heroTitle) {
            observer.observe(heroTitle);
        } else {
            setIsVisible(true);
        }

        return () => {
            if (heroTitle) {
                observer.unobserve(heroTitle);
            }
        };
    }, [pathname]);

    return (
        <header
            className={cn(
                className,
                "topbar",
                isVisible ? "translate-y-0" : "-translate-y-full",
                "bg-[#111] fixed top-0 left-0 right-0 transition-transform duration-300 grid grid-cols-[1fr_auto_1fr] items-center px-6 py-4 shadow z-40",
            )}
        >
            <div className="justify-self-start">
                <UserMenuTempWrapper isUpper className="p-4 rounded-full hover:bg-[#333333]" />
            </div>
            <div className="min-w-fit flex-grow flex flex-col items-center">
                <div className="font-semibold text-lg">
                    <Link href="/" prefetch={true}>
                        {BRAND}
                    </Link>
                </div>
                <div className="flex items-center gap-2">
                    <SocialEventsSearch />
                </div>
            </div>

            <div className="justify-self-end">
                <Notifications className="p-2" />
            </div>
        </header>
    );
}