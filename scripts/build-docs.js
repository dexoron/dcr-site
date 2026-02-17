const fs = require('node:fs');
const path = require('node:path');

const rootDir = path.resolve(__dirname, '..');
const docsLocalesConfigPath = path.join(rootDir, 'locales', 'docs.locales.json');

function loadLocaleConfigs() {
  if (!fs.existsSync(docsLocalesConfigPath)) {
    throw new Error('Missing locales/docs.locales.json');
  }

  const raw = fs.readFileSync(docsLocalesConfigPath, 'utf8');
  const parsed = JSON.parse(raw);

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error('locales/docs.locales.json must contain a non-empty array.');
  }

  return parsed.map((locale) => {
    if (!locale.code || !locale.sourceRoot || !locale.outputRoot || !locale.docsUrlPrefix || !locale.homeUrl) {
      throw new Error(`Invalid locale entry in locales/docs.locales.json: ${JSON.stringify(locale)}`);
    }

    return {
      ...locale,
      sourceRoot: path.join(rootDir, locale.sourceRoot),
      outputRoot: path.join(rootDir, locale.outputRoot),
      configPath: locale.configPath ? path.join(rootDir, locale.configPath) : null,
    };
  });
}

function loadLocaleUiConfig(configPath) {
  if (!configPath || !fs.existsSync(configPath)) {
    return {};
  }

  const raw = fs.readFileSync(configPath, 'utf8');
  return JSON.parse(raw);
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function escapeHtml(input) {
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderInline(input) {
  const tokens = [];
  let text = input;

  text = text.replace(/`([^`]+)`/g, (_match, value) => {
    const token = `__TOKEN_${tokens.length}__`;
    tokens.push(`<code>${escapeHtml(value)}</code>`);
    return token;
  });

  text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, url) => {
    const token = `__TOKEN_${tokens.length}__`;
    tokens.push(`<a href="${escapeHtml(url)}">${escapeHtml(label)}</a>`);
    return token;
  });

  text = escapeHtml(text)
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>');

  tokens.forEach((tokenValue, index) => {
    text = text.replace(`__TOKEN_${index}__`, tokenValue);
  });

  return text;
}

function markdownToHtml(markdown, sharedState = null) {
  const state = sharedState || {
    headingSlugCounts: new Map(),
    tabGroupCounter: 0,
  };
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const html = [];
  const headings = [];
  const headingSlugCounts = state.headingSlugCounts;

  let inCodeBlock = false;
  let codeLang = '';
  let codeLines = [];
  let paragraphLines = [];
  let listType = null;

  let documentTitle = null;

  function slugifyHeading(text) {
    const base = text
      .toLowerCase()
      .trim()
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

    const safeBase = base || 'section';
    const count = headingSlugCounts.get(safeBase) || 0;
    headingSlugCounts.set(safeBase, count + 1);
    return count === 0 ? safeBase : `${safeBase}-${count + 1}`;
  }

  function flushParagraph() {
    if (paragraphLines.length === 0) {
      return;
    }
    const paragraph = paragraphLines.join(' ').trim();
    if (paragraph.length > 0) {
      html.push(`<p>${renderInline(paragraph)}</p>`);
    }
    paragraphLines = [];
  }

  function closeList() {
    if (!listType) {
      return;
    }
    html.push(`</${listType}>`);
    listType = null;
  }

  function flushCodeBlock() {
    const langClass = codeLang ? ` class="language-${escapeHtml(codeLang)}"` : '';
    html.push(`<pre><code${langClass}>${escapeHtml(codeLines.join('\n'))}</code></pre>`);
    codeLines = [];
    codeLang = '';
  }

  function collectIndentedBlock(startIndex) {
    const blockLines = [];
    let index = startIndex;

    while (index < lines.length) {
      const current = lines[index];
      if (current.trim() === '') {
        blockLines.push('');
        index += 1;
        continue;
      }

      if (/^( {4}|\t)/.test(current)) {
        blockLines.push(current.replace(/^ {4}/, '').replace(/^\t/, ''));
        index += 1;
        continue;
      }

      break;
    }

    return {
      content: blockLines.join('\n').trimEnd(),
      nextIndex: index,
    };
  }

  function capitalizeWord(text) {
    if (!text || text.length === 0) {
      return text;
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  function renderTabGroup(tabs) {
    const groupId = `tabs-${state.tabGroupCounter++}`;

    const buttonsHtml = tabs
      .map((tab, index) => {
        const activeClass = index === 0 ? 'tab-button active' : 'tab-button';
        return `<button class="${activeClass}" type="button" data-tab-group="${groupId}" data-tab-target="${groupId}-${index}">${escapeHtml(tab.label)}</button>`;
      })
      .join('\n');

    const panelsHtml = tabs
      .map((tab, index) => {
        const activeClass = index === 0 ? 'tab-panel active' : 'tab-panel';
        return `<div id="${groupId}-${index}" class="${activeClass}" data-tab-panel="${groupId}">${tab.contentHtml}</div>`;
      })
      .join('\n');

    return `<div class="tabs">
  <div class="tab-buttons">
${buttonsHtml}
  </div>
  <div class="tab-panels">
${panelsHtml}
  </div>
</div>`;
  }

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const fenceMatch = line.match(/^```\s*([\w-]+)?\s*$/);
    if (fenceMatch) {
      flushParagraph();
      closeList();

      if (!inCodeBlock) {
        inCodeBlock = true;
        codeLang = fenceMatch[1] || '';
        codeLines = [];
      } else {
        inCodeBlock = false;
        flushCodeBlock();
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    const tabMatch = line.match(/^===\s+"([^"]+)"\s*$/);
    if (tabMatch) {
      flushParagraph();
      closeList();

      const tabs = [];
      let cursor = i;
      while (cursor < lines.length) {
        const match = lines[cursor].match(/^===\s+"([^"]+)"\s*$/);
        if (!match) {
          break;
        }

        const block = collectIndentedBlock(cursor + 1);
        const rendered = markdownToHtml(block.content, state);
        tabs.push({
          label: match[1],
          contentHtml: rendered.html,
        });
        cursor = block.nextIndex;
      }

      if (tabs.length > 0) {
        html.push(renderTabGroup(tabs));
        i = cursor - 1;
        continue;
      }
    }

    const admonitionMatch = line.match(/^!!!\s+([a-zA-Z][\w-]*)(?:\s+"([^"]+)")?\s*$/);
    if (admonitionMatch) {
      flushParagraph();
      closeList();

      const type = admonitionMatch[1].toLowerCase();
      const title = admonitionMatch[2] || capitalizeWord(type);
      const block = collectIndentedBlock(i + 1);
      const rendered = markdownToHtml(block.content, state);
      html.push(`<div class="admonition admonition-${escapeHtml(type)}">
  <p class="admonition-title">${escapeHtml(title)}</p>
  <div class="admonition-body">
${rendered.html}
  </div>
</div>`);
      i = block.nextIndex - 1;
      continue;
    }

    if (line.trim() === '') {
      flushParagraph();
      closeList();
      continue;
    }

    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    if (headingMatch) {
      flushParagraph();
      closeList();

      const level = headingMatch[1].length;
      const text = headingMatch[2].trim();
      if (level === 1 && !documentTitle) {
        documentTitle = text;
      }
      const id = slugifyHeading(text);
      html.push(`<h${level} id="${id}">${renderInline(text)}</h${level}>`);
      if (level >= 2) {
        headings.push({ level, text, id });
      }
      continue;
    }

    const unorderedMatch = line.match(/^\s*[-*]\s+(.+)$/);
    if (unorderedMatch) {
      flushParagraph();
      if (listType !== 'ul') {
        closeList();
        listType = 'ul';
        html.push('<ul>');
      }
      html.push(`<li>${renderInline(unorderedMatch[1].trim())}</li>`);
      continue;
    }

    const orderedMatch = line.match(/^\s*\d+\.\s+(.+)$/);
    if (orderedMatch) {
      flushParagraph();
      if (listType !== 'ol') {
        closeList();
        listType = 'ol';
        html.push('<ol>');
      }
      html.push(`<li>${renderInline(orderedMatch[1].trim())}</li>`);
      continue;
    }

    paragraphLines.push(line.trim());
  }

  if (inCodeBlock) {
    flushCodeBlock();
  }
  flushParagraph();
  closeList();

  return {
    title: documentTitle,
    html: html.join('\n'),
    headings,
  };
}

