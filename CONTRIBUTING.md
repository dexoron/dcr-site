[ENG](./CONTRIBUTING.md) | [РУС](./CONTRIBUTING_ru.md)

# Contributing Guide

Thanks for helping improve the project.

## Before you start

- The site and docs are built as static output.
- Default site locale: `en` (`/`), Russian locale: `ru` (`/ru/`).
- Docs routes:
  - `en` -> `/docs/`
  - `ru` -> `/ru/docs/`

## Locale structure

### Site locales

- `locales/<lang>/index.json`
- Examples:
  - `locales/en/index.json`
  - `locales/ru/index.json`

### Docs locales

- Markdown sources:
  - `locales/<lang>/docs/**/*.md`
- Docs UI config:
  - `locales/<lang>/docs.config.json`
- Docs locale registry:
  - `locales/docs.locales.json`

## Local setup and build

Install dependencies:

```bash
npm install
```

Build site locales:

```bash
npm run i18n:build
```

Build documentation:

```bash
npm run docs:build
```

Full build:

```bash
npm run build
```

## Adding a new language

1. Create `locales/<lang>/index.json` from `locales/en/index.json`.
2. Create `locales/<lang>/docs/` and add markdown files matching `locales/en/docs/` structure.
3. Create `locales/<lang>/docs.config.json` (copy `locales/en/docs.config.json`).
4. Add the locale to `locales/docs.locales.json`.
5. Add the language to `languageOptions` in `main.js`.
6. Run `npm run build` and verify output.

## Pull request rules

- Keep PRs small and focused.
- Use clear commit messages.
- Avoid mixing refactoring and content changes unless required.
- Make sure `npm run build` passes before opening PR.
- Update `README.md` when docs structure changes.

## Docs content recommendations

- Keep headings short and hierarchy clear.
- For platform-specific instructions, use tabs:
  - `=== "macOS and Linux"`
  - `=== "Windows"`
- For notes, use admonitions:
  - `!!! tip`
  - `!!! note`
  - `!!! warning`

This structure is inspired by UV documentation.
