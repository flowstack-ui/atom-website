"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { Button } from "@flowstack-ui/atom/button";
import { Combobox, type ComboboxOption } from "@flowstack-ui/atom/combobox";
import { Dialog } from "@flowstack-ui/atom/dialog";
import {
  loadSearchIndex,
  searchDocuments,
  type SearchIndex,
} from "@/lib/search";

const keepRankedOptions = (options: ComboboxOption[]) => options;

function isEditableTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.isContentEditable ||
      ["INPUT", "SELECT", "TEXTAREA"].includes(target.tagName))
  );
}

export function DocsSearch({
  enableShortcut = false,
  onNavigate,
}: {
  enableShortcut?: boolean;
  onNavigate?: () => void;
}) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState<SearchIndex | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadError, setLoadError] = useState(false);

  const openSearch = useCallback(() => {
    setDialogOpen(true);
    if (index || loading) return;
    setLoading(true);
    setLoadError(false);
    loadSearchIndex()
      .then(setIndex)
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, [index, loading]);

  useEffect(() => {
    if (!enableShortcut) return;

    function handleKeyDown(event: KeyboardEvent) {
      const opensSearch =
        event.key === "/" ||
        (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey));
      if (!opensSearch || isEditableTarget(event.target)) return;
      event.preventDefault();
      openSearch();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [enableShortcut, openSearch]);

  const results = useMemo(
    () => (index ? searchDocuments(index, query) : []),
    [index, query],
  );
  const options = useMemo(
    () =>
      results.map((result) => ({
        value: result.id,
        label: result.heading
          ? `${result.title}: ${result.heading}`
          : result.title,
      })),
    [results],
  );

  function handleDialogOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      openSearch();
    } else {
      setDialogOpen(false);
      setQuery("");
    }
  }

  function handleSelection(value: string | null) {
    const result = results.find((entry) => entry.id === value);
    if (!result) return;
    setDialogOpen(false);
    setQuery("");
    onNavigate?.();
    router.push(result.url);
  }

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={handleDialogOpenChange}>
      <Dialog.Trigger
        className="search-trigger"
        aria-label="Search documentation"
        onPointerUp={(event) => {
          if (event.pointerType === "mouse") return;
          event.preventDefault();
          openSearch();
        }}
      >
        <Search aria-hidden="true" />
        <span>Search docs</span>
        <kbd aria-hidden="true">/</kbd>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="search-overlay" />
        <Dialog.Content className="search-dialog">
          <Dialog.Title className="sr-only">
            Search Atom UI documentation
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Search overview pages, guides, components, and utilities.
          </Dialog.Description>
          <Combobox.Root
            options={options}
            value={null}
            inputValue={query}
            onInputValueChange={setQuery}
            onValueChange={handleSelection}
            filterOptions={keepRankedOptions}
            openOnFocus={false}
            clearOnSelect
            loading={loading && Boolean(query.trim())}
            noOptionsText={loadError ? "Search is unavailable." : "No results found."}
          >
            <div className="search-input-row">
              <Search aria-hidden="true" className="search-input-icon" />
              <Combobox.Input
                ref={inputRef}
                autoFocus
                className="search-input"
                placeholder="Search docs"
                aria-label="Search documentation"
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    setDialogOpen(false);
                  }
                }}
              />
              {query ? (
                <Button.Root
                  className="search-clear"
                  aria-label="Clear search"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                >
                  <X aria-hidden="true" />
                </Button.Root>
              ) : (
                <Dialog.Close className="search-close" aria-label="Close search">
                  <X aria-hidden="true" />
                </Dialog.Close>
              )}
            </div>
            {query.trim() ? (
              <Combobox.Portal disabled>
                <Combobox.Content className="search-results" sideOffset={8}>
                  <Combobox.Listbox className="search-results-list">
                    <Combobox.Loading className="search-status">
                      Searching documentation…
                    </Combobox.Loading>
                    <Combobox.Empty className="search-status" />
                    {results.map((result) => (
                      <Combobox.Item
                        key={result.id}
                        value={result.id}
                        label={result.heading || result.title}
                        className="search-result"
                      >
                        <span className="search-result-context">
                          {result.section} · {result.title}
                        </span>
                        <span className="search-result-title">
                          {result.heading || result.title}
                        </span>
                        {result.excerpt ? (
                          <span className="search-result-excerpt">{result.excerpt}</span>
                        ) : null}
                      </Combobox.Item>
                    ))}
                  </Combobox.Listbox>
                </Combobox.Content>
              </Combobox.Portal>
            ) : null}
          </Combobox.Root>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
