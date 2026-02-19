# Erste Schritte

## 1) Projekt erstellen

```bash
dcr new hello
cd hello
```

DCR erstellt:

```text
hello/
- dcr.toml
- src/
- - main.c
```

## 2) Projekt bauen

Debug-Profil (Standard):

```bash
dcr build
```

Release-Profil:

```bash
dcr build --release
```

## 3) Projekt ausführen

```bash
dcr run
```

oder

```bash
dcr run --release
```

## 4) Artefakte bereinigen

```bash
dcr clean
```

Nur ein einzelnes Profil entfernen:

```bash
dcr clean --debug
dcr clean --release
```

## Aktuelle Einschränkung

Der Build in der aktuellen Implementierung ist auf `src/main.c` und die Ausgabedatei `target/<profile>/main` ausgerichtet.

## Weiter

- [Befehle](../commands/)
- [dcr.toml-Konfiguration](../reference/configuration/)
