import MiniSearch, { type SearchResult } from "minisearch";

export type SearchRecord = {
  id: string;
  kind: "page" | "heading";
  url: string;
  section: string;
  title: string;
  heading: string;
  excerpt: string;
  text: string;
};

export type SearchIndex = MiniSearch<SearchRecord>;
export type DocumentSearchResult = SearchRecord & { score: number };

let searchIndexPromise: Promise<SearchIndex> | null = null;

export function loadSearchIndex() {
  if (!searchIndexPromise) {
    searchIndexPromise = fetch("/search-index.json")
      .then((response) => {
        if (!response.ok) throw new Error(`Search index returned ${response.status}`);
        return response.json() as Promise<SearchRecord[]>;
      })
      .then((records) => {
        const index = new MiniSearch<SearchRecord>({
          fields: ["title", "heading", "text"],
          storeFields: [
            "id",
            "kind",
            "url",
            "section",
            "title",
            "heading",
            "excerpt",
            "text",
          ],
          searchOptions: {
            boost: { title: 8, heading: 5, text: 1 },
            combineWith: "AND",
            fuzzy: 0.2,
            prefix: true,
          },
        });
        index.addAll(records);
        return index;
      })
      .catch((error) => {
        searchIndexPromise = null;
        throw error;
      });
  }

  return searchIndexPromise;
}

function resultTier(result: SearchRecord, query: string) {
  const normalized = query.trim().toLowerCase();
  const title = result.title.toLowerCase();
  const heading = result.heading.toLowerCase();

  if (result.kind === "page" && title === normalized) return 5;
  if (title === normalized) return 4;
  if (result.kind === "page" && title.startsWith(normalized)) return 3;
  if (heading === normalized || heading.startsWith(normalized)) return 2;
  return 1;
}

export function searchDocuments(index: SearchIndex, query: string) {
  const value = query.trim();
  if (!value) return [];

  return index
    .search(value)
    .map((result: SearchResult) => result as SearchResult & SearchRecord)
    .sort(
      (a, b) =>
        resultTier(b, value) - resultTier(a, value) || b.score - a.score,
    )
    .slice(0, 24)
    .map((result) => ({
      id: result.id,
      kind: result.kind,
      url: result.url,
      section: result.section,
      title: result.title,
      heading: result.heading,
      excerpt: result.excerpt,
      text: result.text,
      score: result.score,
    })) as DocumentSearchResult[];
}
