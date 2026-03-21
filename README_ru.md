[ENG](./README.md) | [РУС](./README_ru.md)

# DCR Site

Лендинг проекта **DCR (Dexoron Cargo Realization)**:
- описание инструмента и ссылка на GitBook-документацию,
- команды и примеры использования,
- команды установки для Linux/Windows/macOS,
- переключатель языка.

Сайт статический и собирается из одного HTML-шаблона и JSON-переводов.

## Структура

- `templates/index.tpl.html` - общий HTML-шаблон.
- `templates/playbook.tpl.html` - шаблон страницы playbook.
- `locales/en/index.json` - английские тексты (язык по умолчанию).
- `locales/ru/index.json` - русские тексты.
- `scripts/build-i18n.js` - генерирует страницы сайта из локалей.
- `main.js` - UI-логика, включая переключатель языка.

## Сборка

```bash
npm run i18n:build
```

Результат:
- `index.html` для `en` (маршрут `/`)
- `playbook/index.html` для `en` (маршрут `/playbook/`)
- `ru/index.html` для `ru` (маршрут `/ru/`)
- `ru/playbook/index.html` для `ru` (маршрут `/ru/playbook/`)

Полная сборка (i18n + стили):

```bash
npm run build
```


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
