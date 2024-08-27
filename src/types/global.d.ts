type EditorMode = 'create' | 'edit' | "delete" | 'read-only';

type UserProfileDTO = Pick<User, "alias" | "bio" | "location" | "phone" | "socialMedia" | "hideEmail" | "hideImage" | "hidePhone">

type ApiResponse<T> = {
    data: T | null,
    success?: boolean,
}

type MarkerPosition = {
    lat: number,
    lng: number
}

type SocialEventStatus = "draft" | "published" | "cancelled" | "completed"

type SocialEvent = {
    id: string
    ownerId: string
    owner: User
    title: string
    date: Date | null
    status: SocialEventStatus
    time: string
    description: string
    photo: string
    place: google.maps.places.PlaceResult | null // Store the google.maps.places.PlaceResult data as JSON
    minAttendees: number
    attendees: Attendee[]
    publicAttendees: boolean

    createdAt: Date
    updatedAt: Date
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
}