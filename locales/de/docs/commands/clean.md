# dcr clean

Entfernt Build-Artefakte.

## Verwendung

```bash
dcr clean
dcr clean --debug
dcr clean --release
```

## Was wird entfernt

- Ohne Argumente: gesamtes `target`-Verzeichnis.
- Mit Profil: nur `target/debug` oder `target/release`.

## Prüfungen

- `dcr.toml` muss im aktuellen Verzeichnis existieren.
- Wenn `target` oder das gewählte Profil nicht existiert, wird eine Warnung angezeigt.

## Argumentverhalten

Der Befehl erwartet höchstens ein Profil-Argument.

(AI Translated)