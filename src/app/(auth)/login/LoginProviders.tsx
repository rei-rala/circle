"use client"

import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { LoginProvider } from "./page";


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
                {<provider.Icon className="w-5 h-5 mr-2" />}
                Iniciar sesión con {provider.displayName}
            </Button>
        ))
    )
}