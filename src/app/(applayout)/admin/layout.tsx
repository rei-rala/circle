import { UserStatusAlert } from "@/components/UserStatusAlert";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <UserStatusAlert />
            {children}
        </>
    )
}