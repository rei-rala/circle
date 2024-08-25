

const API_BASE_URL = "http://localhost:3000";
const API_URL = `${API_BASE_URL}/events.json`;

export async function getSocialEvents(): Promise<ApiResponse<SocialEvent[]>> {
    const res = await fetch(API_URL)

    if (!res.ok) {
        return {
            data: null
        }
    }

    const data: SocialEvent[] = await res.json()

    return {
        data
    }
}

export async function getSocialEventById(id: string): Promise<ApiResponse<SocialEvent>> {
    const { data: socialEvents } = await getSocialEvents();

    const event = (socialEvents ?? []).find(e => e.id === id) ?? null

    return {
        data: event
    }
}