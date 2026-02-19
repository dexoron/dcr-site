# dcr.toml-Konfiguration

Die zentrale Projektdatei ist `dcr.toml`.

## Minimalbeispiel

```toml
[package]
name = "hello"
version = "0.1.0"
language = "c"
compiler = "clang"

[dependencies]
```

## Was DCR schreibt

`dcr new` und `dcr init` erstellen `dcr.toml` in diesem Basisformat.

## Aktuelles Verhalten

- Für `build`, `run` und `clean` ist `dcr.toml` erforderlich.
- In dieser Phase werden Werte aus `dcr.toml` nicht zur Auswahl von Quelldateien für den Build verwendet.
- Die tatsächliche Kompilierung fokussiert sich auf `src/main.c` und Konstanten im DCR-Code.

## Praxis

Behandle `dcr.toml` als Projektmarker und Basis für zukünftige Konfigurations-Erweiterungen.

(AI Translated)