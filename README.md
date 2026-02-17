[ENG](./README.md) | [РУС](./README_ru.md)

# DCR Site

Landing page for **DCR (Dexoron Cargo Realization)**:
- tool overview and docs links,
- commands and usage examples,
- install commands for Linux/Windows/macOS,
- language switcher.

The site is static and built from a single HTML template plus JSON translations.

## Structure

- `templates/index.tpl.html` - shared HTML template.
- `locales/en/index.json` - English texts (default locale).
- `locales/ru/index.json` - Russian texts.
- `scripts/build-i18n.js` - generates pages from locale files.
- `scripts/build-docs.js` - generates docs HTML from Markdown.
- `locales/docs.locales.json` - docs locales registry (source/output paths and routing).
- `main.js` - UI logic, including language switcher.
- `locales/en/docs/**/*.md` - English docs source.
- `locales/ru/docs/**/*.md` - Russian docs source.
- `locales/en/docs.config.json` - English docs UI config (sidebar order, labels).
- `locales/ru/docs.config.json` - Russian docs UI config (sidebar order, labels).

## Build

```bash
npm run i18n:build
```

Output:
- `index.html` for `en` (route `/`)
- `ru/index.html` for `ru` (route `/ru/`)

Full build (i18n + styles):

```bash
npm run build
```

Docs-only build:

```bash
npm run docs:build
```

Docs output:
- `docs/...` for English pages (`/docs/...`)
- `ru/docs/...` for Russian pages (`/ru/docs/...`)

## Add A New Language

1. Create `locales/<lang>/index.json` using `locales/en/index.json` as a template.
2. Fill all translation keys (the structure must match `locales/en/index.json`).
3. Add the language to `languageOptions` in `main.js`.
4. Set routes:
   - default language uses `/`,
   - other languages use `/<lang>/` (for example `/de/`).
5. Run `npm run i18n:build`.

German example:
- file: `locales/de/index.json`
- route: `/de/`
- output: `de/index.html`
