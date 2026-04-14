import { Container } from "@/components/common/Container";
import { IconArrowUpRight, IconCrane } from "@/components/common/icons";
import { cn } from "@/utils/cn";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

/** Same asset as the original divide strip. */
export const DIVIDER_BANNER_SRC = "/images/Home/Banner1.svg";
const BANNER_WIDTH = 1196;
const BANNER_HEIGHT = 350;

/** Percent height = width × (350/1196); padding-bottom avoids flex collapse when children are `absolute`. */
const BANNER_ASPECT_PADDING_PCT = (BANNER_HEIGHT / BANNER_WIDTH) * 100;

export const dividerCardCtaClassName = cn(
  "inline-flex items-center justify-center gap-2 rounded-none border border-neutral-900 bg-white px-6 py-3",
  "font-nexa text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-900",
  "transition-colors duration-300 hover:bg-neutral-900 hover:text-white",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900",
);

export function CardImageColumn({
  portraitSrc,
  patternSrc,
  portraitAlt,
  objectPositionClass,
  className,
}: {
  portraitSrc: string;
  patternSrc: string;
  portraitAlt: string;
  objectPositionClass: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative mt-8 h-48 w-full shrink-0 overflow-hidden sm:h-56 lg:mt-0 lg:flex lg:h-auto lg:min-h-0 lg:w-2/5 lg:flex-col lg:self-stretch lg:overflow-visible",
        className,
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 z-0 max-lg:inset-y-0 lg:bottom-0 lg:-top-8",
        )}
      >
        <Image
          src={patternSrc}
          alt=""
          fill
          className="object-cover object-center opacity-40 grayscale"
          sizes="(max-width: 1024px) 100vw, 40vw"
          aria-hidden
        />
      </div>
      <div className="relative z-10 flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="relative min-h-[12rem] flex-1 sm:min-h-[14rem] lg:min-h-[280px]">
          <Image
            src={portraitSrc}
            alt={portraitAlt}
            fill
            className={cn(
              "object-cover grayscale transition-transform duration-500 group-hover:scale-[1.02]",
              objectPositionClass,
            )}
            sizes="(max-width: 1024px) 100vw, 40vw"
          />
        </div>
      </div>
    </div>
  );
}

export type ProfileCardProps = {
  className?: string;
  articleId?: string;
  title: "Buyer" | "Developer";
  href: string;
  icon: ReactNode;
  reverseOnDesktop?: boolean;
  imageColumnClassName?: string;
  portraitSrc: string;
  patternSrc: string;
  portraitAlt: string;
  objectPositionClass: string;
};

export function ProfileCard({
  className,
  articleId,
  title,
  href,
  icon,
  reverseOnDesktop,
  imageColumnClassName,
  portraitSrc,
  patternSrc,
  portraitAlt,
  objectPositionClass,
}: ProfileCardProps) {
  return (
    <article
      id={articleId}
      className={cn(
        "group relative overflow-hidden rounded-sm border border-neutral-300/90 bg-[#e8e8e8] transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-md",
        className,
      )}
    >
      <div
        className={cn(
          "relative flex min-h-[320px] flex-col p-6 sm:min-h-[360px] sm:p-8 lg:items-stretch lg:px-8 lg:pt-8 lg:pb-0",
          reverseOnDesktop ? "lg:flex-row-reverse" : "lg:flex-row",
        )}
      >
        <div
          className={cn(
            "flex flex-1 flex-col justify-between gap-8 lg:pb-8",
            reverseOnDesktop && "lg:items-end lg:text-right",
          )}
        >
          {icon}
          <div className={cn(reverseOnDesktop ? "lg:text-right" : "text-left lg:text-left")}>
            <p
              className={cn(
                "font-nexa text-xs lg:text-xl font-large uppercase tracking-[0.2em] text-[#202225]",
                reverseOnDesktop ? "lg:text-right" : "lg:text-left",
              )}
            >
              I am a
            </p>
            <h3 className="mt-1 tracking-wider font-qasbyne qs-letterspacing-5 text-[clamp(2rem,4.5vw,3rem)] font-normal uppercase leading-none  text-[#8F8183]">
              {title}
            </h3>
          </div>
          <Link
            href={href}
            className={cn(
              dividerCardCtaClassName,
              "w-fit",
              reverseOnDesktop && "lg:self-end",
            )}
          >
            Know More
            <IconArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
        <CardImageColumn
          portraitSrc={portraitSrc}
          patternSrc={patternSrc}
          portraitAlt={portraitAlt}
          objectPositionClass={objectPositionClass}
          className={imageColumnClassName}
        />
      </div>
    </article>
  );
}

export function ProfileCards({ className }: { className?: string }) {
  return (
    <div className={cn("grid gap-4 sm:gap-6 lg:grid-cols-2 lg:gap-6", className)}>
      <ProfileCard
        articleId="buyer"
        title="Buyer"
        href="/buyer"
        icon={
          <Image
            src="/images/Buyer/BuyerVector.svg"
            alt=""
            width={47}
            height={50}
            className="h-[50px] w-[47px] shrink-0 object-cover brightness-0"
            aria-hidden
          />
        }
        portraitSrc="/images/Buyer/image 41.svg"
        patternSrc="/images/Buyer/Group 4.svg"
        portraitAlt="Smiling professional representing property buyers"
        objectPositionClass="object-[center_22%] sm:object-right"
        imageColumnClassName="lg:ml-4"
      />
      <ProfileCard
        articleId="developer"
        title="Developer"
        href="/developer"
        icon={
          <IconCrane className="h-[50px] w-[47px] shrink-0 text-neutral-800 lg:self-end" />
        }
        reverseOnDesktop
        portraitSrc="/images/Developer/image 42.svg"
        patternSrc="/images/Developer/Group 4.svg"
        portraitAlt="Smiling professional representing real estate developers"
        objectPositionClass="object-[center_22%] sm:object-left"
        imageColumnClassName="lg:mr-4"
      />
    </div>
  );
}

export function DividerSection() {
  return (
    <section
      id="services"
      className={cn(
        "relative py-0",
        "bg-white",
        "[background-image:radial-gradient(#d4d4d4_0.65px,transparent_0.65px)] [background-size:14px_14px]",
      )}
      aria-labelledby="divider-cards-heading"
    >
      <h2 id="divider-cards-heading" className="sr-only">
        Buyer and developer journeys
      </h2>

      <Container className="py-10 sm:py-12 lg:py-14">
        <div className="relative w-full overflow-hidden rounded-sm border border-neutral-200 bg-neutral-100 shadow-[0_1px_0_0_rgb(0_0_0_/0.06)]">
          <div
            className="w-full"
            style={{ paddingBottom: `${BANNER_ASPECT_PADDING_PCT}%` }}
          />
          <div className="absolute inset-0">
            <Image
              src={DIVIDER_BANNER_SRC}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 1440px) 100vw, 90rem"
              unoptimized
              priority
            />
          </div>
        </div>
        <ProfileCards className="mt-6" />
      </Container>
    </section>
  );
}
