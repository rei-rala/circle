"use client";

import { Button } from "@/components/ui/button";
import { ChromeIcon } from "lucide-react";

import { signIn } from "next-auth/react";

export default function Login({ searchParams }: { searchParams: { callbackUrl: string } }) {
    const callbackUrl = searchParams.callbackUrl || "/";

    const providers = [
        {
            displayName: "Google",
            icon: ChromeIcon,
            name: "google",
        },
    ]


    return (
        <main className="flex-1 overflow-auto bg-[#1a1a1a] p-4">
            <div className="flex items-center justify-center h-full">
                <div className="bg-[#222222] p-8 rounded-lg text-center">
                    <picture>
                        <source srcSet="/icon.webp" type="image/webp" />
                        <source srcSet="/icon.png" type="image/png" />
                        <source srcSet="/icon.jpg" type="image/jpg" />
                        <img src="/icon.webp" alt="The Circle" className="mx-auto w-32 h-32 mb-4" />
                    </picture>

                    <div className="text-4xl font-bold mb-4">Iniciar Sesión en The Circle</div>
                    <div className="grid gap-4">
                        {
                            providers.map((provider) => (
                                <Button
                                    key={provider.displayName}
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => signIn(provider.name, { callbackUrl })}
                                >
                                    <provider.icon className="w-5 h-5 mr-2" />
                                    Iniciar sesión con {provider.displayName}
                                </Button>
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    )
}