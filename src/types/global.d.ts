import { NotificationScope, NotificationSubtype, NotificationType } from "@prisma/client";
import { User } from "next-auth";

declare global {
    type EditorMode = 'create' | 'edit' | "delete" | 'read-only';

    type ApiResponse<T> = {
        data?: T;
        message?: string;
        error?: string;
    };

    type NextApiResponse<T> =
        | NextResponse<{
            error: string;
        }>
        | NextResponse<{
            redirect: string;
            message: string;
        }>
        | NextResponse<{
            data: T;
            message: string;
        }>

    type MarkerPosition = {
        lat: number,
        lng: number
    }

    type SocialEventStatus = "DRAFT" | "PUBLISHED" | "CANCELLED" | "COMPLETED" | "DELETED"

    type SocialEvent = {
        id: string
        public: boolean
        ownerId: string
        owner: User
        title: string
        status: SocialEventStatus
        date: Date | null
        time: string
        description: string
        photo: string
        place: google.maps.places.PlaceResult | null // Store the google.maps.places.PlaceResult data as JSON
        minAttendees: number
        attendees: Attendee[]
        publicAttendees: boolean

        createdAt: Date
        updatedAt: Date

        deleted: boolean
        deletedAt: Date | null

        user: User
        userId: string
    }

    type Attendee = {
        id: string;
        eventId: string;
        event: SocialEvent;
        userId: string;
        user: User;
        joinedAt: Date;
        leftAt: Date | null;

        bannedFromEvent: Date | null;
        banReason: string | null;
        bannedById: string | null;
    }


    type AppNotification = {
        id: string
        title: string
        content: string
        icon?: string
        createdAt: Date
        updatedAt: Date
        scope: NotificationScope
        type: NotificationType
        subtype: NotificationSubtype
        targetUserIds: string[]
        seenByUserIds: string[]
        dismissedByUserIds: string[]
        isDeleted: boolean
        deletedAt?: Date
    }

    type UserProfileDTO = Pick<User, "alias" | "bio" | "location" | "phone" | "socialMedia" | "hideEmail" | "hideImage" | "hidePhone">
    type SocialEventDTO = Pick<SocialEvent, "id" | "public" | "title" | "photo" | "description" | "date" | "status" | "time" | "place" | "minAttendees" | "publicAttendees">
    type NotificationDTO = Pick<AppNotification, "id" | "title" | "content" | "icon" | "createdAt" | "type" | "subtype" | "scope" | "isDeleted" | "deletedAt">
}