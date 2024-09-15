import { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: DefaultSession['user'] & User;
    }
    
    interface User {
        role: string | null;

        gender: string | null;
        birthDate: Date | null;

        alias: string;
        bio: string;
        location: string;
        phone: string;
        socialMedia: string[];

        admitted: boolean;
        admittedAt: Date | null;
        banned: boolean;
        bannedAt: Date | null;
        banReason: string | null;
        
        hideEmail: boolean;
        hideImage: boolean;
        hidePhone: boolean;

        createdAt: Date;
    }
    
}