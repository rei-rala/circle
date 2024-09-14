import getServerSession from "@/lib/getServerSession";
import Image from "next/image";
import { BRAND } from "@/constants";
import { BetaLogin } from "./BetaLogin";

export const dynamic = 'force-static';

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
                <BetaLogin session={session} />
            </div>
        </div>
    )
}