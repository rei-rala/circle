import { useFeatureContext } from "@/contexts/FeatureProvider";
import { SettingsIcon } from "lucide-react"
import Link from "next/link"


export const UserSettings = () => {
    const { features: { userSettings } } = useFeatureContext();

    if (!userSettings) return null;


    return (
        <Link href="#" className="p-2 rounded-full hover:bg-[#333333]" prefetch={false}>
            <SettingsIcon className="w-6 h-6" />
            <span className="sr-only">Ajustes</span>
        </Link>
    )
}