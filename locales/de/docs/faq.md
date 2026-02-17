# FAQ

## Welche Befehle gibt es derzeit?

`new`, `init`, `build`, `run`, `clean`, `--help`, `--version`, `--update`.

## Wird `dcr.toml` für den Build benötigt?

Ja. Die Befehle `build`, `run` und `clean` prüfen dessen Vorhandensein im aktuellen Verzeichnis.

## Was genau wird kompiliert?

In der aktuellen Implementierung wird `src/main.c` zu `target/<profile>/main` kompiliert.

## Kann ich über dcr.toml gcc statt clang wählen?

Noch nicht. Derzeit verwendet DCR den im Quellcode fest eingetragenen Compiler (`clang`).

## Was macht `dcr run`, wenn der Build fehlschlägt?

Der Befehl versucht, die letzte Binärdatei des gewählten Profils auszuführen. Existiert keine, wird darum gebeten, die Fehler im Code zu beheben.

## Wie aktualisiere ich DCR?

Ausführen:

```bash
dcr --update
```

Oder das Installationsskript aus dem Abschnitt [Installation](../getting-started/installation/) verwenden.

## Was tun, wenn der Befehl `dcr` nicht gefunden wird?

Prüfen, ob `~/.local/bin` zum `PATH` hinzugefügt wurde, dann das Terminal neu starten.
