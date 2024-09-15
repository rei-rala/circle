
import { dismissNotification } from "@/services/api/notifications.services";
import { DismissNotificationButton } from "./DismissNotificationButton";
import { revalidatePath } from "next/cache";

export function NotificationCard({ notification }: { notification: AppNotification }) {
    const dismissAction = async () => {
        "use server"
        await dismissNotification(notification.id!);
        revalidatePath("/notifications")
    }

    return (
        <form action={dismissAction} className="w-full border rounded-lg shadow-sm">
            <input type="hidden" name="notificationId" value={notification.id} />
            <div className="flex items-start p-4">
                <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="text-lg font-semibold flex items-center">
                            <span className="mr-2 text-lg">{notification.icon}</span>
                            <span className="mr-2 text-base">{notification.title}</span>
                        </h3>
                        <DismissNotificationButton />
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.content}</p>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                        {new Date(notification.createdAt!).toLocaleString()}
                    </p>
                </div>
            </div>
        </form>
    )
}