function listMarkdownFiles(dirPath, basePath = dirPath) {
  if (!fs.existsSync(dirPath)) {
    return [];
  }

  const items = fs.readdirSync(dirPath, { withFileTypes: true });
  const files = [];

  for (const item of items) {
    const fullPath = path.join(dirPath, item.name);
    if (item.isDirectory()) {
      files.push(...listMarkdownFiles(fullPath, basePath));
      continue;
    }

    if (item.isFile() && item.name.endsWith('.md')) {
      files.push(path.relative(basePath, fullPath));
    }
  }

  return files.sort();
}

function routeForRelPath(localeConfig, relPath) {
  const normalized = relPath.split(path.sep).join('/');
  if (normalized === 'index.md') {
    return localeConfig.docsUrlPrefix;
  }

  if (normalized.endsWith('/index.md')) {
    const folder = normalized.slice(0, -'/index.md'.length);
    return `${localeConfig.docsUrlPrefix}${folder}/`;
  }

  const withoutExt = normalized.slice(0, -'.md'.length);
  return `${localeConfig.docsUrlPrefix}${withoutExt}/`;
}

function outputPathForRelPath(outputRoot, relPath) {
  const normalized = relPath.split(path.sep).join('/');

  if (normalized === 'index.md') {
    return path.join(outputRoot, 'index.html');
  }

  if (normalized.endsWith('/index.md')) {
    const htmlPath = normalized.slice(0, -'.md'.length) + '.html';
    return path.join(outputRoot, htmlPath);
  }

  const withoutExt = normalized.slice(0, -'.md'.length);
  return path.join(outputRoot, withoutExt, 'index.html');
}

