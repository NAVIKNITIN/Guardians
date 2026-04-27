"use client";

import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { StaggerContainer } from "@/components/animations/StaggerContainer";
import type { AwardsSectionContent } from "@/data/audience-marketing";
import { CardStack } from "@/components/ui/card-stack";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { useCycleIndex } from "@/hooks/useCycleIndex";
import { cn } from "@/utils/cn";
import { RollingText } from "@/components/ui/RollingText";
import Image from "next/image";
import { useState } from "react";

export function AwardsSection({
	content,
	isBuyer: _isBuyer,
}: {
	isBuyer: boolean;
	content: AwardsSectionContent;
}) {
	const slides = content.slides;
	const total = slides.length;
	const { index, advance } = useCycleIndex(total, 0);
	const slide = slides[index]!;
	const [rollDir, setRollDir] = useState<1 | -1>(1);

	const goNext = () => {
		setRollDir(1);
		advance(1);
	};

	const goPrev = () => {
		setRollDir(-1);
		advance(-1);
	};

	return (
		<SectionSurface
			variant="stats"
			aria-labelledby="awards-heading"
			className="border-t-0 border-b-0 bg-transparent"
		>
			<div className="grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-10 xl:gap-14 2xl:gap-16">
				<StaggerContainer className="flex w-full min-w-0 flex-col items-center text-center lg:col-span-3 lg:items-start lg:text-left" staggerChildren={0.14}>
					<ScrollReveal direction="left" distance={30}>
						<Image
							src={content.starIconSrc}
							alt=""
							width={90}
							height={75}
							className="h-[75px] w-[90px] shrink-0 object-contain object-center lg:object-left"
						/>
					</ScrollReveal>
					<ScrollReveal direction="left" delay={0.08} distance={34}>
						<h2
							id="awards-heading"
							className={cn(
								"qs-reg fs-50 lh-50 mt-10 md:mt-30",
								"w-full min-w-0 max-w-full px-0",
								"text-balance uppercase leading-tight tracking-[0.08em] text-brand-text-primary",
								"text-[clamp(1.125rem,calc(0.5rem+3.4vw),2.25rem)] sm:text-[clamp(1.35rem,calc(0.55rem+2.4vw),2.35rem)] lg:text-[clamp(1.5rem,2.5vw,2rem)]",
							)}
						>
							{content.headingLine1}
							<br />
							{content.headingLine2}
						</h2>
					</ScrollReveal>
				</StaggerContainer>

				<ScrollReveal direction="up" delay={0.008} className="relative flex justify-center lg:col-span-5 lg:justify-center lg:pl-10">
					<div
						className={cn(
							"relative mx-auto w-full max-w-[min(100%,385.33px)]",
							"aspect-[385.33/459] min-h-0 max-h-[min(459px,65.5vh)]",
						)}
					>
						<CardStack
							items={slides}
							className="h-full w-full"
						/>
					</div>
				</ScrollReveal>

				<ScrollReveal direction="right" delay={0.08} className="flex min-h-0 w-full min-w-0 flex-col items-center text-center lg:col-span-4 lg:h-full lg:items-stretch lg:text-left">
					<div className="mb-8 flex w-full shrink-0 justify-center lg:mb-10 lg:justify-start">
						<CarouselControls
							currentIndex={index}
							total={total}
							onPrev={goPrev}
							onNext={goNext}
							prevLabel="Previous award"
							nextLabel="Next award"
							buttonClassName="border-0 bg-transparent hover:bg-transparent"
							counterClassName="min-w-11 px-1 text-xs font-medium text-brand-text-primary sm:text-sm"
							renderCounter={({ currentIndex, total }) => (
								<span className="inline-flex min-w-11 items-baseline justify-center gap-0.5 px-1 text-xs font-medium tabular-nums text-brand-text-primary sm:text-sm">
									<RollingText
										value={String(currentIndex + 1)}
										direction={rollDir}
									/>
									<span className="opacity-70" aria-hidden>
										/
									</span>
									<span>{total}</span>
								</span>
							)}
						/>
					</div>

					<div className="flex min-h-0 w-full min-w-0 flex-1 flex-col justify-between gap-6 lg:mt-25">
						<div className="w-full min-w-0">
							<RollingText
								value={slide.company}
								direction={rollDir}
								className="n-bold text-[clamp(0.875rem,2.5vw,1.125rem)] uppercase tracking-[0.05em] text-brand-text-primary sm:text-[18px]"
							/>
							<div className="w-full min-w-0">
								<RollingText
									block
									value={slide.achievement}
									direction={rollDir}
									className="n-bold text-[clamp(1.5rem,6vw,2.25rem)] tracking-[0.02em] text-brand-text-primary sm:text-[36px]"
								/>
							</div>
						</div>
						<RollingText
							value={slide.year}
							direction={rollDir}
							className="fw-600 n-bold text-[14px] uppercase tracking-[0.2em] text-brand-text-secondary lg:mb-5"
						/>
					</div>
				</ScrollReveal>
			</div>
		</SectionSurface>
	);
}
