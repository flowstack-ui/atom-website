"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavList } from "@flowstack-ui/atom/nav-list";
import { navigationSections } from "@/lib/docs-manifest";
import { DocsSearch } from "./docs-search";

export function DocsNavigation({
  enableSearchShortcut = false,
  onNavigate,
}: {
  enableSearchShortcut?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      <DocsSearch
        enableShortcut={enableSearchShortcut}
        onNavigate={onNavigate}
      />
      <NavList.Root aria-label="Atom UI documentation">
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
      </NavList.Root>
    </>
  );
}
