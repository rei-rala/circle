import { BRAND } from "@/constants";

export function AboutSection() {
    return (
        <section id="about" className="grid gap-4 pt-20 -mt-16">
            <div className="text-2xl font-semibold">Sobre {BRAND}</div>
            <div className="grid grid-cols-1 gap-4 text-[#cccccc]">
                <div>
                    <p className="text-lg">
                        {BRAND} es una comunidad social en Buenos Aires que organiza eventos para conectar personas y
                        disfrutar de la ciudad. Únete y participa en experiencias únicas.
                    </p>
                    <p className="mt-4">
                        Nuestra misión es crear una comunidad acogedora e inclusiva donde las personas puedan hacer nuevos
                        amigos, explorar la ciudad y participar en actividades divertidas y estimulantes.
                    </p>
                </div>
                <div>
                    <p>
                        Creemos que al reunir a las personas, podemos fomentar un sentido de comunidad y pertenencia en Buenos
                        Aires. Nuestros eventos van desde encuentros casuales hasta experiencias curadas, todo diseñado para
                        ayudarte a conectar con personas afines y descubrir lo mejor de la ciudad.
                    </p>
                    <p className="mt-4">
                        Ya seas local o visitante, te invitamos a unirte a El Círculo y ser parte de nuestra vibrante comunidad.
                        Juntos, creemos recuerdos inolvidables y aprovechemos al máximo nuestro tiempo en esta increíble ciudad.
                    </p>
                </div>
            </div>
        </section>
    )
}