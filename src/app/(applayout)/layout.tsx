import { Footer } from "@/components/Footer"
import { LowerNavbar } from "@/components/navbars/LowerNavbar"
import { UpperNavbar } from "@/components/navbars/UpperNavbar"


export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col h-screen bg-[#1a1a1a] text-white min-h-full min-w-full max-h-[100svh]">
            <UpperNavbar className="w-full flex-shrink-0" />
            <div className="flex flex-col flex-grow gap-4 overflow-x-hidden overflow-y-scroll bg-[#1a1a1a] p-5 py-20">
                {children}
                <Footer />
            </div>
            <LowerNavbar className="w-full flex-shrink-0" />
        </div>
    )
}