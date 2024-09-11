import getServerSession from "@/lib/getServerSession"
import { ForceBack } from "@/components/ForceBack";


export default async function PendingAdmissionPage() {
    const session = await getServerSession();

    if (!session || session.user.admitted) {
        return <ForceBack />
    }

    return (
        <div className="flex items-center justify-center h-full">
            <div className="bg-[#222222] p-8 rounded-lg text-center">
                <div className="text-4xl font-bold mb-4">¡Gracias por registrarte!</div>
                <div className="text-lg mb-4">Tu cuenta está pendiente de admisión.</div>
                <div className="text-sm text-[#cccccc] mb-4">
                    Por favor, espera a que un administrador revise y apruebe tu solicitud.
                </div>
            </div>
        </div>
    )
}
