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
  mapUrl: string;
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
    mapUrl: "https://www.google.com/maps/place/The+Guardians+Real+Estate+Advisory/@19.0605482,72.8626348,17z/data=!3m1!4b1!4m6!3m5!1s0x3be7c955b6864227:0x891e43810d352cdd!8m2!3d19.0605431!4d72.8652097!16s%2Fg%2F11fkljz378?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Pune",
    addressLines: [
      "The Guardians Real Estate Advisory India "," Westport, Unit No 410 , Survey Nos. 32/1A/1/30 to 38 & 54 of Revenue Village, Pan Card Club Road, Baner, Pune 411045",
    ],
    mapUrl: "https://www.google.com/maps/place/WESTPORT/@18.5583862,73.7747655,17z/data=!3m1!4b1!4m6!3m5!1s0x3bc2bfab61ad93cf:0x37284bac80c6bf4f!8m2!3d18.5583811!4d73.7773404!16s%2Fg%2F11gj0wrhv6?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Dubai",
    addressLines: [
      "TGREA International Advisory LLC, Office No 1807, Lake Central Tower, Business Bay, Dubai (UAE)",
    ],
    mapUrl: "https://www.google.com/maps/place/Lake+Central+Tower/@25.2749027,55.2191766,12z/data=!3m1!5s0x3e5f683257c306e3:0xbe28e30d5f14d78b!4m10!1m2!2m1!1sTGREA+International+Advisory+LLC,+Office+No+1807,+Lake+Central+Tower,+Business+Bay,+Dubai+(UAE)!3m6!1s0x3e5f682d79f79769:0x775f469534962029!8m2!3d25.1863001!4d55.2730103!15sCl9UR1JFQSBJbnRlcm5hdGlvbmFsIEFkdmlzb3J5IExMQywgT2ZmaWNlIE5vIDE4MDcsIExha2UgQ2VudHJhbCBUb3dlciwgQnVzaW5lc3MgQmF5LCBEdWJhaSAoVUFFKVpbIll0Z3JlYSBpbnRlcm5hdGlvbmFsIGFkdmlzb3J5IGxsYyBvZmZpY2Ugbm8gMTgwNyBsYWtlIGNlbnRyYWwgdG93ZXIgYnVzaW5lc3MgYmF5IGR1YmFpIHVhZZIBD3Zpc2FfY29uc3VsdGFudJoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VSd05FbFFUVUZSRUFF4AEA-gEECAAQRA!16s%2Fg%2F1pp2xb0kb?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "Goa",
    addressLines: [
      "The Guardians Real Estate Advisory, 708, 7th floor, Gera's Imperium Grand, Patto Centre, Panjim, Goa 403001",
    ],
    mapUrl: "https://www.google.com/maps/place/Gera's+Imperium+Grand/@15.49495,73.828933,17z/data=!4m10!1m2!2m1!1s708,+7th+floor,+Gera's+Imperium+Grand,+Patto+Centre,+Panjim,+Goa+403001!3m6!1s0x3bbfc084e77d9501:0xcf2579638f5eb252!8m2!3d15.49495!4d73.8336966!15sCkc3MDgsIDd0aCBmbG9vciwgR2VyYSdzIEltcGVyaXVtIEdyYW5kLCBQYXR0byBDZW50cmUsIFBhbmppbSwgR29hIDQwMzAwMVpEIkI3MDggN3RoIGZsb29yIGdlcmEncyBpbXBlcml1bSBncmFuZCBwYXR0byBjZW50cmUgcGFuamltIGdvYSA0MDMwMDGSARBjb3Jwb3JhdGVfb2ZmaWNl4AEA!16s%2Fg%2F11ddwxyw9f?entry=ttu&g_ep=EgoyMDI2MDYwMy4xIKXMDSoASAFQAw%3D%3D",
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
          {branch.addressLines.map((line, lineIdx) => (
            <span key={lineIdx} className={cn(lineIdx > 0 && "mt-1 block")}>
              {line}
            </span>
          ))}
        </p>
        {/* Figma: “GOOGLE MAP” — compact caps, gradient bar */}
        <div>
        <OutlineArrowButton
          href={branch?.mapUrl || ""}
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
