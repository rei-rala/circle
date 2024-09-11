import { API_BASE_URL } from "@/constants";
import { User } from "next-auth";

const PROFILE_API_URL = `${API_BASE_URL}/api/profile`;

export async function updateUserProfile(user: UserProfileDTO): Promise<ApiResponse<User>> {
    const response = await fetch(PROFILE_API_URL, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error('Error al actualizar el perfil');
    }

    return await response.json();
}