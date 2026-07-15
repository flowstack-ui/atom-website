import navigation from "../../content/navigation.json";

export type SectionSlug = "overview" | "guides" | "components" | "utilities";

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

export function getDocumentEntry(section: string, slug: string) {
  return allDocuments.find(
    (document) => document.section === section && document.slug === slug,
  );
}
