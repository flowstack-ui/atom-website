"use client";

import { SiGithub } from "@icons-pack/react-simple-icons";
import { AppBar } from "@flowstack-ui/atom/app-bar";
import { Button } from "@flowstack-ui/atom/button";
import { Tooltip } from "@flowstack-ui/atom/tooltip";
import { MobileNavigation } from "./mobile-navigation";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  return (
    <AppBar.Root className="site-header" position="sticky">
      <AppBar.Toolbar className="site-header-inner" density="compact">
        <AppBar.Start className="site-header-start">
          <Button.Root
            href="/"
            className="brand-link"
            aria-label="Atom UI documentation home"
          >
            <span className="brand-mark" aria-hidden="true">A</span>
            <span>Atom UI</span>
          </Button.Root>
        </AppBar.Start>
        <AppBar.End className="site-header-actions">
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <Button.Root
                className="icon-button github-button"
                href="https://github.com/flowstack-ui/atom"
                target="_blank"
                aria-label="Atom UI on GitHub"
              >
                <SiGithub aria-hidden="true" />
              </Button.Root>
            </Tooltip.Trigger>
            <Tooltip.Portal>
              <Tooltip.Content className="site-tooltip" side="bottom" sideOffset={8}>
                GitHub
              </Tooltip.Content>
            </Tooltip.Portal>
          </Tooltip.Root>
          <ThemeToggle />
          <MobileNavigation />
        </AppBar.End>
      </AppBar.Toolbar>
    </AppBar.Root>
  );
}
