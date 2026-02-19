# dcr --update

Aktualisiert die installierte DCR-Binärdatei auf das neueste Release von GitHub.

## Verwendung

```bash
dcr --update
```

## Wie es funktioniert

1. Ruft `https://api.github.com/repos/dexoron/dcr/releases/latest` ab.
2. Liest das aktuelle Release `tag_name`.
3. Wählt das passende Asset für das aktuelle Target (`DCR_TARGET`).
4. Lädt die neue Binärdatei in eine temporäre Datei herunter.
5. Ersetzt das aktuelle Executable per `self-replace`.

## Wenn kein Update erforderlich ist

Wenn die aktuelle Version bereits die neueste ist, meldet der Befehl das und beendet ohne Änderungen.

## Einschränkungen

- Der Befehl akzeptiert keine Argumente.
- Zugriff auf GitHub API und Release-Assets ist erforderlich.
- Für Windows wird das Asset `dcr-x86_64-pc-windows-msvc.exe` erwartet.

(AI Translated)