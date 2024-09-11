import { Libraries } from "@react-google-maps/api";
import { User } from "next-auth";

export const GOOGLE_MAPS_LIBRARIES: Libraries = ["places", "geometry"]

export const API_BASE_URL = process.env.NEXTAUTH_URL as string;
export const BRAND = process.env.NEXT_PUBLIC_BRAND as string;
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL as string;
export const NODE_ENV = process.env.NODE_ENV as string;
export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string


export const dummyUser: User = {
    id: "dummy",
    name: "Miembro de " + BRAND,
    email: "",
    alias: "Miembro de " + BRAND,
    createdAt: new Date(),
    role: "DUMMY",
    bio: "Para ver esta info, debes iniciar sesión",
    location: "",
    phone: "",
    socialMedia: [],
    admitted: true,
    banned: true,
    hideEmail: true,
    hideImage: true,
    hidePhone: true
}


export const defaultUser: User = {
    email: "",
    role: "",
    alias: "",
    bio: "",
    createdAt: new Date(),
    location: "",
    phone: "",
    socialMedia: [],
    hideEmail: false,
    hideImage: false,
    hidePhone: false,
    admitted: false,
    banned: false
};
