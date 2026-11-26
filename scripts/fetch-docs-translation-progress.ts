import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectId = process.env.CROWDIN_PROJECT_ID ?? '949407';
const branchName = process.env.DOCS_CROWDIN_BRANCH ?? '[dexoron.dcr] master';
const token = process.env.CROWDIN_TOKEN;
const outputPath = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../src/data/docs-translation-progress.json',
);
const languageLocale: Record<string, string> = {
  de: 'de-DE',
  'en-simple': 'en-simple',
  'es-ES': 'es-ES',
  fr: 'fr-FR',
  ja: 'ja-JP',
  ko: 'ko-KR',
  pl: 'pl-PL',
  'pt-BR': 'pt-BR',
  ru: 'ru-RU',
  tr: 'tr-TR',
  uk: 'uk-UA',
  'zh-CN': 'zh-CN',
};

interface CrowdinCollection<T> {
  data: Array<{ data: T } | T>;
}

interface CrowdinBranch {
  id: number;
  name: string;
}

interface CrowdinDirectory {
  id: number;
  branchId: number;
  name: string;
}

interface CrowdinProgress {
  languageId: string;
  phrases: { total: number; translated: number };
}

function records<T>(response: CrowdinCollection<T>): T[] {
  return response.data.map((item) => {
    const wrapped = item as { data?: T };
    return wrapped.data ?? (item as T);
  });
}

async function getCrowdin<T>(path: string): Promise<CrowdinCollection<T>> {
  const response = await fetch(`https://api.crowdin.com/api/v2${path}`, {
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Crowdin returned HTTP ${response.status} for ${path}`);
  }

  return (await response.json()) as CrowdinCollection<T>;
}

async function listAll<T>(path: string): Promise<T[]> {
  const result: T[] = [];
  let offset = 0;
  const limit = 500;

  while (true) {
    const separator = path.includes('?') ? '&' : '?';
    const response = await getCrowdin<T>(`${path}${separator}limit=${limit}&offset=${offset}`);
    const page = records(response);
    result.push(...page);
    if (page.length < limit) return result;
    offset += limit;
  }
}

async function main(): Promise<void> {
  if (!token) {
    console.log('[docs-progress] CROWDIN_TOKEN is not set; using the bundled snapshot');
    return;
  }

  const branches = await listAll<CrowdinBranch>(`/projects/${projectId}/branches`);
  const branch = branches.find((item) => item.name === branchName);
  if (!branch) throw new Error(`Crowdin branch not found: ${branchName}`);

  const directories = await listAll<CrowdinDirectory>(
    `/projects/${projectId}/directories?branchId=${branch.id}&recursion=true`,
  );
  const docsDirectory = directories.find(
    (directory) => directory.branchId === branch.id && directory.name === 'docs',
  );
  if (!docsDirectory) throw new Error(`Crowdin docs directory not found in ${branchName}`);

  const progress = await listAll<CrowdinProgress>(
    `/projects/${projectId}/directories/${docsDirectory.id}/languages/progress`,
  );
  const languages = Object.fromEntries(
    progress.flatMap((item) => {
      const locale = languageLocale[item.languageId];
      if (!locale) return [];
      const translated = item.phrases.translated;
      const total = item.phrases.total;
      return [[locale, {
        translated,
        total,
        percentage: total > 0 ? Math.round((translated / total) * 100) : 0,
      }]];
    }),
  );

  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(
    outputPath,
    `${JSON.stringify({ updatedAt: new Date().toISOString(), languages }, null, 2)}\n`,
    'utf8',
  );
  console.log(`[docs-progress] updated phrase progress for ${Object.keys(languages).length} locales`);
}

await main().catch((error: unknown) => {
  console.warn(`[docs-progress] could not refresh Crowdin progress: ${String(error)}`);
  console.warn('[docs-progress] keeping the bundled snapshot');
});
