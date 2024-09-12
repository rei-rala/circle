import { HeroSection } from "./_heroSection";
import { AboutSection } from "./_aboutSection";
import { PhotoSection } from "./_photoSection";
import { NextEvents } from "./_nextEventsSection";
import { cache } from 'react';

const getCachedLanding = cache(async () => {
  return (
    <div className="flex flex-col gap-10 mt-2">
      <div className="flex-1 flex flex-col gap-5">
        <HeroSection />
        <NextEvents />
      </div>
      <AboutSection />
      <PhotoSection />
    </div>
  );
});

export async function Landing() {
  return getCachedLanding();
}
