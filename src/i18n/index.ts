import en from './en';

export const languages = {
  en: 'English',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

const dictionaries = { en } satisfies Record<Lang, typeof en>;

export type Dictionary = typeof en;

export function useTranslations(lang: Lang = defaultLang): Dictionary {
  return dictionaries[lang];
}
