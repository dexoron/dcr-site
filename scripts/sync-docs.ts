/**
 * Sync the documentation MDX sources from dexoron/dcr into Astro content.
 *
 * English docs come from the DCR `master` branch. Crowdin publishes translated
 * MDX files under `docs-crowdin-export/<locale>/docs/` on `l10n_master`.
 *
 * An explicit DCR_DOCS_DIR always wins. A sibling checkout is used only when
 * it is on the expected branch; otherwise the required branch is cloned into
 * separate sparse caches.
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
const siblingRoot = resolve(root, '..', 'dcr');
const sourceCacheRoot = join(root, '.cache', 'dcr-source');
const translationsCacheRoot = join(root, '.cache', 'dcr-translations');
const locales = (process.env.DCR_DOCS_LOCALES ?? 'en,ru-RU')
  .split(',')
  .map((locale) => locale.trim())
  .filter(Boolean);
const sourceBranch = process.env.DCR_DOCS_SOURCE_BRANCH ?? 'master';
const translationsBranch = process.env.DCR_DOCS_TRANSLATION_BRANCH ?? 'l10n_master';

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
  if (process.env.DCR_DOCS_DIR) {
    return normalizeSourceDir(process.env.DCR_DOCS_DIR);
  }

  const siblingBranch = await getBranchName(siblingRoot);
  if (siblingBranch === sourceBranch) {
    const source = await normalizeSourceDir(siblingRoot);
    if (source) return source;
  }

  const cached = await normalizeSourceDir(sourceCacheRoot);
  if (cached) return cached;

  try {
    console.log(`[docs] fetching English source from DCR ${sourceBranch}`);
    await mkdir(dirname(sourceCacheRoot), { recursive: true });
    await rm(sourceCacheRoot, { recursive: true, force: true });
    await execFileAsync(
      'git',
      [
        'clone',
        '--depth',
        '1',
        '--branch',
        sourceBranch,
        '--filter=blob:none',
        '--sparse',
        'https://github.com/dexoron/dcr.git',
        sourceCacheRoot,
      ],
      { timeout: 120_000 },
    );
    await execFileAsync(
      'git',
      [
        '-C',
        sourceCacheRoot,
        'sparse-checkout',
        'set',
        'docs',
      ],
      { timeout: 60_000 },
    );
    return normalizeSourceDir(sourceCacheRoot);
  } catch (error) {
    console.warn(`[docs] could not download English source: ${String(error)}`);
    return null;
  }
}

async function getBranchName(repository: string): Promise<string | null> {
  try {
    const { stdout } = await execFileAsync(
      'git',
      ['-C', repository, 'branch', '--show-current'],
      { timeout: 10_000 },
    );
    return stdout.trim() || null;
  } catch {
    return null;
  }
}

async function resolveTranslationsRoot(): Promise<string | null> {
  if (process.env.DCR_DOCS_TRANSLATIONS_DIR) {
    return process.env.DCR_DOCS_TRANSLATIONS_DIR;
  }

  const siblingBranch = await getBranchName(siblingRoot);
  if (siblingBranch === translationsBranch) {
    const siblingTranslations = join(siblingRoot, 'docs-crowdin-export');
    if (await isFile(join(siblingTranslations, 'ru-RU', 'docs', 'README.mdx'))) {
      return siblingTranslations;
    }
  }

  const cachedTranslations = join(translationsCacheRoot, 'docs-crowdin-export');
  if (await isFile(join(cachedTranslations, 'ru-RU', 'docs', 'README.mdx'))) {
    return cachedTranslations;
  }

  try {
    console.log(`[docs] fetching Crowdin exports from DCR ${translationsBranch}`);
    await mkdir(dirname(translationsCacheRoot), { recursive: true });
    await rm(translationsCacheRoot, { recursive: true, force: true });
    await execFileAsync(
      'git',
      [
        'clone',
        '--depth',
        '1',
        '--branch',
        translationsBranch,
        '--filter=blob:none',
        '--sparse',
        'https://github.com/dexoron/dcr.git',
        translationsCacheRoot,
      ],
      { timeout: 120_000 },
    );
    await execFileAsync(
      'git',
      ['-C', translationsCacheRoot, 'sparse-checkout', 'set', 'docs-crowdin-export'],
      { timeout: 60_000 },
    );
    return cachedTranslations;
  } catch (error) {
    console.warn(`[docs] could not download Crowdin exports: ${String(error)}`);
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
  let name = relativePath.replaceAll('\\', '/').replace(/(?:\.mdx)+$/, '');
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
  const copied = await copyLocale('en', source, 'docs/');
  if (copied === 0) {
    throw new Error('No documentation files were copied.');
  }

  const translationsRoot = await resolveTranslationsRoot();
  if (!translationsRoot) {
    console.warn('[docs] no Crowdin export branch available; keeping existing translations');
    return;
  }

  for (const locale of locales) {
    if (locale === 'en') continue;

    const translationDir = join(translationsRoot, locale, 'docs');
    const translationSource = await normalizeSourceDir(translationDir);

    if (!translationSource) {
      console.log(`[docs] ${locale}: no published translation yet, skipping`);
      continue;
    }

    await copyLocale(
      locale,
      translationSource,
      `docs-crowdin-export/${locale}/docs/`,
    );
  }
}

await main();
