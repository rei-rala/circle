import { HeroSection } from "./_heroSection";
import { AboutSection } from "./_aboutSection";
import { PhotoSection } from "./_photoSection";
import { NextEvents } from "./_nextEventsSection";
import { cache } from 'react';

const getCachedLanding = cache(async ({ events }: { events: SocialEvent[] }) => {
  return (
    <div className="flex flex-col gap-10 mt-2">
      <div className="flex-1 flex flex-col gap-5">
        <HeroSection />
        <NextEvents events={events} />
      </div>
      <AboutSection />
      <PhotoSection />
    </div>
  );
});

export async function Landing({ events }: { events: SocialEvent[] }) {
  return getCachedLanding({ events });
}
