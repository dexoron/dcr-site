# DCR Website

Landing page for [DCR](https://github.com/dexoron/dcr) — a Cargo-style build tool for C/C++ projects.

The site is built with Astro, TypeScript and vanilla CSS.

## Requirements

- Node.js 22 or newer (CI uses `node:22`)
- npm

## Getting started

```sh
npm install
npm run dev
```

The development server runs at <http://localhost:4321>.

`npm run dev` first refreshes the DCR version data from GitHub (see [Version and stars](#version-and-stars)).

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Astro development server |
| `npm run build` | Build the static site into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run check` | Run Astro diagnostics and the i18n consistency check |
| `npm run check:i18n` | Validate the locale dictionaries only |
| `npm run fetch:dcr` | Refresh `src/data/dcr.json` manually |

`predev`, `prebuild` and `precheck` run the version fetch automatically.

## Project structure

```text
.
├── public/
│   ├── assets/brand/dcr-icon.svg   # Original DCR icon
│   ├── favicon.svg                 # Same icon used as favicon
│   └── fonts/                      # Self-hosted variable fonts
├── scripts/
│   ├── fetch-dcr-version.ts        # Build-time GitHub data
│   ├── check-i18n.ts               # Locale consistency validation
│   └── crowdin-pull.sh             # Optional Crowdin pull (token-gated)
├── src/
│   ├── components/                 # Header, Hero, Features, Quick Start, Download, Footer
│   ├── data/
│   │   ├── fallback-dcr.json       # Committed placeholder data
│   │   └── dcr.json                # Generated, gitignored
│   ├── i18n/
│   │   ├── en.json                 # Crowdin source dictionary
│   │   ├── <locale>.json           # Translated dictionaries
│   │   ├── locales.ts              # URL codes, native labels, html lang
│   │   ├── types.ts                # Dictionary shape
│   │   └── index.ts                # Dictionaries, useTranslations, localizedPath
│   ├── layouts/                    # BaseLayout and LandingPage
│   ├── pages/
│   │   ├── index.astro             # English at /
│   │   └── [lang]/index.astro      # Other locales at /<code>/
│   └── styles/                     # Global CSS and design tokens
├── astro.config.mjs
├── crowdin.yml
├── package.json
└── tsconfig.json
```

## Version and stars

The header version and the hero star count are not hardcoded. Before `dev`, `build` and `check`, `scripts/fetch-dcr-version.ts` resolves them in this order:

1. The latest published GitHub Release, if it has a semver tag.
2. Otherwise the newest semver tag in the repository.
3. If the GitHub API is unavailable, `git ls-remote --tags`.
4. If every source fails, the committed fallback in `src/data/fallback-dcr.json` is used: `v0.0.0` and `0` stars.

The resolved values are written to `src/data/dcr.json`, which is generated and gitignored. GitHub is never called from the browser.

## Languages

The site is multilingual. English is the default locale and is served at `/`; every other locale lives at `/<code>/`, where `<code>` is the Crowdin locale code:

| Code | Language | URL |
| --- | --- | --- |
| `en` | English | `/` |
| `de-DE` | Deutsch | `/de-DE/` |
| `es-ES` | Español | `/es-ES/` |
| `fr-FR` | Français | `/fr-FR/` |
| `pl-PL` | Polski | `/pl-PL/` |
| `pt-BR` | Português | `/pt-BR/` |
| `ru-RU` | Русский | `/ru-RU/` |
| `tr-TR` | Türkçe | `/tr-TR/` |
| `uk-UA` | Українська | `/uk-UA/` |
| `ja-JP` | 日本語 | `/ja-JP/` |
| `ko-KR` | 한국어 | `/ko-KR/` |
| `zh-CN` | 中文 | `/zh-CN/` |

### Data and types

- Copy lives in `src/i18n/<code>.json` and matches the `Dictionary` type in `src/i18n/types.ts`.
- Locale metadata lives in `src/i18n/locales.ts`: the URL code, the native label for the switcher, and the BCP 47 `htmlLang` used by `<html lang>` and `hreflang`. None of it is translatable, so none of it reaches Crowdin.
- `src/i18n/index.ts` binds the JSON files to `locales.ts` and exposes `useTranslations()`, `languages`, `locales` and `localizedPath()`.
- `src/pages/[lang]/index.astro` generates every non-default locale from `locales.ts`.
- JSON imports are cast to `Dictionary` because JSON widens literal strings; `scripts/check-i18n.ts` is the real validator and runs inside `npm run check`.

### Validating translations

`npm run check:i18n` (also part of `npm run check`) verifies that every locale:

- has the same key structure and value types as `en.json`, with no missing or unexpected keys;
- uses only valid `tone` values;
- keeps terminal code samples and install commands identical to English, so code never drifts between locales;
- has no duplicate platform ids and a valid `htmlLang`.

Any locale file that is not registered in `locales.ts`, or any registered locale without a JSON file, fails the check.

### Automatic language detection

On the English root (`/`), a small inline script reads `navigator.languages` and redirects visitors to the best matching locale unless they have already made an explicit choice. It runs in `<head>` before the page is painted, and only on the default-language root; direct links to `/<code>/` are never redirected.

- Exact tags win, then the primary subtag, then the first locale with the same subtag: `ru-RU` → `/ru-RU/`, `ru` → `/ru-RU/`, `pt-BR` → `/pt-BR/`, `pt` → `/pt-BR/`, `zh-TW` → `/zh-CN/`, `de-AT` → `/de-DE/`.
- Unsupported browser languages leave the visitor on English.
- An explicit choice in the language switcher is stored in `localStorage` under `dcr-lang` and always wins over detection. Choosing English opts out of detection.
- Query strings and hashes are preserved: `/?utm=…#download` becomes `/ru-RU/?utm=…#download`.
- Detection is client-side because the site is static; there is no `Accept-Language` server hook.

To add a locale, create `src/i18n/<code>.json` and add the code, native label and `htmlLang` to `src/i18n/locales.ts`. The route, switcher and browser-language matching update on the next build without further changes.

## Crowdin

`crowdin.yml` maps the source dictionary to every locale file:

```yaml
files:
  - source: /src/i18n/en.json
    translation: /src/i18n/%locale%.json
    type: json
```

Because the file names use Crowdin locale codes (`ru-RU`, `pt-BR`, `zh-CN`, …), no per-language configuration is needed. `%locale%` expands to the code that is also used in `locales.ts`.

- English is the only source language. Edit `src/i18n/en.json`, push, and let Crowdin pick it up; do not translate `en.json` by hand.
- `scripts/crowdin-pull.sh` downloads the latest translations before a build. It reads `CROWDIN_TOKEN` and `CROWDIN_PROJECT_ID` and exits quietly when they are not set, so local builds and forks keep working.
- In GitLab, define `CROWDIN_TOKEN` (masked) and `CROWDIN_PROJECT_ID` as CI/CD variables. The build job pulls translations, runs `npm run check`, then builds.
- The check in `npm run check:i18n` fails when a pulled locale is not registered in `locales.ts`, so a new Crowdin language is added consciously rather than silently ignored.

## Assets and fonts

- The original DCR icon is stored at `public/assets/brand/dcr-icon.svg` and reused as `public/favicon.svg`.
- Fonts are self-hosted as variable WOFF2 files in `public/fonts/`: Onest, Unbounded and JetBrains Mono. All three are distributed under the SIL Open Font License.

## Deployment

`.gitlab-ci.yml` builds the site and publishes it with GitLab Pages:

- image: `node:22`
- build: `npm ci` and `npm run build`
- artifact: `dist/` moved to `public/`

Asset URLs are root-absolute (`/fonts`, `/assets`, `/favicon.svg`), so the site is intended to be served from a domain root. When hosting under a subpath, configure Astro's `base` option and prefix these URLs accordingly.

## License

GPL-3.0. See [LICENSE](LICENSE).
