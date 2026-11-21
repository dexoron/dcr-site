import type { CodeLine, Dictionary } from './en';

// Translated with the help of Claude Sonnet 5.5. Native-speaker review welcome.
const pl: Dictionary = {
  meta: {
    lang: 'pl',
    title: 'DCR — narzędzie do budowania C/C++ w stylu Cargo',
    description:
      'DCR wprowadza do C i C++ nowoczesny, przewidywalny sposób pracy. Zdefiniuj projekt raz, zarządzaj zależnościami i buduj tymi samymi prostymi poleceniami wszędzie.',
  },
  nav: {
    home: 'Strona główna',
    documentation: 'Dokumentacja',
    download: 'Pobierz',
    support: 'Wsparcie',
    github: 'GitHub',
    donate: 'Wesprzyj',
    language: 'Polski',
    menu: 'Menu',
  },
  hero: {
    titleLines: ['Buduj C/C++ bez bólu głowy', 'z systemem budowania.'],
    description:
      'DCR wprowadza do C i C++ nowoczesny, przewidywalny sposób pracy. Zdefiniuj projekt raz, zarządzaj zależnościami i buduj tymi samymi prostymi poleceniami wszędzie.',
    primaryAction: 'Zacznij',
    secondaryAction: 'GitHub',
    license: 'GPLv3',
  },
  terminal: {
    title: 'Terminal',
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
    title: 'Funkcje',
    lead: ['Wszystko, czego potrzebujesz do budowania.', 'Jedno narzędzie. Jedna konfiguracja. Jeden przepływ pracy.'],
    items: [
      {
        icon: 'terminal',
        title: 'Znajome polecenia',
        description:
          'Build, run, test, clean, add, fmt i więcej. Żadnych tajemniczych łańcuchów poleceń.',
      },
      {
        icon: 'gitBranch',
        title: 'Zależności, które po prostu działają',
        description:
          'Używaj lokalnych ścieżek, repozytoriów Git lub rejestrów. DCR zapewnia powtarzalność zależności dzięki plikowi lock.',
      },
      {
        icon: 'globe',
        title: 'Buduj na każdą platformę',
        description:
          'Celuj w Linux, Windows, macOS, BSD i inne platformy bez przepisywania konfiguracji projektu.',
      },
      {
        icon: 'codeXml',
        title: 'Działa z Twoim IDE',
        description:
          'Generuj compile_commands.json i nadal używaj VS Code, CLion lub dowolnego ulubionego edytora.',
      },
      {
        icon: 'fileCog',
        title: 'Jeden plik projektu',
        description:
          'Trzymaj konfigurację budowania w dcr.toml. Bez rozrzuconych skryptów. Bez archeologii konfiguracji.',
      },
      {
        icon: 'bookOpen',
        title: 'Dokumentacja w zestawie',
        description:
          'Potrzebujesz pomocy offline? man dcr ci pomoże.',
      },
    ],
  },
  quickStart: {
    title: 'Szybki start',
    lead: 'Uruchom swój projekt C/C++ w mniej niż minutę.',
    steps: [
      {
        number: '1',
        title: 'Inicjalizacja',
        description: 'Utwórz czyste środowisko C/C++ ze standardową strukturą katalogów.',
        terminal: {
          title: 'Terminal',
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
        title: 'Deklaracja',
        description: 'Prosta, czytelna konfiguracja. Bez składni CMake.',
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
        title: 'Uruchomienie',
        description: 'Jedno polecenie kompiluje zależności i uruchamia Twój plik wykonywalny.',
        terminal: {
          title: 'Terminal',
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
      question: 'Potrzebujesz własnych flag budowania, obsługi Qt / MO lub konfiguracji bare-metal?',
      action: 'Przeglądaj dokumentację',
    },
  },
  download: {
    title: 'Pobierz',
    lead: 'Gotowy do budowania?',
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
        label: 'Menedżer pakietów',
        commands: [
          'yay -S dcr',
          'brew tap dexoron/dexoron && brew install dcr',
          'sudo snap install dcrup',
          'nix profile install github:dexoron/dcr',
          'cargo install dcr',
        ],
      },
    ],
    then: 'Następnie:',
    verifyCommand: 'dcr --version',
    copy: 'Kopiuj',
    copied: 'Skopiowano do schowka',
    note: 'DCR — brakujące ogniwo między C/C++ a rozsądnym procesem budowania.',
  },
  footer: {
    license: 'GPL-3.0 · Nie dotyczy projektów zbudowanych za pomocą DCR',
    copyright: '(c) Dexoron.tech 2026',
  },
};

export default pl;
