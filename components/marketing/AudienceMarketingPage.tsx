import { AwardsSection } from "@/components/developer/AwardsSection";
import { DeveloperStatsSection } from "@/components/developer/DeveloperStatsSection";
import { LandmarkProjectsSection } from "@/components/developer/LandmarkProjectsSection";
import { OurWorkSection } from "@/components/developer/OurWorkSection";
import { PartnersSection } from "@/components/developer/PartnersSection";
import { TestimonialsSection } from "@/components/developer/TestimonialsSection";
import { AudienceHero } from "@/components/marketing/AudienceHero";
import { AudienceServicesBand } from "@/components/marketing/AudienceServicesBand";
import { ExploreBanner } from "@/components/marketing/ExploreBanner";
import type { MarketingPageContent } from "@/data/audience-marketing";
import { cn } from "@/utils/cn";

export function AudienceMarketingPage({
  content,
}: {
  content: MarketingPageContent;
}) {
  return (
    <div
      className={cn(
        "mx-auto flex w-full min-w-0 max-w-[100vw] flex-col overflow-x-clip",
        "[&>*]:min-w-0",
      )}
    >
      <AudienceHero
        key={content.hero.ariaHeadingId}
        content={content.hero}
      />
      {content.services ? <AudienceServicesBand content={content.services} /> : null}
      {content.ourWork ? <OurWorkSection content={content.ourWork} /> : null}
      {content.landmark ? <LandmarkProjectsSection content={content.landmark} /> : null}
      {content.stats ? <DeveloperStatsSection content={content.stats} /> : null}
      {content.partners ? <PartnersSection content={content.partners} /> : null}
      {content.testimonials ? <TestimonialsSection content={content.testimonials} /> : null}
      {content.awards ? <AwardsSection content={content.awards} /> : null}
      {content.banner ? <ExploreBanner content={content.banner} /> : null}
    </div>
  );
}