function prettifyLabel(relPath, fallbackTitle) {
  const normalized = relPath.split(path.sep).join('/');
  if (normalized === 'index.md') {
    return fallbackTitle;
  }

  if (fallbackTitle && fallbackTitle.trim().length > 0) {
    return fallbackTitle;
  }

  const base = path.basename(normalized, '.md').replace(/[-_]/g, ' ');
  return base.charAt(0).toUpperCase() + base.slice(1);
}

function buildSidebarHtml(localeConfig, pages, currentRoute) {
  const sidebarLinkBase =
    'block rounded-md border border-transparent px-2.5 py-2 text-sm text-slate-400 hover:text-slate-100 hover:border-slate-700 hover:bg-slate-950';
  const sidebarLinkActive =
    'block rounded-md border border-blue-700 bg-blue-950 px-2.5 py-2 text-sm font-semibold text-blue-100';
  const sidebarGroupTitleBase =
    'block rounded-md px-2.5 py-1.5 text-xs font-bold uppercase tracking-wide text-slate-300';
  const sidebarGroupTitleActive = 'text-blue-100';

  function normalizedRelPath(relPath) {
    return relPath.split(path.sep).join('/');
  }

  function collectConfiguredPaths(items, outSet) {
    if (!Array.isArray(items)) {
      return;
    }

    for (const item of items) {
      if (!item) continue;
      if (typeof item === 'string') {
        outSet.add(normalizedRelPath(item));
        continue;
      }

      if (item.path) {
        outSet.add(normalizedRelPath(item.path));
      }
      if (Array.isArray(item.children)) {
        collectConfiguredPaths(item.children, outSet);
      }
    }
  }

  function renderConfiguredSidebar() {
    const pageByRelPath = new Map(
      pages.map((page) => [normalizedRelPath(page.relPath), page]),
    );
    const configuredItems = Array.isArray(localeConfig.sidebar) ? localeConfig.sidebar : [];
    const configuredPaths = new Set();
    collectConfiguredPaths(configuredItems, configuredPaths);

    const extraItems = pages
      .filter((page) => !configuredPaths.has(normalizedRelPath(page.relPath)))
      .sort((a, b) => a.label.localeCompare(b.label))
      .map((page) => ({
        path: normalizedRelPath(page.relPath),
        label: page.label,
      }));

    const fullItems = [...configuredItems, ...extraItems];

    function renderItems(items, depth) {
      const depthClass = depth === 0 ? '' : 'border-l border-slate-800 pl-2.5';
      const depthMargin = depth === 0 ? '' : ` style="margin-left:${Math.min(depth, 4) * 8}px"`;
      const lines = [`<ul class="sidebar-level flex flex-col gap-1 ${depthClass}"${depthMargin}>`];
      let hasActive = false;

      for (const item of items) {
        const normalizedItem = typeof item === 'string' ? { path: item } : item;
        if (!normalizedItem || !normalizedItem.path) {
          continue;
        }

        const relPath = normalizedRelPath(normalizedItem.path);
        const page = pageByRelPath.get(relPath);
        const children = Array.isArray(normalizedItem.children) ? normalizedItem.children : [];
        const childrenRendered = children.length > 0 ? renderItems(children, depth + 1) : null;

        const selfActive = page ? page.route === currentRoute : false;
        const childActive = childrenRendered ? childrenRendered.hasActive : false;
        const isActive = selfActive || childActive;
        hasActive = hasActive || isActive;

        const label =
          normalizedItem.label ||
          (page ? page.label : path.basename(relPath, '.md').replace(/[-_]/g, ' '));

        if (children.length > 0) {
          lines.push('<li class="sidebar-group my-0.5">');
          if (page) {
            lines.push(
              `<a class="${isActive ? `${sidebarGroupTitleBase} ${sidebarGroupTitleActive}` : sidebarGroupTitleBase}" href="${page.route}">${escapeHtml(label)}</a>`,
            );
          } else {
            lines.push(`<span class="${sidebarGroupTitleBase}">${escapeHtml(label)}</span>`);
          }
          lines.push(childrenRendered ? childrenRendered.html : '');
          lines.push('</li>');
        } else if (page) {
          lines.push(
            `<li><a class="${selfActive ? sidebarLinkActive : sidebarLinkBase}" href="${page.route}">${escapeHtml(label)}</a></li>`,
          );
        }
      }

      lines.push('</ul>');
      return {
        html: lines.join('\n'),
        hasActive,
      };
    }

    const rendered = renderItems(fullItems, 0);
    return `<nav class="sidebar-nav rounded-xl border border-slate-800 bg-slate-900 p-4">
  <p class="mb-2 text-sm font-bold uppercase tracking-wide text-slate-100">${escapeHtml(localeConfig.docsLabel || 'Documentation')}</p>
${rendered.html}
</nav>`;
  }

  if (Array.isArray(localeConfig.sidebar) && localeConfig.sidebar.length > 0) {
    return renderConfiguredSidebar();
  }

  function createNode() {
    return {
      dirs: new Map(),
      pages: [],
      indexPage: null,
    };
  }

  function sortByLabel(a, b) {
    return a.label.localeCompare(b.label);
  }

  function sortByName(a, b) {
    return a[0].localeCompare(b[0]);
  }

  function directoryLabelFromName(name) {
    return name
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (letter) => letter.toUpperCase());
  }

  const root = createNode();

  for (const page of pages) {
    const normalized = page.relPath.split(path.sep).join('/');

    if (normalized === 'index.md') {
      root.indexPage = page;
      continue;
    }

    const parts = normalized.split('/');
    const fileName = parts[parts.length - 1];
    const dirParts = parts.slice(0, -1);

    let node = root;
    for (const dirPart of dirParts) {
      if (!node.dirs.has(dirPart)) {
        node.dirs.set(dirPart, createNode());
      }
      node = node.dirs.get(dirPart);
    }

    if (fileName === 'index.md') {
      node.indexPage = page;
    } else {
      node.pages.push(page);
    }
  }

  function renderNode(node, depth, skipOwnIndex = false) {
    const lines = [];
    lines.push(`<ul class="sidebar-level sidebar-level-${depth}">`);

    if (node.indexPage && !skipOwnIndex) {
      const activeClass = node.indexPage.route === currentRoute ? 'sidebar-link active' : 'sidebar-link';
      lines.push(`<li><a class="${activeClass === 'sidebar-link active' ? sidebarLinkActive : sidebarLinkBase}" href="${node.indexPage.route}">${escapeHtml(node.indexPage.label)}</a></li>`);
    }

    node.pages.sort(sortByLabel);
    for (const page of node.pages) {
      const activeClass = page.route === currentRoute ? 'sidebar-link active' : 'sidebar-link';
      lines.push(`<li><a class="${activeClass === 'sidebar-link active' ? sidebarLinkActive : sidebarLinkBase}" href="${page.route}">${escapeHtml(page.label)}</a></li>`);
    }

    const directories = Array.from(node.dirs.entries()).sort(sortByName);
    for (const [dirName, childNode] of directories) {
      const childLabel = childNode.indexPage ? childNode.indexPage.label : directoryLabelFromName(dirName);
      const childActiveClass = childNode.indexPage && childNode.indexPage.route === currentRoute ? ' active' : '';

      lines.push('<li class="sidebar-group my-0.5">');
      if (childNode.indexPage) {
        lines.push(
          `<a class="${childActiveClass ? `${sidebarGroupTitleBase} ${sidebarGroupTitleActive}` : sidebarGroupTitleBase}" href="${childNode.indexPage.route}">${escapeHtml(childLabel)}</a>`,
        );
      } else {
        lines.push(`<span class="${sidebarGroupTitleBase}">${escapeHtml(childLabel)}</span>`);
      }
      lines.push(renderNode(childNode, depth + 1, Boolean(childNode.indexPage)));
      lines.push('</li>');
    }

    lines.push('</ul>');
    return lines.join('\n');
  }

  const items = renderNode(root, 0);

  return `<nav class="sidebar-nav rounded-xl border border-slate-800 bg-slate-900 p-4">
  <p class="mb-2 text-sm font-bold uppercase tracking-wide text-slate-100">${escapeHtml(localeConfig.docsLabel || 'Documentation')}</p>
${items}
</nav>`;
}

