"use client";

import { Container } from "@/components/common/Container";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { GradientCtaButton } from "@/components/common/GradientCtaButton";
import { MarketingEnquireLink } from "@/components/ui/MarketingEnquireLink";
import type { MarketingHeroContent } from "@/data/audience-marketing-types";
import { LOCAL_IMAGES } from "@/lib/local-images";
import { cn } from "@/utils/cn";
import { getMarketingHeroConfig, type MarketingHeroId } from "@/utils/marketing-hero";
import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import { OutlineArrowButton } from "../common/OutlineArrowButton";

type ProjectsStage = "Ongoing" | "Completed";

/**
 * Nudges the main content block up: `true` = default responsive `-mt` (see `mergeNegativeContentPad`),
 * a positive number = `-mt` by that many px, `false` / `0` / omitted = off.
 * (CSS has no negative padding; this uses negative margin.)
 */
export type MarketingHeroNegativeContentShift = boolean | number;

type MarketingPageHeroBase = {
  className?: string;
  /**
   * When true, pulls the hero under the sticky main nav (`-mt` + content padding) using 89px for the main row.
   * If `shiftTillSearch` is also true, margin/padding use `var(--site-header-height)` (search + nav; responsive, see `globals.css`).
   */
  shiftUnderHeader?: boolean;
  /** When `shiftUnderHeader` is true, include the top search + full header height via `--site-header-height` instead of the main bar only. */
  shiftTillSearch?: boolean;
  /**
   * Fixed hero height in px. When set, replaces the default `marketing-first-section-height` clamp
   * (≈560px–1250px, often ~50–60vh on desktop) with exactly this height.
   */
  heightPx?: number;
  /**
   * Optional mobile hero height (px), used only when `useViewportHeightFlag` is true.
   */
  mobileHeightPx?: number;
  /**
   * If true, resolve hero height on load using viewport:
   * - mobile (`< viewportHeightBreakpointPx`) => `mobileHeightPx`
   * - desktop => `heightPx`
   */
  useViewportHeightFlag?: boolean;
  /** Mobile/desktop cutoff for `useViewportHeightFlag`. Default: 1024. */
  viewportHeightBreakpointPx?: number;
  /**
   * When `shiftUnderHeader` is true, extra top padding (px) on the content, added after the 89px / `--site-header-height` offset.
   * Defaults to 32. Pass `0` to turn off.
   */
  shiftExtraContentTopPx?: number;
  /** See `MarketingHeroNegativeContentShift`. */
  negativePadding?: MarketingHeroNegativeContentShift;
};

type MarketingPageHeroProps =
  | (MarketingPageHeroBase & {
    heroId: Exclude<MarketingHeroId, "projects">;
    projectsStage?: never;
  })
  | (MarketingPageHeroBase & {
    heroId: "projects";
    projectsStage: ProjectsStage;
  });

function heroNavOverlapClass(shiftUnderHeader?: boolean, shiftTillSearch?: boolean) {
  if (!shiftUnderHeader) {
    return undefined;
  }
  if (shiftTillSearch) {
    return "-mt-[var(--site-header-height)]";
  }
  return "-mt-[89px]";
}

type HeroContentPad = { className?: string; style?: CSSProperties };

/** Name for inline CSS var used in arbitrary `calc(... + var(--shift-extra))` padding. */
const SHIFT_EXTRA_VAR = "--shift-extra";

const NEGATIVE_HERO_CONTENT_CLASS_DEFAULT = "-mt-4 sm:-mt-5";
const HERO_BG_IMAGE_CLASS = "object-cover object-center";
const DEFAULT_VIEWPORT_HEIGHT_BREAKPOINT = 1024;

function useViewportIsMobile(enabled: boolean, breakpointPx: number): boolean {
  // Keep SSR and first client paint identical (desktop=false) to avoid hydration mismatch.
  // After mount, compute real viewport and update.
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    const onResize = () => setIsMobile(window.innerWidth < breakpointPx);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [enabled, breakpointPx]);

  return isMobile;
}

function mergeNegativeContentPad(shift: MarketingHeroNegativeContentShift | undefined, pad: HeroContentPad): HeroContentPad {
  if (shift === undefined || shift === false) {
    return pad;
  }
  if (shift === true) {
    return {
      ...pad,
      className: cn(pad.className, NEGATIVE_HERO_CONTENT_CLASS_DEFAULT),
    };
  }
  if (typeof shift === "number") {
    if (!Number.isFinite(shift) || shift === 0) {
      return pad;
    }
    const n = Math.abs(shift);
    return {
      ...pad,
      style: { ...pad.style, marginTop: `-${n}px` } as CSSProperties,
    };
  }
  return pad;
}

/**
 * Top padding for hero content. When `shiftUnderHeader` is true: header offset + optional `shiftExtra`.
 * When false and `shiftExtra > 0`: `pt` from `--shift-extra` only (e.g. career when not under header).
 */
function getHeroContentPad(
  shiftUnderHeader: boolean,
  shiftTillSearch: boolean,
  shiftExtra: number,
): HeroContentPad {
  if (!shiftUnderHeader) {
    if (shiftExtra > 0) {
      return {
        className: "pt-[var(--shift-extra)]",
        style: { [SHIFT_EXTRA_VAR as string]: `${shiftExtra}px` } as CSSProperties,
      };
    }
    return {};
  }
  if (shiftTillSearch) {
    if (shiftExtra > 0) {
      return {
        className: "pt-[calc(var(--site-header-height)+var(--shift-extra))]",
        style: { [SHIFT_EXTRA_VAR as string]: `${shiftExtra}px` } as CSSProperties,
      };
    }
    return { className: "pt-[var(--site-header-height)]" };
  }
  if (shiftExtra > 0) {
    return {
      className: "pt-[calc(89px+var(--shift-extra))]",
      style: { [SHIFT_EXTRA_VAR as string]: `${shiftExtra}px` } as CSSProperties,
    };
  }
  return { className: "pt-[89px]" };
}

