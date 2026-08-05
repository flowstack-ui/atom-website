"use client";

import { useCallback, useEffect, useState, type ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SiGithub } from "@icons-pack/react-simple-icons";
import { Button } from "@flowstack-ui/brick/button";
import { Dialog } from "@flowstack-ui/brick/dialog";
import { Drawer } from "@flowstack-ui/brick/drawer";
import { NavList } from "@flowstack-ui/brick/nav-list";
import { ArrowRight, ArrowUpRight, BookOpen, Boxes, Home, Menu, Moon, Orbit, Package, Search, ShieldCheck, Sun, X } from "lucide-react";
import { atomVersion } from "@/lib/site";
import { BrandMark } from "./brand-mark";

const navigation = [
  { href: "/docs/", label: "Guides", section: "guides" },
  { href: "/docs/components/", label: "Primitives", section: "primitives" },
  { href: "/docs/overview/accessibility/", label: "Accessibility", section: "accessibility" },
];

const drawerNavigation = [
  { href: "/", label: "Home", description: "Meet the behavioral foundation", icon: Home, section: "home" },
  { href: "/docs/", label: "Guides", description: "Follow the learning path", icon: BookOpen, section: "guides" },
  { href: "/docs/components/", label: "Primitives", description: "Explore 70 public subpaths", icon: Boxes, section: "primitives" },
  { href: "/docs/overview/accessibility/", label: "Accessibility", description: "Semantics across every input", icon: ShieldCheck, section: "accessibility" },
];

type Appearance = "light" | "dark";

