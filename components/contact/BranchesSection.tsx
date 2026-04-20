import { Container } from "@/components/common/Container";
import Image from "next/image";

function CornerArrow() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M0 0H14.4958V14.4958" stroke="white" strokeWidth="2" />
    </svg>
  );
}

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
      <h3 className="n-bold text-2xl leading-[1.1] text-[#161616] md:text-[28px] lg:text-[32px] lg:leading-[35px]">
        {branch.name}
      </h3>
      <div className="mt-3 flex min-h-0 w-full flex-1 flex-col justify-between gap-5 sm:mt-4 sm:gap-6">
        <p className="n-book text-base leading-[1.45] text-[#161616] sm:text-lg md:text-[20px] md:leading-[24px]">
          {branch.address}
        </p>
        <a
          href={branch.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full max-w-sm shrink-0 items-center justify-center gap-4 self-center px-6 py-3.5 n-reg text-base uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:w-auto sm:max-w-none sm:gap-5 sm:px-12 sm:py-[18px] sm:text-xl"
          style={{
            background:
              "linear-gradient(270deg, #FFA995 5%, #D88373 15%, #F09684 50%, #D27E6C 85%, #FFA995 95%)",
          }}
        >
          Google Map
          <span className="inline-block">
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
        {/* Section heading */}
        <h2 className="qs-reg mb-10 text-center uppercase tracking-[0.05em] text-[#202225] text-[clamp(2rem,4vw,3.125rem)] leading-[1.05] sm:mb-12 lg:mb-16">
          Branches
        </h2>

        {/* 3-column grid (stacks on small screens, 3-up from md+) */}
        <div className="grid grid-cols-1 items-stretch gap-10 sm:gap-8 md:grid-cols-3 lg:gap-10">
          {BRANCHES.map((branch) => (
            <BranchCard key={branch.name} branch={branch} />
          ))}
        </div>
      </Container>
    </section>
  );
}
