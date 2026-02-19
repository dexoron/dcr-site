# dcr build

Baut das Projekt im Profil `debug` oder `release`.

## Verwendung

```bash
dcr build
dcr build --debug
dcr build --release
```

## Was dieser Befehl tut

- Prüft, dass `dcr.toml` existiert.
- Erstellt `target/<profile>/` bei Bedarf.
- Kompiliert `src/main.c` mit `clang`.
- Schreibt die Binärdatei nach `target/<profile>/main`.

## Profile

- `--debug` (Standard)
- `--release`

Build-Flags sind unter [Build-Profile](../reference/build-profiles/) beschrieben.

## Wichtige Details

- In der aktuellen Implementierung wird nur das erste Argument nach `build` ausgewertet.
- Ein unbekanntes Argument oder Flag führt zu einem Fehler.
- Wenn `src/main.c` fehlt, kompiliert der Befehl keinen Code.

(AI Translated)