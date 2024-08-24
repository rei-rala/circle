"use client"

import { useFeatureContext } from "@/contexts/FeatureProvider";
import { SearchIcon } from "lucide-react";


export const SocialEventsSearch = () => {
    const { features: { socialEventsSearch } } = useFeatureContext();

    if (!socialEventsSearch) return null;

    return (
        <button className="p-2 rounded-full hover:bg-[#333333]">
            <SearchIcon className="w-6 h-6" />
            <span className="sr-only">Buscar</span>
        </button>
    )
}