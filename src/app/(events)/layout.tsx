import { GoBackButton } from "@/components/GoBackButton";
import { ReactNode } from "react";


export default async function EventsLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <GoBackButton className="mb-5" />
            {children}
        </>
    )
}