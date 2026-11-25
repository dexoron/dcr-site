import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { locales } from '../src/i18n/locales.ts';
import type { Dictionary } from '../src/i18n/types.ts';

const defaultLang = 'en';
const TONES = new Set([
  'default',
  'prompt',
  'cyan',
  'green',
  'muted',
  'amber',
]);

const here = dirname(fileURLToPath(import.meta.url));
const i18nDir = join(here, '..', 'src', 'i18n');

const errors: string[] = [];
const report = (locale: string, path: string, message: string): void => {
  errors.push(`${locale}: ${path || '<root>'} ${message}`);
};

const read = (file: string): unknown =>
  JSON.parse(readFileSync(join(i18nDir, file), 'utf8'));

const isPlainObject = (value: unknown): value is Record<string, unknown> =>
  value !== null && typeof value === 'object' && !Array.isArray(value);

const compare = (
  locale: string,
  path: string,
  expected: unknown,
  actual: unknown,
): void => {
  if (typeof expected === 'string') {
    if (typeof actual !== 'string') {
      report(locale, path, `expected a string, got ${typeof actual}`);
    } else if (actual === '') {
      report(locale, path, 'is empty');
    }
    return;
  }

  if (Array.isArray(expected)) {
    if (!Array.isArray(actual)) {
      report(locale, path, 'expected an array');
      return;
    }
    if (actual.length !== expected.length) {
      report(locale, path, `expected ${expected.length} items, got ${actual.length}`);
      return;
    }
    expected.forEach((item, index) => {
      compare(locale, `${path}[${index}]`, item, actual[index]);
    });
    return;
  }

  if (isPlainObject(expected)) {
    if (!isPlainObject(actual)) {
      report(locale, path, 'expected an object');
      return;
    }
    for (const key of Object.keys(expected)) {
      const childPath = path ? `${path}.${key}` : key;
      if (!(key in actual)) {
        report(locale, childPath, 'is missing');
      } else {
        compare(locale, childPath, expected[key], actual[key]);
      }
    }
    for (const key of Object.keys(actual)) {
      if (!(key in expected)) {
        report(locale, path ? `${path}.${key}` : key, 'is unexpected');
      }
    }
    return;
  }

  if (expected !== actual) {
    report(
      locale,
      path,
      `expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`,
    );
  }
};

const walkTones = (locale: string, path: string, value: unknown): void => {
  if (Array.isArray(value)) {
    value.forEach((item, index) => walkTones(locale, `${path}[${index}]`, item));
    return;
  }
  if (isPlainObject(value)) {
    for (const key of Object.keys(value)) {
      walkTones(locale, path ? `${path}.${key}` : key, value[key]);
    }
    return;
  }
  if (path.endsWith('.tone') && typeof value === 'string' && !TONES.has(value)) {
    report(locale, path, `unknown tone "${value}"`);
  }
};

const declared = Object.keys(locales) as Array<keyof typeof locales>;
const files = readdirSync(i18nDir)
  .filter((file) => file.endsWith('.json'))
  .map((file) => file.replace(/\.json$/, ''));

for (const code of declared) {
  if (!files.includes(code)) errors.push(`missing src/i18n/${code}.json`);
  const meta = locales[code];
  if (!meta.label.trim()) errors.push(`${code}: empty label in locales.ts`);
  if (!/^[a-z]{2,3}(-[A-Za-z0-9]{2,8})*$/.test(meta.htmlLang)) {
    errors.push(`${code}: invalid htmlLang "${meta.htmlLang}"`);
  }
}
for (const file of files) {
  if (!declared.includes(file as keyof typeof locales)) {
    errors.push(`src/i18n/${file}.json has no entry in src/i18n/locales.ts`);
  }
}

const en = read(`${defaultLang}.json`) as Dictionary;
walkTones(defaultLang, '', en);

for (const code of declared) {
  if (code === defaultLang || !files.includes(code)) continue;

  const dictionary = read(`${code}.json`) as Dictionary;

  compare(code, '', en, dictionary);
  walkTones(code, '', dictionary);

  const codeSamples = (value: Dictionary): unknown => ({
    newProject: value.terminal.newProject,
    quickStart: value.quickStart.steps.map((step) => step.terminal.lines),
  });
  if (JSON.stringify(codeSamples(dictionary)) !== JSON.stringify(codeSamples(en))) {
    report(code, 'terminal', 'code samples differ from English');
  }

  const codeMetadata = (value: Dictionary): unknown => ({
    icons: value.features.items.map((item) => item.icon),
    numbers: value.quickStart.steps.map((step) => step.number),
  });
  if (
    JSON.stringify(codeMetadata(dictionary)) !==
    JSON.stringify(codeMetadata(en))
  ) {
    report(code, 'features/quickStart', 'icons or step numbers differ from English');
  }

  const install = (value: Dictionary): unknown => ({
    platforms: value.download.platforms.map((platform) => ({
      id: platform.id,
      commands: platform.commands,
    })),
    verifyCommand: value.download.verifyCommand,
  });
  if (JSON.stringify(install(dictionary)) !== JSON.stringify(install(en))) {
    report(code, 'download', 'install commands differ from English');
  }

  const ids = dictionary.download.platforms.map((platform) => platform.id);
  if (new Set(ids).size !== ids.length) {
    report(code, 'download.platforms', 'contains duplicate platform ids');
  }
}

if (errors.length) {
  console.error(`i18n check failed (${errors.length} problem(s) across ${declared.length} locales):`);
  for (const error of errors) console.error(`  - ${error}`);
  process.exit(1);
}

console.log(`i18n check passed: ${declared.length} locales are in sync.`);