/**
 * Home: `Container` top padding. Includes optional `shiftExtra` (e.g. 32px) on top of the main offset.
 */
function getHomeContainerPad(shiftUnderHeader: boolean, shiftTillSearch: boolean, shiftExtra: number): HeroContentPad {
  if (!shiftUnderHeader) {
    return { className: "pt-4 sm:pt-8 lg:pt-10" };
  }
  if (shiftTillSearch) {
    return getHeroContentPad(true, true, shiftExtra);
  }
  if (shiftExtra > 0) {
    return {
      className:
        "pt-[calc(1rem+89px+var(--shift-extra))] sm:pt-[calc(2rem+89px+var(--shift-extra))] lg:pt-[calc(2.5rem+89px+var(--shift-extra))]",
      style: { [SHIFT_EXTRA_VAR as string]: `${shiftExtra}px` } as CSSProperties,
    };
  }
  return { className: "pt-[calc(1rem+89px)] sm:pt-[calc(2rem+89px)] lg:pt-[calc(2.5rem+89px)]" };
}

function getPublicationContentTopPad(
  shiftUnderHeader: boolean,
  shiftTillSearch: boolean,
  shiftExtra: number,
): HeroContentPad {
  if (!shiftUnderHeader) {
    return { className: "pt-[3%]" };
  }
  if (shiftExtra > 0) {
    const mid = shiftTillSearch ? "var(--site-header-height)" : "89px";
    return {
      style: { paddingTop: `calc(3% + ${mid} + ${shiftExtra}px)` },
    };
  }
  if (shiftTillSearch) {
    return { className: "pt-[calc(3%+var(--site-header-height))]" };
  }
  return { className: "pt-[calc(3%+89px)]" };
}

function getServicesContentPad(shift: boolean, till: boolean, extra: number): HeroContentPad {
  if (!shift) {
    return {
      className:
        "pt-12 sm:pt-16 md:pt-20 lg:mt-[100px] lg:min-h-0 lg:pb-0",
    };
  }
  const s = { [SHIFT_EXTRA_VAR as string]: `${extra}px` } as CSSProperties;
  if (extra > 0) {
    if (till) {
      return {
        className:
          "pt-[calc(2rem+var(--site-header-height))] sm:pt-[calc(2.75rem+var(--site-header-height))] md:pt-[calc(4rem+var(--site-header-height)+var(--shift-extra))] lg:mt-[calc(100px+var(--site-header-height)+var(--shift-extra))] lg:min-h-0 lg:pb-0",
        style: s,
      };
    }
    return {
      className:
        "pt-[calc(2rem+89px)] sm:pt-[calc(2.75rem+89px)] md:pt-[calc(4rem+89px+var(--shift-extra))] lg:mt-[calc(189px+var(--shift-extra))] lg:min-h-0 lg:pb-0",
      style: s,
    };
  }
  if (till) {
    return {
      className:
        "pt-[calc(2rem+var(--site-header-height))] sm:pt-[calc(2.75rem+var(--site-header-height))] md:pt-[calc(4rem+var(--site-header-height))] lg:mt-[calc(100px+var(--site-header-height))] lg:min-h-0 lg:pb-0",
    };
  }
  return {
    className:
      "pt-[calc(2rem+89px)] sm:pt-[calc(2.75rem+89px)] md:pt-[calc(4rem+89px)] lg:mt-[189px] lg:min-h-0 lg:pb-0",
  };
}

function getProjectsContentPad(shift: boolean, till: boolean, extra: number): HeroContentPad {
  if (!shift) {
    if (extra > 0) {
      return {
        className:
          // Keep mobile compact; apply larger custom offset only from `sm` upward.
          "pt-5 sm:pt-[calc(3.5rem+var(--shift-extra))]",
        style: { [SHIFT_EXTRA_VAR as string]: `${extra}px` } as CSSProperties,
      };
    }
    return { className: "pt-8 sm:pt-14" };
  }
  const s = { [SHIFT_EXTRA_VAR as string]: `${extra}px` } as CSSProperties;
  if (extra > 0) {
    if (till) {
      return {
        className:
          "pt-[calc(2rem+var(--site-header-height)+var(--shift-extra))] sm:pt-[calc(3.5rem+var(--site-header-height)+var(--shift-extra))]",
        style: s,
      };
    }
    return {
      className: "pt-[calc(2rem+89px+var(--shift-extra))] sm:pt-[calc(3.5rem+89px+var(--shift-extra))]",
      style: s,
    };
  }
  if (till) {
    return {
      className:
        "pt-[calc(2rem+var(--site-header-height))] sm:pt-[calc(3.5rem+var(--site-header-height))]",
    };
  }
  return { className: "pt-[calc(2rem+89px)] sm:pt-[calc(3.5rem+89px)]" };
}

function isCustomHeroHeight(heightPx?: number): heightPx is number {
  return heightPx != null && Number.isFinite(heightPx) && heightPx > 0;
}

/** Replaces `marketing-first-section-height` when `heightPx` is set. */
function marketingFirstSectionHeightClass(heightPx?: number) {
  return isCustomHeroHeight(heightPx)
    ? "min-h-0 min-w-0 w-full [&_img]:!object-top [&_video]:!object-top"
    : "marketing-first-section-height";
}

function marketingFirstSectionHeightStyle(heightPx?: number): CSSProperties | undefined {
  if (!isCustomHeroHeight(heightPx)) {
    return undefined;
  }
  return {
    height: heightPx,
    maxHeight: heightPx,
    minHeight: 0,
  };
}

function resolveHeadline(hero: MarketingHeroContent) {
  const defaults = hero.isBuyer
    ? { lead: "Looking To", accent: "Buy?" }
    : { lead: "Looking to", accent: "sell?" };
  return {
    lead: hero.headingLead ?? defaults.lead,
    accent: hero.headingAccent ?? defaults.accent,
  };
}

