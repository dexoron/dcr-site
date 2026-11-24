import { getCollection, type CollectionEntry } from 'astro:content';
import { buildDocsNav, flattenDocsNav } from './nav';

export type DocsEntry = CollectionEntry<'docs'>;

export interface DocsPageData {
  entry: DocsEntry;
  slug: string;
  label: string;
  groups: ReturnType<typeof buildDocsNav>;
  prev: ReturnType<typeof flattenDocsNav>[number] | null;
  next: ReturnType<typeof flattenDocsNav>[number] | null;
}

const LOCALE = 'en';

export function docsSlugFromId(id: string): string {
  const withoutLocale = id === LOCALE ? '' : id.replace(/^en\//, '');
  return withoutLocale === 'index' ? '' : withoutLocale;
}

export async function loadDocsPages(): Promise<DocsPageData[]> {
  const entries = await getCollection('docs', ({ id }) =>
    id === LOCALE || id.startsWith(`${LOCALE}/`),
  );

  const meta = entries.map((entry) => ({
    entry,
    slug: docsSlugFromId(entry.id),
    label: entry.data.sidebar_label,
  }));

  const groups = buildDocsNav(
    meta.map(({ slug, label }) => ({ slug, label })),
  );
  const flat = flattenDocsNav(groups);

  return meta
    .filter(({ slug }) => flat.some((item) => item.slug === slug))
    .map(({ entry, slug, label }) => {
      const index = flat.findIndex((item) => item.slug === slug);
      return {
        entry,
        slug,
        label,
        groups,
        prev: index > 0 ? flat[index - 1] : null,
        next: index >= 0 && index < flat.length - 1 ? flat[index + 1] : null,
      };
    })
    .sort(
      (a, b) =>
        flat.findIndex((item) => item.slug === a.slug) -
        flat.findIndex((item) => item.slug === b.slug),
    );
}

export async function loadDocsPage(slug: string): Promise<DocsPageData | undefined> {
  const pages = await loadDocsPages();
  return pages.find((page) => page.slug === slug);
}
