import { AwardsSection } from "@/components/developer/AwardsSection";
import { LandmarkProjectsSection } from "@/components/developer/LandmarkProjectsSection";
import { OurWorkSection } from "@/components/developer/OurWorkSection";
import { PartnersSection } from "@/components/developer/PartnersSection";
import { TestimonialsSection } from "@/components/developer/TestimonialsSection";
import { AudienceHero } from "@/components/marketing/AudienceHero";
import { AudienceServicesBand } from "@/components/marketing/AudienceServicesBand";
import { AudienceStatsSection } from "@/components/marketing/AudienceStatsSection";
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
        "mx-auto flex w-full min-w-0 max-w-[100vw] flex-col overflow-x-visible gap-10 md:gap-16 lg:gap-20 xl:gap-25 2xl:gap-25 mb-10 md:mb-20 lg:mb-20 2xl:mb-20",
        "[&>*]:min-w-0",
      )}
    >
      <AudienceHero
        key={content.hero.ariaHeadingId}
        content={content.hero}
      />
      {content.services ? <AudienceServicesBand content={content.services} isBuyer={content.hero.isBuyer} /> : null}
      {content.ourWork ? <OurWorkSection content={content.ourWork} isBuyer={content.hero.isBuyer} /> : null}
      {content.landmark ? <LandmarkProjectsSection content={content.landmark} isBuyer={content.hero.isBuyer} /> : null}
      {content.stats ? <AudienceStatsSection content={content.stats} isBuyer={content.hero.isBuyer} /> : null}
      {content.partners ? <PartnersSection content={content.partners} isBuyer={content.hero.isBuyer} /> : null}
      {content.testimonials ? <TestimonialsSection content={content.testimonials} isBuyer={content.hero.isBuyer} /> : null}
      {content.awards ? <AwardsSection content={content.awards} isBuyer={content.hero.isBuyer} /> : null}
      {content.banner ? <ExploreBanner content={content.banner} isBuyer={content.hero.isBuyer} /> : null}
    </div>
  );
}
