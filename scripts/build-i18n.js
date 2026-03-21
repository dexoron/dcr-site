const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const templatesDir = path.join(rootDir, 'templates');
const localesDir = path.join(rootDir, 'locales');

const defaultLocale = 'en';
const pages = [
  {
    template: path.join(templatesDir, 'index.tpl.html'),
    outDir: '',
    fileName: 'index.html',
  },
  {
    template: path.join(templatesDir, 'playbook.tpl.html'),
    outDir: 'playbook',
    fileName: 'index.html',
  },
];

function getByPath(obj, dottedPath) {
  return dottedPath.split('.').reduce((acc, key) => {
    if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
      return acc[key];
    }
    return undefined;
  }, obj);
}

function renderTemplate(template, localeData, localeCode) {
  return template.replace(/{{\s*([\w.-]+)\s*}}/g, (_match, key) => {
    const value = getByPath(localeData, key);

    if (value === undefined) {
      throw new Error(`Missing translation key "${key}" in locale "${localeCode}"`);
    }

    return String(value);
  });
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function main() {
  const localeDirs = fs
    .readdirSync(localesDir)
    .filter((entry) => {
      const fullPath = path.join(localesDir, entry);
      return fs.statSync(fullPath).isDirectory();
    })
    .sort();

  if (localeDirs.length === 0) {
    throw new Error('No locale directories found in locales/.');
  }

  for (const localeCode of localeDirs) {
    const localePath = path.join(localesDir, localeCode, 'index.json');
    if (!fs.existsSync(localePath)) {
      throw new Error(`Missing locale file: locales/${localeCode}/index.json`);
    }

    const localeData = JSON.parse(fs.readFileSync(localePath, 'utf8'));
    const localeRootDir = localeCode === defaultLocale ? rootDir : path.join(rootDir, localeCode);

    for (const page of pages) {
      const template = fs.readFileSync(page.template, 'utf8');
      const html = renderTemplate(template, localeData, localeCode);
      const outDir = page.outDir ? path.join(localeRootDir, page.outDir) : localeRootDir;
      ensureDir(outDir);
      fs.writeFileSync(path.join(outDir, page.fileName), html);
    }
  }

  const legacyDefaultPath = path.join(rootDir, defaultLocale, 'index.html');
  if (fs.existsSync(legacyDefaultPath)) {
    fs.unlinkSync(legacyDefaultPath);
    const legacyDefaultDir = path.dirname(legacyDefaultPath);
    if (fs.existsSync(legacyDefaultDir) && fs.readdirSync(legacyDefaultDir).length === 0) {
      fs.rmdirSync(legacyDefaultDir);
    }
  }

  const legacyDefaultPlaybookPath = path.join(rootDir, defaultLocale, 'playbook', 'index.html');
  if (fs.existsSync(legacyDefaultPlaybookPath)) {
    fs.unlinkSync(legacyDefaultPlaybookPath);
    const legacyDefaultPlaybookDir = path.dirname(legacyDefaultPlaybookPath);
    if (fs.existsSync(legacyDefaultPlaybookDir) && fs.readdirSync(legacyDefaultPlaybookDir).length === 0) {
      fs.rmdirSync(legacyDefaultPlaybookDir);
    }
  }

  console.log(`Built ${localeDirs.length} locale(s) and ${pages.length} page(s). Default locale: ${defaultLocale}`);
}

main();
