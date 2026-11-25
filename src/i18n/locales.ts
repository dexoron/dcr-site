/**
 * Locale metadata that is not translated and therefore never reaches Crowdin.
 *
 * `code`  — the URL segment and the JSON file name (`src/i18n/<code>.json`).
 * `label` — the native name shown in the language switcher.
 * `htmlLang` — the BCP 47 tag used for `<html lang>` and `hreflang`.
 *
 * The codes match the Crowdin locale codes so that `crowdin.yml` can write
 * `src/i18n/%locale%.json` without any mapping.
 */
export const locales = {
  en: { label: 'English', htmlLang: 'en' },
  'en-Simple': { label: 'English (Simple)', htmlLang: 'en' },

  // Europe
  'de-DE': { label: 'Deutsch', htmlLang: 'de-DE' },
  'es-ES': { label: 'Español', htmlLang: 'es-ES' },
  'fr-FR': { label: 'Français', htmlLang: 'fr-FR' },
  'pl-PL': { label: 'Polski', htmlLang: 'pl-PL' },
  'pt-BR': { label: 'Português', htmlLang: 'pt-BR' },
  'ru-RU': { label: 'Русский', htmlLang: 'ru-RU' },
  'tr-TR': { label: 'Türkçe', htmlLang: 'tr-TR' },
  'uk-UA': { label: 'Українська', htmlLang: 'uk-UA' },

  // Asia
  'ja-JP': { label: '日本語', htmlLang: 'ja-JP' },
  'ko-KR': { label: '한국어', htmlLang: 'ko-KR' },
  'zh-CN': { label: '中文', htmlLang: 'zh-CN' },
} as const;

export type Lang = keyof typeof locales;

export const defaultLang: Lang = 'en';
