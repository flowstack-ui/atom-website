import navigation from "../../content/navigation.json";

export type SectionSlug = "overview" | "guides" | "architecture" | "components" | "utilities";

export type DocumentEntry = {
  slug: string;
  title: string;
  section: SectionSlug;
  sectionTitle: string;
  href: string;
};

export type NavigationSection = {
  slug: SectionSlug;
  title: string;
  documents: Array<{ slug: string; title: string }>;
};

export type DocumentationScope = "guides" | "primitives";

export const navigationSections = navigation.sections as NavigationSection[];

export const allDocuments: DocumentEntry[] = navigationSections.flatMap(
  (section) =>
    section.documents.map((document) => ({
      ...document,
      section: section.slug,
      sectionTitle: section.title,
      href: `/docs/${section.slug}/${document.slug}/`,
    })),
);

export const guideDocuments = allDocuments.filter((document) => document.section !== "components" && document.section !== "utilities");
export const primitiveDocuments = allDocuments.filter((document) => document.section === "components" || document.section === "utilities");

export function documentationScopeFor(entry: DocumentEntry): DocumentationScope {
  return entry.section === "components" || entry.section === "utilities" ? "primitives" : "guides";
}

export function navigationSectionsFor(scope: DocumentationScope) {
  return navigationSections.filter((section) => scope === "primitives"
    ? section.slug === "components" || section.slug === "utilities"
    : section.slug !== "components" && section.slug !== "utilities");
}

export function getDocumentEntry(section: string, slug: string) {
  return allDocuments.find(
    (document) => document.section === section && document.slug === slug,
  );
}
