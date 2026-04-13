import { Container } from "@/components/common/Container";
import { IconArrowUpRight } from "@/components/common/icons";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

export function CareerApplyCTA() {
  return (
    <section
      className="relative overflow-hidden border-t border-black/[0.06] bg-[#202225] py-16 sm:py-20 lg:py-24"
      aria-labelledby="cta-heading"
    >
      {/* Subtle background watermark */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-5" aria-hidden>
        <Image
          src="/images/Group%204.svg"
          alt=""
          fill
          className="object-cover object-right"
        />
      </div>

      <Container className="relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          {/* Eyebrow */}
          <p className="font-nexa text-xs font-bold uppercase tracking-[0.3em] text-[#8F8183]">
            Don&apos;t see your role?
          </p>

          {/* Heading */}
          <h2
            id="cta-heading"
            className={cn(
              "mt-4 font-qasbyne font-normal uppercase text-white",
              "text-[clamp(2rem,5vw,3.5rem)] leading-[1.06] tracking-[0.04em]",
            )}
          >
            We&apos;re Always Looking for{" "}
            <span className="text-[#8F8183]">Great Talent</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl font-nexa text-sm leading-relaxed text-white/70 sm:text-base">
            Send us your profile and let us know what you can bring to The
            Guardians. We review every application and reach out when the right
            opportunity arises.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className={cn(
                "inline-flex items-center gap-2",
                "border border-white bg-white px-8 py-3.5 font-nexa text-xs font-bold uppercase tracking-[0.2em] text-[#202225]",
                "transition-colors hover:bg-[#DADADB]",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              )}
            >
              Submit Your Profile
              <IconArrowUpRight className="h-3.5 w-3.5" />
            </Link>
            <Link
              href="mailto:hr@theguardians.in"
              className={cn(
                "inline-flex items-center gap-2",
                "border border-white/40 bg-transparent px-8 py-3.5 font-nexa text-xs font-bold uppercase tracking-[0.2em] text-white",
                "transition-colors hover:border-white",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              )}
            >
              Email HR Directly
            </Link>
          </div>

          {/* HR contact info strip */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 border-t border-white/10 pt-8 sm:gap-10">
            {[
              { label: "Mumbai HQ", value: "Bandra Kurla Complex" },
              { label: "Pune Office", value: "Koregaon Park" },
              { label: "HR Email", value: "hr@theguardians.in" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-1 text-center">
                <span className="font-nexa text-[10px] font-bold uppercase tracking-[0.2em] text-[#8F8183]">
                  {item.label}
                </span>
                <span className="font-nexa text-sm text-white/80">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
