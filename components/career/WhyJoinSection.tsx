import { Container } from "@/components/common/Container";
import { marketingClasses } from "@/styles/marketingClasses";
import { cn } from "@/utils/cn";

const PILLARS = [
  {
    id: "growth",
    number: "01",
    title: "Accelerated Growth",
    body: "Work alongside industry veterans and fast-track your career. Our flat hierarchy means your ideas get heard and your contributions are recognized.",
  },
  {
    id: "impact",
    number: "02",
    title: "Real Impact",
    body: "From ₹37,850 Cr worth of inventory sold to 2 million+ sq. ft. developed — every team member plays a direct role in our landmark milestones.",
  },
  {
    id: "culture",
    number: "03",
    title: "Inclusive Culture",
    body: "We bring together the best minds from across the real estate industry. Diversity of thought, background, and experience is our greatest strength.",
  },
  {
    id: "learning",
    number: "04",
    title: "Continuous Learning",
    body: "Access to market intelligence, industry research, and cross-functional exposure ensures you grow as fast as the markets we serve.",
  },
  {
    id: "rewards",
    number: "05",
    title: "Competitive Rewards",
    body: "Industry-leading compensation, performance incentives, and a work environment built to attract and retain top talent across all functions.",
  },
  {
    id: "network",
    number: "06",
    title: "Unmatched Network",
    body: "Build relationships with India's top developers, investors, and real estate institutions — connections that last a lifetime.",
  },
] as const;

export function WhyJoinSection() {
  return (
    <section
      className="border-t border-black/[0.06] bg-brand-background py-16 sm:py-20 lg:py-24"
      aria-labelledby="why-join-heading"
    >
      <Container>
        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="why-join-heading"
            className={cn(marketingClasses.headingDisplay, "mb-4")}
          >
            Why The Guardians?
          </h2>
          <p className="font-nexa text-sm leading-relaxed text-brand-text-secondary sm:text-base">
            We are more than a workplace — we are a launchpad for the careers
            of India&apos;s next generation of real estate leaders.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="mt-12 grid gap-px border border-black/[0.06] bg-black/[0.06] sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
          {PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="group flex flex-col gap-4 bg-white p-8 transition-colors hover:bg-[#FAFAF9] sm:p-10"
            >
              <span className="font-nexa text-xs font-bold tracking-[0.25em] text-[#8F8183]">
                {pillar.number}
              </span>
              <h3 className="font-qasbyne text-xl font-normal uppercase tracking-[0.06em] text-[#202225] sm:text-2xl">
                {pillar.title}
              </h3>
              <div className="h-px w-10 bg-[#8F8183] transition-all duration-300 group-hover:w-16" />
              <p className="font-nexa text-sm leading-relaxed text-brand-text-secondary">
                {pillar.body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
