import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import { HomeIcon, PlusIcon, SettingsIcon } from "lucide-react";
import Link from "next/link";
import { SocialEventsCalendar } from "./features/SocialEventsCalendar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function LowerNavbar({ className }: { className?: ClassValue }) {
    return (
        <nav className={cn("bg-[#111111] flex justify-around items-center p-2", className)}>
            <Link href="#" className="p-2 rounded-full hover:bg-[#333333]" prefetch={false}>
                <HomeIcon className="w-6 h-6" />
                <span className="sr-only">Inicio</span>
            </Link>
            <SocialEventsCalendar />
            <Link href="#" className="p-2 rounded-full hover:bg-[#333333]" prefetch={false}>
                <PlusIcon className="w-6 h-6" />
                <span className="sr-only">Crear Evento</span>
            </Link>


            <Link href="#" className="p-2 rounded-full hover:bg-[#333333]" prefetch={false}>
                <Avatar className="w-8 h-8 border-2 border-white">
                    <AvatarImage src="/placeholder-user.jpg" alt="Avatar del usuario" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
            </Link>

        </nav>
    )
}