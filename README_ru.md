[ENG](./README.md) | [РУС](./README_ru.md)

# DCR Site

Лендинг проекта **DCR (Dexoron Cargo Realization)**:
- описание инструмента и ссылки на документацию,
- команды и примеры использования,
- команды установки для Linux/Windows/macOS,
- переключатель языка.

Сайт статический и собирается из одного HTML-шаблона и JSON-переводов.

## Структура

- `templates/index.tpl.html` - общий HTML-шаблон.
- `locales/en/index.json` - английские тексты (язык по умолчанию).
- `locales/ru/index.json` - русские тексты.
- `scripts/build-i18n.js` - генерирует страницы сайта из локалей.
- `scripts/build-docs.js` - генерирует HTML-документацию из Markdown.
- `locales/docs.locales.json` - реестр docs-локалей (пути источников/выхода и роутинг).
- `main.js` - UI-логика, включая переключатель языка.
- `locales/en/docs/**/*.md` - английские исходники docs.
- `locales/ru/docs/**/*.md` - русские исходники docs.
- `locales/en/docs.config.json` - UI-конфиг английской docs (порядок sidebar, названия).
- `locales/ru/docs.config.json` - UI-конфиг русской docs (порядок sidebar, названия).

## Сборка

```bash
npm run i18n:build
```

Результат:
- `index.html` для `en` (маршрут `/`)
- `ru/index.html` для `ru` (маршрут `/ru/`)

Полная сборка (i18n + стили):

```bash
npm run build
```

Только документация:

```bash
npm run docs:build
```

Выход документации:
- `docs/...` для английских страниц (`/docs/...`)
- `ru/docs/...` для русских страниц (`/ru/docs/...`)

## Добавление нового языка

1. Создай `locales/<lang>/index.json` на основе `locales/en/index.json`.
2. Заполни все ключи перевода (структура должна совпадать с `locales/en/index.json`).
3. Добавь язык в `languageOptions` в `main.js`.
4. Настрой маршруты:
   - язык по умолчанию использует `/`,
   - остальные языки используют `/<lang>/` (например `/de/`).
5. Запусти `npm run i18n:build`.

Пример для немецкого:
- файл: `locales/de/index.json`
- маршрут: `/de/`
- результат: `de/index.html`
