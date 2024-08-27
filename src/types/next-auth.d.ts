import { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: DefaultSession['user'] & User;
    }
    
    interface User {
        role: string | null;

        alias: string;
        bio: string;
        location: string;
        phone: string;
        socialMedia: string[];
        
        hideEmail: boolean;
        hideImage: boolean;
        hidePhone: boolean;
    }
    
}