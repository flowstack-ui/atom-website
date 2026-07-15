"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavList } from "@flowstack-ui/atom/nav-list";
import { navigationSections } from "@/lib/docs-manifest";
import { DocsSearch } from "./docs-search";

export function DocsNavigation({
  enableSearchShortcut = false,
  inlineSearch = false,
  onNavigate,
}: {
  enableSearchShortcut?: boolean;
  inlineSearch?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const [searchActive, setSearchActive] = useState(false);

  return (
    <>
      <DocsSearch
        key={inlineSearch ? "inline-search" : "dialog-search"}
        enableShortcut={enableSearchShortcut}
        mode={inlineSearch ? "inline" : "dialog"}
        onActiveChange={inlineSearch ? setSearchActive : undefined}
        onNavigate={onNavigate}
      />
      {searchActive ? null : <NavList.Root aria-label="Atom UI documentation">
        {navigationSections.map((section) => (
        <NavList.Section key={section.slug}>
          <NavList.SectionLabel className="nav-section-label">
            {section.title}
          </NavList.SectionLabel>
          <NavList.SectionContent>
            <NavList.List className="nav-list-items">
              {section.documents.map((document) => {
                const href = `/docs/${section.slug}/${document.slug}/`;
                const active =
                  pathname === href ||
                  (pathname === "/" &&
                    section.slug === "overview" &&
                    document.slug === "introduction");

                return (
                  <NavList.Item key={document.slug}>
                    <NavList.Link asChild active={active} current="page">
                      <Link href={href} onClick={onNavigate}>
                        {document.title}
                      </Link>
                    </NavList.Link>
                  </NavList.Item>
                );
              })}
            </NavList.List>
          </NavList.SectionContent>
        </NavList.Section>
        ))}
      </NavList.Root>}
    </>
  );
}
