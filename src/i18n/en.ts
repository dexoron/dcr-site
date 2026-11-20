export type Tone = 'default' | 'prompt' | 'cyan' | 'green' | 'muted' | 'amber';

export interface CodeSegment {
  text: string;
  tone?: Tone;
}

export interface CodeLine {
  segments: CodeSegment[];
}

export interface TerminalContent {
  title: string;
  lines: CodeLine[];
}

export interface Dictionary {
  meta: {
    lang: string;
    title: string;
    description: string;
  };
  nav: {
    home: string;
    documentation: string;
    download: string;
    support: string;
    github: string;
    donate: string;
    language: string;
    menu: string;
  };
  hero: {
    titleLines: string[];
    description: string;
    primaryAction: string;
    secondaryAction: string;
    license: string;
  };
  terminal: {
    title: string;
    newProject: CodeLine[];
  };
  features: {
    title: string;
    lead: string[];
    items: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  quickStart: {
    title: string;
    lead: string;
    steps: Array<{
      number: string;
      title: string;
      description: string;
      terminal: TerminalContent;
    }>;
    cta: {
      question: string;
      action: string;
    };
  };
  download: {
    title: string;
    lead: string;
    platforms: Array<{
      id: string;
      label: string;
      commands: string[];
    }>;
    then: string;
    verifyCommand: string;
    copy: string;
    copied: string;
    note: string;
  };
  footer: {
    license: string;
    copyright: string;
  };
}

const en: Dictionary = {
  meta: {
    lang: 'en',
    title: 'DCR — Cargo-style build tool for C/C++',
    description:
      'DCR brings a modern, predictable workflow to C and C++. Define your project once, manage dependencies, and build with the same simple commands wherever you work.',
  },
  nav: {
    home: 'Home',
    documentation: 'Documentation',
    download: 'Download',
    support: 'Support',
    github: 'GitHub',
    donate: 'Donate',
    language: 'English',
    menu: 'Menu',
  },
  hero: {
    titleLines: ['Build C/C++ without the', 'build-system headache.'],
    description:
      'DCR brings a modern, predictable workflow to C and C++. Define your project once, manage dependencies, and build with the same simple commands wherever you work.',
    primaryAction: 'Get started',
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
    title: 'Features',
    lead: ['Everything you need to build.', 'One tool. One config. One workflow.'],
    items: [
      {
        icon: 'terminal',
        title: 'Familiar commands',
        description:
          'Build, run, test, clean, add, fmt, and more. No mysterious command chains.',
      },
      {
        icon: 'gitBranch',
        title: 'Dependencies that just work',
        description:
          'Use local paths, Git repositories, or registries. DCR keeps your dependencies reproducible with a lock file.',
      },
      {
        icon: 'globe',
        title: 'Build for anywhere',
        description:
          'Target Linux, Windows, macOS, BSD, and other platforms without rewriting your project configuration.',
      },
      {
        icon: 'codeXml',
        title: 'Works with your IDE',
        description:
          'Generate compile_commands.json and keep using VS Code, CLion, or whatever editor you prefer.',
      },
      {
        icon: 'fileCog',
        title: 'One project file',
        description:
          'Keep your build configuration in dcr.toml. No scattered scripts. No configuration archaeology.',
      },
      {
        icon: 'bookOpen',
        title: 'Documentation included',
        description: 'Need help offline? man dcr has you covered.',
      },
    ],
  },
  quickStart: {
    title: 'Quick Start',
    lead: 'Get your C/C++ project running in less than a minute.',
    steps: [
      {
        number: '1',
        title: 'Initialize',
        description: 'Create a clean C/C++ workspace with standard directory layout.',
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
        title: 'Declare',
        description: 'Simple human-readable configuration. No CMake syntax needed.',
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
        title: 'Execute',
        description: 'Single command to compile dependencies and run your executable.',
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
      question: 'Need custom build flags, Qt / MO handling, or bare-metal setups?',
      action: 'Explore Documentation',
    },
  },
  download: {
    title: 'Download',
    lead: 'Ready to build?',
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
        label: 'Package Manager',
        commands: [
          'yay -S dcr',
          'brew tap dexoron/dexoron && brew install dcr',
          'sudo snap install dcrup',
          'nix profile install github:dexoron/dcr',
          'cargo install dcr',
        ],
      },
    ],
    then: 'Then:',
    verifyCommand: 'dcr --version',
    copy: 'Copy',
    copied: 'Copied to clipboard',
    note: 'DCR — the missing piece between C/C++ and a sane build workflow.',
  },
  footer: {
    license: 'GPL-3.0 · Does not cover projects built with DCR',
    copyright: '(c) Dexoron.tech 2026',
  },
};

export default en;
