import type { CodeLine, Dictionary } from './en';

// Translated with the help of Claude Sonnet 5.5. Native-speaker review welcome.
const pt: Dictionary = {
  meta: {
    lang: 'pt-BR',
    title: 'DCR — Ferramenta de build estilo Cargo para C/C++',
    description:
      'O DCR traz um fluxo de trabalho moderno e previsível para C e C++. Defina seu projeto uma vez, gerencie dependências e compile com os mesmos comandos simples em qualquer lugar.',
  },
  nav: {
    home: 'Início',
    documentation: 'Documentação',
    download: 'Baixar',
    support: 'Suporte',
    github: 'GitHub',
    donate: 'Doar',
    language: 'Português',
    menu: 'Menu',
  },
  hero: {
    titleLines: ['Compile C/C++ sem a dor de cabeça', 'do sistema de build.'],
    description:
      'O DCR traz um fluxo de trabalho moderno e previsível para C e C++. Defina seu projeto uma vez, gerencie dependências e compile com os mesmos comandos simples em qualquer lugar.',
    primaryAction: 'Começar',
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
    title: 'Recursos',
    lead: ['Tudo o que você precisa para compilar.', 'Uma ferramenta. Uma configuração. Um fluxo de trabalho.'],
    items: [
      {
        icon: 'terminal',
        title: 'Comandos familiares',
        description:
          'Build, run, test, clean, add, fmt e muito mais. Sem cadeias de comandos misteriosas.',
      },
      {
        icon: 'gitBranch',
        title: 'Dependências que simplesmente funcionam',
        description:
          'Use caminhos locais, repositórios Git ou registries. O DCR mantém suas dependências reproduzíveis com um arquivo de lock.',
      },
      {
        icon: 'globe',
        title: 'Compile para qualquer lugar',
        description:
          'Tenha como alvo Linux, Windows, macOS, BSD e outras plataformas sem reescrever a configuração do projeto.',
      },
      {
        icon: 'codeXml',
        title: 'Funciona com sua IDE',
        description:
          'Gere o compile_commands.json e continue usando VS Code, CLion ou o editor que preferir.',
      },
      {
        icon: 'fileCog',
        title: 'Um único arquivo de projeto',
        description:
          'Mantenha a configuração de build no dcr.toml. Sem scripts espalhados. Sem arqueologia de configuração.',
      },
      {
        icon: 'bookOpen',
        title: 'Documentação incluída',
        description:
          'Precisa de ajuda offline? O man dcr resolve.',
      },
    ],
  },
  quickStart: {
    title: 'Início rápido',
    lead: 'Rode seu projeto C/C++ em menos de um minuto.',
    steps: [
      {
        number: '1',
        title: 'Inicializar',
        description: 'Crie um workspace C/C++ limpo com a estrutura de diretórios padrão.',
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
        title: 'Declarar',
        description: 'Configuração simples e legível. Sem precisar de sintaxe CMake.',
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
        title: 'Executar',
        description: 'Um único comando para compilar as dependências e executar seu binário.',
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
      question: 'Precisa de flags de build personalizadas, suporte a Qt / MO ou setups bare-metal?',
      action: 'Explorar a documentação',
    },
  },
  download: {
    title: 'Baixar',
    lead: 'Pronto para compilar?',
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
        label: 'Gerenciador de pacotes',
        commands: [
          'yay -S dcr',
          'brew tap dexoron/dexoron && brew install dcr',
          'sudo snap install dcrup',
          'nix profile install github:dexoron/dcr',
          'cargo install dcr',
        ],
      },
    ],
    then: 'Depois:',
    verifyCommand: 'dcr --version',
    copy: 'Copiar',
    copied: 'Copiado para a área de transferência',
    note: 'DCR — a peça que faltava entre C/C++ e um fluxo de build saudável.',
  },
  footer: {
    license: 'GPL-3.0 · Não se aplica a projetos compilados com o DCR',
    copyright: '(c) Dexoron.tech 2026',
  },
};

export default pt;
