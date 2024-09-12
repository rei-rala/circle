import { HeroSection } from "./_heroSection";
import { NextEvents } from "./_nextEventsSection";
import { AboutSection } from "./_aboutSection";
import { PhotoSection } from "./_photoSection";
import { cache } from 'react';

const getCachedLanding = cache(async ({ events, instagramPosts }: { events: SocialEvent[], instagramPosts?: any[] }) => {
  return (
    <div className="flex flex-col gap-10 mt-2">
      <div className="flex-1 flex flex-col gap-5">
        <HeroSection />
        <NextEvents events={events} />
      </div>
      <AboutSection />
      <PhotoSection photos={instagramPosts} />
    </div>
  );
});

export async function Landing({ events, instagramPosts }: { events: SocialEvent[], instagramPosts?: any[] }) {
  return getCachedLanding({ events, instagramPosts });
}
