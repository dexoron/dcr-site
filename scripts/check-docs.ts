/**
 * Validate the documentation navigation in `src/docs/nav.ts` against the
 * generated MDX content. Fails when a configured slug has no page, when a page
 * is missing from the navigation, or when the introduction route is missing.
 */
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const docsRoot = join(here, '..', 'src', 'content', 'docs');
const locale = 'en';

const errors: string[] = [];

const readSlugs = (): Map<string, string> => {
  const ids = new Map<string, string>();
  const dir = join(docsRoot, locale);

  const walk = (current: string, prefix: string): void => {
    for (const entry of readdirSync(current, { withFileTypes: true })) {
      const full = join(current, entry.name);
      const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        walk(full, rel);
      } else if (entry.name.endsWith('.mdx')) {
        const slug = rel.replace(/\.mdx$/, '');
        ids.set(slug === 'index' ? '' : slug, rel);
      }
    }
  };

  try {
    walk(dir, '');
  } catch {
    errors.push(`missing content directory src/content/docs/${locale}`);
  }

  return ids;
};

const slugs = readSlugs();

const navSource = readFileSync(join(here, '..', 'src', 'docs', 'nav.ts'), 'utf8');
const layoutMatch = navSource.match(/GROUP_LAYOUT[\s\S]*?\n\];/);
if (!layoutMatch) {
  console.error('Could not find GROUP_LAYOUT in src/docs/nav.ts');
  process.exit(1);
}

const slugList = layoutMatch[0].match(/slugs:\s*\[[^\]]*\]/g) ?? [];
const configured = slugList.flatMap((list) =>
  [...list.matchAll(/'([^']*)'/g)].map((match) => match[1]),
);
const configuredSet = new Set(configured);

if (!slugs.has('')) errors.push('missing introduction page (en/index.mdx)');

for (const slug of configuredSet) {
  if (!slugs.has(slug)) {
    errors.push(
      `navigation references "${slug || '/'}" but there is no src/content/docs/en page for it`,
    );
  }
}

for (const slug of slugs.keys()) {
  if (!configuredSet.has(slug)) {
    errors.push(`page "${slug || '/'}" is not reachable from the navigation`);
  }
}

if (errors.length) {
  console.error(`docs nav check failed (${errors.length}):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`docs nav check passed: ${slugs.size} pages match the navigation.`);
