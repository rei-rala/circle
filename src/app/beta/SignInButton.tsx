"use client";

import { Button } from "@/components/ui/button"
import { ChromeIcon } from "lucide-react";

import { signIn } from "next-auth/react";


export const BetaSignInButton = () => {
    return (
        <Button
            variant="outline"
            className="w-full"
            asChild
            onClick={() => signIn('google', {
                redirectTo: '/beta'
            })}
        >
            <a href="#">
                <ChromeIcon className="mr-2" />
                Sign In
            </a>
        </Button>
    )
}