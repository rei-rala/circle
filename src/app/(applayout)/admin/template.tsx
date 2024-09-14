import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function AdminOnlyPagesTemplate({ children }: { children: React.ReactNode }) {
    const session = await auth();
    const role = session?.user.role?.toUpperCase();

    if (role !== "MASTER" && role !== "ADMIN") {
        return redirect("/");
    }

    return children;
}