"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@flowstack-ui/atom/button";
import { Drawer } from "@flowstack-ui/atom/drawer";
import { DocsNavigation } from "./docs-navigation";

export function MobileNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <Drawer.Root open={open} onOpenChange={setOpen}>
      <Drawer.Trigger
        className="icon-button mobile-menu-button"
        aria-label="Open navigation"
      >
        <Menu aria-hidden="true" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="drawer-overlay" />
        <Drawer.Content className="drawer-content" placement="left">
          <div className="drawer-header">
            <Drawer.Title>Documentation navigation</Drawer.Title>
            <Drawer.Description className="sr-only">
              Browse Atom UI overview, guides, components, and utilities.
            </Drawer.Description>
            <Drawer.Close asChild>
              <Button.Root className="icon-button" aria-label="Close navigation">
                <X aria-hidden="true" />
              </Button.Root>
            </Drawer.Close>
          </div>
          <div className="drawer-scroll">
            <DocsNavigation onNavigate={() => setOpen(false)} />
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
