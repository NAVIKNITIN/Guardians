import { Container } from "@/components/common/Container";
import { IconArrowUpRight } from "@/components/common/icons";
import { primaryCtaClassName } from "@/styles/buttonStyles";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

const locations = ["Mumbai", "Pune", "Dubai"];
const queries = ["Business", "HR", "Channel Partner"];
const social = [
  { label: "Facebook", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "X", href: "#" },
  { label: "LinkedIn", href: "#" },
];
const quickLinks = [
  "About",
  "Brands",
  "Services",
  "Projects",
  "Partners & Clients",
  "Career",
  "Media",
];

export function Footer() {
  return (
    <footer className="bg-brand-footer text-brand-text-inverse">
      <Container className="py-12 sm:py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="relative mb-6 h-12 w-12">
              <Image
                src="/images/logo-mark-light.svg"
                alt=""
                fill
                className="object-contain"
                sizes="48px"
              />
            </div>
            <p className="text-2xl leading-snug sm:text-3xl lg:text-4xl">
              Lorem Ipsum Dolor? Let&apos;s{" "}
              <span className="font-semibold">Collaborate.</span>
            </p>
            <Link
              href="#contact"
              className={cn(
                primaryCtaClassName,
                "mt-8 border border-white/80 bg-transparent text-white shadow-none hover:bg-white hover:text-brand-footer",
              )}
            >
              Get In Touch
              <IconArrowUpRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-4">
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
                Location
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {locations.map((city) => (
                  <li key={city}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between border-b border-white/10 py-2 text-left text-white/90 transition-colors hover:text-white"
                    >
                      {city}
                      <span className="text-xs opacity-60" aria-hidden>
                        ▾
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
                Have queries?
              </h3>
              <ul className="mt-4 space-y-2 text-sm">
                {queries.map((q) => (
                  <li key={q}>
                    <button
                      type="button"
                      className="flex w-full items-center justify-between border-b border-white/10 py-2 text-left text-white/90 transition-colors hover:text-white"
                    >
                      {q}
                      <span className="text-xs opacity-60" aria-hidden>
                        ▾
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
                Social
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {social.map((s) => (
                  <li key={s.label}>
                    <Link
                      href={s.href}
                      className="text-white/90 transition-colors hover:text-white"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-2 lg:col-span-1">
              <h3 className="text-[10px] font-semibold uppercase tracking-widest text-white/70">
                Quick links
              </h3>
              <ul className="mt-4 columns-1 gap-x-8 text-sm sm:columns-2">
                {quickLinks.map((link) => (
                  <li key={link} className="mb-2 break-inside-avoid">
                    <Link
                      href="#"
                      className="text-white/90 transition-colors hover:text-white"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/50">
          © {new Date().getFullYear()} The Guardians. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
