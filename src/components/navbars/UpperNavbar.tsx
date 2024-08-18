import { MenuIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const BRAND = "The Circle ⭕";

export function UpperNavbar() {
    return (
        <header className="bg-[#111111] flex items-center justify-between px-4 py-3 shadow">
            <button className="p-2 rounded-full hover:bg-[#333333]">
                <MenuIcon className="w-6 h-6" />
                <span className="sr-only">Alternar menú</span>
            </button>
            <div className="font-semibold text-lg">
                <Link href="/" prefetch={false}>
                    {BRAND}
                </Link>
            </div>
            <div className="flex items-center gap-2">
                <button className="p-2 rounded-full hover:bg-[#333333]">
                    <SearchIcon className="w-6 h-6" />
                    <span className="sr-only">Buscar</span>
                </button>
                <Link href="#" className="p-2 rounded-full hover:bg-[#333333]" prefetch={false}>
                    <Avatar className="w-8 h-8 border-2 border-white">
                        <AvatarImage src="/placeholder-user.jpg" alt="Avatar del usuario" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </Link>
            </div>
        </header>
    )
}