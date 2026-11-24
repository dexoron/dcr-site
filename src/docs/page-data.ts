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

export function docsSlugFromId(id: string, locale: string): string {
  const withoutLocale = id === locale ? '' : id.replace(new RegExp(`^${locale}/`), '');
  return withoutLocale === 'index' ? '' : withoutLocale;
}

export async function loadDocsPages(locale = 'en'): Promise<DocsPageData[]> {
  const entries = await getCollection('docs', ({ id }) =>
    id === locale || id.startsWith(`${locale}/`),
  );

  const meta = entries.map((entry) => ({
    entry,
    slug: docsSlugFromId(entry.id, locale),
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

export async function loadDocsPage(
  slug: string,
  locale = 'en',
): Promise<DocsPageData | undefined> {
  const pages = await loadDocsPages(locale);
  return pages.find((page) => page.slug === slug);
}

export async function loadAllDocsPages(): Promise<DocsPageData[]> {
  const entries = await getCollection('docs');
  const locales = [...new Set(entries.map((entry) => entry.id.split('/')[0]))];
  const pages = await Promise.all(locales.map((locale) => loadDocsPages(locale)));
  return pages.flat();
}
