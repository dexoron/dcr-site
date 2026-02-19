# Plattformen und Installation

## Unterstützte Release-Targets

- `x86_64-unknown-linux-gnu`
- `x86_64-apple-darwin`
- `aarch64-apple-darwin`
- `x86_64-pc-windows-msvc`

## Installationsskripte

- `install.sh` für Linux/macOS.
- `install.ps1` für Windows.

Beide Skripte bieten:

1. Fertige Binärdatei aus dem Release herunterladen.
2. Oder aus dem Quellcode bauen.

## Installationspfade

- Linux/macOS: Binärdatei wird in ein Benutzerverzeichnis installiert und nach `~/.local/bin` verlinkt.
- Windows: Binärdatei wird in ein Benutzerverzeichnis kopiert und zusätzlich nach `~/.local/bin` dupliziert.

## Update nach der Installation

Für installierten DCR kannst du ausführen:

```bash
dcr --update
```

Der Befehl aktualisiert die Binärdatei am Speicherort des aktuellen `dcr`-Executables.
Oder du aktualisierst über das Installationsskript.

(AI Translated)