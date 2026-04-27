"use client";

import type { AwardSlide } from "@/data/audience-marketing";
import Image from "next/image";
import { cn } from "@/utils/cn";
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";

export type CardStackHandle = {
	next: () => boolean;
	prev: () => boolean;
};

export const CARD_STACK_EXIT_DURATION_MS = 600;

type CardStackProps = {
	items: AwardSlide[];
	offset?: number;
	scaleFactor?: number;
	className?: string;
};

function getItemsKey(items: AwardSlide[]) {
	return items.map((item) => item.id).join("|");
}

const CardStackInner = forwardRef<CardStackHandle, CardStackProps>(
	function CardStackInner(
		{ items, offset = 32, scaleFactor = 0.018, className },
		ref,
	) {
		const [cards, setCards] = useState<AwardSlide[]>(() => [...items]);
		const [noTransitionId, setNoTransitionId] = useState<
			string | number | null
		>(null);

		const timeoutRef = useRef<NodeJS.Timeout | null>(null);

		useEffect(() => {
			setCards([...items]);
			setNoTransitionId(null);

			return () => {
				if (timeoutRef.current) clearTimeout(timeoutRef.current);
			};
		}, [items]);

		const animateNext = () => {
			if (cards.length <= 1) return false;

			setCards((prev) => {
				const arr = [...prev];
				const last = arr.pop();
				if (last) arr.unshift(last);
				return arr;
			});

			return true;
		};

		const animatePrev = () => {
			if (cards.length <= 1) return false;

			setCards((prev) => {
				const arr = [...prev];
				const first = arr.shift();

				if (first) {
					// important: prevent front card from visibly throwing to back
					setNoTransitionId(first.id);
					arr.push(first);

					if (timeoutRef.current) clearTimeout(timeoutRef.current);
					timeoutRef.current = setTimeout(() => {
						setNoTransitionId(null);
					}, 80);
				}

				return arr;
			});

			return true;
		};

		useImperativeHandle(ref, () => ({
			next: animateNext,
			prev: animatePrev,
		}));

		if (!cards.length) return null;

		return (
			<div
				className={cn("relative h-full w-full overflow-visible mt-10", className)}

			>
				<div className="relative h-full w-full overflow-visible">
					{cards.map((card, index) => {
						const visible = index < 3;
						const isNoTransition = noTransitionId === card.id;

						return (
							<div
								key={card.id}
								className="absolute inset-0 overflow-hidden rounded-[20px] border border-[#d8d1cc] bg-[#fbfaf7]"
								style={{
									top: `${index * -offset}px`,
									transform: `scale(${1 - index * scaleFactor})`,
									zIndex: cards.length - index,
									filter: index === 0 ? "none" : `blur(${index * 1.2}px)`,
									opacity: visible ? 1 : 0,
									transformOrigin: "top center",
									pointerEvents: index === 0 ? "auto" : "none",
									marginLeft: index === 0 ? "10px" : index === 1 ? "20px" : "30px",
									marginRight: index === 0 ? "10px" : index === 1 ? "20px" : "30px",
									transition: isNoTransition
										? "none"
										: "top 600ms cubic-bezier(0.34, 1.4, 0.64, 1), transform 1000ms cubic-bezier(0.34, 1.4, 0.64, 1), opacity 1500ms ease",

									willChange: "top, transform, opacity",
								}}
							>
								<div className="relative h-full w-full overflow-hidden">
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

									<div className="pointer-events-none absolute inset-x-0 top-[4%] z-[6] flex justify-center opacity-70">
										<Image
											src="/images/award-top.png"
											alt=""
											width={160}
											height={120}
											className="h-auto w-[48%] object-contain"
										/>
									</div>

									<div className="absolute inset-0 z-10">
										<Image
											src={card.imageSrc}
											alt=""
											fill
											className="object-contain object-center scale-[0.82] translate-y-6"
											sizes="(max-width: 1024px) 100vw, 520px"
											priority={index === 0}
										/>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		);
	},
);

export const CardStack = forwardRef<CardStackHandle, CardStackProps>(
	function CardStack(props, ref) {
		return (
			<CardStackInner key={getItemsKey(props.items)} {...props} ref={ref} />
		);
	},
);