/**
 * Single reusable marketing hero for `app/(marketing)/*` routes.
 * Content and image paths come from `utils/static.json` → `marketingHeroes`.
 *
 * - **Gazette / magazine:** `heroId` `"gazette"` | `"magazine"` — `variant: "publication"` in static — rendered by
 *   `PublicationHeroView` (thin wrappers: `GazetteHero`, `MagazineHero`).
 */
export function MarketingPageHero(props: MarketingPageHeroProps) {
  const shift = props.shiftUnderHeader;
  const shiftTill = Boolean(shift && props.shiftTillSearch);
  const shouldUseViewportHeightFlag =
    Boolean(props.useViewportHeightFlag) &&
    isCustomHeroHeight(props.heightPx) &&
    isCustomHeroHeight(props.mobileHeightPx);
  const isMobileViewport = useViewportIsMobile(
    shouldUseViewportHeightFlag,
    props.viewportHeightBreakpointPx ?? DEFAULT_VIEWPORT_HEIGHT_BREAKPOINT,
  );
  const heightPx =
    shouldUseViewportHeightFlag && isMobileViewport
      ? props.mobileHeightPx
      : props.heightPx;
  const negativePadding = props.negativePadding;
  /** With header shift: default +32px extra (legacy). Without shift: use `shiftExtraContentTopPx` when passed (e.g. projects), else 0. */
  const shiftContentExtra = shift
    ? (props.shiftExtraContentTopPx ?? 32)
    : (props.shiftExtraContentTopPx ?? 0);
  if (props.heroId === "projects") {
    return (
      <ProjectsHeroSection
        className={props.className}
        shiftUnderHeader={shift}
        shiftTillSearch={shiftTill}
        heightPx={heightPx}
        contentExtraTopPx={shiftContentExtra}
        negativePadding={negativePadding}
        stage={props.projectsStage}
      />
    );
  }

  const raw = getMarketingHeroConfig(props.heroId) as Record<string, unknown>;
  const variant = raw["variant"] as string;

  switch (variant) {
    case "home":
      return (
        <HomeHero
          className={props.className}
          config={raw}
          contentExtraTopPx={shiftContentExtra}
          heightPx={heightPx}
          shiftUnderHeader={shift}
          shiftTillSearch={props.shiftTillSearch}
          negativePadding={negativePadding}
        />
      );
    case "overlayTitle":
      return (
        <OverlayTitleHero
          className={props.className}
          config={raw}
          contentExtraTopPx={shiftContentExtra}
          heightPx={heightPx}
          shiftUnderHeader={shift}
          shiftTillSearch={shiftTill}
          negativePadding={negativePadding}
        />
      );
    case "contact":
      return (
        <ContactHero
          className={props.className}
          config={raw}
          contentExtraTopPx={shiftContentExtra}
          heightPx={heightPx}
          shiftUnderHeader={shift}
          shiftTillSearch={shiftTill}
          negativePadding={negativePadding}
        />
      );
    case "career":
      return (
        <CareerHero
          className={props.className}
          config={raw}
          contentExtraTopPx={shiftContentExtra}
          heightPx={heightPx}
          shiftUnderHeader={shift}
          shiftTillSearch={shiftTill}
          negativePadding={negativePadding}
        />
      );
    case "newsroom":
      return (
        <NewsroomHero
          className={props.className}
          config={raw}
          contentExtraTopPx={shiftContentExtra}
          heightPx={heightPx}
          shiftUnderHeader={shift}
          shiftTillSearch={shiftTill}
          negativePadding={negativePadding}
        />
      );
    case "partners":
      return (
        <PartnersHero
          className={props.className}
          config={raw}
          contentExtraTopPx={shiftContentExtra}
          heightPx={heightPx}
          shiftUnderHeader={shift}
          shiftTillSearch={shiftTill}
          negativePadding={negativePadding}
        />
      );
    /* `marketingHeroes.gazette` + `.magazine` (variant: publication) */
    case "publication":
      return (
        <PublicationHeroView
          className={props.className}
          config={raw}
          contentExtraTopPx={shiftContentExtra}
          heightPx={heightPx}
          shiftUnderHeader={shift}
          shiftTillSearch={shiftTill}
          negativePadding={negativePadding}
        />
      );
    case "tgrea":
      return (
        <TgreaHero
          className={props.className}
          config={raw}
          contentExtraTopPx={shiftContentExtra}
          heightPx={heightPx}
          shiftUnderHeader={shift}
          shiftTillSearch={shiftTill}
          negativePadding={negativePadding}
        />
      );
    case "services":
      return (
        <ServicesHero
          className={props.className}
          config={raw}
          contentExtraTopPx={shiftContentExtra}
          heightPx={heightPx}
          shiftUnderHeader={shift}
          shiftTillSearch={shiftTill}
          negativePadding={negativePadding}
        />
      );
    case "about":
      return (
        <AboutHero
          className={props.className}
          config={raw}
          shiftContentExtra={shiftContentExtra}
          heightPx={heightPx}
          shiftUnderHeader={shift}
          shiftTillSearch={shiftTill}
          negativePadding={negativePadding}
        />
      );
    default:
      return null;
  }
}

// --- variant implementations ---

