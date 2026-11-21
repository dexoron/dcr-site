import type { CodeLine, Dictionary } from './en';

// Translated with the help of Claude Sonnet 5.5. Native-speaker review welcome.
const es: Dictionary = {
  meta: {
    lang: 'es',
    title: 'DCR — Herramienta de compilación estilo Cargo para C/C++',
    description:
      'DCR aporta un flujo de trabajo moderno y predecible a C y C++. Define tu proyecto una vez, gestiona dependencias y compila con los mismos comandos sencillos estés donde estés.',
  },
  nav: {
    home: 'Inicio',
    documentation: 'Documentación',
    download: 'Descargar',
    support: 'Soporte',
    github: 'GitHub',
    donate: 'Donar',
    language: 'Español',
    menu: 'Menú',
  },
  hero: {
    titleLines: ['Compila C/C++ sin el dolor de cabeza', 'del sistema de compilación.'],
    description:
      'DCR aporta un flujo de trabajo moderno y predecible a C y C++. Define tu proyecto una vez, gestiona dependencias y compila con los mismos comandos sencillos estés donde estés.',
    primaryAction: 'Empezar',
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
    title: 'Características',
    lead: ['Todo lo que necesitas para compilar.', 'Una herramienta. Una configuración. Un flujo de trabajo.'],
    items: [
      {
        icon: 'terminal',
        title: 'Comandos familiares',
        description:
          'Build, run, test, clean, add, fmt y más. Sin cadenas de comandos misteriosas.',
      },
      {
        icon: 'gitBranch',
        title: 'Dependencias que simplemente funcionan',
        description:
          'Usa rutas locales, repositorios Git o registros. DCR mantiene tus dependencias reproducibles con un archivo de bloqueo (lock).',
      },
      {
        icon: 'globe',
        title: 'Compila para cualquier lugar',
        description:
          'Apunta a Linux, Windows, macOS, BSD y otras plataformas sin reescribir la configuración de tu proyecto.',
      },
      {
        icon: 'codeXml',
        title: 'Funciona con tu IDE',
        description:
          'Genera compile_commands.json y sigue usando VS Code, CLion o el editor que prefieras.',
      },
      {
        icon: 'fileCog',
        title: 'Un único archivo de proyecto',
        description:
          'Mantén la configuración de compilación en dcr.toml. Sin scripts dispersos. Sin arqueología de configuración.',
      },
      {
        icon: 'bookOpen',
        title: 'Documentación incluida',
        description:
          '¿Necesitas ayuda sin conexión? man dcr te lo resuelve.',
      },
    ],
  },
  quickStart: {
    title: 'Inicio rápido',
    lead: 'Pon en marcha tu proyecto C/C++ en menos de un minuto.',
    steps: [
      {
        number: '1',
        title: 'Inicializar',
        description: 'Crea un espacio de trabajo C/C++ limpio con la estructura de directorios estándar.',
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
        description: 'Configuración sencilla y legible. No necesitas sintaxis de CMake.',
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
        title: 'Ejecutar',
        description: 'Un solo comando para compilar las dependencias y ejecutar tu binario.',
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
      question: '¿Necesitas flags de compilación personalizados, soporte para Qt / MO o entornos bare-metal?',
      action: 'Explorar la documentación',
    },
  },
  download: {
    title: 'Descargar',
    lead: '¿Listo para compilar?',
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
        label: 'Gestor de paquetes',
        commands: [
          'yay -S dcr',
          'brew tap dexoron/dexoron && brew install dcr',
          'sudo snap install dcrup',
          'nix profile install github:dexoron/dcr',
          'cargo install dcr',
        ],
      },
    ],
    then: 'Después:',
    verifyCommand: 'dcr --version',
    copy: 'Copiar',
    copied: 'Copiado al portapapeles',
    note: 'DCR — la pieza que faltaba entre C/C++ y un flujo de compilación sensato.',
  },
  footer: {
    license: 'GPL-3.0 · No se aplica a los proyectos compilados con DCR',
    copyright: '(c) Dexoron.tech 2026',
  },
};

export default es;
