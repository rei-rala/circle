import { Libraries } from "@react-google-maps/api";
import { User } from "next-auth";

export const GOOGLE_MAPS_LIBRARIES: Libraries = ["places", "geometry"]

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL as string;
export const BRAND = process.env.NEXT_PUBLIC_BRAND as string;
export const SHORT_BRAND = process.env.NEXT_PUBLIC_SHORT_BRAND as string;
export const NEXTAUTH_URL = process.env.NEXTAUTH_URL as string;
export const NODE_ENV = process.env.NODE_ENV as string;
export const GOOGLE_ANALYTICS_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string
export const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string
export const PRODUCTION_READY = process.env.NEXT_PUBLIC_PRODUCTION_READY === "true"


export const dummyUser: User = {
    id: "",
    name: "Miembro de" + BRAND,
    email: "",
    alias: "Miembro⭕",
    createdAt: new Date(),
    role: "DUMMY",
    bio: "Para ver esta info, debes iniciar sesión",
    location: "",
    phone: "",
    socialMedia: [],
    hideEmail: true,
    hideImage: true,
    hidePhone: true,
    admittedAt: new Date(),
    bannedAt: new Date(),
    banReason: "Dummy user",
    admitted: true,
    banned: false,
    gender: "",
    birthDate: null
}


export const defaultUser: User = {
    id: "",
    name: "",
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
    banned: false,
    admittedAt: null,
    bannedAt: null,
    banReason: null,
    gender: "",
    birthDate: null
};
