import { DefaultSession } from "next-auth";

declare module 'next-auth' {
    interface Session {
        user: DefaultSession['user'] & User;
    }

    interface User {
        alias: string;
        bio: string;
        location: string;
        socialMedia: string[];

        hideEmail: Boolean;
        hideImage: Boolean;
    }
}