function HomeHero({
  className,
  config,
  contentExtraTopPx,
  heightPx,
  shiftUnderHeader,
  shiftTillSearch,
  negativePadding,
}: {
  className?: string;
  config: Record<string, unknown>;
  contentExtraTopPx: number;
  heightPx?: number;
  shiftUnderHeader?: boolean;
  /** If true with `shiftUnderHeader`, margin/padding use `var(--site-header-height)` instead of the 89px main row. */
  shiftTillSearch?: boolean;
  negativePadding?: MarketingHeroNegativeContentShift;
}) {
  const lines = config["lines"] as { line1?: string; accent?: string; line2?: string }[];
  const cta = config["cta"] as { href: string; label: string };
  const tillSearch = Boolean(shiftUnderHeader && shiftTillSearch);
  const homePad = mergeNegativeContentPad(
    negativePadding,
    getHomeContainerPad(Boolean(shiftUnderHeader), tillSearch, contentExtraTopPx),
  );

  return (
    <section
      id={(config["sectionId"] as string) || undefined}
      className={cn(
        marketingFirstSectionHeightClass(heightPx),
        "relative overflow-hidden bg-[#E4E4E4]",
        tillSearch
          ? "pt-0 pb-12 sm:pb-14 lg:pb-16"
          : "pt-8 pb-12 sm:pt-14 sm:pb-14 lg:pb-16",
        heroNavOverlapClass(shiftUnderHeader, tillSearch),
        className,
      )}
      style={marketingFirstSectionHeightStyle(heightPx)}
      aria-labelledby={config["headingId"] as string}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={config["backgroundImage"] as string}
          alt=""
          fill
          className={cn(
            (config["imageClassName"] as string) || "object-cover object-center",
          )}
          sizes="100vw"
          priority
        />
      </div>
      <div
        className="pointer-events-none absolute -left-[479.28px] -top-[752.71px] z-[1] h-[10033px] w-[20000000px]  rounded-none mix-blend-soft-light"
        aria-hidden
      >
        <div className="relative h-full w-full min-h-0">
          <Image
            src="/images/image 40.svg"
            alt=""
            fill
            unoptimized
            className="object-cover object-center"
            sizes="2000px"
          />
        </div>
      </div>
      <Container
        className={cn("relative z-10", homePad.className)}
        style={homePad.style}
      >
        <div className="mx-auto flex min-w-0 max-w-[760px] flex-col items-center px-2 text-center min-[400px]:px-3 sm:px-0">
          <ScrollReveal direction="up" delay={0.04} distance={26}>
            <h1
              id={config["headingId"] as string}
              className={cn(
                "w-full max-w-[760px] qs-reg not-italic uppercase tracking-[0.05em] text-[#202225]",
                "text-[clamp(1.1rem,calc(0.5rem+6.4vw),65px)] leading-none",
              )}
            >
              {lines[0] ? (
                <span className="block whitespace-normal sm:whitespace-nowrap">
                  {lines[0].line1}{" "}
                  <span className="text-[#8F8183]">{lines[0].accent}</span>
                </span>
              ) : null}
              {lines[1]?.line2 ? (
                <span className="mt-1 block sm:mt-0">{lines[1].line2}</span>
              ) : null}
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.12} distance={22}>
            <p
              className={cn(
                "mx-auto mt-4 w-full max-w-2xl n-reg lh-22 text-[#000000]",
                " sm:mt-7  lg:mt-4 text-[clamp(0.76rem,calc(0.5rem+0.87vw),1.125rem)]",
              )}
            >
              {config["subtitle"] as string}
            </p>
          </ScrollReveal>
          <div className="mt-4 flex justify-center sm:mt-10 lg:mt-7">
            {/* <GradientCtaButton
              href={cta.href}
              variant="know-more"
              className="lg-1 btn-1 w-full min-w-0 h-[55px] lg:px-[46px] lg:py-4.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B48183]"
            >
              {cta.label}
            </GradientCtaButton> */}

            <OutlineArrowButton
              href={cta.href}
              className="h-[52px] max-w-sm cursor-pointer sm:h-[55px]  sm:justify-start sm:gap-5 sm:px-12 sm:text-base lg:text-xl w-[273px]"
            >
              {cta.label}
            </OutlineArrowButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

function OverlayTitleHero({
  className,
  config,
  contentExtraTopPx,
  heightPx,
  shiftUnderHeader,
  shiftTillSearch,
  negativePadding,
}: {
  className?: string;
  config: Record<string, unknown>;
  contentExtraTopPx: number;
  heightPx?: number;
  shiftUnderHeader?: boolean;
  shiftTillSearch?: boolean;
  negativePadding?: MarketingHeroNegativeContentShift;
}) {
  const contentPad = mergeNegativeContentPad(
    negativePadding,
    getHeroContentPad(Boolean(shiftUnderHeader), Boolean(shiftTillSearch), contentExtraTopPx),
  );
  return (
    <section
      className={cn(
        marketingFirstSectionHeightClass(heightPx),
        "relative overflow-hidden",
        heroNavOverlapClass(shiftUnderHeader, shiftTillSearch),
        className,
      )}
      style={marketingFirstSectionHeightStyle(heightPx)}
      aria-labelledby={config["headingId"] as string}
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src={config["backgroundImage"] as string}
          alt=""
          fill
          className={HERO_BG_IMAGE_CLASS}
          sizes="100vw"
          priority
        />
        <div
          className={cn(
            "absolute inset-0",
            (config["overlayClassName"] as string) || "bg-black/40",
          )}
        />
      </div>
      <div
        className={cn(
          "relative z-10 flex h-full items-center justify-center px-4 text-center",
          contentPad.className,
        )}
        style={contentPad.style}
      >
        <ScrollReveal direction="up" delay={0.04} distance={24}>
          <h1
            id={config["headingId"] as string}
            className={config["titleClassName"] as string}
          >
            {config["title"] as string}
          </h1>
        </ScrollReveal>
      </div>
    </section>
  );
}

function ContactHero({
  className,
  config,
  heightPx,
  shiftUnderHeader,
  shiftTillSearch,
  contentExtraTopPx,
  negativePadding,
}: {
  className?: string;
  config: Record<string, unknown>;
  heightPx?: number;
  shiftUnderHeader?: boolean;
  shiftTillSearch?: boolean;
  contentExtraTopPx: number;
  negativePadding?: MarketingHeroNegativeContentShift;
}) {
  const contentPad = mergeNegativeContentPad(
    negativePadding,
    getHeroContentPad(Boolean(shiftUnderHeader), Boolean(shiftTillSearch), contentExtraTopPx),
  );
  return (
    <section
      className={cn(
        marketingFirstSectionHeightClass(heightPx),
        "relative overflow-hidden",
        heroNavOverlapClass(shiftUnderHeader, shiftTillSearch),
        className,
      )}
      style={marketingFirstSectionHeightStyle(heightPx)}
      aria-labelledby={config["headingId"] as string}
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src={config["primaryImage"] as string}
          alt=""
          fill
          className={HERO_BG_IMAGE_CLASS}
          sizes="100vw"
          priority
        />
        <Image
          src={config["secondaryImage"] as string}
          alt=""
          fill
          className={cn(
            (config["secondaryImageClassName"] as string) ||
            "object-cover object-center mix-blend-darken",
          )}
          sizes="100vw"
          priority
        />
      </div>
      <div
        className={cn(
          "relative z-10 flex h-full items-center justify-center px-4 text-center",
          contentPad.className,
        )}
        style={contentPad.style}
      >
        <ScrollReveal direction="up" delay={0.04} distance={24}>
          <h1
            id={config["headingId"] as string}
            className="qs-reg uppercase text-[clamp(2.5rem,6.5vw,4.375rem)] leading-[1] tracking-[0.05em]"
          >
            <span className="text-[#8F8183]">Contact </span>
            <span className="text-[#202225]">Us</span>
          </h1>
        </ScrollReveal>
      </div>
    </section>
  );
}

function CareerHero({
  className,
  config,
  heightPx,
  shiftUnderHeader,
  shiftTillSearch,
  contentExtraTopPx,
  negativePadding,
}: {
  className?: string;
  config: Record<string, unknown>;
  heightPx?: number;
  shiftUnderHeader?: boolean;
  shiftTillSearch?: boolean;
  contentExtraTopPx: number;
  negativePadding?: MarketingHeroNegativeContentShift;
}) {
  const contentPad = mergeNegativeContentPad(
    negativePadding,
    getHeroContentPad(Boolean(shiftUnderHeader), Boolean(shiftTillSearch), contentExtraTopPx),
  );
  return (
    <section
      className={cn(
        marketingFirstSectionHeightClass(heightPx),
        "relative overflow-hidden bg-neutral-200",
        heroNavOverlapClass(shiftUnderHeader, shiftTillSearch),
        className,
      )}
      style={marketingFirstSectionHeightStyle(heightPx)}
      aria-labelledby={config["headingId"] as string}
    >
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
        <Image
          src={config["backgroundImage"] as string}
          alt={(config["imageAlt"] as string) || ""}
          fill
          className={HERO_BG_IMAGE_CLASS}
          sizes="100vw"
          priority
        />
      </div>
      <Container
        className={cn(
          "relative z-10 flex flex-col items-center justify-center px-4 text-center sm:px-6",
          contentExtraTopPx > 0 ? "mt-0" : "mt-8 sm:mt-15",
          contentPad.className,
        )}
        style={contentPad.style}
      >
        <ScrollReveal direction="up" delay={0.04} distance={24}>
          <h1
            id={config["headingId"] as string}
            className={cn(
              "max-w-[18ch] break-words qs-reg uppercase text-[#202225] sm:max-w-none",
              "text-[clamp(1.75rem,calc(0.9rem+5vw),4.375rem)] leading-[1.08] tracking-[0.05em]",
            )}
          >
            {config["title"] as string}
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.12} distance={20}>
          <p className="mt-4 max-w-[700px] n-reg text-sm text-black sm:mt-1 sm:text-lg">
            {config["subtitle"] as string}
          </p>
        </ScrollReveal>
      </Container>
    </section>
  );
}

