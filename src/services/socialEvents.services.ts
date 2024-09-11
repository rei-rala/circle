import { API_BASE_URL } from "@/constants";

const API_URL = `${API_BASE_URL}/api/events`;

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
            throw new Error('Error al crear el evento');
        }

        return await response.json();
    } catch (error) {
        console.error('Error creating social event:', error);
        return { error: 'Error inesperado al crear el evento' };
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
            throw new Error('Error al actualizar el evento');
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating social event:', error);
        return { error: 'Error inesperado al actualizar el evento' };
    }
}

export async function deleteSocialEvent(event: SocialEvent): Promise<ApiResponse<boolean>> {
    try {
        const response = await fetch(`${API_URL}?id=${event.id}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el evento');
        }

        return await response.json();
    } catch (error) {
        console.error('Error deleting social event:', error);
        return { error: 'Error inesperado al eliminar el evento' };
    }
}