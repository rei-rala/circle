
type MarkerPosition = {
    lat: number,
    lng: number
}

type Attendee = {
    id: string,
    name: string,
    photo: string,
}

type SocialEvent = {
    id?: string,
    title: string,
    date: Date,
    description: string,
    photo?: string,
    place: null | (google.maps.places.PlaceResult & {
        photos: (google.maps.places.PlacePhoto & { url: string })[],
    }),
    minAttendees: number,
    attendees: Attendee[],
} 