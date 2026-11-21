import type { CodeLine, Dictionary } from './en';

// Translated with the help of Claude Sonnet 5.5. Native-speaker review welcome.
const ru: Dictionary = {
  meta: {
    lang: 'ru',
    title: 'DCR — Cargo-подобная система сборки для C/C++',
    description:
      'DCR приносит в C и C++ современный и предсказуемый рабочий процесс. Опишите проект один раз, управляйте зависимостями и собирайте его одними и теми же простыми командами где угодно.',
  },
  nav: {
    home: 'Главная',
    documentation: 'Документация',
    download: 'Скачать',
    support: 'Поддержка',
    github: 'GitHub',
    donate: 'Поддержать',
    language: 'Русский',
    menu: 'Меню',
  },
  hero: {
    titleLines: ['Собирайте C/C++ без', 'головной боли со сборкой.'],
    description:
      'DCR приносит в C и C++ современный и предсказуемый рабочий процесс. Опишите проект один раз, управляйте зависимостями и собирайте его одними и теми же простыми командами где угодно.',
    primaryAction: 'Начать',
    secondaryAction: 'GitHub',
    license: 'GPLv3',
  },
  terminal: {
    title: 'Терминал',
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
    title: 'Возможности',
    lead: ['Всё необходимое для сборки.', 'Один инструмент. Один конфиг. Один процесс.'],
    items: [
      {
        icon: 'terminal',
        title: 'Привычные команды',
        description:
          'Build, run, test, clean, add, fmt и многое другое. Никаких загадочных цепочек команд.',
      },
      {
        icon: 'gitBranch',
        title: 'Зависимости, которые просто работают',
        description:
          'Используйте локальные пути, Git-репозитории или реестры. DCR обеспечивает воспроизводимость зависимостей с помощью lock-файла.',
      },
      {
        icon: 'globe',
        title: 'Сборка для любой платформы',
        description:
          'Собирайте для Linux, Windows, macOS, BSD и других платформ без переписывания конфигурации проекта.',
      },
      {
        icon: 'codeXml',
        title: 'Работает с вашей IDE',
        description:
          'Генерируйте compile_commands.json и продолжайте пользоваться VS Code, CLion или любым другим редактором.',
      },
      {
        icon: 'fileCog',
        title: 'Один файл проекта',
        description:
          'Храните конфигурацию сборки в dcr.toml. Никаких разбросанных скриптов. Никаких раскопок в конфигурации.',
      },
      {
        icon: 'bookOpen',
        title: 'Документация в комплекте',
        description: 'Нужна помощь без интернета? man dcr вас выручит.',
      },
    ],
  },
  quickStart: {
    title: 'Быстрый старт',
    lead: 'Запустите свой C/C++ проект меньше чем за минуту.',
    steps: [
      {
        number: '1',
        title: 'Инициализация',
        description: 'Создайте чистое C/C++ рабочее пространство со стандартной структурой каталогов.',
        terminal: {
          title: 'Терминал',
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
        title: 'Настройка',
        description: 'Простая и понятная конфигурация. Синтаксис CMake не нужен.',
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
        description: 'Одна команда, чтобы собрать зависимости и запустить исполняемый файл.',
        terminal: {
          title: 'Терминал',
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
      question: 'Нужны особые флаги сборки, работа с Qt / MO или bare-metal окружения?',
      action: 'Изучить документацию',
    },
  },
  download: {
    title: 'Скачать',
    lead: 'Готовы к сборке?',
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
        label: 'Пакетный менеджер',
        commands: [
          'yay -S dcr',
          'brew tap dexoron/dexoron && brew install dcr',
          'sudo snap install dcrup',
          'nix profile install github:dexoron/dcr',
          'cargo install dcr',
        ],
      },
    ],
    then: 'Затем:',
    verifyCommand: 'dcr --version',
    copy: 'Копировать',
    copied: 'Скопировано в буфер обмена',
    note: 'DCR — недостающее звено между C/C++ и адекватным процессом сборки.',
  },
  footer: {
    license: 'GPL-3.0 · Не распространяется на проекты, собранные с помощью DCR',
    copyright: '(c) Dexoron.tech 2026',
  },
};

export default ru;