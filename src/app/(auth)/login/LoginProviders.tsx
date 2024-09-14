"use client"

import { useSearchParams } from "next/navigation";
import { LoginProvider } from "./page";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export function LoginProviders({ providers }: { providers: LoginProvider[] }) {
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || "/";

    return (
        providers.map((provider) => (
            <Button
                key={provider.displayName}
                variant="outline"
                className="w-full"
                onClick={() => signIn(provider.name, { callbackUrl })}
            >
                {provider.Icon}
                Iniciar sesión con {provider.displayName}
            </Button>
        ))
    )
}