function NewsroomHero({
  className,
  config,
  heightPx,
  shiftUnderHeader,
  shiftTillSearch,
  contentExtraTopPx,
  negativePadding,
}: {
  className?: string;
  config: Record<string, unknown>;
  heightPx?: number;
  shiftUnderHeader?: boolean;
  shiftTillSearch?: boolean;
  contentExtraTopPx: number;
  negativePadding?: MarketingHeroNegativeContentShift;
}) {
  const contentPad = mergeNegativeContentPad(
    negativePadding,
    getHeroContentPad(Boolean(shiftUnderHeader), Boolean(shiftTillSearch), contentExtraTopPx),
  );
  return (
    <section
      className={cn(
        marketingFirstSectionHeightClass(heightPx),
        "relative overflow-hidden",
        heroNavOverlapClass(shiftUnderHeader, shiftTillSearch),
        className,
      )}
      style={marketingFirstSectionHeightStyle(heightPx)}
      aria-labelledby={config["headingId"] as string}
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src={config["backgroundImage"] as string}
          alt={(config["imageAlt"] as string) || ""}
          fill
          className={cn(
            (config["imageClassName"] as string) || "object-cover object-center",
          )}
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0" />
      </div>
      <div
        className={cn(
          "relative z-10 flex h-full items-center justify-center px-4 lg:mt-[150px] lg:items-start",
          contentPad.className,
        )}
        style={contentPad.style}
      >
        <ScrollReveal direction="up" delay={0.04} distance={24}>
          <h1
            id={config["headingId"] as string}
            className={cn(
              "qs-reg nt-normal uppercase text-white text-center",
              "text-[clamp(2rem,calc(1.25rem+4vw),4.375rem)] leading-[1] tracking-[0.05em]",
            )}
          >
            {config["title"] as string}
          </h1>
        </ScrollReveal>
      </div>
    </section>
  );
}

