# dcr new

Erstellt ein neues Projekt in einem eigenen Verzeichnis.

## Verwendung

```bash
dcr new <n>
```

## Was dieser Befehl tut

1. Erstellt das Verzeichnis `<n>`.
2. Erstellt `dcr.toml` mit den Abschnitten `[package]` und `[dependencies]`.
3. Erstellt `src/main.c` mit einem `Hello World`-Template.

## Verhalten und Fehler

- Wird kein Name angegeben, bricht der Befehl mit einem Fehler ab.
- Wird mehr als ein Argument übergeben, bricht der Befehl mit einem Fehler ab.
- Existiert das Verzeichnis `<n>` bereits, empfiehlt der Befehl die Verwendung von `dcr init`.

## Beispiel

```bash
dcr new app
cd app
dcr run
```
