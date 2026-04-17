import { Container } from "@/components/common/Container";
import { IconArrowUpRight } from "@/components/common/icons";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";

const HR_EMAIL = "hr@theguardians.in";

function IconEnvelopeOutline({ className }: { className?: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className={className}
            aria-hidden
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.815a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
            />
        </svg>
    );
}

export function GrowWithUs() {
    return (
        <section
            className="relative mx-4 mb-16 overflow-hidden border-t border-black/6 px-3 py-6 sm:mx-8 sm:mb-20 sm:px-4 sm:py-8 lg:mx-24 lg:mb-24 lg:px-10 xl:mx-40"
            aria-labelledby="grow-heading"
        >
            <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
                <Image
                    src="/images/bg-arrow.svg"
                    alt=""
                    fill
                    className="object-cover object-center"
                    sizes="100vw"
                />
                <div className="absolute inset-0 bg-[#BCBDC0]/20" />
                <div className="absolute inset-0 bg-white/80" />
            </div>

            <Container className="relative z-10">
                <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                    <h2
                        id="grow-heading"
                        className={cn(
                            "qs-reg  uppercase text-[#202225]",
                            "text-[clamp(2rem,5vw,3.75rem)] leading-[1.08] tracking-[0.05em]",
                        )}
                    >
                        Come grow with us
                    </h2>

                    <p className="mt-6 w-full max-w-[min(42rem,90vw)] n-reg xt-base  leading-relaxed text-[#202225]/90 sm:text-lg">
                        The Guardians provide endless opportunities for professional growth in
                        promising times like these. A stimulating work environment, rich and
                        diverse exposure &amp; inspiring leadership are a few reasons that make
                        The Guardians a great place to work.
                    </p>

                    <a
                        href={`mailto:${HR_EMAIL}`}
                        className="mt-8 inline-flex items-center gap-2.5 n-reg  text-sm  text-[#202225] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202225] sm:text-base"
                    >
                        <IconEnvelopeOutline className="h-5 w-5 shrink-0 text-[#202225]" />
                        <span>{HR_EMAIL}</span>
                    </a>

                    <Link
                        href="/contact"
                        className={cn(
                            "mt-10 inline-flex items-center gap-2 rounded-sm px-10 py-3.5 n-reg  text-xs  uppercase tracking-[0.2em] text-white",
                            "bg-linear-to-r from-[#e8b8a8] via-[#b86b5c] to-[#d9a090]",
                            "shadow-sm transition-[filter] hover:brightness-105",
                            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202225]",
                        )}
                    >
                        Enquire Now
                        <IconArrowUpRight className="h-3.5 w-3.5" />
                    </Link>
                </div>
            </Container>
        </section>
    );
}
