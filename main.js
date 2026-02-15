const installButtons = {
  linux: document.getElementById('linux'),
  windows: document.getElementById('windows'),
  macos: document.getElementById('macos'),
};

const installShell = document.getElementById('install-shell');

const installCommands = {
  linux: 'curl -fsSL https://dcr.dexoron.su/install.sh | bash',
  windows: 'Временно не поддерживается',
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
