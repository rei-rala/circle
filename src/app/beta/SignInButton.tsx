"use client";

import { Button } from "@/components/ui/button"
import { ChromeIcon } from "lucide-react";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";


export const BetaSignInButton = () => {
    const params = useSearchParams();
    const callbackUrlParam = params.get('callbackUrl');
    let callbackUrl = '/beta';

    if (callbackUrlParam && callbackUrlParam !== '/beta') {
        callbackUrl = callbackUrlParam;
    }

    return (
        <Button
            variant="outline"
            className="w-full"
            asChild
            onClick={() => signIn('google', {
                callbackUrl
            })}
        >
            <a href="#">
                <ChromeIcon className="mr-2" />
                Sign In
            </a>
        </Button>
    )
}