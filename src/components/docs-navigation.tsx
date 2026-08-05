"use client";

import { useId, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accordion } from "@flowstack-ui/brick/accordion";
import { Input } from "@flowstack-ui/brick/input";
import { NavList } from "@flowstack-ui/brick/nav-list";
import { Search } from "lucide-react";
import { navigationSectionsFor, primitiveDocuments, type DocumentationScope } from "@/lib/docs-manifest";
import { primitiveCategories, primitiveCategoryFor } from "@/lib/primitive-categories";

function PrimitiveNavigation({ onNavigate, pathname }: { onNavigate?: () => void; pathname: string }) {
  const inputId = useId();
  const [query, setQuery] = useState("");
  const normalized = query.trim().toLowerCase();
  const current = primitiveDocuments.find((document) => pathname === document.href);
  const currentCategory = current ? primitiveCategoryFor(current.slug).id : undefined;
  const matches = useMemo(() => primitiveDocuments.filter((document) => !normalized || `${document.title} ${primitiveCategoryFor(document.slug).label}`.toLowerCase().includes(normalized)), [normalized]);

  return (
    <nav className="primitive-nav" aria-label="Atom documentation">
      <div className="primitive-nav__heading"><span>Browse primitives</span><small>{primitiveDocuments.length} total</small></div>
      <Input
        autoComplete="off"
        clearable
        id={inputId}
        name={`primitive-navigation-${inputId.replaceAll(":", "")}`}
        onChange={(event) => setQuery(event.currentTarget.value)}
        onClear={() => setQuery("")}
        placeholder="Find a primitive…"
        size="sm"
        startAdornment={<Search size={15} aria-hidden="true" />}
        type="search"
        value={query}
      />
      {normalized ? (
        <div className="primitive-nav__results" aria-live="polite">
          <span>{matches.length} {matches.length === 1 ? "match" : "matches"}</span>
          {matches.map((document) => <Link aria-current={document.href === pathname ? "page" : undefined} className={document.href === pathname ? "is-current" : undefined} href={document.href} key={document.href} onClick={onNavigate}>{document.title}<small>{primitiveCategoryFor(document.slug).label}</small></Link>)}
          {matches.length === 0 ? <p>No primitive matches “{query}”.</p> : null}
        </div>
      ) : (
        <Accordion.Root className="primitive-nav__groups" defaultValue={currentCategory ? [currentCategory] : []} key={currentCategory ?? "catalog"} size="sm" type="multiple" variant="plain">
          {primitiveCategories.map((category) => {
            const documents = primitiveDocuments.filter((document) => primitiveCategoryFor(document.slug).id === category.id);
            return (
              <Accordion.Item key={category.id} value={category.id}>
                <Accordion.Header as="h2">
                  <Accordion.Trigger><span><span>{category.label}</span><small>{documents.length}</small></span><Accordion.Indicator /></Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content landmark={false}>
                  <Accordion.ContentInner>
                    {documents.map((document) => <Link aria-current={document.href === pathname ? "page" : undefined} className={document.href === pathname ? "is-current" : undefined} href={document.href} key={document.href} onClick={onNavigate}>{document.title}</Link>)}
                  </Accordion.ContentInner>
                </Accordion.Content>
              </Accordion.Item>
            );
          })}
        </Accordion.Root>
      )}
    </nav>
  );
}

export function DocsNavigation({ onNavigate, scope }: { onNavigate?: () => void; scope: DocumentationScope }) {
  const pathname = usePathname();
  if (scope === "primitives") return <PrimitiveNavigation onNavigate={onNavigate} pathname={pathname} />;
  const sections = navigationSectionsFor(scope);

  return (
    <NavList.Root aria-label="Atom documentation" className="docs-nav" size="md" tone="accent" variant="soft">
      {sections.map((section) => (
        <NavList.Section key={section.slug}>
          <NavList.SectionLabel className="docs-nav__label">{section.title}</NavList.SectionLabel>
          <NavList.SectionContent>
            <NavList.List>
              {section.documents.map((document) => {
                const href = `/docs/${section.slug}/${document.slug}/`;
                return (
                  <NavList.Item key={document.slug}>
                    <NavList.Link asChild active={pathname === href} current="page">
                      <Link href={href} onClick={onNavigate}>{document.title}</Link>
                    </NavList.Link>
                  </NavList.Item>
                );
              })}
            </NavList.List>
          </NavList.SectionContent>
        </NavList.Section>
      ))}
    </NavList.Root>
  );
}
