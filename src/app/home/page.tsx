import getServerSession from "@/lib/getServerSession";
import { Landing } from "../../components/landing/Landing";
import { redirect } from "next/navigation";
import { prisma } from "@/prisma";
import { Metadata } from "next";


import { BRAND } from "@/constants"

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
  let events: SocialEvent[];

  try {
    if (!session?.user) {
      throw new Error("User not logged in")
    }
    // find events that are not in the past and not deleted, if logged, show only public events
    events = await prisma.socialEvent.findMany({
      take: 5,
      where: {
        public: true,
        date: {
          gte: new Date() // Only fetch events that are not in the past
        },
        deletedAt: undefined // Only fetch events that are not deleted
      },
      orderBy: {
        date: "asc",
      },
      include: {
        owner: true
      }
    }) as unknown as SocialEvent[] || []
  } catch (err) {
    console.error("Error fetching events:", err)
    events = [];
  }


  return <Landing events={events} />
}
