import "server-only"

import { prisma } from "@/prisma";
import { User } from "next-auth";
import { hasElevatedRole } from "@/lib/utils";
import { NotificationRelatedInfoType, NotificationScope, NotificationSubtype, NotificationType } from "@prisma/client";
import getServerSession from "@/lib/getServerSession";
import { SHORT_BRAND } from "@/constants";

export async function getNotifications(user: User) {
    "use server";

    const userId = user.id;
    const isAdmin = hasElevatedRole(user);

    const notifications = await prisma.notification.findMany({
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
        },
        orderBy: {
            createdAt: "desc"
        }
    }) as AppNotification[];

    return notifications;
}

export async function createNotification(notification: AppNotification, user?: User) {
    "use server";

    const newNotification = await prisma.notification.create({
        data: {
            ...notification,
            originUserId: user?.id,
        },
    }) as AppNotification;

    return newNotification;
}

export async function dismissNotification(notificationId: string) {
    "use server";

    const session = await getServerSession();

    if (!session) {
        throw new Error("No session found");
    }

    const notification = await prisma.notification.update({
        where: { id: notificationId },
        data: {
            dismissedByUserIds: { push: session.user.id },
        },
    }) as AppNotification;

    return notification;
}



export async function createUserAdmissionNotification(user: User, originUser?: User) {
    "use server";

    const notification: AppNotification = {
        title: "Admisión de usuario",
        icon: "👤",
        content: `${user.name}${user.alias ? ` (${user.alias})` : ""} se unió a ${SHORT_BRAND}!`,
        relatedInfoType: NotificationRelatedInfoType.USER,
        relatedInfoId: user.id,
        originUserId: originUser?.id,
        scope: NotificationScope.GLOBAL,
        type: NotificationType.MEMBER,
        subtype: NotificationSubtype.ADMISSION,
    }

    const newNotification = await prisma.notification.create({
        data: notification,
    }) as AppNotification;

    return newNotification;
}


export async function makeAdminNotification(user: User, originUser?: User) {
    "use server";

    const notification: AppNotification = {
        title: "Nuevo administrador",
        content: `${user.name} fue promovido a administrador.`,
        icon: "👑",
        type: NotificationType.MEMBER,
        subtype: NotificationSubtype.ADMISSION,
        scope: NotificationScope.ADMIN,
        relatedInfoType: NotificationRelatedInfoType.USER,
        relatedInfoId: user.id,
        originUserId: originUser?.id,
    }

    const newNotification = await prisma.notification.create({
        data: notification,
    }) as AppNotification;

    return newNotification;
}

export async function makeBanUserNotification(user: User, originUser?: User) {
    "use server";

    const notification = {
        title: "Baneo de usuario",
        icon: "🚫",
        content: `${user.name}${user.alias ? ` (${user.alias})` : ""} fue baneado.`,
        relatedInfoType: NotificationRelatedInfoType.USER,
        relatedInfoId: user.id,
        type: NotificationType.MEMBER,
        subtype: NotificationSubtype.ADMISSION,
        scope: NotificationScope.ADMIN,
        originUserId: originUser?.id,
    }

    const newNotification = await prisma.notification.create({
        data: notification,
    }) as AppNotification;

    return newNotification;
}