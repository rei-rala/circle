import getServerSession from "@/lib/getServerSession";
import { BetaSignInButton } from "./SignInButton";
import Image from "next/image";
import { BRAND } from "@/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function BetaPage() {
    const session = await getServerSession();

    return (
        <div className="fixed inset-0 bg-[#1a1a1a] flex items-center justify-center z-50">
            <div className="bg-[#222222] p-8 rounded-lg text-center w-full max-w-[90svw] mx-auto">
                <div className="relative w-32 h-32 mx-auto mb-6">
                    <Image
                        priority={true}
                        width={128}
                        height={128}
                        src="/icon.png"
                        alt={BRAND + " Icon"}
                        className="object-contain"
                    />
                </div>
                {!session?.user ? (
                    <>
                        <div className="text-4xl font-bold mb-4">{BRAND} Beta</div>
                        <p className="mb-4">Inicia sesión para probar nuestra nueva versión.</p>
                        <BetaSignInButton />
                    </>
                ) : session?.user?.admitted === true ? (
                    <>
                        <div className="text-4xl font-bold mb-4">¡Bienvenido!</div>
                        <p className="mb-4">Ya tienes acceso.</p>
                        <Link href="/">
                            <Button>
                                Comenzar
                            </Button>
                        </Link>
                    </>
                ) : (
                    <>
                        <div className="text-4xl font-bold mb-4">Casi listos</div>
                        <p className="mb-4">
                            Estamos terminando los últimos detalles.
                            <br />
                            Si eres del equipo, vuelve más tarde para ver los cambios.
                        </p>
                    </>
                )}
            </div>
        </div>
    )
}