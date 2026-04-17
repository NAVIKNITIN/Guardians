import { Container } from "@/components/common/Container";
import { IconArrowUpRight, IconChevronDown } from "@/components/common/icons";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

const locations = ["Mumbai", "Pune", "Dubai"] as const;
const queries = ["Business", "HR", "Channel Partner"] as const;

/** Figma: left column Facebook · Instagram, right column Twitter/X · LinkedIn */
const socialLeftCol = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    iconSrc: "/images/facebook.svg",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    iconSrc: "/images/instagram.svg",
  },
] as const;
const socialRightCol = [
  {
    label: "Twitter/X",
    href: "https://twitter.com",
    iconSrc: "/images/twitter.svg",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    iconSrc: "/images/linkedIn.svg",
  },
] as const;

const quickLinkRows: { label: string; href: string }[][] = [
  [
    { label: "About", href: "/about" },
    { label: "Brands", href: "/about#brands" },
    { label: "Services", href: "#services" },
  ],
  [
    { label: "Projects", href: "#projects" },
    { label: "Partners & Clients", href: "/partners" },
  ],
  [
    { label: "Career", href: "/career" },
    { label: "Media", href: "/newsroom" },
  ],
];

const sectionTitleClass =
  "n-reg block text-center text-xs uppercase tracking-[0.1em] text-white sm:text-left sm:text-lg";

const dropdownButtonClass =
  "flex min-h-[44px] w-full items-center justify-between gap-2 border-b border-white py-2 text-left n-reg text-xs text-white transition-colors hover:text-white sm:min-h-0 sm:py-1.5";

function QuickLinkRow({ items }: { items: { label: string; href: string }[] }) {
  return (
    <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 n-reg text-xs leading-snug text-white sm:justify-start">
      {items.map((item, i) => (
        <span key={item.href} className="inline-flex items-center gap-x-1.5">
          {i > 0 && (
            <span className="select-none text-white/50" aria-hidden>
              ·
            </span>
          )}
          <Link
            href={item.href}
            className="n-reg  text-white transition-colors hover:text-white/90"
          >
            {item.label}
          </Link>
        </span>
      ))}
    </p>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-[#8F8183] n-reg  text-brand-text-inverse">
      {/* Watermark — anchored bottom-left behind branding */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src="/images/Group%204.svg"
          alt=""
          width={344}
          height={193}
          className="absolute bottom-0 left-1/2 h-auto w-[min(26rem,92vw)] max-w-none -translate-x-1/2 object-cover object-bottom sm:left-[14%] sm:translate-x-0 sm:object-left lg:left-[18.6%] lg:w-[min(22rem,32vw)]"
        />
      </div>

      <Container className="relative z-10 min-w-0 py-8 sm:py-10 lg:py-3">
        <div
          className={cn(
            "grid grid-cols-1 gap-10 sm:gap-8 lg:gap-7",
            "lg:grid-cols-12 lg:items-start lg:gap-x-8 lg:gap-y-0 lg:py-4",
            "xl:gap-x-14",
          )}
        >
          {/* Column 1 — brand, headline, CTA */}
          <div className="relative flex min-w-0 shrink-0 flex-col items-center gap-4 text-center sm:items-start sm:gap-5 sm:text-left lg:col-span-5 lg:px-6">
            <div className="flex shrink-0 justify-center sm:justify-start">
              <Image
                src="/images/Logo1.svg"
                alt="The Guardians Real Estate Advisory"
                width={220}
                height={56}
                className="h-auto w-full max-w-[min(100%,200px)] object-cover object-center sm:max-w-[200px] sm:object-left"
                priority={false}
              />
            </div>

            <h2 className="mx-auto max-w-[min(100%,26rem)] n-reg text-[clamp(1.35rem,4.5vw,2.35rem)] leading-[1.12] sm:mx-0 sm:mt-4 sm:leading-[1.1]">
              <span className=" text-[#BCBDC0] ">Lorem Ipsum Dolor? </span>
              <span className=" text-[#BCBDC0] ">
                Let&apos;s <span className=" text-[#F7F7F7]">Collaborate.</span>
              </span>
            </h2>

            <Link
              href="/contact"
              className={cn(
                "group inline-flex w-full max-w-xs shrink-0 items-center justify-center gap-2 border border-white bg-transparent px-5 py-3 n-reg text-sm text-white transition-colors sm:w-fit sm:max-w-none sm:justify-start sm:px-4 sm:py-2.5 sm:text-base",
                "hover:bg-white hover:text-neutral-900",
                "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white",
              )}
            >
              Get In Touch
              <IconArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Column 2 — Location + Social */}
          <div className="flex min-w-0 shrink-0 flex-col items-center gap-6 text-center sm:items-start sm:gap-6 sm:text-left lg:col-span-3 lg:pt-2">
            <div className="w-full max-w-md sm:max-w-none">
              <h3 className={sectionTitleClass}>Location</h3>
              <ul className="mt-2 space-y-0">
                {locations.map((city) => (
                  <li key={city}>
                    <button type="button" className={dropdownButtonClass}>
                      <span>{city}</span>
                      <IconChevronDown className="h-4 w-4 shrink-0 text-white" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full max-w-md sm:max-w-none">
              <h3 className={sectionTitleClass}>Social</h3>
              <div className="mt-2 flex items-stretch justify-center gap-8 sm:justify-start sm:gap-5">
                <ul className="flex min-w-0 flex-1 flex-col gap-2 n-reg  text-xs">
                  {socialLeftCol.map(({ label, href, iconSrc }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="inline-flex items-center gap-2.5 n-reg  text-white transition-colors hover:text-white"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={iconSrc}
                          alt=""
                          width={14}
                          height={14}
                          className="h-3.5 w-3.5 shrink-0 object-cover"
                        />
                        <span>{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <ul className="flex min-w-0 flex-1 flex-col gap-2 n-reg  text-xs">
                  {socialRightCol.map(({ label, href, iconSrc }) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="inline-flex items-center gap-2.5 n-reg  text-white transition-colors hover:text-white "
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Image
                          src={iconSrc}
                          alt=""
                          width={14}
                          height={14}
                          className="h-3.5 w-3.5 shrink-0 object-cover"
                        />
                        <span>{label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Column 3 — Queries + Quick links */}
          <div className="flex min-w-0 shrink-0 flex-col items-center gap-6 text-center sm:items-start sm:gap-6 sm:text-left lg:col-span-3 lg:pt-2">
            <div className="w-full max-w-md sm:max-w-none">
              <h3 className={sectionTitleClass}>Have queries?</h3>
              <ul className="mt-2 space-y-0">
                {queries.map((q) => (
                  <li key={q}>
                    <button type="button" className={dropdownButtonClass}>
                      <span>{q}</span>
                      <IconChevronDown className="h-4 w-4 shrink-0 text-white" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full max-w-md sm:max-w-none">
              <h3 className={sectionTitleClass}>Quick links</h3>
              <div className="mt-2 flex flex-col gap-2 text-sm sm:gap-1.5">
                {quickLinkRows.map((row, idx) => (
                  <QuickLinkRow key={idx} items={row} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Full-width rule + copyright */}
        <div className="mt-8 shrink-0 border-t border-white pt-6 sm:mt-9 sm:pt-2">
          <p className="px-2 text-center n-reg text-xs font-light leading-relaxed text-white sm:px-0 sm:text-sm sm:leading-normal">
            © {year} The Guardians. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
