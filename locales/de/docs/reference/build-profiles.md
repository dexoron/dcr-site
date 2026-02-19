# Build-Profile

DCR unterstützt zwei Profile: `debug` und `release`.

## debug

Standardmäßig verwendet bei `dcr build` und `dcr run`.

Flags:

```text
-O0 -g -Wall -Wextra -fno-omit-frame-pointer -DDEBUG
```

## release

Aktiviert über `--release`.

Flags:

```text
-O3 -DNDEBUG -march=native
```

## Artefakt-Pfade

- `target/debug/main`
- `target/release/main`

## Verwendung

```bash
dcr build --debug
dcr build --release
dcr run --release
dcr clean --debug
```

(AI Translated)