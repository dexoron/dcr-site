import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function parseCategories(summaryPath) {
  const content = fs.readFileSync(summaryPath, 'utf-8');
  const lines = content.split('\n');
  const categories = [];

  for (const line of lines) {
    const trimmed = line.trim();
    const categoryMatch = trimmed.match(/^##\s+(.+)/);
    if (categoryMatch) {
      categories.push(categoryMatch[1].trim());
    }
  }

  return categories;
}

function parseSidebar(summaryPath) {
  const content = fs.readFileSync(summaryPath, 'utf-8');
  const lines = content.split('\n');

  const items = [];
  let currentCategory = null;

  for (const line of lines) {
    const trimmed = line.trim();

    const categoryMatch = trimmed.match(/^##\s+(.+)/);
    if (categoryMatch) {
      if (currentCategory) {
        items.push(currentCategory);
      }
      currentCategory = { type: 'category', label: categoryMatch[1].trim(), items: [] };
      continue;
    }

    const itemMatch = trimmed.match(/^\*\s+\[(.+?)\]\((.+?\.mdx?)\)/);
    if (itemMatch) {
      const filePath = itemMatch[2].trim();
      const docId = filePath.replace(/\.mdx?$/, '');

      if (currentCategory) {
        currentCategory.items.push(docId);
      } else {
        items.push(docId);
      }
    }
  }

  if (currentCategory) {
    items.push(currentCategory);
  }

  return items;
}

// --- Generate sidebars.js from English SUMMARY ---
const enSummaryPath = path.join(__dirname, '..', 'docs', 'SUMMARY.mdx');
const outputPath = path.join(__dirname, '..', 'sidebars.js');

const enItems = parseSidebar(enSummaryPath);
const enCategories = parseCategories(enSummaryPath);

const sidebarContent = `const sidebars = {
  docs: ${JSON.stringify(enItems, null, 2)},
};

export default sidebars;
`;

fs.writeFileSync(outputPath, sidebarContent);
console.log(`Generated sidebars.js with ${enItems.length} top-level items`);

// --- Generate sidebar translations from Russian SUMMARY ---
const ruSummaryPath = path.join(
  __dirname, '..', 'i18n', 'ru', 'docusaurus-plugin-content-docs', 'current', 'SUMMARY.mdx'
);

if (fs.existsSync(ruSummaryPath)) {
  const ruCategories = parseCategories(ruSummaryPath);

  const translations = {};
  for (let i = 0; i < enCategories.length && i < ruCategories.length; i++) {
    const key = `sidebar.docs.category.${enCategories[i]}`;
    translations[key] = {
      message: ruCategories[i],
      description: `The label for category '${enCategories[i]}' in sidebar 'docs'`,
    };
  }

  const i18nPath = path.join(
    __dirname, '..', 'i18n', 'ru', 'docusaurus-plugin-content-docs', 'current.json'
  );

  let existing = {};
  if (fs.existsSync(i18nPath)) {
    existing = JSON.parse(fs.readFileSync(i18nPath, 'utf-8'));
  }

  // Remove old category translations that no longer exist
  for (const key of Object.keys(existing)) {
    if (key.startsWith('sidebar.docs.category.') && !translations[key]) {
      delete existing[key];
    }
  }

  const merged = { ...existing, ...translations };

  fs.writeFileSync(i18nPath, JSON.stringify(merged, null, 2) + '\n');
  console.log(`Updated ${i18nPath} with ${Object.keys(translations).length} category translations`);
} else {
  console.log('Russian SUMMARY.mdx not found, skipping i18n translations');
}