function PartnersHero({
  className,
  config,
  heightPx,
  shiftUnderHeader,
  shiftTillSearch,
  contentExtraTopPx,
  negativePadding,
}: {
  className?: string;
  config: Record<string, unknown>;
  heightPx?: number;
  shiftUnderHeader?: boolean;
  shiftTillSearch?: boolean;
  contentExtraTopPx: number;
  negativePadding?: MarketingHeroNegativeContentShift;
}) {
  const contentPad = mergeNegativeContentPad(
    negativePadding,
    getHeroContentPad(Boolean(shiftUnderHeader), Boolean(shiftTillSearch), contentExtraTopPx),
  );
  return (
    <section
      className={cn(
        marketingFirstSectionHeightClass(heightPx),
        "relative w-full min-w-0 overflow-x-clip",
        heroNavOverlapClass(shiftUnderHeader, shiftTillSearch),
        className,
      )}
      style={marketingFirstSectionHeightStyle(heightPx)}
      aria-labelledby={config["headingId"] as string}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={config["backgroundImage"] as string}
          alt=""
          fill
          className={HERO_BG_IMAGE_CLASS}
          sizes="100vw"
          priority
        />
      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32"
        aria-hidden
      />
      <div
        className={cn(
          "relative z-20 flex w-full min-w-0 items-center justify-center bg-black/25 px-4 py-14 sm:px-6",
          "h-full min-h-0 sm:py-0",
          contentPad.className,
        )}
        style={contentPad.style}
      >
        <ScrollReveal direction="up" delay={0.04} distance={24}>
          <h1
            id={config["headingId"] as string}
            className={cn(
              "max-w-full uppercase text-[#202225] text-center text-balance",
              "qs-reg text-[clamp(1.5rem,calc(0.65rem+5vw),4.375rem)] leading-[1.08] tracking-[0.05em] sm:leading-[1.06]",
            )}
          >
            <span className="text-white">Partners</span>
            <span> &amp; Clients</span>
          </h1>
        </ScrollReveal>
      </div>
    </section>
  );
}

/** Used for `variant: "publication"` (e.g. `heroId` `gazette`, `magazine` from `static.json`). */
function PublicationHeroView({
  className,
  config,
  heightPx,
  shiftUnderHeader,
  shiftTillSearch,
  contentExtraTopPx,
  negativePadding,
}: {
  className?: string;
  config: Record<string, unknown>;
  heightPx?: number;
  shiftUnderHeader?: boolean;
  shiftTillSearch?: boolean;
  contentExtraTopPx: number;
  negativePadding?: MarketingHeroNegativeContentShift;
}) {
  const topPad = mergeNegativeContentPad(
    negativePadding,
    getPublicationContentTopPad(
      Boolean(shiftUnderHeader),
      Boolean(shiftTillSearch),
      contentExtraTopPx,
    ),
  );
  return (
    <section
      className={cn(
        marketingFirstSectionHeightClass(heightPx),
        "relative overflow-hidden",
        heroNavOverlapClass(shiftUnderHeader, shiftTillSearch),
        className,
      )}
      style={marketingFirstSectionHeightStyle(heightPx)}
      aria-labelledby={config["headingId"] as string}
    >
      <div className="hero-projects-stage-bg" aria-hidden>
        <div className="hero-projects-stage-bg__photo">
          <Image
            src={config["backgroundImage"] as string}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>
        <div className="hero-projects-stage-bg__texture" aria-hidden>
          <div className="relative h-full w-full min-h-0 min-w-0">
            <Image
              src="/images/ongoing-bg.svg"
              alt=""
              fill
              unoptimized
              className="object-cover object-center"
              sizes="100vw"
            />
          </div>
        </div>
      </div>
      <div
        className={cn(
          "relative z-10 flex h-full items-center justify-center px-4 text-center",
          topPad.className,
        )}
        style={topPad.style}
      >
        <ScrollReveal direction="up" delay={0.04} distance={24}>
          <h1
            id={config["headingId"] as string}
            className={cn(
              "qs-reg fs-70 ls-10 uppercase text-[#202225]",
              "text-[clamp(2.5rem,6.5vw,4.375rem)] leading-[1] tracking-[0.05em]",
              (config["titleClassName"] as string) || undefined,
            )}
          >
            {config["title"] as string}
          </h1>
        </ScrollReveal>
      </div>
    </section>
  );
}

function TgreaHero({
  className,
  config,
  heightPx,
  shiftUnderHeader,
  shiftTillSearch,
  contentExtraTopPx,
  negativePadding,
}: {
  className?: string;
  config: Record<string, unknown>;
  heightPx?: number;
  shiftUnderHeader?: boolean;
  shiftTillSearch?: boolean;
  contentExtraTopPx: number;
  negativePadding?: MarketingHeroNegativeContentShift;
}) {
  const contentPad = mergeNegativeContentPad(
    negativePadding,
    getHeroContentPad(Boolean(shiftUnderHeader), Boolean(shiftTillSearch), contentExtraTopPx),
  );
  return (
    <section
      className={cn(
        marketingFirstSectionHeightClass(heightPx),
        "relative w-full min-w-0 overflow-hidden bg-neutral-200",
        heroNavOverlapClass(shiftUnderHeader, shiftTillSearch),
        className,
      )}
      style={marketingFirstSectionHeightStyle(heightPx)}
      aria-labelledby={config["headingId"] as string}
    >
      <div className="relative h-full overflow-hidden">
        <div className="pointer-events-none absolute inset-0 z-0">
          <Image
            src={config["backgroundImage"] as string}
            alt=""
            fill
            className={cn(
              (config["imageClassName"] as string) || "object-stretch object-center",
            )}
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-white/10" />
        </div>
        <div
          className={cn(
            "absolute inset-x-0 top-[9%] px-4 text-center sm:top-[8%] sm:px-6 lg:top-[7.5%] lg:px-0 lg:pt-25",
            contentPad.className,
          )}
          style={contentPad.style}
        >
          <Container className="min-w-0">
            <ScrollReveal direction="up" delay={0.04} distance={24}>
              <h1
                id={config["headingId"] as string}
                className="break-words px-1 qs-reg uppercase leading-[0.94] tracking-[0.02em] text-[#202225] text-[clamp(1.9rem,9vw,4.375rem)] lg:fs-70"
              >
                {config["title"] as string}
              </h1>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.1} distance={20}>
              <p
                className={cn(
                  "mx-auto mt-1 n-bold uppercase tracking-[0.1em] text-[#202225]",
                  "text-[clamp(0.8125rem,3.4vw,1.25rem)]",
                )}
              >
                {config["tagline"] as string}
              </p>
            </ScrollReveal>
            <ScrollReveal direction="up" delay={0.14} distance={18}>
              <p
                className={cn(
                  "mx-auto mt-4 max-w-[min(1180px,100%)] text-[#000000] fs-18 lh-22 n-book",
                  "text-[15px] leading-[1.15]",
                )}
              >
                {config["body"] as string}
              </p>
            </ScrollReveal>
          </Container>
        </div>
      </div>
    </section>
  );
}

