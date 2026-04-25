"use client";

import type { AwardSlide } from "@/data/audience-marketing";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/utils/cn";

type CardStackProps = {
	items: AwardSlide[];
	activeIndex: number;
	direction: 1 | -1;
	className?: string;
};

export function CardStack({
	items,
	activeIndex,
	direction,
	className,
}: CardStackProps) {
	if (!items.length) return null;

	// Keep all cards mounted and only animate their stacked state.
	// This avoids remount flashes/blinks when active index changes.
	const cards = items
		.map((item, itemIndex) => {
			const stackIndex = (itemIndex - activeIndex + items.length) % items.length;
			return { ...item, stackIndex };
		})
		.sort((a, b) => b.stackIndex - a.stackIndex);

	return (
		<div className={cn("relative h-full w-full perspective-distant", className)}>
			{cards.map((card) => {
				const stackIndex = card.stackIndex;
				const inStack = stackIndex < 3;
				const clampedIndex = Math.min(stackIndex, 2);
				const isFront = clampedIndex === 0;

				return (
					<motion.div
						key={card.id}
						className="absolute overflow-hidden rounded-[2px] will-change-transform transform-[translateZ(0)] transform-3d"
						initial={false}
						animate={{
							x: !inStack
								? direction === 1
									? -60   // coming from left (back → front)
									: 60    // coming from right (front → back)
								: clampedIndex === 0
									? 0
									: clampedIndex === 1
										? direction === 1 ? -8 : 8
										: direction === 1 ? -16 : 16,

							y: !inStack
								? 50
								: clampedIndex === 0
									? 0
									: clampedIndex === 1
										? -11
										: -23,

							scale: !inStack
								? 0.88
								: clampedIndex === 0
									? 1
									: clampedIndex === 1
										? 0.96
										: 0.92,

							rotateZ: 0,

							rotateY: !inStack
								? direction === 1
									? -12
									: 12
								: clampedIndex === 0
									? 0
									: direction === 1
										? -4
										: 4,

							opacity: !inStack
								? 0
								: clampedIndex === 0
									? 1
									: clampedIndex === 1
										? 0.95
										: 0.89,

							filter: !inStack
								? "blur(0.8px)"
								: clampedIndex === 0
									? "blur(0px)"
									: clampedIndex === 1
										? "blur(0.2px)"
										: "blur(0.45px)",
						}}
						transition={{
							type: "tween",
							duration: 1.15,
							ease: [0.22, 1, 0.36, 1],
						}}
						style={{
							pointerEvents: inStack ? "auto" : "none",
							zIndex: inStack ? 30 - clampedIndex : 0,
							backgroundImage:
								"linear-gradient(180deg, #F1F1F2 0%, #E9E6E6 100%)",
							left: `${clampedIndex * 12}px`,
							right: `${clampedIndex * 12}px`,
							top: `${-clampedIndex * 14}px`,
							bottom: `${clampedIndex * 14}px`,
							boxShadow:
								clampedIndex === 0
									? "0 22px 46px rgba(2, 6, 23, 0.16)"
									: "0 12px 30px rgba(2, 6, 23, 0.11)",
						}}
					>
						<div className="relative h-full w-full overflow-hidden bg-transparent">
							<div
								className="pointer-events-none absolute z-6"
								style={{
									left: -17,
									top: 1,
									width: 407,
									height: 457,
									mixBlendMode: "darken",
									boxShadow: "0 -24px 42px rgba(15, 23, 42, 0.22)",
								}}
							>
								<Image
									src="/images/awd-bg.svg"
									alt=""
									width={407}
									height={400}
									className="h-full w-full object-contain opacity-100"
								/>
							</div>

							{isFront ? (
								<div className="pointer-events-none absolute inset-x-0 top-[0%] z-6 flex justify-center">
									<Image
										src="/images/award-top.png"
										alt=""
										width={160}
										height={120}
										className="h-auto w-[50%] object-contain opacity-100"
									/>
								</div>
							) : null}

							<div className="absolute h-full w-full z-10">
								<Image
									src={card.imageSrc}
									alt=""
									fill
									className="object-contain object-center scale-[0.92] translate-y-6"
								/>
							</div>
						</div>
					</motion.div>
				);
			})}
		</div>
	);
}
