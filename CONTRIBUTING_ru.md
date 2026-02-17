[ENG](./CONTRIBUTING.md) | [РУС](./CONTRIBUTING_ru.md)

# Руководство по вкладу в проект

Спасибо за желание улучшить проект.

## Что важно знать перед началом

- Сайт и документация собираются статически.
- Основной язык сайта: `en` (`/`), русский: `ru` (`/ru/`).
- Документация:
  - `en` -> `/docs/`
  - `ru` -> `/ru/docs/`

## Структура локалей

### Локали сайта

- `locales/<lang>/index.json`
- Примеры:
  - `locales/en/index.json`
  - `locales/ru/index.json`

### Локали документации

- Markdown-источники:
  - `locales/<lang>/docs/**/*.md`
- UI-конфиг docs:
  - `locales/<lang>/docs.config.json`
- Реестр docs-локалей:
  - `locales/docs.locales.json`

## Локальный запуск и сборка

Установить зависимости:

```bash
npm install
```

Сборка главной страницы по локалям:

```bash
npm run i18n:build
```

Сборка документации:

```bash
npm run docs:build
```

Полная сборка:

```bash
npm run build
```

## Добавление нового языка

1. Создай `locales/<lang>/index.json` на основе `locales/en/index.json`.
2. Создай папку `locales/<lang>/docs/` и добавь markdown-файлы по структуре `locales/en/docs/`.
3. Создай `locales/<lang>/docs.config.json` (по примеру `locales/en/docs.config.json`).
4. Добавь язык в `locales/docs.locales.json`.
5. Добавь язык в `main.js` (`languageOptions`).
6. Выполни `npm run build` и проверь итоговые файлы.

## Правила для pull request

- Делай небольшие и тематические PR.
- Пиши понятные названия коммитов.
- Не смешивай рефакторинг и контентные правки без необходимости.
- Перед PR убедись, что `npm run build` проходит без ошибок.
- Если меняется структура docs, обновляй `README.md`.

## Рекомендации по контенту docs

- Используй короткие заголовки и понятную иерархию.
- Для платформенных инструкций используй табы формата:
  - `=== "macOS and Linux"`
  - `=== "Windows"`
- Для примечаний используй admonition-блоки:
  - `!!! tip`
  - `!!! note`
  - `!!! warning`

Эта структура вдохновлена документацией UV.