function ServicesHero({
  className,
  config,
  heightPx,
  shiftUnderHeader,
  shiftTillSearch,
  contentExtraTopPx,
  negativePadding,
}: {
  className?: string;
  config: Record<string, unknown>;
  heightPx?: number;
  shiftUnderHeader?: boolean;
  shiftTillSearch?: boolean;
  contentExtraTopPx: number;
  negativePadding?: MarketingHeroNegativeContentShift;
}) {
  const contentPad = mergeNegativeContentPad(
    negativePadding,
    getServicesContentPad(Boolean(shiftUnderHeader), Boolean(shiftTillSearch), contentExtraTopPx),
  );
  return (
    <section
      className={cn(
        marketingFirstSectionHeightClass(heightPx),
        "relative mb-4 overflow-hidden lg:mb-[80px]",
        heroNavOverlapClass(shiftUnderHeader, shiftTillSearch),
        className,
      )}
      style={marketingFirstSectionHeightStyle(heightPx)}
      aria-labelledby={config["ariaLabelledBy"] as string}
    >
      <div className="absolute inset-0 z-0" aria-hidden>
        <Image
          src={config["backgroundImage"] as string}
          alt=""
          fill
          className={HERO_BG_IMAGE_CLASS}
          sizes="100vw"
          priority
        />
      </div>
      <div
        className={cn(
          "relative z-10 flex min-h-[inherit] flex-col items-center justify-start gap-2 px-5 pb-8 text-center qs-reg sm:gap-2 sm:px-6 sm:pb-10 lg:min-h-0 lg:px-4 lg:pb-0",
          contentPad.className,
        )}
        style={contentPad.style}
      >
        <ScrollReveal direction="up" delay={0.04} distance={24}>
          <h1
            id={config["headingId"] as string}
            className={cn(
              "max-w-[min(100%,22ch)] break-words qs-reg lh-50 uppercase leading-none tracking-[0.05em] text-[#202225] text-[clamp(1.9rem,9vw,4.375rem)] lg:fs-70",
              (config["titleClassName"] as string) || undefined,
            )}
          >
            {config["title"] as string}
          </h1>
        </ScrollReveal>
        <ScrollReveal direction="up" delay={0.12} distance={20}>
          <p className="n-reg fs-18 lh-24 text-black max-w-2xl mt-2 md:mt-4 lg:mt-4">
            {config["subtitle"] as string}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}

function AboutHero({
  className,
  config,
  heightPx,
  shiftUnderHeader,
  shiftTillSearch,
  shiftContentExtra,
  negativePadding,
}: {
  className?: string;
  config: Record<string, unknown>;
  heightPx?: number;
  shiftUnderHeader?: boolean;
  shiftTillSearch?: boolean;
  shiftContentExtra: number;
  negativePadding?: MarketingHeroNegativeContentShift;
}) {
  const contentPad = mergeNegativeContentPad(
    negativePadding,
    getHeroContentPad(Boolean(shiftUnderHeader), Boolean(shiftTillSearch), shiftContentExtra),
  );
  const heading = config["headingHtml"] as { prefix: string; rest: string };
  return (
    <div
      className={cn(
        marketingFirstSectionHeightClass(heightPx),
        "relative overflow-hidden",
        heroNavOverlapClass(shiftUnderHeader, shiftTillSearch),
        className,
      )}
      style={marketingFirstSectionHeightStyle(heightPx)}
    >
      <Image
        src={config["backgroundImage"] as string}
        alt={(config["imageAlt"] as string) || ""}
        className={HERO_BG_IMAGE_CLASS}
        sizes="100vw"
        fill
        priority
      />
      <div
        className={cn(
          "absolute inset-x-0 top-[6%] text-center sm:top-[7%] lg:top-[7.5%]",
          /* `lg:pt-25` would override `getHeroContentPad`’s `pt-[calc(…+var(--shift-extra))]` at lg+ */
          !shiftUnderHeader && "lg:pt-25",
          contentPad.className,
        )}
        style={contentPad.style}
      >
        <Container className="min-w-0">
          <ScrollReveal direction="up" delay={0.04} distance={24}>
            <h1 className="break-words px-1 qs-reg uppercase leading-[0.94] tracking-[0.02em] text-[clamp(1.9rem,9vw,4.375rem)] lg:fs-70">
              <span className="ml-2 inline-block sm:ml-3 sm:inline text-[#202225]">
                <span className="text-[#8F8183]">{heading.prefix}</span>
                {heading.rest}
              </span>
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.12} distance={20}>
            <p className="mx-auto mt-4 max-w-[min(1180px,100%)] text-[15px] leading-[1.15] text-[#000000] fs-18 lh-22 n-book">
              {config["subtitle"] as string}
            </p>
          </ScrollReveal>
        </Container>
      </div>
    </div>
  );
}

