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
}

/**
 * Shape of every `src/i18n/<locale>.json` dictionary. Static terminal output,
 * commands, and component metadata live outside these Crowdin-managed files.
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
  };
  features: {
    title: string;
    lead: string[];
    items: Array<{
      title: string;
      description: string;
    }>;
  };
  quickStart: {
    title: string;
    lead: string;
    steps: Array<{
      title: string;
      description: string;
      terminal: Pick<TerminalContent, 'title'>;
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
      label: string;
    }>;
    then: string;
    copy: string;
    copied: string;
    note: string;
  };
  footer: {
    license: string;
    copyright: string;
  };
}
