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

	const visibleCards = Array.from({
		length: Math.min(items.length, 3),
	}).map((_, offset) => {
		const itemIndex = (activeIndex + offset) % items.length;
		return {
			...items[itemIndex]!,
			stackIndex: offset,
		};
	});

	return (
		<div className={cn("relative h-full w-full", className)}>
			{visibleCards
				.slice()
				.reverse()
				.map((card) => {
					const stackIndex = card.stackIndex;
					const isFront = stackIndex === 0;

					return (
						<motion.div
							key={card.id}
							className="absolute overflow-hidden rounded-[2px] border border-black/8 bg-[#fcfbf8] will-change-transform [transform:translateZ(0)]"
							initial={false}
							animate={{
								x: isFront
									? 0
									: direction > 0
										? stackIndex * 1.2
										: -stackIndex * 1.2,
								y: isFront ? 0 : -stackIndex * 8,
								scale: 1 - stackIndex * 0.02,
								opacity: 1,
							}}
							transition={{
								type: "spring",
								stiffness: 180,
								damping: 24,
								mass: 0.9,
							}}
							style={{
								zIndex: 30 - stackIndex,
								left: `${stackIndex * 12}px`,
								right: `${stackIndex * 12}px`,
								top: `${-stackIndex * 14}px`,
								bottom: `${stackIndex * 14}px`,
								boxShadow:
									stackIndex === 0
										? "0 18px 40px rgba(0,0,0,0.12)"
										: "0 10px 28px rgba(0,0,0,0.09)",
							}}
						>
							<div className="relative h-full w-full overflow-hidden bg-[#fbfaf7]">
								<div
									className="absolute inset-0"
									style={{
										backgroundImage: [
											"linear-gradient(to right, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.45) 16%, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0) 50%, rgba(255,255,255,0.08) 70%, rgba(255,255,255,0.45) 84%, rgba(255,255,255,0.95) 100%)",
											"repeating-linear-gradient(to right, rgba(125,125,125,0.22) 0px, rgba(125,125,125,0.22) 1px, transparent 1px, transparent 9px)",
										].join(","),
									}}
								/>

								<div className="pointer-events-none absolute inset-x-0 top-[4%] z-[6] flex justify-center">
									<Image
										src="/images/award-top.png"
										alt=""
										width={160}
										height={120}
										className="h-auto w-[50%] object-contain opacity-100"
									/>
								</div>

								<div className="absolute inset-0 z-10">
									<Image
										src={card.imageSrc}
										alt=""
										fill
										className="object-contain object-center scale-[0.82] translate-y-6"
									/>
								</div>
							</div>
						</motion.div>
					);
				})}
		</div>
	);
}
