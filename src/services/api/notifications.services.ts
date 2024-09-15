import "server-only"

import { prisma } from "@/prisma";
import { User } from "next-auth";
import { hasElevatedRole } from "@/lib/utils";
import { NotificationScope, NotificationSubtype, NotificationType } from "@prisma/client";
import getServerSession from "@/lib/getServerSession";

export async function getNotifications(user: User) {
    const userId = user.id;
    const isAdmin = hasElevatedRole(user);

    return prisma.notification.findMany({
        where: {
            OR: [
                {
                    targetUserIds: {
                        has: userId
                    },
                },
                {
                    scope: {
                        in: isAdmin ? [NotificationScope.ADMIN, NotificationScope.GLOBAL] : [NotificationScope.GLOBAL]
                    }
                },
            ],
            createdAt: {
                gte: user.createdAt
            },
            NOT: {
                dismissedByUserIds: {
                    has: userId
                }
            }
        }
    })

    const notifications = await prisma.notification.findMany({
        where: {
            AND: [
                {
                    createdAt: {
                        gte: user.createdAt
                    },
                    targetUserIds: {
                        has: userId
                    }
                },
                {
                    NOT: {
                        dismissedByUserIds: {
                            has: userId,
                        },
                    },
                },
                {
                    scope: {
                        in: isAdmin ? [NotificationScope.ADMIN, NotificationScope.GLOBAL] : [NotificationScope.GLOBAL]
                    }
                }
            ],
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return notifications;
}

export async function createNotification(notification: AppNotification) {
    const newNotification = await prisma.notification.create({
        data: notification,
    });

    return newNotification;
}

export async function createNotificationUserAdmission(notification: Pick<AppNotification, "content">) {
    const scope = NotificationScope.GLOBAL;
    const type = NotificationType.MEMBER;
    const subtype = NotificationSubtype.ADMISSION;

    const newNotification = await prisma.notification.create({
        data: {
            ...notification,
            title: "Admisión de usuario",
            icon: "👤",
            scope,
            type,
            subtype,
        },
    });

    return newNotification;
}

export async function dismissNotification(notificationId: string) {
    const session = await getServerSession();

    if (!session) {
        throw new Error("No session found");
    }

    const notification = await prisma.notification.update({
        where: { id: notificationId },
        data: {
            dismissedByUserIds: { push: session.user.id },
        },
    });

    return notification;
}

