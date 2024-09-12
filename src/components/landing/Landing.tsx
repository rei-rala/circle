import { HeroSection } from "./_heroSection";
import { AboutSection } from "./_aboutSection";
import { PhotoSection } from "./_photoSection";
import { cache, lazy, Suspense } from 'react';

const NextEventsSection = lazy(() => import("./_nextEventsSection").then(mod => ({ default: mod.NextEvents })));

const getCachedLanding = cache(async ({ events, instagramPosts }: { events?: SocialEvent[], instagramPosts?: any[] }) => {
  return (
    <div className="flex flex-col gap-10 mt-2">
      <div className="flex-1 flex flex-col gap-5">
        <HeroSection />
        <Suspense fallback={
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        }>
          <NextEventsSection />
        </Suspense>
      </div>
      <AboutSection />
      <PhotoSection photos={instagramPosts} />
    </div>
  );
});

export async function Landing({ events = [], instagramPosts }: { events?: SocialEvent[], instagramPosts?: any[] }) {
  return getCachedLanding({ events, instagramPosts });
}
