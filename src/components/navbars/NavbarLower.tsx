import { CalendarIcon, HomeIcon, PlusIcon, SettingsIcon, UsersIcon } from "lucide-react";
import Link from "next/link";

export function LowerNavbar() {
    return (
        <nav className="bg-[#111111] flex justify-around items-center p-2">
            <Link href="#" className="p-2 rounded-full hover:bg-[#333333]" prefetch={false}>
                <HomeIcon className="w-6 h-6" />
                <span className="sr-only">Inicio</span>
            </Link>
            <Link href="#" className="p-2 rounded-full hover:bg-[#333333]" prefetch={false}>
                <CalendarIcon className="w-6 h-6" />
                <span className="sr-only">Eventos</span>
            </Link>
            <Link href="#" className="p-2 rounded-full hover:bg-[#333333]" prefetch={false}>
                <PlusIcon className="w-6 h-6" />
                <span className="sr-only">Crear Evento</span>
            </Link>
            <Link href="#" className="p-2 rounded-full hover:bg-[#333333]" prefetch={false}>
                <UsersIcon className="w-6 h-6" />
                <span className="sr-only">Grupos</span>
            </Link>
            <Link href="#" className="p-2 rounded-full hover:bg-[#333333]" prefetch={false}>
                <SettingsIcon className="w-6 h-6" />
                <span className="sr-only">Ajustes</span>
            </Link>
        </nav>
    )
}