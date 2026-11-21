import en from "./en";

// Europe
import de from "./de";
import es from "./es";
import fr from "./fr";
import pl from "./pl";
import pt from "./pt";
import ru from "./ru";
import tr from "./tr";
import uk from "./uk";

// Asia
import ja from "./ja";
import ko from "./ko";
import zh from "./zh";

export const languages = {
  en: "English",

  // Europe
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  pl: "Polski",
  pt: "Português",
  ru: "Русский",
  tr: "Türkçe",
  uk: "Українська",

  // Asia
  ja: "日本語",
  ko: "한국어",
  zh: "中文",
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = "en";

const dictionaries = {
  en,
  de,
  es,
  fr,
  pl,
  pt,
  ru,
  tr,
  uk,
  ja,
  ko,
  zh,
} satisfies Record<Lang, typeof en>;

export type Dictionary = typeof en;

export function useTranslations(lang: Lang = defaultLang): Dictionary {
  return dictionaries[lang];
}

export function isLang(value: string): value is Lang {
  return Object.prototype.hasOwnProperty.call(dictionaries, value);
}

/**
 * Build a URL for a localized page.
 * English lives at the site root, every other locale at /<code>/.
 */
export function localizedPath(lang: Lang, path = ""): string {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const clean = path.replace(/^\/+/, "");
  const prefix = lang === defaultLang ? "" : `${lang}/`;

  return `${base}${prefix}${clean}`;
}
