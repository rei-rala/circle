import { User } from "next-auth";

export const dummyUser: User = {
    id: "dummy",
    name: "Miembro de THE CIRCLE",
    email: "",
    alias: "Miembro de THE CIRCLE",
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