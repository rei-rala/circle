import { LoginProviders } from "./LoginProviders";
import { ChromeIcon } from "lucide-react";
import { Suspense } from "react";
import Loading from "@/components/Loading";
import { LoginRedirect } from "./LoginRedirect";

export const dynamic = 'force-static';

export type LoginProvider = {
    displayName: string;
    Icon: React.ReactNode;
    name: string;
}

export default function Login() {
    const providers: LoginProvider[] = [
        {
            displayName: "Google",
            Icon: <ChromeIcon className="w-5 h-5 mr-2" />,
            name: "google",
        },
    ]

    return (
        <main className="grid place-items-center min-h-svh min-w-svw overflow-auto p-4 bg-[url('/icon.png')] bg-no-repeat bg-center bg-contain">
            <LoginRedirect />
            <div className="p-8 rounded-lg text-center bg-black bg-opacity-70">
                <div className="text-4xl font-bold mb-4">Iniciar Sesión en The Circle</div>
                <div className="grid gap-4">
                    <Suspense fallback={<Loading />}>
                        <LoginProviders providers={providers} />
                    </Suspense>
                </div>
            </div>
        </main>
    )
}