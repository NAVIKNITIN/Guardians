import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/utils/cn";
import Image from "next/image";
import type { ReactNode } from "react";
import { OutlineArrowButton } from "../common/OutlineArrowButton";

interface SplitSectionImage {
  src: string;
  alt: string;
}

export interface SplitSectionProps {
  title: ReactNode;
  description: ReactNode;
  buttonText: string;
  image: SplitSectionImage;
  reverse?: boolean;
  href?: string;
  className?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  buttonClassName?: string;
  imageClassName?: string;
  imagePriority?: boolean;
}

export function SplitSection({
  title,
  description,
  buttonText,
  image,
  reverse = false,
  href = "#",
  className,
  contentClassName,
  titleClassName,
  descriptionClassName,
  buttonClassName,
  imageClassName,
  imagePriority = false,
}: SplitSectionProps) {
  const textDirection = reverse ? "right" : "left";
  const imageDirection = reverse ? "left" : "right";

  return (
    <section className={cn("px-4 py-10 sm:px-6 sm:py-14 md:px-10 lg:px-16 lg:py-20", className)}>
      <div className="mx-auto grid max-w-7xl items-center gap-8 sm:gap-10 md:grid-cols-2 md:gap-16">
        <ScrollReveal
          direction={textDirection}
          delay={0.2}
          duration={0.65}
          className={cn(reverse ? "md:order-2" : "md:order-1", contentClassName)}
        >
          <div className="min-w-0">
            <div className={cn("mb-8 text-3xl leading-tight text-brand-text-primary sm:mb-12 md:text-4xl lg:mb-[110px]", titleClassName)}>
              {title}
            </div>
            <p className={cn("n-reg text-base leading-relaxed text-[#161616] md:min-h-[200px]", descriptionClassName)}>
              {description}
            </p>
            <OutlineArrowButton
              href={href}
              className={cn(
                "mt-6 hidden h-[50px] w-full max-w-xs pt-1 md:inline-flex md:w-auto md:max-w-none",
                buttonClassName,
              )}
            >
              {buttonText}
            </OutlineArrowButton>
          </div>
        </ScrollReveal>

        <ScrollReveal
          direction={imageDirection}
          delay={0.4}
          duration={0.65}
          className={cn(reverse ? "md:order-1" : "md:order-2")}
        >
          <div className={cn("relative aspect-16/10 w-full overflow-hidden rounded-lg", imageClassName)}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              priority={imagePriority}
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </ScrollReveal>

        <ScrollReveal
          direction="up"
          delay={0.45}
          duration={0.65}
          className={cn(
            "flex w-full justify-center md:col-span-2 md:hidden",
            reverse ? "md:order-3" : "md:order-3",
          )}
        >
          <OutlineArrowButton
            href={href}
            className={cn(
              "inline-flex h-[50px] w-full max-w-[min(100%,250px)] pt-1 sm:max-w-xs",
              buttonClassName,
            )}
          >
            {buttonText}
          </OutlineArrowButton>
        </ScrollReveal>
      </div>
    </section>
  );
}
