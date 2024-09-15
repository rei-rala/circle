import getServerSession from "@/lib/getServerSession";
import { getNotifications } from "@/services/api/notifications.services";
import { NotificationCard } from "./NotificationCard";


export async function NotificationsPageComponent() {
    const session = await getServerSession();
    const notifications = (await getNotifications(session!.user) ?? []) as AppNotification[];

    return (
        <div className="flex flex-col gap-4">
            {notifications.length === 0
                ? (
                    <div className="flex flex-col items-center justify-center h-full">
                        <p className="text-lg text-gray-500">No hay notificaciones</p>
                    </div>
                )
                : (
                    notifications.map((notification) => (
                        <NotificationCard key={notification.id} notification={notification} />
                    ))
                )
            }
        </div>
    )
}