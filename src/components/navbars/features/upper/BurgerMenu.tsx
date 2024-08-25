"use client"

import { useFeatureContext } from "@/contexts/FeatureProvider";
import { MenuIcon } from "lucide-react";


export const BurgerMenu = () => {
    const { features: { burgerMenu } } = useFeatureContext();
console.log(burgerMenu);
    if (!burgerMenu) return null;

    return (
        <button className="absolute left-0 p-4 rounded-full hover:bg-[#333333]">
            <MenuIcon className="w-6 h-6" />
            <span className="sr-only">Alternar menú</span>
        </button>
    )
}