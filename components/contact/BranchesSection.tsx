import { Container } from "@/components/common/Container";

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
    <div className="flex flex-col items-center text-center">
      <h3 className="font-nexa text-[2rem] font-bold leading-tight text-[#161616]">
        {branch.name}
      </h3>
      <p className="mt-4 font-nexa text-xl font-normal leading-[1.2] text-[#161616]">
        {branch.address}
      </p>
      <a
        href={branch.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-5 px-12 py-[18px] font-nexa text-xl font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
        style={{
          background:
            "linear-gradient(270deg, #FFA995 5%, #D88373 15%, #F09684 50%, #D27E6C 85%, #FFA995 95%)",
        }}
      >
        Google Map
        <CornerArrow />
      </a>
    </div>
  );
}

export function BranchesSection() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-label="Office branches">
      <Container>
        {/* Section heading */}
        <h2 className="text-center font-qasbyne text-[clamp(2rem,4vw,3.125rem)] font-normal uppercase tracking-[0.05em] text-[#202225] mb-12 lg:mb-16">
          Branches
        </h2>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-8 lg:gap-10">
          {BRANCHES.map((branch) => (
            <BranchCard key={branch.name} branch={branch} />
          ))}
        </div>
      </Container>
    </section>
  );
}
