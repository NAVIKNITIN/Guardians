import { Container } from "@/components/common/Container";
import { OutlineArrowButton } from "@/components/common/OutlineArrowButton";
import {
  audienceMarketingOutlineCtaIconClass,
  publicationCardOutlineCtaClass,
} from "@/styles/audienceMarketingCenter";
import { cn } from "@/utils/cn";

type Branch = {
  name: string;
  addressLines: readonly string[];
};

function branchMapUrl(addressLines: readonly string[]): string {
  const query = addressLines
    .map((line) => line.trim())
    .filter(Boolean)
    .join(", ");
  return `https://maps.google.com/?q=${encodeURIComponent(query)}`;
}

const BRANCHES: Branch[] = [
  {
    name: "Mumbai",
    addressLines: [
      // "The Guardians Real Estate Advisory India","10th Floor, A Wing, Kanakia Wall Street Andheri Kurla Road, Andheri East Mumbai 400093",
      "The Guardians Real Estate Advisory India","10th Floor A Wing, Kanakia Wall Street Andheri Kurla Road, Andheri East Mumbai 400093 ","C-602 & 603, ONE BKC, G Block, Bandra Kurla Complex, Bandra (E), Mumbai - 400051."
    ],
  },
  {
    name: "Pune",
    addressLines: [
      "The Guardians Real Estate Advisory India "," Westport, Unit No 410 , Survey Nos. 32/1A/1/30 to 38 & 54 of Revenue Village, Pan Card Club Road, Baner, Pune 411045",
    ],
  },
  {
    name: "Dubai",
    addressLines: [
      "TGREA International Advisory LLC, Office No 1807, Lake Central Tower, Business Bay, Dubai (UAE)",
    ],
  },
  {
    name: "Goa",
    addressLines: [
      "The Guardians Real Estate Advisory, 708, 7th floor, Gera's Imperium Grand, Patto Centre, Panjim, Goa 403001",
    ],
  },
];

function BranchCard({ branch }: { branch: Branch }) {
  const mapUrl = branchMapUrl(branch.addressLines);

  return (
    <div className="flex h-full flex-col items-center text-center">
      {/* Figma: branch title — bold sans, step below “BRANCHES”, above body */}
      <h3 className="n-bold fs-22 lh-28 text-[#161616] sm:fs-24 sm:lh-30 md:fs-26 md:lh-32 lg:fs-28 lg:lh-35">
        {branch.name}
      </h3>
      <div className="mt-3 flex min-h-0 w-full flex-1 flex-col justify-between gap-5 sm:mt-4 sm:gap-6">
        {/* Figma: address — regular, smallest column text (~16–18px, ~1.45–1.5 LH) */}
        <p className="n-book fs-16 lh-24 text-[#161616] sm:fs-17 sm:lh-26 md:fs-18 md:lh-28">
          {branch.addressLines.map((line, lineIdx) => (
            <span key={lineIdx} className={cn(lineIdx > 0 && "mt-1 block")}>
              {line}
            </span>
          ))}
        </p>
        {/* Figma: “GOOGLE MAP” — compact caps, gradient bar */}
        <OutlineArrowButton
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={publicationCardOutlineCtaClass}
          iconClassName={audienceMarketingOutlineCtaIconClass}
          iconAlt=""
        >
          Google Map
        </OutlineArrowButton>
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
        Our Presence 

        </h2>

        <div className="grid grid-cols-1 items-stretch gap-10 sm:gap-8 md:grid-cols-4 lg:gap-10">
          {BRANCHES.map((branch, index) => (
            <BranchCard key={`${branch.name}-${index}`} branch={branch} />
          ))}
        </div>
      </Container>
    </section>
  );
}
