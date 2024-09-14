import { Landing } from "@/components/landing/Landing";
import { BRAND } from "@/constants";
import getServerSession from "@/lib/getServerSession";
import { Metadata } from "next";
import { redirect } from "next/navigation";
//import getTheCircleInstagramPosts from "@/services/instagram.services";

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
  robots: "index, follow",
  alternates: {
    canonical: "https://thecircleba.com.ar/home",
    languages: {
      "es-AR": "https://thecircleba.com.ar/home",
    },
  },
}
export default async function Home() {
  const session = await getServerSession();

  if (session?.user) redirect("/events");

  return <Landing />;
}

Home.revalidate = 86400; // Cache for 1 day