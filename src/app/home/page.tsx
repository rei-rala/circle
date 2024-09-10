import getServerSession from "@/lib/getServerSession";
import { Landing } from "../../components/landing/Landing";
import { redirect } from "next/navigation";

export default async function AlternativeHome() {
    const session = await getServerSession();
    if (!session?.user) redirect("/")

    return <Landing />
}
