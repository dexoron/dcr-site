# DCR-Dokumentation

DCR (Dexoron Cargo Realization) ist ein Cargo-ähnliches CLI-Werkzeug für C/C++-Projekte.

## Was die aktuelle Version bietet

- Projekt erstellen: `dcr new <name>`.
- Leeres Verzeichnis initialisieren: `dcr init`.
- `debug`- und `release`-Profile bauen: `dcr build [--debug|--release]`.
- Nach dem Build ausführen: `dcr run [--debug|--release]`.
- Build-Artefakte bereinigen: `dcr clean [--debug|--release]`.
- Binärdatei aus GitHub Releases aktualisieren: `dcr --update`.
- Hilfe und Version: `dcr --help`, `dcr --version`.

## Abschnitte

- [Erste Schritte](./getting-started/)
- [Befehle](./commands/)
- [Referenz](./reference/)
- [FAQ](./faq/)

## Wichtige Implementierungsdetails

- DCR ist in Rust geschrieben.
- Derzeit kompiliert der Build `src/main.c` zur Binärdatei `target/<profile>/main`.
- Die Befehle `build`, `run` und `clean` setzen eine `dcr.toml`-Datei im Projektstammverzeichnis voraus.

## Repository

- [dexoron/dcr](https://github.com/dexoron/dcr)
