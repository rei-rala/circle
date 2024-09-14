import getServerSession from "@/lib/getServerSession";

import { redirect } from "next/navigation";
import { LoginProviders } from "./LoginProviders";
import { ChromeIcon } from "lucide-react";
import { Suspense } from "react";
import Loading from "@/components/Loading";

export type LoginProvider = {
    displayName: string;
    Icon: React.ElementType;
    name: string;
}


export default async function Login() {
    const session = await getServerSession();

    if (session) {
        redirect("/");
    }

    const providers: LoginProvider[] = [
        {
            displayName: "Google",
            Icon: ChromeIcon,
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
                        <Suspense fallback={<Loading />}>
                            <LoginProviders providers={providers} />
                        </Suspense>
                    </div>
                </div>
            </div>
        </main>
    )
}