"use client";

import { useEffect } from "react";

const GRAD =
  "linear-gradient(to right, #ec6f66 0%, #f3a183 51%, #ec6f66 100%)";

const SELECTOR =
  ".btn-grad, .btn-primary-gradient, .btn-know-more-gradient, .btn-grad--dark";

const TRANSITION_MS = 500;
const DURATION = "0.5s";

type PendingLeave = {
  /** `window.setTimeout` id in the browser. */
  timeoutId: number;
  onEnd: (ev: TransitionEvent) => void;
};

/** Clears a scheduled `runLeave` cleanup so a later `runEnter` is not wiped by a stale timeout. */
const pendingLeave = new WeakMap<HTMLElement, PendingLeave>();

/** `setTimeout(0)` id — deferred "did we really leave?" after pointerout (fixes null `relatedTarget` and odd capture ordering). */
const scheduledPointerOutCheck = new WeakMap<HTMLElement, number>();

function abortPendingLeave(el: HTMLElement) {
  const p = pendingLeave.get(el);
  if (!p) {
    return;
  }
  window.clearTimeout(p.timeoutId);
  el.removeEventListener("transitionend", p.onEnd);
  pendingLeave.delete(el);
}

function cancelScheduledPointerLeaveCheck(el: HTMLElement) {
  const t = scheduledPointerOutCheck.get(el);
  if (t === undefined) {
    return;
  }
  window.clearTimeout(t);
  scheduledPointerOutCheck.delete(el);
}

/**
 * `pointerout` is sometimes wrong (`relatedTarget` null, capture quirks). We only leave if
 * the pointer is not over this control by `:hover` and by a hit-test at the event position.
 */
function runLeaveIfNotHovering(
  el: HTMLElement,
  clientX: number,
  clientY: number,
) {
  if (!el.isConnected) {
    return;
  }
  if (el.matches(":hover")) {
    return;
  }
  if (el.matches(":focus-within") && document.hasFocus()) {
    return;
  }
  let hit: Element | null = null;
  try {
    hit = document.elementFromPoint(clientX, clientY);
  } catch {
    runLeave(el);
    return;
  }
  if (hit && (el === hit || el.contains(hit))) {
    return;
  }
  runLeave(el);
}

/**
 * Entering from the left side of the box → L→R gradient; from the right → R→L.
 * Uses pointer X (and when outside, which edge) relative to the control.
 */
function enterFromLeft(
  e: { clientX: number; clientY: number },
  r: DOMRect,
): boolean {
  if (e.clientX < r.left) {
    return true;
  }
  if (e.clientX > r.right) {
    return false;
  }
  if (e.clientY < r.top && e.clientX < r.left + r.width / 2) {
    return true;
  }
  if (e.clientY < r.top) {
    return e.clientX < r.left + r.width / 2;
  }
  if (e.clientY > r.bottom && e.clientX < r.left + r.width / 2) {
    return true;
  }
  if (e.clientY > r.bottom) {
    return e.clientX < r.left + r.width / 2;
  }
  return e.clientX < r.left + r.width / 2;
}

function runEnter(el: HTMLElement, fromLeft: boolean) {
  cancelScheduledPointerLeaveCheck(el);
  abortPendingLeave(el);
  const isDark = el.classList.contains("btn-grad--dark");
  if (isDark) {
    el.style.setProperty("background-image", GRAD);
    el.style.setProperty("background-color", "transparent");
  }
  el.style.setProperty("transition", "none");
  el.style.setProperty("background-size", "200% 100%");
  el.style.setProperty(
    "background-position",
    fromLeft ? "left center" : "right center",
  );
  void el.offsetHeight;
  el.style.setProperty("transition", `background-position ${DURATION} ease`);
  el.style.setProperty(
    "background-position",
    fromLeft ? "right center" : "left center",
  );
  el.setAttribute("data-grad-anim", "1");
}

