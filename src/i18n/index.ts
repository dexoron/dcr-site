import enData from './en.json';
import enSimpleData from './en-simple.json';

// Europe
import deDEData from './de-DE.json';
import esESData from './es-ES.json';
import frFRData from './fr-FR.json';
import plPLData from './pl-PL.json';
import ptBRData from './pt-BR.json';
import ruRUData from './ru-RU.json';
import trTRData from './tr-TR.json';
import ukUAData from './uk-UA.json';

// Asia
import jaJPData from './ja-JP.json';
import koKRData from './ko-KR.json';
import zhCNData from './zh-CN.json';
import { defaultLang, locales, type Lang } from './locales';
import type { Dictionary } from './types';

export { defaultLang, locales };
export type { Lang };
export type {
  CodeLine,
  CodeSegment,
  Dictionary,
  TerminalContent,
  Tone,
} from './types';

// The JSON files are validated by `scripts/check-i18n.ts`, which runs as part of
// `npm run check`, so these assertions only undo JSON's widened string types.
const en = enData as Dictionary;
const enSimple = enSimpleData as Dictionary;
const deDE = deDEData as Dictionary;
const esES = esESData as Dictionary;
const frFR = frFRData as Dictionary;
const plPL = plPLData as Dictionary;
const ptBR = ptBRData as Dictionary;
const ruRU = ruRUData as Dictionary;
const trTR = trTRData as Dictionary;
const ukUA = ukUAData as Dictionary;
const jaJP = jaJPData as Dictionary;
const koKR = koKRData as Dictionary;
const zhCN = zhCNData as Dictionary;

const dictionaries: Record<Lang, Dictionary> = {
  en,
  'en-Simple': enSimple,

  // Europe
  'de-DE': deDE,
  'es-ES': esES,
  'fr-FR': frFR,
  'pl-PL': plPL,
  'pt-BR': ptBR,
  'ru-RU': ruRU,
  'tr-TR': trTR,
  'uk-UA': ukUA,

  // Asia
  'ja-JP': jaJP,
  'ko-KR': koKR,
  'zh-CN': zhCN,
};

export const languages = Object.fromEntries(
  Object.entries(locales).map(([code, meta]) => [code, meta.label]),
) as Record<Lang, string>;

export function useTranslations(lang: Lang = defaultLang): Dictionary {
  return dictionaries[lang];
}

export function isLang(value: string): value is Lang {
  return Object.prototype.hasOwnProperty.call(locales, value);
}

/**
 * Build a URL for a localized page.
 * English lives at the site root, every other locale at /<code>/.
 */
export function localizedPath(lang: Lang, path = ''): string {
  const base = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const clean = path.replace(/^\/+/, '');
  const prefix = lang === defaultLang ? '' : `${lang}/`;

  return `${base}${prefix}${clean}`;
}
