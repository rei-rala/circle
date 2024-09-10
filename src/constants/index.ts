import { User } from "next-auth";

export const dummyUser: User = {
    id: "dummy",
    name: "Miembro de THE CIRCLE",
    email: "",
    alias: "Miembro de THE CIRCLE",
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