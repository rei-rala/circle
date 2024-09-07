const API_BASE_URL = "http://localhost:3000";
const API_URL = `${API_BASE_URL}/api/events`;

export async function getSocialEvents(): Promise<ApiResponse<SocialEvent[]>> {
    const res = await fetch(API_URL)

    if (!res.ok) {
        return {
            data: null,
            message: "Failed to fetch social events"
        }
    }

    const data: SocialEvent[] = await res.json()

    return {
        data,
        message: "Social events fetched successfully"
    }
}

export async function getSocialEventById(id: string): Promise<ApiResponse<SocialEvent>> {
    const { data: socialEvents } = await getSocialEvents();
    const event = (socialEvents ?? []).find(e => e.id == id) ?? null

    return {
        data: event,
        message: event ? "Social event found" : "Social event not found"
    }
}

export async function createSocialEvent(event: SocialEventDTO): Promise<ApiResponse<SocialEvent>> {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create event');
        }

        const { data } = await response.json();
        return { data, message: "Social event created successfully" };
    } catch (error) {
        console.error('Error creating social event:', error);
        return { data: null, message: error instanceof Error ? error.message : 'Failed to create event' };
    }
}

export async function updateSocialEvent(event: SocialEventDTO): Promise<ApiResponse<SocialEvent>> {
    try {
        const response = await fetch(API_URL, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(event),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to update event');
        }

        const { data } = await response.json();
        return { data, message: "Social event updated successfully" };
    } catch (error) {
        console.error('Error updating social event:', error);
        return { data: null, message: error instanceof Error ? error.message : 'Failed to update event' };
    }
}

export async function deleteSocialEvent(event: SocialEvent): Promise<ApiResponse<boolean>> {
    try {
        const response = await fetch(`${API_URL}?id=${event.id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to delete event');
        }

        return { data: true, message: "Social event deleted successfully" };
    } catch (error) {
        console.error('Error deleting social event:', error);
        return { data: null, message: error instanceof Error ? error.message : 'Failed to delete event' };
    }
}