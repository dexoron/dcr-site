/**
 * Sync the documentation MDX sources from dexoron/dcr into Astro content.
 *
 * English is the source language and lives in `docs/` of the DCR repository.
 * Translations are expected in `docs-crowdin-export/<locale>/docs/` and are
 * copied only when that directory exists. The Crowdin export must be merged
 * into the DCR branch being synced.
 *
 * Local development prefers a sibling checkout (`../dcr`). When it is not
 * available, the repository is cloned sparsely into `.cache/dcr`.
 *
 * Usage:
 *   npm run docs:sync
 *   DCR_DOCS_DIR=/path/to/dcr/docs npm run docs:sync
 */
import { execFile } from 'node:child_process';
import {
  mkdir,
  readdir,
  readFile,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';

const execFileAsync = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputRoot = join(root, 'src', 'content', 'docs');
const cacheRoot = join(root, '.cache', 'dcr');

const locales = (process.env.DCR_DOCS_LOCALES ?? 'en')
  .split(',')
  .map((locale) => locale.trim())
  .filter(Boolean);

const isFile = async (path: string): Promise<boolean> => {
  try {
    return (await stat(path)).isFile();
  } catch {
    return false;
  }
};

const normalizeSourceDir = async (path: string): Promise<string | null> => {
  if (await isFile(join(path, 'README.mdx'))) return path;
  if (await isFile(join(path, 'docs', 'README.mdx'))) return join(path, 'docs');
  return null;
};

async function resolveSource(): Promise<string | null> {
  const candidates = [
    process.env.DCR_DOCS_DIR,
    resolve(root, '..', 'dcr'),
    resolve(root, '..', 'dcr', 'docs'),
    cacheRoot,
  ].filter((value): value is string => Boolean(value));

  for (const candidate of candidates) {
    const source = await normalizeSourceDir(candidate);
    if (source) return source;
  }

  try {
    console.log('[docs] local DCR checkout not found, cloning docs from GitHub');
    await mkdir(dirname(cacheRoot), { recursive: true });
    await rm(cacheRoot, { recursive: true, force: true });
    await execFileAsync(
      'git',
      [
        'clone',
        '--depth',
        '1',
        '--filter=blob:none',
        '--sparse',
        'https://github.com/dexoron/dcr.git',
        cacheRoot,
      ],
      { timeout: 120_000 },
    );
    await execFileAsync(
      'git',
      [
        '-C',
        cacheRoot,
        'sparse-checkout',
        'set',
        'docs',
        'docs-crowdin-export',
      ],
      { timeout: 60_000 },
    );
    return normalizeSourceDir(cacheRoot);
  } catch (error) {
    console.warn(`[docs] could not download docs: ${String(error)}`);
    return null;
  }
}

async function listMdx(dir: string): Promise<string[]> {
  const result: string[] = [];
  const walk = async (current: string): Promise<void> => {
    for (const entry of await readdir(current, { withFileTypes: true })) {
      const full = join(current, entry.name);
      if (entry.isDirectory()) {
        await walk(full);
      } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
        result.push(full);
      }
    }
  };
  await walk(dir);
  return result.sort();
}

const targetName = (relativePath: string): string => {
  let name = relativePath.replaceAll('\\', '/').replace(/\.mdx$/, '');
  if (name === 'README') name = 'index';
  return `${name}.mdx`;
};

async function copyLocale(
  locale: string,
  sourceDir: string,
  sourceLabel: string,
): Promise<number> {
  const targetDir = join(outputRoot, locale);
  await rm(targetDir, { recursive: true, force: true });
  await mkdir(targetDir, { recursive: true });

  const files = await listMdx(sourceDir);
  let copied = 0;

  for (const file of files) {
    const relativePath = relative(sourceDir, file);
    const target = join(targetDir, targetName(relativePath));
    await mkdir(dirname(target), { recursive: true });

    let content = await readFile(file, 'utf8');
    if (content.charCodeAt(0) === 0xfeff) content = content.slice(1);
    content = content.replaceAll('\r\n', '\n');
    if (!content.endsWith('\n')) content += '\n';

    await writeFile(target, content, 'utf8');
    copied += 1;
  }

  console.log(
    `[docs] ${locale}: ${copied} file(s) from ${sourceLabel} (${relative(root, targetDir)})`,
  );
  return copied;
}

async function main(): Promise<void> {
  const source = await resolveSource();

  if (!source) {
    if (await isFile(join(outputRoot, 'en', 'index.mdx'))) {
      console.warn('[docs] no source available, keeping the committed English docs');
      return;
    }
    throw new Error(
      'No DCR docs source found. Set DCR_DOCS_DIR or run with network access.',
    );
  }

  console.log(`[docs] source: ${source}`);
  let total = 0;

  for (const locale of locales) {
    if (locale === 'en') {
      total += await copyLocale(locale, source, 'docs/');
      continue;
    }

    const translationDir = join(
      source,
      '..',
      'docs-crowdin-export',
      locale,
      'docs',
    );
    const translationSource = await normalizeSourceDir(translationDir);

    if (!translationSource) {
      console.warn(
        `[docs] ${locale}: translations not found in docs-crowdin-export/${locale}/docs, skipping`,
      );
      continue;
    }

    total += await copyLocale(
      locale,
      translationSource,
      `docs-crowdin-export/${locale}/docs/`,
    );
  }

  if (total === 0) {
    throw new Error('No documentation files were copied.');
  }
}

await main();