function applyAppearance(value: Appearance) {
  document.documentElement.dataset.brickAppearance = value;
  document.documentElement.style.colorScheme = value;
  localStorage.setItem("atom-website-appearance", value);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [SearchContent, setSearchContent] = useState<ComponentType<{ onNavigate?: () => void }> | null>(null);

  const loadSearch = useCallback(() => {
    void import("./site-search").then((module) => setSearchContent(() => module.SiteSearch));
  }, []);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      const target = event.target;
      const editable = target instanceof HTMLElement && (target.isContentEditable || ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName));
      if (!editable && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        loadSearch();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [loadSearch]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1181px)");
    const closeAtDesktop = () => {
      if (media.matches) setDrawerOpen(false);
    };
    closeAtDesktop();
    media.addEventListener("change", closeAtDesktop);
    return () => media.removeEventListener("change", closeAtDesktop);
  }, []);

  function toggleAppearance() {
    const current = document.documentElement.dataset.brickAppearance === "dark" ? "dark" : "light";
    applyAppearance(current === "dark" ? "light" : "dark");
  }

  function navigationIsCurrent(section: string) {
    const currentPath = pathname.endsWith("/") ? pathname : `${pathname}/`;
    if (section === "home") return currentPath === "/";
    if (section === "primitives") return currentPath.startsWith("/docs/components/") || currentPath.startsWith("/docs/utilities/");
    if (section === "accessibility") return currentPath === "/docs/overview/accessibility/";
    return currentPath.startsWith("/docs/") && !currentPath.startsWith("/docs/components/") && !currentPath.startsWith("/docs/utilities/") && currentPath !== "/docs/overview/accessibility/";
  }

  return (
    <header className="site-header">
      <Link className="brand-link" href="/" aria-label={`Atom UI v${atomVersion} home`}>
        <BrandMark />
        <span className="version-pill">v{atomVersion}</span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link key={item.href} className={navigationIsCurrent(item.section) ? "is-current" : undefined} href={item.href}>{item.label}</Link>
        ))}
      </nav>

      <div className="header-actions">
        <Dialog.Root open={searchOpen} onOpenChange={(open) => { if (open) loadSearch(); setSearchOpen(open); }}>
          <Dialog.Trigger asChild>
            <Button
              aria-label="Search documentation"
              aria-keyshortcuts="Meta+K Control+K"
              className="search-trigger"
              size="sm"
              tone="neutral"
              variant="soft"
              onFocus={loadSearch}
              onPointerEnter={loadSearch}
              startIcon={<Search size={15} aria-hidden="true" />}
            >
              Search <kbd className="shortcut" aria-hidden="true">⌘K</kbd>
            </Button>
          </Dialog.Trigger>
          {searchOpen && SearchContent ? <SearchContent /> : null}
        </Dialog.Root>

        <div className="header-icon-actions">
          <Button aria-label="Toggle color appearance" className="square-action" size="sm" tone="neutral" variant="ghost" onPress={toggleAppearance}>
            <span className="appearance-icon appearance-icon--light"><Moon size={17} aria-hidden="true" /></span>
            <span className="appearance-icon appearance-icon--dark"><Sun size={17} aria-hidden="true" /></span>
          </Button>
          <Button aria-label="Atom UI on GitHub" className="square-action github-action" href="https://github.com/flowstack-ui/atom" target="_blank" rel="noreferrer" size="sm" tone="neutral" variant="ghost">
            <SiGithub aria-hidden="true" />
          </Button>
          <Drawer.Root open={drawerOpen} onOpenChange={setDrawerOpen}>
            <Drawer.Trigger asChild>
              <Button aria-label="Open navigation" className="mobile-menu-trigger" size="sm" tone="neutral" variant="ghost"><Menu size={19} aria-hidden="true" /></Button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay />
              <Drawer.Content placement="end" size="md" className="mobile-drawer">
                <Drawer.Header className="mobile-drawer__header">
                  <div className="drawer-brand-row">
                    <Drawer.Close asChild><Link className="drawer-brand" href="/"><BrandMark /><span className="drawer-version">v{atomVersion}</span></Link></Drawer.Close>
                    <Drawer.Close asChild><Button aria-label="Close navigation" className="square-action" size="md" tone="neutral" variant="ghost"><X size={19} aria-hidden="true" /></Button></Drawer.Close>
                  </div>
                  <span className="drawer-kicker">Behavior at the smallest useful unit</span>
                  <Drawer.Title>The accessible foundation beneath finished interfaces.</Drawer.Title>
                  <Drawer.Description>Explore Atom’s primitives, behavioral contracts, and relationship to the rest of Flowstack.</Drawer.Description>
                </Drawer.Header>
                <Drawer.Body className="mobile-drawer__body">
                  <div className="drawer-nav-group">
                    <span className="drawer-nav-label">Explore</span>
                    <NavList.Root aria-label="Mobile navigation" size="lg" tone="accent" variant="soft">
                      <NavList.List>
                        {drawerNavigation.map(({ href, label, description, icon: Icon, section }) => (
                          <NavList.Item key={href}>
                            <Drawer.Close asChild>
                              <NavList.Link active={navigationIsCurrent(section)} description={description} href={href} startIcon={<Icon aria-hidden="true" />}>{label}</NavList.Link>
                            </Drawer.Close>
                          </NavList.Item>
                        ))}
                      </NavList.List>
                    </NavList.Root>
                  </div>
                  <div className="drawer-nav-group drawer-resources">
                    <span className="drawer-nav-label">Resources</span>
                    <NavList.Root aria-label="Atom resources" size="md" tone="neutral" variant="soft">
                      <NavList.List>
                        <NavList.Item><NavList.Link href="https://github.com/flowstack-ui/atom" target="_blank" rel="noreferrer" startIcon={<SiGithub aria-hidden="true" />} endIcon={<ArrowUpRight aria-hidden="true" />}>GitHub repository</NavList.Link></NavList.Item>
                        <NavList.Item><NavList.Link href="https://www.npmjs.com/package/@flowstack-ui/atom" target="_blank" rel="noreferrer" startIcon={<Package aria-hidden="true" />} endIcon={<ArrowUpRight aria-hidden="true" />}>npm package</NavList.Link></NavList.Item>
                        <NavList.Item><NavList.Link href="https://brick-ui.com/" startIcon={<Orbit aria-hidden="true" />} endIcon={<ArrowUpRight aria-hidden="true" />}>Finished with Brick</NavList.Link></NavList.Item>
                      </NavList.List>
                    </NavList.Root>
                  </div>
                </Drawer.Body>
                <Drawer.Footer className="mobile-drawer__footer">
                  <p className="drawer-proof"><span>70 subpaths</span><span>React 18 + 19</span><span>Headless</span></p>
                  <Drawer.Close asChild><Button href="/docs/overview/getting-started/" fullWidth endIcon={<ArrowRight size={17} aria-hidden="true" />}>Get started</Button></Drawer.Close>
                </Drawer.Footer>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>
    </header>
  );
}
