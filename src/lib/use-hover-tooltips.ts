"use client";

import { useSyncExternalStore } from "react";

const hoverQuery = "(hover: hover) and (pointer: fine)";

function subscribe(callback: () => void) {
  const media = window.matchMedia(hoverQuery);
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(hoverQuery).matches;
}

export function useHoverTooltips() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
