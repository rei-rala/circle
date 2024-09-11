"use client"

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { SocialEventsSearch } from "./features/upper/SocialEventsSearch";
import { UserMenuTempWrapper } from "./features/UserMenuTempWrapper";
import { BurgerMenu } from "./features/upper/BurgerMenu";
import { useEffect, useState } from "react";
import { BRAND } from "@/constants";

export function UpperNavbar({ className }: { className?: ClassValue }) {
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
        }

        return () => {
            if (heroTitle) {
                observer.unobserve(heroTitle);
            }
        };
    }, []);

    return (
        <header
            className={cn(
                className,
                "topbar",
                isVisible ? "translate-y-0" : "-translate-y-full",
                "bg-[#111] fixed top-0 left-0 right-0 transition-transform duration-300 flex items-center justify-center px-6 py-4 shadow z-50",
            )}
        >
            <div className="flex items-center gap-2">
                <BurgerMenu />
            </div>
            <div className="font-semibold text-lg">
                <Link href="/home" prefetch={true}>
                    {BRAND}
                </Link>
            </div>
            <div className="flex items-center gap-2">
                <SocialEventsSearch />
            </div>
            <UserMenuTempWrapper isUpper className="absolute right-0 p-4 rounded-full hover:bg-[#333333]" />
        </header>
    );
}