type ScrollSubscriber = () => void;

const subscribers = new Set<ScrollSubscriber>();
let rafId: number | null = null;
let listening = false;

function notifySubscribers() {
  rafId = null;
  subscribers.forEach((callback) => callback());
}

function scheduleNotify() {
  if (rafId !== null) return;
  rafId = window.requestAnimationFrame(notifySubscribers);
}

function onScrollOrResize() {
  scheduleNotify();
}

function startListening() {
  if (listening) return;
  listening = true;
  window.addEventListener("scroll", onScrollOrResize, { passive: true });
  window.addEventListener("resize", onScrollOrResize, { passive: true });
}

function stopListening() {
  if (!listening) return;
  listening = false;
  window.removeEventListener("scroll", onScrollOrResize);
  window.removeEventListener("resize", onScrollOrResize);
  if (rafId !== null) {
    window.cancelAnimationFrame(rafId);
    rafId = null;
  }
}

export function subscribeToScroll(callback: ScrollSubscriber) {
  subscribers.add(callback);
  startListening();
  scheduleNotify();

  return () => {
    subscribers.delete(callback);
    if (subscribers.size === 0) {
      stopListening();
    }
  };
}

export function clamp(value: number, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

export function getVisibilityProgress(
  rect: DOMRect,
  viewportHeight: number,
  start = 0.9,
  end = 0.1,
) {
  const startPx = viewportHeight * start;
  const endPx = viewportHeight * end;
  const totalDistance = rect.height + startPx - endPx;
  if (totalDistance <= 0) return 0;
  const travelled = startPx - rect.top;
  return clamp(travelled / totalDistance, 0, 1);
}
