import { Container } from "@/components/common/Container";
import { GradientCtaButton } from "@/components/common/GradientCtaButton";
import { cn } from "@/utils/cn";
import Image from "next/image";

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
            className="relative mx-4 mb-12 overflow-hidden border-t border-black/6 px-4 py-10 sm:mx-8 sm:mb-20 sm:px-4 sm:py-12 lg:mx-24 lg:mb-24 lg:px-10 xl:mx-40"
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
                            "qs-reg uppercase text-[#202225]",
                            "text-[clamp(1.75rem,calc(1rem+3.5vw),3.75rem)] leading-[1.1] tracking-[0.05em]",
                        )}
                    >
                        Come grow with us
                    </h2>

                    <p className="mt-5 w-full max-w-[min(50rem,90vw)] n-book text-sm leading-[1.55] text-[#202225]/90 sm:mt-6 sm:text-base lg:text-lg">
                        The Guardians provide endless opportunities for professional growth in
                        promising times like these. A stimulating work environment, rich and
                        diverse exposure &amp; inspiring leadership are a few reasons that make
                        The Guardians a great place to work.
                    </p>

                    <a
                        href={`mailto:${HR_EMAIL}`}
                        className="mt-6 inline-flex items-center gap-2 n-bold text-sm tracking-[0.05em] text-[#202225] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#202225] sm:mt-8 sm:gap-2.5 sm:text-base lg:text-lg"
                    >
                        <IconEnvelopeOutline className="h-4 w-4 shrink-0 text-[#202225] sm:h-5 sm:w-5" />
                        <span className="break-all">{HR_EMAIL}</span>
                    </a>

                    <GradientCtaButton
                        href="/contact"
                        variant="know-more"
                        className="mt-8 w-full max-w-xs sm:mt-10 sm:w-auto sm:max-w-none"
                    >
                        Enquire Now
                    </GradientCtaButton>
                </div>
            </Container>
        </section>
    );
}
