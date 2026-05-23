import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import { Container } from "@/components/common/Container";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { OutlineArrowButton } from "../common/OutlineArrowButton";

const HR_EMAIL = "hr@theguardians.com";

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
            className="relative mb-12 overflow-hidden md:mb-20 lg:mb-24"
            aria-labelledby="grow-heading"
        >
            <div
                className={cn(
                    "relative mx-auto w-full max-w-[953px] overflow-hidden",
                    "max-lg:h-auto",
                    "lg:aspect-[953/400]",
                )}
            >
                <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
                    <Image
                        src="/images/bg-arrow.svg"
                        alt=""
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 1024px) 100vw, 953px"
                    />
                    <div className="absolute inset-0 bg-[#BCBDC0]/20" />
                    <div className="absolute inset-0 bg-white/80" />
                </div>

                <Container
                    className={cn(
                        "relative z-10",
                        "py-8 sm:py-10",
                        "lg:absolute lg:inset-0 lg:flex lg:flex-col lg:justify-center lg:py-0",
                    )}
                >
                    <StaggerContainer
                        className="mx-auto flex w-full flex-col items-center text-center"
                        staggerChildren={0.14}
                    >
                        <ScrollReveal direction="up" distance={28}>
                            <h2
                                id="grow-heading"
                                className={cn(
                                    "text-center uppercase text-brand-text-primary qs-reg ls-10 sm:text-center",
                                    "text-[clamp(2.156rem,4.8vw,2.5rem)] leading-[1.12] tracking-[0.04em]",
                                    "sm:text-[clamp(2.25rem,5.2vw,3.1rem)] sm:leading-[1.1] sm:tracking-[0.05em]",
                                    "lg:text-[clamp(2.75rem,3.5vw,4.375rem)] lg:leading-[1.05] lg:tracking-[0.05em]",
                                  )}
                            >
                                Come grow with us
                            </h2>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={0.06} distance={24}>
                            <p className="mt-4 w-full max-w-[min(55rem,92vw)] n-book text-base leading-relaxed text-[#161616] sm:mt-5 sm:text-base lg:mt-6 lg:text-lg">
                                The Guardians provide endless opportunities for professional growth in
                                promising times like these. A stimulating work environment, rich and
                                diverse exposure &amp; inspiring leadership are a few reasons that make
                                The Guardians a great place to work.
                            </p>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={0.1} distance={20}>
                            <a
                                href={`mailto:${HR_EMAIL}`}
                                className="mt-5 inline-flex items-center gap-2 n-bold text-sm tracking-[0.05em] text-[#161616] transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-text-primary sm:mt-6 sm:gap-2.5 sm:text-base lg:text-lg"
                            >
                                <IconEnvelopeOutline className="h-4 w-4 shrink-0 text-[#161616] sm:h-5 sm:w-5" />
                                <span className="break-all">{HR_EMAIL}</span>
                            </a>
                        </ScrollReveal>

                        <ScrollReveal direction="up" delay={0.14} distance={18}>
                            <OutlineArrowButton
                                href="/contact"
                                className="mt-6 h-[50px] w-full max-w-[271px] items-center justify-center py-0 n-bold text-base uppercase sm:mt-8 lg:mt-8"
                                iconClassName="h-[13px] w-[13px]"
                            >
                                Enquire Now
                            </OutlineArrowButton>
                        </ScrollReveal>
                    </StaggerContainer>
                </Container>
            </div>
        </section>
    );
}
