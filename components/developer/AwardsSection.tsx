"use client";

import type { AwardsSectionContent } from "@/data/audience-marketing";
import {
	CARD_STACK_EXIT_DURATION_MS,
	CardStack,
	type CardStackHandle,
} from "@/components/ui/card-stack";
import { CarouselControls } from "@/components/ui/CarouselControls";
import { SectionSurface } from "@/components/ui/SectionSurface";
import { cn } from "@/utils/cn";
import { RollingText } from "@/components/ui/RollingText";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function AwardsSection({
	content,
	isBuyer,
}: {
	isBuyer: boolean;
	content: AwardsSectionContent;
}) {
	const slidesKey = content.slides.map((slide) => slide.id).join("|");

	return (
		<AwardsSectionBody key={slidesKey} content={content} isBuyer={isBuyer} />
	);
}

function AwardsSectionBody({
	content,
	isBuyer: _isBuyer,
}: {
	isBuyer: boolean;
	content: AwardsSectionContent;
}) {
	const total = content.slides.length;
	const [currentIndex, setCurrentIndex] = useState(0);
	const [rollDir, setRollDir] = useState<1 | -1>(1);
	const cardStackRef = useRef<CardStackHandle>(null);
	const contentTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	useEffect(() => {
		return () => {
			if (contentTimerRef.current) {
				clearTimeout(contentTimerRef.current);
			}
		};
	}, []);

	if (!content.slides.length) return null;

	const slide = content.slides[currentIndex]!;

	const syncContentChange = (direction: 1 | -1) => {
		if (contentTimerRef.current) {
			clearTimeout(contentTimerRef.current);
		}

		contentTimerRef.current = setTimeout(() => {
			setCurrentIndex((prev) =>
				direction === 1 ? (prev + 1) % total : (prev - 1 + total) % total,
			);
			contentTimerRef.current = null;
		}, CARD_STACK_EXIT_DURATION_MS);
	};

	const goNext = () => {
		setRollDir(1);
		if (cardStackRef.current?.next()) {
			syncContentChange(1);
		}
	};

	const goPrev = () => {
		setRollDir(-1);
		if (cardStackRef.current?.prev()) {
			syncContentChange(-1);
		}
	};

	return (
		<SectionSurface
			variant="stats"
			aria-labelledby="awards-heading"
			className="border-t-0 border-b-0 bg-transparent"
		>
			<div className="grid gap-12 lg:grid-cols-12 lg:items-stretch lg:gap-10 xl:gap-14 2xl:gap-16">
				{/* Left: heading */}
				<div className="flex w-full min-w-0 flex-col items-center text-center lg:col-span-3 lg:items-start lg:text-left">
					<Image
						src={content.starIconSrc}
						alt=""
						width={90}
						height={75}
						className="w-auto shrink-0 object-cover object-center lg:object-left"
					/>
					<h2
						id="awards-heading"
						className={cn(
							"qs-reg fs-50 lh-50 mt-10 md:mt-30",
							"w-full min-w-0 max-w-full px-0",
							"text-balance uppercase leading-tight tracking-[0.08em] text-[#202225]",
							"text-[clamp(1.125rem,calc(0.5rem+3.4vw),2.25rem)] sm:text-[clamp(1.35rem,calc(0.55rem+2.4vw),2.35rem)] lg:text-[clamp(1.5rem,2.5vw,2rem)]",
						)}
					>
						{content.headingLine1}
						<br />
						{content.headingLine2}
					</h2>
				</div>

				{/* Center: card stack */}
				<div className="relative flex justify-center lg:col-span-5 lg:justify-center lg:pl-10">
					<div
						className="relative mx-auto w-full max-w-[min(100%,385px)]"
						style={{
							aspectRatio: "385 / 459",
							height: "500px",
							maxHeight: "none",
							clipPath: "inset(-60px 0 0 0)",
						}}
					>
						<CardStack
							ref={cardStackRef}
							items={content.slides}
							className="h-full w-full"
							offset={24}
							scaleFactor={0.018}
						/>
					</div>
				</div>

				{/* Right: text + controls */}
				<div className="flex min-h-0 w-full min-w-0 flex-col items-center text-center lg:col-span-4 lg:h-full lg:items-stretch lg:text-left">
					<div className="mb-8 flex w-full shrink-0 justify-center lg:mb-10 lg:justify-start">
						<CarouselControls
							currentIndex={currentIndex}
							total={total}
							onPrev={goPrev}
							onNext={goNext}
							prevLabel="Previous award"
							nextLabel="Next award"
							buttonClassName="cursor-pointer border-0  bg-transparent hover:bg-transparent"
							renderCounter={({ currentIndex, total }) => (
								<span className="inline-flex min-w-[2.75rem] items-baseline justify-center gap-0.5 px-2 tabular-nums text-[#141414] sm:text-lg">
									<RollingText
										value={String(currentIndex + 1)}
										direction={rollDir}
									/>
									<span className="opacity-70 mx-1" aria-hidden>
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
								className="n-bold text-[clamp(0.875rem,2.5vw,1.125rem)] uppercase tracking-[0.05em] text-[#161616] sm:text-[18px]"
							/>
							<div className="w-full min-w-0">
								<RollingText
									block
									value={slide.achievement}
									direction={rollDir}
									className="n-bold text-[clamp(1.5rem,6vw,2.25rem)] tracking-[0.02em] text-[#161616] sm:text-[36px]"
								/>
							</div>
						</div>
						<RollingText
							value={slide.year}
							direction={rollDir}
							className="fw-600 n-bold text-[14px] uppercase tracking-[0.2em] text-brand-text-secondary lg:mb-5"
						/>
					</div>
				</div>
			</div>
		</SectionSurface>
	);
}
