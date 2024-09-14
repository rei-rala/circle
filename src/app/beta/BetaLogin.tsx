import { BRAND } from "@/constants"
import { Session } from "next-auth"
import { BetaSignInButton } from "./SignInButton"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const BetaLogin = ({ session }: { session: Session | null }) => {
    return (
        !session?.user ? (
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
        )
    )
}