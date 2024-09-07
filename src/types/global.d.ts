type EditorMode = 'create' | 'edit' | "delete" | 'read-only';

type ApiResponse<T> = {
    data?: T;
    message?: string;
    error?: string;
};

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

type UserProfileDTO = Pick<User, "alias" | "bio" | "location" | "phone" | "socialMedia" | "hideEmail" | "hideImage" | "hidePhone">
type SocialEventDTO = Pick<SocialEvent, "id" | "public" | "title" | "photo" | "description" | "date" | "status" | "time" | "place" | "minAttendees">
