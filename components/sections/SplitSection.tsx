import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

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
    <section className={cn("py-20 px-6 md:px-16", className)}>
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2 md:gap-16">
        <ScrollReveal
          direction={textDirection}
          delay={0.2}
          duration={0.65}
          className={cn(reverse ? "md:order-2" : "md:order-1", contentClassName)}
        >
          <div className="space-y-6">
            <div className={cn("text-3xl md:text-4xl leading-tight text-brand-text-primary", titleClassName)}>
              {title}
            </div>
            <p className={cn("n-reg text-base leading-relaxed text-[#161616]", descriptionClassName)}>
              {description}
            </p>
            <Link href={href} className={cn("inline-flex items-center", buttonClassName)}>
              {buttonText}
            </Link>
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
      </div>
    </section>
  );
}
