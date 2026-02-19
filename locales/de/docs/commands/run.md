# dcr run

Baut das Projekt und führt die Binärdatei aus.

## Verwendung

```bash
dcr run
dcr run --debug
dcr run --release
```

## Was dieser Befehl tut

1. Prüft, dass `dcr.toml` existiert.
2. Führt denselben Build-Ablauf wie `dcr build` aus.
3. Startet `./target/<profile>/main`.

## Verhalten bei Build-Fehlern

- Zuerst versucht der Befehl, das Projekt zu bauen.
- Wenn der Build fehlschlägt, versucht der Befehl, die letzte Binärdatei aus dem gewählten Profil auszuführen.
- Wenn keine passende Binärdatei existiert, wird eine Fehlermeldung angezeigt.

## Einschränkungen

- Wie bei `build` wird nur ein Profil-Flag als erstes Argument unterstützt.

(AI Translated)