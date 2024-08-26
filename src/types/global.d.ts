type UserProfileDTO = Pick<User, "alias" | "bio" | "location" | "socialMedia" | "hideEmail" | "hideImage">

type ApiResponse<T> = {
    data: T | null,
    success?: boolean,
}

type MarkerPosition = {
    lat: number,
    lng: number
}

type Attendee = {
    id: string,
    name: string,
    photo: string,
}

type SocialEventStatus = "draft" | "published" | "cancelled" | "completed"

type SocialEvent = {
    id?: string,
    title: string,
    date: Date | null,
    status: SocialEventStatus,
    time?: string,
    description: string,
    photo?: string,
    place?:  google.maps.places.PlaceResult | null,
    minAttendees: number,
    attendees: Attendee[],
} 