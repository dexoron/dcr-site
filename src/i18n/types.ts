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

/**
 * Shape of every `src/i18n/<locale>.json` dictionary.
 *
 * Locale metadata (URL code, native label, `lang` attribute) is not part of a
 * dictionary: it lives in `locales.ts`, so it never reaches Crowdin.
 */
export interface Dictionary {
  meta: {
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
