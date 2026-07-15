"use client";

import { useEffect, useState } from "react";
import { NavList } from "@flowstack-ui/atom/nav-list";
import type { DocumentHeading } from "@/lib/documents";

export function OnThisPage({ headings }: { headings: DocumentHeading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");

  useEffect(() => {
    const elements = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-72px 0px -72% 0px" },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);

  if (!headings.length) return null;

  return (
    <aside className="page-toc" aria-label="On this page">
      <p className="toc-title">On this page</p>
      <NavList.Root aria-label="Page sections">
        <NavList.List className="toc-list">
          {headings.map((heading) => (
            <NavList.Item key={heading.id}>
              <NavList.Link
                href={`#${heading.id}`}
                active={active === heading.id}
                current="location"
                className={heading.depth === 3 ? "toc-link toc-link-nested" : "toc-link"}
              >
                {heading.text}
              </NavList.Link>
            </NavList.Item>
          ))}
        </NavList.List>
      </NavList.Root>
    </aside>
  );
}