function buildTocHtml(localeConfig, headings) {
  if (!headings || headings.length === 0) {
    return '';
  }

  const items = headings
    .filter((heading) => heading.level <= 3)
    .map((heading) => {
      const itemClass =
        heading.level === 2
          ? 'block rounded-md px-2 py-1.5 text-xs text-slate-400 hover:bg-slate-950 hover:text-slate-100'
          : 'block rounded-md px-2 py-1.5 pl-4 text-xs text-slate-500 hover:bg-slate-950 hover:text-slate-100';
      return `<li><a class="${itemClass}" href="#${heading.id}">${escapeHtml(heading.text)}</a></li>`;
    })
    .join('\n');

  return `<nav class="toc docs-toc rounded-xl border border-slate-800 bg-slate-900 p-4">
  <p class="mb-2 text-sm font-bold uppercase tracking-wide text-slate-100">${escapeHtml(localeConfig.tocLabel || 'On this page')}</p>
  <ul class="flex flex-col gap-0.5">
${items}
  </ul>
</nav>`;
}

function createPageHtml({ title, localeConfig, switchHref, contentHtml, sidebarHtml, tocHtml }) {
  return `<!DOCTYPE html>
<html lang="${localeConfig.code}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)} - DCR Docs</title>
  <meta name="description" content="DCR documentation">
  <link rel="stylesheet" href="/style.css">
  <style>
    .mobile-menu-btn {
      display: none;
    }
    .docs-layout {
      display: grid;
      grid-template-columns: 260px minmax(0, 1fr) 240px;
      gap: 16px;
      align-items: start;
    }
    .docs-sidebar {
      position: sticky;
      top: 74px;
      max-height: calc(100vh - 90px);
      overflow: auto;
    }
    .mobile-drawer {
      position: fixed;
      inset: 0;
      z-index: 60;
      display: none;
      flex-direction: column;
      background: rgba(2, 6, 23, 0.96);
      backdrop-filter: blur(8px);
    }
    .mobile-drawer-body {
      padding: 12px 16px 24px;
      overflow: auto;
    }
    .mobile-drawer .sidebar-nav {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 14px;
    }
    .docs-toc {
      position: sticky;
      top: 74px;
      max-height: calc(100vh - 90px);
      overflow: auto;
    }
    .tabs {
      margin: 0 0 1rem;
      overflow: hidden;
      border: 1px solid #334155;
      border-radius: 0.75rem;
      background: #0b1220;
    }
    .tab-buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 0;
      border-bottom: 1px solid #334155;
      background: #0f172a;
    }
    .tab-button {
      appearance: none;
      background: transparent;
      border: 0;
      border-right: 1px solid #334155;
      color: #94a3b8;
      padding: 10px 12px;
      cursor: pointer;
      font-size: 13px;
      font-weight: 600;
    }
    .tab-button:hover {
      color: #cbd5e1;
      background: #111c33;
    }
    .tab-button.active {
      color: #dbeafe;
      background: #13254a;
    }
    .tab-panels {
      padding: 12px 12px 2px;
    }
    .tab-panel {
      display: none;
    }
    .tab-panel.active {
      display: block;
    }
    .admonition {
      border: 1px solid #334155;
      border-left-width: 4px;
      border-radius: 10px;
      padding: 12px 14px;
      margin: 0 0 16px;
      background: #0b1220;
    }
    .admonition-title {
      margin: 0 0 8px;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.02em;
    }
    .admonition-body p:last-child {
      margin-bottom: 0;
    }
    .admonition-tip {
      border-left-color: #22c55e;
    }
    .admonition-tip .admonition-title {
      color: #86efac;
    }
    .admonition-note {
      border-left-color: #38bdf8;
    }
    .admonition-note .admonition-title {
      color: #7dd3fc;
    }
    .admonition-warning {
      border-left-color: #f59e0b;
    }
    .admonition-warning .admonition-title {
      color: #fcd34d;
    }
    .docs-content h1, .docs-content h2, .docs-content h3, .docs-content h4, .docs-content h5, .docs-content h6 {
      margin: 24px 0 12px;
      line-height: 1.3;
      color: #f8fafc;
    }
    .docs-content h1 { margin-top: 0; font-size: 34px; }
    .docs-content h2 { font-size: 24px; }
    .docs-content h3 { font-size: 20px; }
    .docs-content p { margin: 0 0 14px; color: #e2e8f0; }
    .docs-content ul, .docs-content ol { margin: 0 0 14px 20px; }
    .docs-content li { margin: 4px 0; }
    .docs-content a { color: #60a5fa; text-decoration: none; }
    .docs-content a:hover { color: #93c5fd; }
    .docs-content code {
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 6px;
      padding: 1px 6px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
      font-size: 0.92em;
    }
    .docs-content pre {
      background: #020617;
      border: 1px solid #334155;
      border-radius: 10px;
      padding: 12px;
      overflow-x: auto;
      margin: 0 0 14px;
    }
    .docs-content pre code {
      border: 0;
      padding: 0;
      background: transparent;
      border-radius: 0;
    }
    @media (max-width: 1280px) {
      .docs-layout {
        grid-template-columns: minmax(0, 1fr) 240px;
      }
      .docs-sidebar {
        display: none;
      }
      .mobile-menu-btn {
        display: inline-block;
      }
      .repo-link {
        padding: 7px 10px;
      }
    }
    @media (max-width: 900px) {
      .docs-layout {
        grid-template-columns: 1fr;
      }
      .docs-toc {
        display: none;
      }
    }
  </style>
</head>
<body class="min-h-screen bg-slate-950 text-slate-200">
  <header class="sticky top-0 z-10 border-b border-slate-800/80 bg-slate-950/90 backdrop-blur">
    <div class="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-3 px-4 py-3">
      <a class="text-lg font-bold text-slate-100 no-underline" href="${localeConfig.homeUrl}">DCR</a>
      <div class="flex items-center gap-2 text-sm">
        <button type="button" class="mobile-menu-btn rounded-md border border-slate-700 bg-slate-900 px-3 py-2 font-semibold text-slate-200 hover:border-blue-600 hover:bg-slate-800 hover:text-slate-100" id="docs-mobile-menu-open">Menu</button>
        <a class="rounded-md border border-slate-700 bg-blue-950 px-3 py-2 font-semibold text-blue-100 no-underline hover:border-blue-600 hover:bg-blue-900 hover:text-blue-50" href="https://github.com/dexoron/dcr">GitHub</a>
      </div>
    </div>
  </header>
  <div class="mobile-drawer" id="docs-mobile-menu">
    <div class="mobile-drawer-header flex items-center justify-between border-b border-slate-800 px-4 py-3">
      <strong class="text-sm font-bold uppercase tracking-wide text-slate-100">${escapeHtml(localeConfig.docsLabel || 'Documentation')}</strong>
      <button type="button" class="mobile-drawer-close rounded-md border border-slate-700 bg-slate-900 px-3 py-2 font-semibold text-slate-200 hover:border-blue-600 hover:bg-slate-800 hover:text-slate-100" id="docs-mobile-menu-close">Close</button>
    </div>
    <div class="mobile-drawer-body">
${sidebarHtml}
    </div>
  </div>
  <main class="mx-auto w-full max-w-[1280px] px-4 pb-14 pt-7">
    <div class="docs-layout">
      <aside class="docs-sidebar">
${sidebarHtml}
      </aside>
      <article class="docs-content rounded-xl border border-slate-800 bg-slate-900 p-6">
${contentHtml}
      </article>
      ${tocHtml}
    </div>
  </main>
  <script>
    const docsMobileMenu = document.getElementById('docs-mobile-menu');
    const docsMobileOpen = document.getElementById('docs-mobile-menu-open');
    const docsMobileClose = document.getElementById('docs-mobile-menu-close');

    function openDocsMenu() {
      if (!docsMobileMenu) return;
      docsMobileMenu.style.display = 'flex';
      document.body.classList.add('overflow-hidden');
    }

    function closeDocsMenu() {
      if (!docsMobileMenu) return;
      docsMobileMenu.style.display = 'none';
      document.body.classList.remove('overflow-hidden');
    }

    docsMobileOpen?.addEventListener('click', openDocsMenu);
    docsMobileClose?.addEventListener('click', closeDocsMenu);
    docsMobileMenu?.addEventListener('click', (event) => {
      if (event.target === docsMobileMenu) {
        closeDocsMenu();
      }
    });
    docsMobileMenu?.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeDocsMenu);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeDocsMenu();
      }
    });

    document.querySelectorAll('.tab-button').forEach((button) => {
      button.addEventListener('click', () => {
        const group = button.getAttribute('data-tab-group');
        const target = button.getAttribute('data-tab-target');
        if (!group || !target) return;

        document.querySelectorAll('.tab-button[data-tab-group="' + group + '"]').forEach((item) => {
          item.classList.remove('active');
        });
        document.querySelectorAll('.tab-panel[data-tab-panel="' + group + '"]').forEach((panel) => {
          panel.classList.remove('active');
        });

        button.classList.add('active');
        const panel = document.getElementById(target);
        if (panel) {
          panel.classList.add('active');
        }
      });
    });
  </script>
  <script src="/main.js"></script>
</body>
</html>
`;
}

