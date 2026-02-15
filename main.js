// Install - Platform
const installButtons = {
  linux: document.getElementById('linux'),
  windows: document.getElementById('windows'),
  macos: document.getElementById('macos'),
};

const installShell = document.getElementById('install-shell');

const installCommands = {
  linux: 'curl -fsSL https://dcr.dexoron.su/install.sh | bash',
  windows: 'Temporarily not supported',
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
