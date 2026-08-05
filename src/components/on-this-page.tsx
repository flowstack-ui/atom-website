"use client";

import { useEffect, useState } from "react";
import { NavList } from "@flowstack-ui/brick/nav-list";
import type { DocumentHeading } from "@/lib/documents";

export function OnThisPage({ headings }: { headings: DocumentHeading[] }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      let next = "";
      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element && element.getBoundingClientRect().top <= 120) next = heading.id;
        else if (element) break;
      }
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) next = headings.at(-1)?.id ?? next;
      setActive(next);
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    window.addEventListener("hashchange", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.removeEventListener("hashchange", schedule);
    };
  }, [headings]);

  if (!headings.length) return null;

  return (
    <NavList.Root aria-label="Sections on this page" className="toc-nav" size="sm" tone="accent" variant="soft">
      <NavList.List>
        {headings.map((heading) => (
          <NavList.Item key={heading.id}>
            <NavList.Link href={`#${heading.id}`} active={active === heading.id} current="location" className={heading.depth === 3 ? "toc-link toc-link--nested" : "toc-link"}>{heading.text}</NavList.Link>
          </NavList.Item>
        ))}
      </NavList.List>
    </NavList.Root>
  );
}
