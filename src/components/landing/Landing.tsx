import { prisma } from "@/prisma";
import { HeroSection } from "./_heroSection";
import { NextEvents } from "./_nextEventsSection";
import { AboutSection } from "./_aboutSection";
import { PhotoSection } from "./_photoSection";


export async function Landing() {
  let events: SocialEvent[];

  try {
    // find events that are not in the past and not deleted, if logged, show only public events
    events = await prisma.socialEvent.findMany({
      take: 5,
      where: {
        date: {
          gt: new Date(),
        },
        public: true,
      },
      orderBy: {
        date: "asc",
      },
    }) as SocialEvent[] || []
  } catch (err) {
    console.log("Error fetching events")
    console.log(err)
    events = [];
  }

  return (
    <div className="flex flex-col gap-10 mt-2">
      <div className="flex-1 flex flex-col gap-5">
        <HeroSection />
        <NextEvents events={events} />
      </div>
      <AboutSection />
      <PhotoSection />
    </div>
  )
}


