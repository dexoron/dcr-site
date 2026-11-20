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
│   ├── i18n/                       # English dictionary and helpers
│   ├── layouts/                    # Base document layout
│   ├── pages/                      # index.astro
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

## Content and i18n

- The site ships with English only.
- All copy lives in `src/i18n/en.ts`; components read it through `useTranslations()`.
- Additional locales can be added to `languages` in `src/i18n/index.ts` without changing components.

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
