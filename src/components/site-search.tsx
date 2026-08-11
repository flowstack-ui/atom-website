"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@flowstack-ui/brick/badge";
import { Button } from "@flowstack-ui/brick/button";
import { Dialog } from "@flowstack-ui/brick/dialog";
import { Input } from "@flowstack-ui/brick/input";
import { ArrowRight, BookOpen, Orbit, Search, X } from "lucide-react";
import { loadSearchIndex, searchDocuments, type SearchIndex } from "@/lib/search";
import { primitiveCount } from "@/lib/docs-manifest";

export function SiteSearch({ onNavigate }: { onNavigate?: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    loadSearchIndex()
      .then((value) => active && setIndex(value))
      .catch(() => active && setFailed(true))
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
  }, []);

  const results = useMemo(
    () => (index && query.trim() ? searchDocuments(index, query).slice(0, 10) : []),
    [index, query],
  );

  function navigate(url: string) {
    onNavigate?.();
    router.push(url);
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content className="search-dialog" size="lg" initialFocus={inputRef}>
        <Dialog.Header className="search-dialog__header">
          <div className="search-dialog__heading">
            <span className="search-dialog__symbol"><Search size={18} aria-hidden="true" /></span>
            <div>
              <Dialog.Title>Search Atom</Dialog.Title>
              <Dialog.Description>Find primitives, guides, APIs, and behavior contracts.</Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button aria-label="Close search" className="square-action" size="sm" tone="neutral" variant="ghost">
                <X size={18} aria-hidden="true" />
              </Button>
            </Dialog.Close>
          </div>
          <Input
            ref={inputRef}
            id="atom-site-search"
            name="atom-site-search"
            type="search"
            autoComplete="off"
            value={query}
            onChange={(event) => setQuery(event.currentTarget.value)}
            placeholder={`Search ${primitiveCount} public subpaths…`}
            startAdornment={<Search size={16} aria-hidden="true" />}
            clearable
            onClear={() => setQuery("")}
          />
        </Dialog.Header>
        <Dialog.Body className="search-dialog__body">
          <div className="search-results" aria-live="polite">
            {!query.trim() ? (
              <div className="search-empty">
                <span><Orbit size={20} aria-hidden="true" /></span>
                <strong>Search the behavioral foundation.</strong>
                <small>Try “Dialog focus”, “keyboard”, “controlled state”, or a primitive name.</small>
              </div>
            ) : loading ? (
              <div className="search-empty"><strong>Preparing the index…</strong></div>
            ) : failed ? (
              <div className="search-empty"><strong>Search is unavailable.</strong><small>Use the documentation navigation while the index reloads.</small></div>
            ) : results.length === 0 ? (
              <div className="search-empty">
                <span><Search size={20} aria-hidden="true" /></span>
                <strong>No particles found.</strong>
                <small>Try a primitive name or a broader behavior such as focus, touch, or state.</small>
              </div>
            ) : (
              <section aria-labelledby="search-results-label">
                <div className="search-results__label">
                  <span id="search-results-label">Results</span><small>{results.length}</small>
                </div>
                <div className="search-results__list">
                  {results.map((result) => (
                    <Dialog.Close asChild key={result.id}>
                      <button className="search-result" type="button" onClick={() => navigate(result.url)}>
                        <span className="search-result__icon">
                          {result.section === "Components" ? <Orbit size={16} aria-hidden="true" /> : <BookOpen size={16} aria-hidden="true" />}
                        </span>
                        <span className="search-result__copy">
                          <strong>{result.heading || result.title}</strong>
                          <small>{result.heading ? `${result.title} · ${result.section}` : result.excerpt}</small>
                        </span>
                        <span className="search-result__meta">
                          <Badge size="sm" tone="neutral" variant="soft">{result.section}</Badge>
                          <ArrowRight size={15} aria-hidden="true" />
                        </span>
                      </button>
                    </Dialog.Close>
                  ))}
                </div>
              </section>
            )}
          </div>
        </Dialog.Body>
        <Dialog.Footer className="search-dialog__footer">
          <span>Local, static, and private</span>
          <span className="search-shortcut"><kbd>Esc</kbd> to close</span>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Portal>
  );
}
