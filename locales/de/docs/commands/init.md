# dcr init

Initialisiert ein DCR-Projekt im aktuellen Verzeichnis.

## Verwendung

```bash
dcr init
```

## Was dieser Befehl tut

1. Prüft, dass das aktuelle Verzeichnis leer ist.
2. Verwendet den Verzeichnisnamen als `package.name`.
3. Erstellt `dcr.toml`.
4. Erstellt `src/main.c`.

## Einschränkungen

- Der Befehl akzeptiert keine Argumente.
- Wenn das Verzeichnis nicht leer ist, beendet der Befehl mit einem Fehler.

## Beispiel

```bash
mkdir hello
cd hello
dcr init
dcr run
```

(AI Translated)