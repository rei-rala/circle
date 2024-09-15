import { LayoutCard } from "@/components/LayoutCard";
import { NotificationsPageComponent } from "./NotificationsPage";
import { Suspense } from "react";
import Loading from "@/components/Loading";

export default function NotificationsPage() {
    return (
        <LayoutCard title="Notifications"
            content={
                <Suspense fallback={<Loading title="notificaciones" />}>
                    <NotificationsPageComponent />
                </Suspense>
            }
        />
    )
}