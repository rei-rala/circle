import { HeroSection } from "./_heroSection";
import { NextEvents } from "./_nextEventsSection";
import { AboutSection } from "./_aboutSection";
import { PhotoSection } from "./_photoSection";


export async function Landing({ events, instagramPosts }: { events: SocialEvent[], instagramPosts?: any[] }) {
  console.log(events)
  return (
    <div className="flex flex-col gap-10 mt-2">
      <div className="flex-1 flex flex-col gap-5">
        <HeroSection />
        <NextEvents events={events} />
      </div>
      <AboutSection />
      <PhotoSection photos={instagramPosts} />
    </div>
  )
}