function runLeave(el: HTMLElement) {
  if (!el.hasAttribute("data-grad-anim")) {
    return;
  }
  abortPendingLeave(el);
  el.removeAttribute("data-grad-anim");
  el.style.setProperty(
    "transition",
    "background-size 0.45s ease, background-position 0.45s ease",
  );
  el.style.setProperty("background-size", "100% 100%");
  el.style.setProperty("background-position", "center center");
  const clearStyles = () => {
    el.style.removeProperty("transition");
    el.style.removeProperty("background-size");
    el.style.removeProperty("background-position");
    if (el.classList.contains("btn-grad--dark")) {
      el.style.removeProperty("background-image");
      el.style.removeProperty("background-color");
    }
  };
  const finishLeave = () => {
    abortPendingLeave(el);
    clearStyles();
  };
  const onEnd = (ev: TransitionEvent) => {
    if (ev.target !== el) {
      return;
    }
    finishLeave();
  };
  const t = window.setTimeout(finishLeave, TRANSITION_MS);
  pendingLeave.set(el, { timeoutId: t, onEnd });
  el.addEventListener("transitionend", onEnd, { once: true });
}

/**
 * Drives CTA gradient direction: enter from the left = L→R, from the right = R→L.
 * Adds `html.js-directional-grad` so `globals.css` can disable the generic :hover
 * and avoid fighting these inline updates.
 */
export function DirectionalButtonGradientClient() {
  useEffect(() => {
    if (typeof document === "undefined" || !window.matchMedia) {
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let lastX = 0;
    let lastY = 0;
    const onTrack = (e: PointerEvent) => {
      lastX = e.clientX;
      lastY = e.clientY;
    };
    document.addEventListener("pointermove", onTrack, { capture: true, passive: true });

    const root = document.documentElement;
    root.classList.add("js-directional-grad");

    const onPointerOver = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest(SELECTOR) as
        | HTMLElement
        | null;
      if (!t) {
        return;
      }
      const rel = e.relatedTarget;
      if (rel instanceof Node && t.contains(rel)) {
        return;
      }
      const fromLeft = enterFromLeft(e, t.getBoundingClientRect());
      runEnter(t, fromLeft);
    };

    const onPointerOut = (e: PointerEvent) => {
      const t = (e.target as Element | null)?.closest(SELECTOR) as
        | HTMLElement
        | null;
      if (!t) {
        return;
      }
      const rel = e.relatedTarget;
      if (rel instanceof Node && t.contains(rel)) {
        return;
      }
      if (t.matches(":focus-within") && document.hasFocus()) {
        return;
      }
      cancelScheduledPointerLeaveCheck(t);
      const x = e.clientX;
      const y = e.clientY;
      const tId = window.setTimeout(() => {
        scheduledPointerOutCheck.delete(t);
        runLeaveIfNotHovering(t, x, y);
      }, 0);
      scheduledPointerOutCheck.set(t, tId);
    };

    const onFocusIn = (e: FocusEvent) => {
      const t = (e.target as Element | null)?.closest(SELECTOR) as
        | HTMLElement
        | null;
      if (!t) {
        return;
      }
      if (e.relatedTarget && t.contains(e.relatedTarget as Node)) {
        return;
      }
      if (t.hasAttribute("data-grad-anim")) {
        return;
      }
      runEnter(t, true);
    };

    const onFocusOut = (e: FocusEvent) => {
      const t = (e.target as Element | null)?.closest(SELECTOR) as
        | HTMLElement
        | null;
      if (!t) {
        return;
      }
      const rel = e.relatedTarget;
      if (rel instanceof Node && t.contains(rel)) {
        return;
      }
      // If the pointer is still over the control, the gradient was driven by hover — do not
      // runLeave here, or it races with a follow-up re-enter and causes a visible flicker.
      if (t.matches(":hover")) {
        return;
      }
      runLeave(t);
    };

    document.addEventListener("pointerover", onPointerOver, true);
    document.addEventListener("pointerout", onPointerOut, true);
    document.addEventListener("focusin", onFocusIn, true);
    document.addEventListener("focusout", onFocusOut, true);

    return () => {
      document.removeEventListener("pointermove", onTrack, { capture: true });
      root.classList.remove("js-directional-grad");
      document.removeEventListener("pointerover", onPointerOver, true);
      document.removeEventListener("pointerout", onPointerOut, true);
      document.removeEventListener("focusin", onFocusIn, true);
      document.removeEventListener("focusout", onFocusOut, true);
    };
  }, []);

  return null;
}