function clearGeneratedHtml(outputRoot) {
  if (!fs.existsSync(outputRoot)) {
    return;
  }

  const items = fs.readdirSync(outputRoot, { withFileTypes: true });
  for (const item of items) {
    const fullPath = path.join(outputRoot, item.name);

    if (item.isDirectory()) {
      clearGeneratedHtml(fullPath);
      if (fs.readdirSync(fullPath).length === 0) {
        fs.rmdirSync(fullPath);
      }
      continue;
    }

    if (item.isFile() && item.name.endsWith('.html')) {
      fs.unlinkSync(fullPath);
    }
  }
}

function main() {
  const localeConfigs = loadLocaleConfigs();

  for (const locale of localeConfigs) {
    const uiConfig = loadLocaleUiConfig(locale.configPath);
    Object.assign(locale, uiConfig);
  }

  const relByLocale = new Map();
  for (const locale of localeConfigs) {
    relByLocale.set(locale.code, new Set(listMarkdownFiles(locale.sourceRoot)));
  }

  for (const locale of localeConfigs) {
    ensureDir(locale.outputRoot);
    clearGeneratedHtml(locale.outputRoot);

    const relFiles = Array.from(relByLocale.get(locale.code) || []).sort((a, b) => {
      if (a === 'index.md') return -1;
      if (b === 'index.md') return 1;
      return a.localeCompare(b);
    });
    const renderedByRel = new Map();
    const pages = [];

    for (const relPath of relFiles) {
      const sourcePath = path.join(locale.sourceRoot, relPath);
      const markdown = fs.readFileSync(sourcePath, 'utf8');
      const rendered = markdownToHtml(markdown);
      const fallbackTitle = path.basename(relPath, '.md').replace(/[-_]/g, ' ');
      const title = rendered.title || fallbackTitle;
      const route = routeForRelPath(locale, relPath);
      const resolvedTitle = relPath === 'index.md' ? (locale.overviewLabel || title) : title;
      const label = prettifyLabel(relPath, resolvedTitle);

      renderedByRel.set(relPath, { title, html: rendered.html, headings: rendered.headings, route, label });
      pages.push({ relPath, route, label });
    }

    for (const relPath of relFiles) {
      const renderedPage = renderedByRel.get(relPath);
      if (!renderedPage) {
        continue;
      }

      const targetLocale = localeConfigs.find((item) => item.code === locale.switchTarget);
      const targetRelSet = relByLocale.get(locale.switchTarget) || new Set();
      const switchHref = targetLocale
        ? targetRelSet.has(relPath)
          ? routeForRelPath(targetLocale, relPath)
          : targetLocale.docsUrlPrefix
        : locale.docsUrlPrefix;
      const sidebarHtml = buildSidebarHtml(locale, pages, renderedPage.route);
      const tocHtml = buildTocHtml(locale, renderedPage.headings);

      const outPath = outputPathForRelPath(locale.outputRoot, relPath);
      ensureDir(path.dirname(outPath));
      const pageHtml = createPageHtml({
        title: renderedPage.title,
        localeConfig: locale,
        switchHref,
        contentHtml: renderedPage.html,
        sidebarHtml,
        tocHtml,
      });
      fs.writeFileSync(outPath, pageHtml);
    }
  }

  console.log(`Built docs for locales: ${localeConfigs.map((locale) => locale.code).join(', ')}`);
}

main();
