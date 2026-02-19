// Install - Platform
const installButtons = {
  linux: document.getElementById('linux'),
  windows: document.getElementById('windows'),
  macos: document.getElementById('macos'),
};

const installShell = document.getElementById('install-shell');

const installCommands = {
  linux: 'curl -fsSL https://dcr.dexoron.su/install.sh | bash',
  windows: 'iwr https://dcr.dexoron.su/install.ps1 -useb | iex',
  macos: 'curl -fsSL https://dcr.dexoron.su/install.sh | bash',
};

function setActivePlatform(platform) {
  if (!installShell || !installButtons[platform]) {
    return;
  }

  installShell.textContent = installCommands[platform];

  Object.entries(installButtons).forEach(([key, button]) => {
    if (!button) {
      return;
    }

    const isActive = key === platform;
    button.classList.toggle('bg-slate-800', isActive);
    button.classList.toggle('font-semibold', isActive);
  });
}

Object.entries(installButtons).forEach(([platform, button]) => {
  if (!button) {
    return;
  }

  button.addEventListener('click', () => setActivePlatform(platform));
});

setActivePlatform('linux');

// Mobile Menu

const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuOpenButton = document.getElementById('mobile-header-open');
const mobileMenuCloseButton = document.getElementById('mobile-header-close');

mobileMenuOpenButton?.setAttribute('aria-controls', 'mobile-menu');
mobileMenuOpenButton?.setAttribute('aria-expanded', 'false');

function openMobileMenu() {
  if (!mobileMenu) {
    return;
  }

  mobileMenu.classList.remove('hidden');
  mobileMenu.classList.add('flex');
  document.body.classList.add('overflow-hidden');
  mobileMenuOpenButton?.setAttribute('aria-expanded', 'true');
}

function closeMobileMenu() {
  if (!mobileMenu) {
    return;
  }

  mobileMenu.classList.remove('flex');
  mobileMenu.classList.add('hidden');
  document.body.classList.remove('overflow-hidden');
  mobileMenuOpenButton?.setAttribute('aria-expanded', 'false');
}

mobileMenuOpenButton?.addEventListener('click', openMobileMenu);
mobileMenuCloseButton?.addEventListener('click', closeMobileMenu);

mobileMenu?.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', closeMobileMenu);
});

// New block: language switcher (bottom-right)
const languageOptions = [
  { key: 'ru', label: 'Русский', href: '/ru/', version: 'v0.2.1', verified: true, authors: ['@dexoron'] },
  { key: 'en', label: 'English', href: '/', version: 'v0.2.1', verified: true, authors: ['@dexoron'], use_translator: 'partial'},
  { key: 'de', label: 'Deutsch', href: '/de/', version: 'v0.2.1', verified: false, authors: ['@emexos'], use_translator: 'partial' },
];
// key — language code (ISO 639-1)
// label — display name
// href — base path for this language
// version — documentation version
// verified — whether the translation is verified
// authors — list of translators
// use_translator:
//   "full"    — mostly machine translated
//   "partial" — partially machine translated
//   "none"    — fully human translated

function normalizePath(pathname) {
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function docsPrefixForLanguage(langKey) {
  const lang = languageOptions.find(item => item.key === langKey);
  if (!lang || !lang.href) return null;

  if (lang.href === '/') return '/docs/';

  const normalizedHref = normalizePath(lang.href);
  return `${normalizedHref}docs/`;
}

function mapDocsPathToLanguage(pathname, targetLanguage) {
  const normalizedPath = normalizePath(pathname);
  const docsPrefixes = languageOptions
    .map(item => docsPrefixForLanguage(item.key))
    .filter(Boolean);

  const currentPrefix = docsPrefixes.find(prefix => normalizedPath.startsWith(prefix));
  if (!currentPrefix) return null;

  const suffix = normalizedPath.slice(currentPrefix.length);
  const targetPrefix = docsPrefixForLanguage(targetLanguage);
  if (!targetPrefix) return null;

  return `${targetPrefix}${suffix}`;
}

function detectCurrentLanguage() {
  const path = window.location.pathname;
  const normalizedPath = path.endsWith('/') ? path : `${path}/`;

  for (const lang of languageOptions) {
    if (!lang.href) continue;

    if (lang.href === '/' && (path === '/' || path === '/index.html')) return lang.key;

    if (lang.href !== '/') {
      const normalizedHref = lang.href.endsWith('/') ? lang.href : `${lang.href}/`;
      if (normalizedPath === normalizedHref || normalizedPath.startsWith(normalizedHref)) {
        return lang.key;
      }
    }
  }

  for (const lang of languageOptions) {
    if (lang.href && path.startsWith(lang.href)) {
      return lang.key;
    }
  }

  return languageOptions[0].key;
}

function createLanguageSwitcher() {
  if (!document.body || document.getElementById('language-switcher')) return;

  const currentLanguage = detectCurrentLanguage();
  const currentLabel = 'Language';

  const container = document.createElement('div');
  container.id = 'language-switcher';

  container.style.position = 'fixed';
  container.style.bottom = '1rem';
  container.style.right = '1rem';
  container.style.zIndex = '50';

  container.className = 'text-slate-200';

  const toggleButton = document.createElement('button');
  toggleButton.className =
    'px-2 py-2 bg-slate-900 border border-slate-800 rounded-lg font-semibold ' +
    'hover:border-blue-500 hover:text-blue-500 transition';

  toggleButton.textContent = currentLabel;

  const menu = document.createElement('div');
  menu.className =
    'hidden flex flex-col gap-1 p-2 mt-2 ' +
    'bg-slate-900 border border-slate-800 rounded-lg shadow-xl min-w-[140px]';

  let isOpen = false;

  languageOptions.forEach(item => {
    const optionButton = document.createElement('button');
    optionButton.textContent = item.label;
    optionButton.disabled = Boolean(item.disabled);

    optionButton.className =
      'text-left px-3 py-2 rounded-md border border-slate-800 transition ' +
      (item.key === currentLanguage
        ? 'bg-slate-800 font-bold text-blue-500'
        : 'hover:bg-slate-800 hover:text-blue-500') +
      (item.disabled ? ' opacity-40 cursor-not-allowed' : '');

    optionButton.addEventListener('click', () => {
      if (item.disabled || !item.href) return;

      const mappedDocsPath = mapDocsPathToLanguage(window.location.pathname, item.key);
      const targetPath = mappedDocsPath || item.href;
      const target = new URL(targetPath, window.location.origin);
      target.search = window.location.search;
      target.hash = window.location.hash;

      window.location.assign(target.toString());
    });

    menu.appendChild(optionButton);
  });

function closeMenu() {
  menu.classList.add('hidden');
  toggleButton.classList.remove('hidden');
  isOpen = false;
}

function toggleMenu() {
  if (isOpen) {
    closeMenu();
  } else {
    menu.classList.remove('hidden');
    toggleButton.classList.add('hidden');
    isOpen = true;
  }
}


  toggleButton.addEventListener('click', e => {
    e.stopPropagation();
    toggleMenu();
  });

  document.addEventListener('click', closeMenu);
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });

  container.appendChild(toggleButton);
  container.appendChild(menu);
  document.body.appendChild(container);
}

createLanguageSwitcher();
