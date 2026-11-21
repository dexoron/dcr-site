import type { CodeLine, Dictionary } from './en';

// Translated with the help of Claude Sonnet 5.5. Native-speaker review welcome.
const fr: Dictionary = {
  meta: {
    lang: 'fr',
    title: 'DCR — Outil de build de type Cargo pour C/C++',
    description:
      'DCR apporte à C et C++ un flux de travail moderne et prévisible. Définissez votre projet une seule fois, gérez vos dépendances et compilez avec les mêmes commandes simples, où que vous soyez.',
  },
  nav: {
    home: 'Accueil',
    documentation: 'Documentation',
    download: 'Télécharger',
    support: 'Support',
    github: 'GitHub',
    donate: 'Faire un don',
    language: 'Français',
    menu: 'Menu',
  },
  hero: {
    titleLines: ['Compilez du C/C++ sans le casse-tête', 'du système de build.'],
    description:
      'DCR apporte à C et C++ un flux de travail moderne et prévisible. Définissez votre projet une seule fois, gérez vos dépendances et compilez avec les mêmes commandes simples, où que vous soyez.',
    primaryAction: 'Commencer',
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
    title: 'Fonctionnalités',
    lead: ['Tout ce qu\'il faut pour compiler.', 'Un outil. Une configuration. Un flux de travail.'],
    items: [
      {
        icon: 'terminal',
        title: 'Des commandes familières',
        description:
          'Build, run, test, clean, add, fmt, et bien plus. Pas de chaînes de commandes mystérieuses.',
      },
      {
        icon: 'gitBranch',
        title: 'Des dépendances qui fonctionnent, tout simplement',
        description:
          'Utilisez des chemins locaux, des dépôts Git ou des registres. DCR garantit la reproductibilité de vos dépendances grâce à un fichier de verrouillage (lock).',
      },
      {
        icon: 'globe',
        title: 'Compilez pour toutes les plateformes',
        description:
          'Ciblez Linux, Windows, macOS, BSD et d\'autres plateformes sans réécrire la configuration de votre projet.',
      },
      {
        icon: 'codeXml',
        title: 'Compatible avec votre IDE',
        description:
          'Générez compile_commands.json et continuez à utiliser VS Code, CLion ou l\'éditeur de votre choix.',
      },
      {
        icon: 'fileCog',
        title: 'Un seul fichier de projet',
        description:
          'Gardez votre configuration de build dans dcr.toml. Pas de scripts éparpillés. Pas d\'archéologie de configuration.',
      },
      {
        icon: 'bookOpen',
        title: 'Documentation incluse',
        description:
          'Besoin d\'aide hors ligne ? man dcr s\'en charge.',
      },
    ],
  },
  quickStart: {
    title: 'Démarrage rapide',
    lead: 'Lancez votre projet C/C++ en moins d\'une minute.',
    steps: [
      {
        number: '1',
        title: 'Initialiser',
        description: 'Créez un espace de travail C/C++ propre avec une structure de répertoires standard.',
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
        title: 'Déclarer',
        description: 'Une configuration simple et lisible. Aucune syntaxe CMake requise.',
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
        title: 'Exécuter',
        description: 'Une seule commande pour compiler les dépendances et lancer votre exécutable.',
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
      question: 'Besoin de flags de build personnalisés, de la prise en charge de Qt / MO ou de configurations bare-metal ?',
      action: 'Explorer la documentation',
    },
  },
  download: {
    title: 'Télécharger',
    lead: 'Prêt à compiler ?',
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
        label: 'Gestionnaire de paquets',
        commands: [
          'yay -S dcr',
          'brew tap dexoron/dexoron && brew install dcr',
          'sudo snap install dcrup',
          'nix profile install github:dexoron/dcr',
          'cargo install dcr',
        ],
      },
    ],
    then: 'Ensuite :',
    verifyCommand: 'dcr --version',
    copy: 'Copier',
    copied: 'Copié dans le presse-papiers',
    note: 'DCR — le chaînon manquant entre C/C++ et un flux de build sain.',
  },
  footer: {
    license: 'GPL-3.0 · Ne couvre pas les projets compilés avec DCR',
    copyright: '(c) Dexoron.tech 2026',
  },
};

export default fr;
