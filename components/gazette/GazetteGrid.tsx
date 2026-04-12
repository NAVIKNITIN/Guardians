import { Container } from "@/components/common/Container";
import { GazetteCard, type GazetteIssue } from "./GazetteCard";

const ISSUES: GazetteIssue[] = [
  {
    id: "1",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/TEMP/35f80b4852d3b0f3cc3880dfe66322c0a324b1b4?width=1082",
    imageAlt: "City Life magazine cover",
    href: "#",
  },
  {
    id: "2",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/TEMP/35f80b4852d3b0f3cc3880dfe66322c0a324b1b4?width=1082",
    imageAlt: "City Life magazine cover",
    href: "#",
  },
  {
    id: "3",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/TEMP/35f80b4852d3b0f3cc3880dfe66322c0a324b1b4?width=1082",
    imageAlt: "City Life magazine cover",
    href: "#",
  },
  {
    id: "4",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/TEMP/69cfc63ec1bc1c07ddf5cdb1894e5d8aab377554?width=1082",
    imageAlt: "City Life magazine cover",
    href: "#",
  },
  {
    id: "5",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/TEMP/69cfc63ec1bc1c07ddf5cdb1894e5d8aab377554?width=1082",
    imageAlt: "City Life magazine cover",
    href: "#",
  },
  {
    id: "6",
    title: "Revolutionising real estate - The Power of GIS mapping in India",
    imageSrc:
      "https://api.builder.io/api/v1/image/assets/TEMP/69cfc63ec1bc1c07ddf5cdb1894e5d8aab377554?width=1082",
    imageAlt: "City Life magazine cover",
    href: "#",
  },
];

function ViewMoreIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M0 0H14.4958V14.4958" stroke="white" strokeWidth="2" />
    </svg>
  );
}

export function GazetteGrid() {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24" aria-label="Gazette issues">
      <Container>
        {/* 3-column grid */}
        <div className="grid grid-cols-1 gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-[52px] lg:gap-y-16">
          {ISSUES.map((issue) => (
            <GazetteCard key={issue.id} issue={issue} />
          ))}
        </div>

        {/* VIEW MORE CTA */}
        <div className="mt-16 flex justify-center lg:mt-20">
          <button
            type="button"
            className="inline-flex items-center gap-5 px-12 py-[18px] font-nexa text-xl font-bold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90"
            style={{
              background:
                "linear-gradient(270deg, #FFA995 5%, #D88373 15%, #F09684 50%, #D27E6C 85%, #FFA995 95%)",
            }}
          >
            View More
            <ViewMoreIcon />
          </button>
        </div>
      </Container>
    </section>
  );
}