function ProjectsHeroSection({
  className,
  stage,
  heightPx,
  shiftUnderHeader,
  shiftTillSearch,
  contentExtraTopPx,
  negativePadding,
}: {
  className?: string;
  stage: ProjectsStage;
  heightPx?: number;
  shiftUnderHeader?: boolean;
  shiftTillSearch?: boolean;
  contentExtraTopPx: number;
  negativePadding?: MarketingHeroNegativeContentShift;
}) {
  const contentPad = mergeNegativeContentPad(
    negativePadding,
    getProjectsContentPad(Boolean(shiftUnderHeader), Boolean(shiftTillSearch), contentExtraTopPx),
  );
  const cfg = getMarketingHeroConfig("projects") as {
    variant: string;
    subtitle: string;
    images: { ongoing: string; completed: string };
  };
  const src = stage === "Completed" ? cfg.images.completed : cfg.images.ongoing;
  const fallbackSrc =
    stage === "Completed" ? LOCAL_IMAGES.projectCompleted : LOCAL_IMAGES.tgreaHero;
  const [displaySrc, setDisplaySrc] = useState(src);

  useEffect(() => {
    setDisplaySrc(src);
  }, [src]);

  return (
    <section
      className={cn(
        marketingFirstSectionHeightClass(heightPx),
        "relative isolate flex flex-col overflow-hidden md:flex ",
        heroNavOverlapClass(shiftUnderHeader, shiftTillSearch),
        className,
      )}
      style={marketingFirstSectionHeightStyle(heightPx)}
    >
      <div className="hero-projects-stage-bg" aria-hidden>
        <div className="hero-projects-stage-bg__photo">
          <Image
            src={displaySrc}
            alt=""
            fill
            className={HERO_BG_IMAGE_CLASS}
            sizes="100vw"
            priority
            onError={() => {
              if (displaySrc !== fallbackSrc) {
                setDisplaySrc(fallbackSrc);
              }
            }}
          />
        </div>

      </div>

      <div
        className={cn(
          "relative z-10 flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-2 px-4 pb-8 text-center sm:justify-start sm:gap-2 sm:px-8 sm:pb-14 md:px-10",
          contentPad.className,
        )}
        style={contentPad.style}
      >
        <div className="mx-auto flex w-full min-w-0 max-w-3xl flex-col items-start gap-1 text-left sm:gap-2">
          <ScrollReveal direction="up" delay={0.04} distance={24} className="flex w-full justify-center justify-content-center">
            <h1 className="qs-reg text-[clamp(1.6rem,8vw,3.05rem)] uppercase leading-[1.08] tracking-[0.04em] text-[#0a0a0a] lg:text-[clamp(2.75rem,5vw,4rem)] lg:tracking-[0.06em]">
              <span className="inline-block whitespace-normal tracking-[0.04em] sm:whitespace-nowrap sm:tracking-[0.07em]">
                {stage} Projects
              </span>
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.12} distance={20} className="flex w-full justify-center justify-content-center">
            <p className="w-full px-1 n-book text-[13px] leading-[1.45] text-black sm:text-[15px] sm:leading-[1.45] lg:text-base flex justify-center justify-content-center">
              {cfg.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/** Buyer / developer marketing hero — content comes from page data (`utils/static.json` via `getAudienceHero`). */
export function MarketingAudienceHero({
  className,
  content,
  heightPx,
  shiftUnderHeader,
  shiftTillSearch,
  shiftExtraContentTopPx,
  negativePadding,
}: {
  className?: string;
  content: MarketingHeroContent;
  /** When set, replaces default `marketing-first-section-height` clamp with this fixed height (px). */
  heightPx?: number;
  shiftUnderHeader?: boolean;
  shiftTillSearch?: boolean;
  /**
   * When `shiftUnderHeader` is true, extra top padding (px) on the main content, after the header offset.
   * Defaults to 32. Pass `0` to turn off.
   */
  shiftExtraContentTopPx?: number;
  /** See `MarketingHeroNegativeContentShift`. */
  negativePadding?: MarketingHeroNegativeContentShift;
}) {
  const { lead, accent } = resolveHeadline(content);
  const tillSearch = Boolean(shiftUnderHeader && shiftTillSearch);
  const shift = Boolean(shiftUnderHeader);
  const contentExtraTopPx = shift ? (shiftExtraContentTopPx ?? 32) : 0;
  const contentPad = mergeNegativeContentPad(
    negativePadding,
    getHeroContentPad(shift, tillSearch, contentExtraTopPx),
  );

  return (
    <section
      className={cn(
        marketingFirstSectionHeightClass(heightPx),
        "relative isolate w-full min-w-0 overflow-hidden bg-neutral-300",
        shiftUnderHeader
          ? "pt-0 sm:pt-0 lg:pt-0 2xl:pt-0 pb-28 sm:pb-32 lg:pb-40 2xl:pb-44"
          : "pt-10 pb-28 sm:pt-14 sm:pb-32 lg:pt-30 lg:pb-40 2xl:pt-36 2xl:pb-44",
        heroNavOverlapClass(shiftUnderHeader, tillSearch),
        className,
      )}
      style={marketingFirstSectionHeightStyle(heightPx)}
      aria-labelledby={content.ariaHeadingId}
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src={content.backgroundImageSrc}
          alt=""
          fill
          className={HERO_BG_IMAGE_CLASS}
          sizes="100vw"
          priority
        />

      </div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-36 bg-gradient-to-t from-white/100 via-white/45 to-transparent sm:h-44 md:h-52"
        aria-hidden
      />
      <Container
        className={cn("relative z-10", contentPad.className)}
        style={contentPad.style}
      >
        <div className="mx-auto flex min-w-0 max-w-[820px] flex-col items-center px-2 text-center sm:px-4">
          <ScrollReveal direction="up" delay={0.04} distance={24}>
            <h1
              id={content.ariaHeadingId}
              className="break-words qs-reg text-[clamp(2rem,6vw,4.175rem)] uppercase leading-[1.05] ls-5  "
            >
              <span className="block">
                <span className="text-[#202225]">{lead}</span>{" "}
                <span className="text-[#8F8183]">{accent}</span>
              </span>
            </h1>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.12} distance={20} className="flex w-full justify-center pr-[100px]">
            <p className=" flex w-full max-w-[500px] text-sm  text-black  text-[clamp(0.985rem,100vw,0.375rem)] md:mt-3 lg:mt-5 ">
              {content.body}
            </p>
          </ScrollReveal>
          <div className="mt-8 flex w-full justify-center sm:mt-10">
            <OutlineArrowButton
              href={content.enquireHref}
              className=" h-[55px] fs-20 n-bold w-[307px] uppercase"
            >
              {content.enquireLabel}
            </OutlineArrowButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
