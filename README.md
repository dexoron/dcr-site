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
| `npm run check` | Run Astro and TypeScript diagnostics |
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
│   └── fetch-dcr-version.ts        # Build-time GitHub data
├── src/
│   ├── components/                 # Header, Hero, Features, Quick Start, Download, Footer
│   ├── data/
│   │   ├── fallback-dcr.json       # Committed placeholder data
│   │   └── dcr.json                # Generated, gitignored
│   ├── i18n/                       # Dictionaries for every locale
│   ├── layouts/                    # BaseLayout and LandingPage
│   ├── pages/
│   │   ├── index.astro             # English at /
│   │   └── [lang]/index.astro      # Other locales at /<code>/
│   └── styles/                     # Global CSS and design tokens
├── astro.config.mjs
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

The site is multilingual. English is the default locale and is served at `/`; every other locale lives at `/<code>/`:

| Code | Language | URL |
| --- | --- | --- |
| `en` | English | `/` |
| `ru` | Русский | `/ru/` |
| `de` | Deutsch | `/de/` |
| `pl` | Polski | `/pl/` |
| `pt` | Português | `/pt/` |
| `uk` | Українська | `/uk/` |
| `zh` | 中文 | `/zh/` |
| `es` | Español | `/es/` |
| `fr` | Français | `/fr/` |
| `ja` | 日本語 | `/ja/` |
| `ko` | 한국어 | `/ko/` |
| `tr` | Türkçe | `/tr/` |

The `pt` and `zh` dictionaries declare `pt-BR` and `zh-CN` in `meta.lang`; those tags are used for `<html lang>` and the `hreflang` alternates.

- All copy lives in `src/i18n/<code>.ts` and implements the `Dictionary` type exported by `src/i18n/en.ts`.
- `src/i18n/index.ts` registers the dictionaries in the `languages` map and exposes `useTranslations()` and `localizedPath()`.
- `src/pages/[lang]/index.astro` generates every non-default locale automatically from that map.
- The header language menu links between locales and the document head emits `hreflang` alternates.

### Automatic language detection

On the English root (`/`), a small inline script reads `navigator.languages` and redirects visitors to the best matching locale unless they have already made an explicit choice. It runs in `<head>` before the page is painted, and only on the default-language root; direct links to `/<code>/` are never redirected.

- Matching uses the primary subtag: `ru-RU` → `ru`, `pt-BR` → `pt`, `zh-TW` → `zh`, `de-AT` → `de`, and so on.
- Unsupported browser languages leave the visitor on English.
- An explicit choice in the language switcher is stored in `localStorage` under `dcr-lang` and always wins over detection. Choosing English opts out of detection.
- Query strings and hashes are preserved: `/?utm=…#download` becomes `/ru/?utm=…#download`.
- Detection is client-side because the site is static; there is no `Accept-Language` server hook.

To add a locale, create `src/i18n/<code>.ts`, import it in `src/i18n/index.ts`, and add its native name to `languages`. The route and browser-language matching update on the next build without further changes.

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
