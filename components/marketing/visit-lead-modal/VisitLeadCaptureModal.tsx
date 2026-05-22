"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useCallback, useEffect, useId, useRef } from "react";
import { VisitLeadCaptureForm } from "./VisitLeadCaptureForm";
import { useBodyScrollLock } from "./useBodyScrollLock";
import { useFocusTrap } from "./useFocusTrap";

const EASE_SMOOTH: [number, number, number, number] = [0.22, 1, 0.36, 1];

const overlayVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.4, ease: EASE_SMOOTH },
  },
};

/** Panel rises from below the viewport into the vertical center. */
const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "72vh",
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, ease: EASE_SMOOTH },
  },
  exit: {
    opacity: 0,
    y: "28vh",
    transition: { duration: 0.48, ease: EASE_SMOOTH },
  },
};

export type VisitLeadCaptureModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function VisitLeadCaptureModal({
  isOpen,
  onClose,
}: VisitLeadCaptureModalProps) {
  const titleId = useId();
  const descriptionId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useBodyScrollLock(isOpen);
  useFocusTrap(panelRef, isOpen);

  const handleSuccess = useCallback(() => {
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen || !panelRef.current) return;
    const timer = window.setTimeout(() => {
      const firstField = panelRef.current?.querySelector<HTMLElement>(
        'input[name="firstName"]',
      );
      (firstField ?? closeButtonRef.current)?.focus();
    }, 480);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            key="visit-lead-overlay"
            type="button"
            aria-label="Close dialog backdrop"
            className="fixed inset-0 z-[100] cursor-default bg-[#161616]/50 backdrop-blur-sm dark:bg-black/70"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          <div
            key="visit-lead-stage"
            className="pointer-events-none fixed inset-0 z-[101] flex items-center justify-center px-4 py-8 sm:px-6"
            aria-hidden
          >
            <motion.div
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              variants={panelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="pointer-events-auto relative flex max-h-[min(90vh,720px)] w-full max-w-[480px] flex-col overflow-hidden rounded-2xl bg-[#FAFAFA] shadow-[0_32px_64px_-12px_rgba(22,22,22,0.22)] ring-1 ring-black/[0.06] dark:bg-[#1c1c1c] dark:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.55)] dark:ring-white/[0.08]"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="h-1 shrink-0 bg-gradient-to-r from-[#f9a88f] via-[#f07c61] to-[#e85a42]"
                aria-hidden
              />

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                className="absolute right-4 top-5 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/[0.04] text-[#202225] transition-colors hover:bg-black/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f07c61] dark:bg-white/[0.08] dark:text-neutral-200 dark:hover:bg-white/[0.12]"
                aria-label="Close book a visit dialog"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden>
                  <path
                    d="M0.0175781 0L15.6565 15.6389"
                    stroke="currentColor"
                    strokeWidth="1.42224"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15.6387 0L-0.000211952 15.6389"
                    stroke="currentColor"
                    strokeWidth="1.42224"
                    strokeLinecap="round"
                  />
                </svg>
              </button>

              <div className="shrink-0 bg-[#EDE8E5] px-6 pb-2 pt-4 text-center dark:bg-[#2a2626] sm:px-8 sm:pb-2 sm:pt-6">
                <h2
                  id={titleId}
                  className="qs-reg text-[clamp(1.625rem,4.5vw,2.25rem)] uppercase leading-[1.05] tracking-[0.05em] text-brand-text-primary dark:text-white"
                >
                  Book A Visit
                </h2>
                <p
                  id={descriptionId}
                  className="mx-auto mt-3 max-w-[320px] n-reg text-sm leading-relaxed text-[#6B5F60] dark:text-neutral-300"
                >
                  Tell us how to reach you — we&apos;ll confirm your visit shortly.
                </p>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-6 pb-8 pt-6 sm:px-8 sm:pb-9">
                <VisitLeadCaptureForm onSuccess={handleSuccess} />
              </div>
            </motion.div>
          </div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
