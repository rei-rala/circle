import getServerSession from "@/lib/getServerSession";
import { prisma } from "@/prisma";
import { Landing } from "../components/landing/Landing";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();
  let events: SocialEvent[];

  //if (session?.user) redirect("/events")

  return <Landing />
}
