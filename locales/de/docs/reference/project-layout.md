# Projektstruktur

## Minimales Layout

```text
project/
- dcr.toml
- src/
- - main.c
```

### Zweck von Dateien und Verzeichnissen

- `dcr.toml` - Projektkonfigurationsdatei.
- `src/main.c` - Einstiegssourcendatei, die aktuell von DCR kompiliert wird.

## Erweitertes Layout

```text
project/
- dcr.toml
- dct.lock
- src/
- - main.c
- target/
- - debug/
- - - main
- - release/
- - - main
```

### Zweck von Dateien und Verzeichnissen

- `dcr.toml` - Projektkonfigurationsdatei.
- `dct.lock` - Abhängigkeits-Lockdatei.
- `src/main.c` - Einstiegssourcendatei, die aktuell von DCR kompiliert wird.
- `target/debug/main` - kompilierte Debug-Binärdatei.
- `target/release/main` - kompilierte Release-Binärdatei.

(AI Translated)