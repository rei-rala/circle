import getServerSession from "@/lib/getServerSession";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma";
import { Metadata } from "next";


import { BRAND } from "@/constants"
import { Landing } from "@/components/landing/Landing";
import { socialEventFetch } from "../socialEventFetch";

export const metadata: Metadata = {
  openGraph: {
    title: BRAND,
    description: BRAND + " es una comunidad social en Buenos Aires que organiza eventos para conectar personas y disfrutar de la ciudad. Únete y participa en experiencias únicas.",
    url: "https://thecircle.com.ar",
    siteName: BRAND,
    images: [
      {
        url: "/icon.png",
        width: 350,
        height: 350,
      },
    ],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: BRAND,
    description: BRAND + " es una comunidad social en Buenos Aires que organiza eventos para conectar personas y disfrutar de la ciudad. Únete y participa en experiencias únicas.",
    images: ["/icon.png"],
  },
  manifest: "/manifest.json",
  robots: "index, follow",
  alternates: {
    canonical: "https://thecircleba.com.ar",
    languages: {
      "es-AR": "https://thecircleba.com.ar",
    },
  },
}

export default async function AlternativeHome() {
  const session = await getServerSession();
  if (!session?.user) redirect("/")

  const isUserBannedOrPendingAdmission = !session?.user.admitted || session?.user.banned

  if (!(session.user)) {
    redirect("/");
  }

  const events: SocialEvent[] = await socialEventFetch(!isUserBannedOrPendingAdmission);

  return <Landing events={events} />
}

AlternativeHome.revalidate = 86400; // Cache for 1 day
