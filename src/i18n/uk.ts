import type { CodeLine, Dictionary } from './en';

// Translated with the help of Claude Sonnet 5.5. Native-speaker review welcome.
const uk: Dictionary = {
  meta: {
    lang: 'uk',
    title: 'DCR — Cargo-подібний інструмент збірки для C/C++',
    description:
      'DCR приносить у C та C++ сучасний і передбачуваний робочий процес. Опишіть проєкт один раз, керуйте залежностями та збирайте його тими самими простими командами будь-де.',
  },
  nav: {
    home: 'Головна',
    documentation: 'Документація',
    download: 'Завантажити',
    support: 'Підтримка',
    github: 'GitHub',
    donate: 'Підтримати',
    language: 'Українська',
    menu: 'Меню',
  },
  hero: {
    titleLines: ['Збирайте C/C++ без', 'головного болю зі збіркою.'],
    description:
      'DCR приносить у C та C++ сучасний і передбачуваний робочий процес. Опишіть проєкт один раз, керуйте залежностями та збирайте його тими самими простими командами будь-де.',
    primaryAction: 'Почати',
    secondaryAction: 'GitHub',
    license: 'GPLv3',
  },
  terminal: {
    title: 'Термінал',
    newProject: [
      { segments: [{ text: '$', tone: 'prompt' }, { text: ' dcr new myapp' }] },
      {
        segments: [
          { text: 'Creating a Project `' },
          { text: 'myapp', tone: 'cyan' },
          { text: '`...\nProject `' },
          { text: 'myapp', tone: 'green' },
          { text: '` successfully created\n\n' },
          { text: 'Next step:\n', tone: 'green' },
          { text: '    cd myapp\n    dcr run', tone: 'cyan' },
        ],
      },
      { segments: [{ text: '$', tone: 'prompt' }, { text: ' cd myapp' }] },
      { segments: [{ text: '$', tone: 'prompt' }, { text: ' dcr run' }] },
      {
        segments: [
          { text: '  ' },
          { text: 'project', tone: 'cyan' },
          { text: '   myapp  (debug, x86_64-unknown-linux-gnu)\n  ' },
          { text: 'compile', tone: 'green' },
          { text: '   myapp v0.1.0  [1/1]\n  ' },
          { text: 'done', tone: 'green' },
          { text: '      in 0.24s\n  ' },
          { text: 'run', tone: 'green' },
          { text: '       /home/dexoron/tmp/myapp/target/debug/myapp\nHello World!' },
        ],
      },
      { segments: [{ text: '$ ', tone: 'prompt' }] },
    ] satisfies CodeLine[],
  },
  features: {
    title: 'Можливості',
    lead: ['Усе необхідне для збірки.', 'Один інструмент. Один конфіг. Один процес.'],
    items: [
      {
        icon: 'terminal',
        title: 'Звичні команди',
        description:
          'Build, run, test, clean, add, fmt та інші. Жодних загадкових ланцюжків команд.',
      },
      {
        icon: 'gitBranch',
        title: 'Залежності, що просто працюють',
        description:
          'Використовуйте локальні шляхи, Git-репозиторії або реєстри. DCR забезпечує відтворюваність залежностей за допомогою lock-файлу.',
      },
      {
        icon: 'globe',
        title: 'Збірка для будь-якої платформи',
        description:
          'Збирайте для Linux, Windows, macOS, BSD та інших платформ без переписування конфігурації проєкту.',
      },
      {
        icon: 'codeXml',
        title: 'Працює з вашою IDE',
        description:
          'Генеруйте compile_commands.json і користуйтеся VS Code, CLion або будь-яким іншим редактором.',
      },
      {
        icon: 'fileCog',
        title: 'Один файл проєкту',
        description:
          'Зберігайте конфігурацію збірки в dcr.toml. Жодних розкиданих скриптів. Жодних розкопок у конфігурації.',
      },
      {
        icon: 'bookOpen',
        title: 'Документація в комплекті',
        description:
          'Потрібна допомога офлайн? man dcr вас виручить.',
      },
    ],
  },
  quickStart: {
    title: 'Швидкий старт',
    lead: 'Запустіть свій C/C++ проєкт менш ніж за хвилину.',
    steps: [
      {
        number: '1',
        title: 'Ініціалізація',
        description: 'Створіть чистий C/C++ робочий простір зі стандартною структурою каталогів.',
        terminal: {
          title: 'Термінал',
          lines: [
            { segments: [{ text: '$', tone: 'prompt' }, { text: ' dcr new myapp' }] },
            {
              segments: [
                { text: 'Creating a Project `' },
                { text: 'myapp', tone: 'cyan' },
                { text: '`...\nProject `' },
                { text: 'myapp', tone: 'green' },
                { text: '` successfully created\n\n' },
                { text: 'Next step:\n', tone: 'green' },
                { text: '    cd myapp\n    dcr run', tone: 'cyan' },
              ],
            },
            { segments: [{ text: '$', tone: 'prompt' }, { text: ' cd myapp' }] },
          ],
        },
      },
      {
        number: '2',
        title: 'Налаштування',
        description: 'Проста й зрозуміла конфігурація. Синтаксис CMake не потрібен.',
        terminal: {
          title: 'nvim dcr.toml',
          lines: [
            {
              segments: [
                { text: '[package]\n', tone: 'amber' },
                { text: 'name = ' },
                { text: '"myapp"\n', tone: 'green' },
                { text: 'version = ' },
                { text: '"0.1.0"\n', tone: 'green' },
                { text: 'dcr-version = ' },
                { text: '"0.9.1"\n', tone: 'green' },
                { text: '\n[build]\n', tone: 'amber' },
                { text: 'language = ' },
                { text: '"c"\n', tone: 'green' },
                { text: 'standard = ' },
                { text: '"c11"\n', tone: 'green' },
                { text: 'compiler = ' },
                { text: '"clang"\n', tone: 'green' },
                { text: 'kind = ' },
                { text: '"bin"\n', tone: 'green' },
                { text: '\n[dependencies]', tone: 'amber' },
              ],
            },
          ],
        },
      },
      {
        number: '3',
        title: 'Запуск',
        description: 'Одна команда, щоб зібрати залежності та запустити виконуваний файл.',
        terminal: {
          title: 'Термінал',
          lines: [
            { segments: [{ text: '$', tone: 'prompt' }, { text: ' dcr run' }] },
            {
              segments: [
                { text: '  ' },
                { text: 'project', tone: 'cyan' },
                { text: '   myapp  (debug)\n  ' },
                { text: 'compile', tone: 'green' },
                { text: '   myapp v0.1.0  [1/1]\n  ' },
                { text: 'done', tone: 'green' },
                { text: '      in 0.24s\n  ' },
                { text: 'run', tone: 'green' },
                { text: '       target/debug/myapp\nHello World!' },
              ],
            },
          ],
        },
      },
    ],
    cta: {
      question: 'Потрібні власні прапорці збірки, робота з Qt / MO або bare-metal середовища?',
      action: 'Вивчити документацію',
    },
  },
  download: {
    title: 'Завантажити',
    lead: 'Готові до збірки?',
    platforms: [
      {
        id: 'linux',
        label: 'Linux',
        commands: ['curl -fsSL https://sh.dcr-tool.ru | sh'],
      },
      {
        id: 'windows',
        label: 'Windows',
        commands: ['irm https://ps1.dcr-tool.ru | iex'],
      },
      {
        id: 'macos',
        label: 'macOS',
        commands: ['curl -fsSL https://sh.dcr-tool.ru | sh'],
      },
      {
        id: 'package-manager',
        label: 'Менеджер пакунків',
        commands: [
          'yay -S dcr',
          'brew tap dexoron/dexoron && brew install dcr',
          'sudo snap install dcrup',
          'nix profile install github:dexoron/dcr',
          'cargo install dcr',
        ],
      },
    ],
    then: 'Далі:',
    verifyCommand: 'dcr --version',
    copy: 'Копіювати',
    copied: 'Скопійовано в буфер обміну',
    note: 'DCR — відсутня ланка між C/C++ та адекватним процесом збірки.',
  },
  footer: {
    license: 'GPL-3.0 · Не поширюється на проєкти, зібрані за допомогою DCR',
    copyright: '(c) Dexoron.tech 2026',
  },
};

export default uk;
