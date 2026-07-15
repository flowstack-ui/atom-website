"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@flowstack-ui/atom/button";

type Theme = "light" | "dark";

function subscribe(callback: () => void) {
  window.addEventListener("atom-theme-change", callback);
  return () => window.removeEventListener("atom-theme-change", callback);
}

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getThemeSnapshot, () => "light");

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem("atom-ui-theme", next);
    } catch {
      // The theme still works when a browser blocks preference storage.
    }
    window.dispatchEvent(new Event("atom-theme-change"));
  }

  const label = theme === "dark" ? "Use light theme" : "Use dark theme";

  return (
    <Button.Root
      className="icon-button"
      aria-label={label}
      title={label}
      onClick={toggleTheme}
    >
      {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button.Root>
  );
}
