import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const summaryPath = path.join(__dirname, '..', 'docs', 'SUMMARY.md');
const outputPath = path.join(__dirname, '..', 'sidebars.js');

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

  const itemMatch = trimmed.match(/^\*\s+\[(.+?)\]\((.+?\.md)\)/);
  if (itemMatch) {
    const label = itemMatch[1].trim();
    const filePath = itemMatch[2].trim();
    const docId = filePath.replace(/\.md$/, '');

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

const sidebarContent = `const sidebars = {
  docs: ${JSON.stringify(items, null, 2)},
};

export default sidebars;
`;

fs.writeFileSync(outputPath, sidebarContent);
console.log(`Generated sidebars.js with ${items.length} top-level items`);
