import { GoBackButton } from "@/components/GoBackButton";
import { UserStatusAlert } from "@/components/UserStatusAlert";
import { ReactNode } from "react";

export default async function EventsLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <GoBackButton className="sticky top-0" />
            <UserStatusAlert />
            {children}
        </>
    )
}