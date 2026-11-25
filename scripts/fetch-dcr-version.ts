/**
 * Fetch DCR release facts from GitHub at build time.
 *
 * Authoritative version source: GitHub Releases if present, otherwise the
 * repository's semver tags.
 * The result is written to src/data/dcr.json for Astro to import.
 *
 * The build must never fail because GitHub is unavailable: a committed
 * fallback with verified data is used instead.
 */
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const execFileAsync = promisify(execFile);

const REPO = 'dexoron/dcr';
const API = `https://api.github.com/repos/${REPO}`;
const FALLBACK_PATH = new URL('../src/data/fallback-dcr.json', import.meta.url);
const OUTPUT_PATH = new URL('../src/data/dcr.json', import.meta.url);

const SEMVER = /^v?(\d+)\.(\d+)\.(\d+)$/;

interface DcrData {
  version: string;
  versionTag: string;
  stars: number;
  license: string;
  fetchedAt: string;
  source: string;
}

function parseSemver(value: string): [number, number, number] | null {
  const match = SEMVER.exec(value);
  if (!match) return null;
  return [Number(match[1]), Number(match[2]), Number(match[3])];
}

function compareSemver(a: string, b: string): number {
  const left = parseSemver(a);
  const right = parseSemver(b);
  if (!left || !right) return 0;
  for (let index = 0; index < 3; index += 1) {
    if (left[index] !== right[index]) return left[index] - right[index];
  }
  return 0;
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'dcr-website-build',
      'X-GitHub-Api-Version': '2022-11-28',
    },
    signal: AbortSignal.timeout(8000),
  });

  if (!response.ok) {
    throw new Error(`${url} responded with ${response.status}`);
  }

  return (await response.json()) as T;
}

async function latestTagFromApi(): Promise<string | null> {
  try {
    const release = await fetchJson<{ tag_name?: string }>(`${API}/releases/latest`);
    if (release.tag_name && SEMVER.test(release.tag_name)) {
      return release.tag_name;
    }
  } catch {
    // No published releases (expected for DCR) or the API is unavailable.
  }

  const tags = await fetchJson<Array<{ name: string }>>(`${API}/tags?per_page=100`);
  const versions = tags
    .map((tag) => tag.name)
    .filter((name) => SEMVER.test(name))
    .sort(compareSemver);

  return versions.length > 0 ? versions[versions.length - 1] : null;
}

async function latestTagFromGit(): Promise<string | null> {
  const { stdout } = await execFileAsync(
    'git',
    ['ls-remote', '--tags', `https://github.com/${REPO}.git`],
    { timeout: 15000 },
  );

  const versions = stdout
    .split('\n')
    .map((line) => line.split('refs/tags/')[1] ?? '')
    .map((ref) => ref.replace(/\^\{\}$/, ''))
    .filter((ref) => SEMVER.test(ref))
    .sort(compareSemver);

  return versions.length > 0 ? versions[versions.length - 1] : null;
}

async function readFallback(): Promise<DcrData> {
  const raw = await readFile(FALLBACK_PATH, 'utf8');
  return JSON.parse(raw) as DcrData;
}

async function main(): Promise<void> {
  const data = await readFallback();
  let resolvedFromGitHub = false;

  try {
    const repo = await fetchJson<{
      stargazers_count?: number;
      license?: { spdx_id?: string } | null;
    }>(API);

    if (typeof repo.stargazers_count === 'number') {
      data.stars = repo.stargazers_count;
    }
    if (repo.license?.spdx_id) {
      data.license = repo.license.spdx_id;
    }
    resolvedFromGitHub = true;
  } catch (error) {
    console.warn(`[dcr] GitHub repository metadata unavailable: ${String(error)}`);
  }

  let tag: string | null = null;
  try {
    tag = await latestTagFromApi();
  } catch (error) {
    console.warn(`[dcr] GitHub tag lookup failed: ${String(error)}`);
  }

  if (!tag) {
    try {
      tag = await latestTagFromGit();
    } catch (error) {
      console.warn(`[dcr] git tag lookup failed: ${String(error)}`);
    }
  }

  if (tag && SEMVER.test(tag)) {
    data.version = tag.replace(/^v/, '');
    data.versionTag = tag.startsWith('v') ? tag : `v${tag}`;
    data.source = resolvedFromGitHub ? 'github' : 'git';
  } else {
    console.warn(
      `[dcr] Could not resolve the latest version; using cached v${data.version}.`,
    );
    data.source = 'fallback';
  }

  data.fetchedAt = new Date().toISOString();

  await mkdir(new URL('../src/data/', import.meta.url), { recursive: true });
  await writeFile(OUTPUT_PATH, `${JSON.stringify(data, null, 2)}\n`, 'utf8');

  console.log(`[dcr] version ${data.versionTag}, ${data.stars} stars (${data.source})`);
}

await main();
