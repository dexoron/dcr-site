/**
 * Documentation navigation.
 *
 * The group layout mirrors the Figma docs design: "Introduction" and
 * "Changelog" are direct links, everything else is a collapsible group.
 * Page labels come from the MDX frontmatter (`sidebar_label`), which is
 * translated together with the page.
 */

export interface DocsItem {
  slug: string;
  label: string;
}

export interface DocsGroup {
  id: string;
  label: string;
  /** Direct link groups are rendered without a caret. */
  kind: 'link' | 'group';
  items: DocsItem[];
}

const GROUP_LAYOUT: Array<{
  id: string;
  label: string;
  kind: 'link' | 'group';
  slugs: string[];
}> = [
  { id: 'introduction', label: 'Introduction', kind: 'link', slugs: [''] },
  {
    id: 'getting-started',
    label: 'Getting Started',
    kind: 'group',
    slugs: ['getting-started/installation', 'getting-started/first-steps'],
  },
  {
    id: 'commands',
    label: 'Commands',
    kind: 'group',
    slugs: [
      'commands/project-commands',
      'commands/build-commands',
      'commands/dependency-commands',
      'commands/gen-commands',
      'commands/quality-commands',
      'commands/system-commands',
    ],
  },
  {
    id: 'reference',
    label: 'Reference',
    kind: 'group',
    slugs: [
      'reference/dcr-toml',
      'reference/build-system',
      'reference/build-profiles',
      'reference/dependencies',
      'reference/workspaces',
      'reference/cross-compilation',
      'reference/platform-support',
      'reference/environment-variables',
      'reference/cli-output',
    ],
  },
  {
    id: 'testing',
    label: 'Testing',
    kind: 'group',
    slugs: ['testing/test-framework', 'testing/running-tests'],
  },
  {
    id: 'recipes',
    label: 'Recipes',
    kind: 'group',
    slugs: [
      'recipes/cross-to-windows',
      'recipes/library-project',
      'recipes/multi-package-workspace',
      'recipes/os-flat-bin-archive',
    ],
  },
  {
    id: 'other',
    label: 'Other',
    kind: 'group',
    slugs: [
      'ide-integration',
      'self-update',
      'faq',
      'license',
      'contributing',
    ],
  },
  { id: 'changelog', label: 'Changelog', kind: 'link', slugs: ['changelog'] },
];

export interface DocsEntryMeta {
  slug: string;
  label: string;
}

export function buildDocsNav(entries: DocsEntryMeta[]): DocsGroup[] {
  const bySlug = new Map(entries.map((entry) => [entry.slug, entry]));
  const groups: DocsGroup[] = [];

  for (const layout of GROUP_LAYOUT) {
    const items = layout.slugs
      .filter((slug) => bySlug.has(slug))
      .map((slug) => ({
        slug,
        label: bySlug.get(slug)!.label,
      }));
    if (items.length === 0) continue;
    groups.push({
      id: layout.id,
      label: layout.label,
      kind: layout.kind,
      items,
    });
    for (const item of items) bySlug.delete(item.slug);
  }

  // Any doc that is not covered by the layout is still reachable.
  const leftover = [...bySlug.values()].sort((a, b) => a.label.localeCompare(b.label));
  if (leftover.length > 0) {
    const other = groups.find((group) => group.id === 'other');
    if (other) {
      other.items.push(...leftover);
    } else {
      groups.push({
        id: 'other',
        label: 'Other',
        kind: 'group',
        items: leftover,
      });
    }
  }

  return groups;
}

export function flattenDocsNav(groups: DocsGroup[]): DocsItem[] {
  return groups.flatMap((group) => group.items);
}

export function docsHomePath(locale = 'en'): string {
  const base =
    import.meta.env?.BASE_URL && import.meta.env.BASE_URL !== '/'
      ? import.meta.env.BASE_URL.replace(/\/$/, '')
      : '';
  return locale === 'en' ? `${base}/docs/` : `${base}/docs/${locale}/`;
}

export function docsHref(slug: string, locale = 'en'): string {
  const home = docsHomePath(locale);
  if (!slug) return home;
  return `${home}${slug}/`;
}
