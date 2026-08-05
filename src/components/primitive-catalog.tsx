"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Badge } from "@flowstack-ui/brick/badge";
import { Button } from "@flowstack-ui/brick/button";
import { Card } from "@flowstack-ui/brick/card";
import { Input } from "@flowstack-ui/brick/input";
import { ArrowRight, Database, LayoutGrid, MousePointer2, Navigation, Orbit, Search, SlidersHorizontal, Sparkles, Wrench } from "lucide-react";
import { primitiveCategories, primitiveCategoryFor } from "@/lib/primitive-categories";

export type PrimitiveSummary = { slug: string; title: string; description: string; href: string };

const categoryIcons = { actions: MousePointer2, selection: SlidersHorizontal, navigation: Navigation, overlays: Sparkles, collections: Database, structure: LayoutGrid, utilities: Wrench } as const;

export function PrimitiveCatalog({ primitives }: { primitives: PrimitiveSummary[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const results = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return primitives.filter((primitive) => {
      const matchesQuery = !normalized || `${primitive.title} ${primitive.description}`.toLowerCase().includes(normalized);
      const matchesCategory = category === "all" || primitiveCategoryFor(primitive.slug).id === category;
      return matchesQuery && matchesCategory;
    });
  }, [category, primitives, query]);

  return (
    <div className="catalog-browser">
      <div className="catalog-browser__controls">
        <Input id="primitive-search" name="primitive-search" type="search" value={query} onChange={(event) => setQuery(event.currentTarget.value)} placeholder="Search primitives…" startAdornment={<Search size={16} aria-hidden="true" />} clearable onClear={() => setQuery("")} />
        <div className="catalog-filters" aria-label="Primitive categories">
          <Button size="sm" tone={category === "all" ? "accent" : "neutral"} variant={category === "all" ? "soft" : "ghost"} onPress={() => setCategory("all")}>All</Button>
          {primitiveCategories.map((definition) => <Button key={definition.id} size="sm" tone={category === definition.id ? "accent" : "neutral"} variant={category === definition.id ? "soft" : "ghost"} onPress={() => setCategory(definition.id)}>{definition.label}</Button>)}
        </div>
      </div>
      <div className="catalog-browser__heading"><span><strong>{results.length}</strong> primitives</span><small>{query || category !== "all" ? "Filtered locally" : "Complete public catalog"}</small></div>
      {results.length ? (
        <div className="primitive-groups">
          {primitiveCategories.map((definition) => {
            const categoryPrimitives = results.filter((primitive) => primitiveCategoryFor(primitive.slug).id === definition.id);
            if (!categoryPrimitives.length) return null;
            const Icon = categoryIcons[definition.id];
            return <section className="primitive-group" id={`primitive-category-${definition.id}`} key={definition.id}>
              <div className="primitive-group__heading"><div><span className="primitive-group__icon"><Icon size={17} aria-hidden="true" /></span><h2>{definition.label}</h2></div><Badge size="sm" tone="neutral" variant="outline">{categoryPrimitives.length}</Badge></div>
              <div className="primitive-grid">
                {categoryPrimitives.map((primitive) => (
                  <Card.Root key={primitive.slug} as="article" className="primitive-card" size="sm" variant="outline">
                    <Card.Header><Card.Title as="h3">{primitive.title}</Card.Title><Card.Action><Badge size="sm" tone="neutral" variant="soft">{definition.label}</Badge></Card.Action></Card.Header>
                    <Card.Content><p>{primitive.description}</p></Card.Content>
                    <Card.Footer><Link href={primitive.href}>View primitive <ArrowRight size={14} aria-hidden="true" /></Link></Card.Footer>
                  </Card.Root>
                ))}
              </div>
            </section>;
          })}
        </div>
      ) : (
        <div className="catalog-empty"><span><Orbit size={22} aria-hidden="true" /></span><div><strong>No primitives match.</strong><p>Try another name or return to the complete catalog.</p></div><Button tone="neutral" variant="soft" onPress={() => { setQuery(""); setCategory("all"); }}>Clear filters</Button></div>
      )}
    </div>
  );
}
