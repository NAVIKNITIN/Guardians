import { Container } from "@/components/common/Container";
import { cn } from "@/utils/cn";
import Image from "next/image";

type Branch = {
  name: string;
  address: string;
  mapUrl: string;
};

const BRANCHES: Branch[] = [
  {
    name: "Head Office",
    address:
      "C-602 & 603, ONE BKC, G Block, Bandra Kurla Complex, Bandra (E), Mumbai - 400051",
    mapUrl:
      "https://maps.google.com/?q=ONE+BKC+Bandra+Kurla+Complex+Mumbai",
  },
  {
    name: "Pune",
    address:
      "Westport, Unit No 410, Survey Nos. 32/1A/1/30 to 38 & 54 of Revenue Village, Pan Card Club Road, Baner, Pune 411045",
    mapUrl: "https://maps.google.com/?q=Westport+Baner+Pune",
  },
  {
    name: "Dubai",
    address:
      "TGREA International Advisory LLC, Office No 1807, Lake Central Tower, Business Bay, Dubai (UAE)",
    mapUrl:
      "https://maps.google.com/?q=Lake+Central+Tower+Business+Bay+Dubai",
  },
];

function BranchCard({ branch }: { branch: Branch }) {
  return (
    <div className="flex h-full flex-col items-center text-center">
      {/* Figma: branch title — bold sans, step below “BRANCHES”, above body */}
      <h3 className="n-bold fs-22 lh-28 text-[#161616] sm:fs-24 sm:lh-30 md:fs-26 md:lh-32 lg:fs-28 lg:lh-35">
        {branch.name}
      </h3>
      <div className="mt-3 flex min-h-0 w-full flex-1 flex-col justify-between gap-5 sm:mt-4 sm:gap-6">
        {/* Figma: address — regular, smallest column text (~16–18px, ~1.45–1.5 LH) */}
        <p className="n-book fs-16 lh-24 text-[#161616] sm:fs-17 sm:lh-26 md:fs-18 md:lh-28">
          {branch.address}
        </p>
        {/* Figma: “GOOGLE MAP” — compact caps, gradient bar */}
        <a
          href={branch.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "btn-primary-gradient inline-flex w-full max-w-sm shrink-0 items-center justify-center gap-3 self-center px-6 py-3 sm:w-auto sm:max-w-none sm:gap-4 sm:px-10 sm:py-3.5",
            "n-bold fs-14 lh-18 uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:fs-15 sm:lh-21",
          )}
        >
          Google Map
          <span className="inline-block" aria-hidden>
            <Image
              src="/images/arrowwhite.svg"
              alt=""
              width={15}
              height={15}
              className="object-cover"
            />
          </span>
        </a>
      </div>
    </div>
  );
}

export function BranchesSection() {
  return (
    <section className="bg-white pb-16 pt-4 sm:pb-20 lg:pb-24 lg:pt-[40px]" aria-label="Office branches">
      <Container>
        {/* Figma: “BRANCHES” — serif caps, same band as other qs-reg section titles */}
        <h2 className="qs-reg mb-10 text-center text-[clamp(2rem,4vw,3.125rem)] uppercase leading-[1.05] tracking-[0.05em] text-[#202225] sm:mb-5 lg:mb-8">
          Branches
        </h2>

        <div className="grid grid-cols-1 items-stretch gap-10 sm:gap-8 md:grid-cols-3 lg:gap-10">
          {BRANCHES.map((branch) => (
            <BranchCard key={branch.name} branch={branch} />
          ))}
        </div>
      </Container>
    </section>
  );
}
