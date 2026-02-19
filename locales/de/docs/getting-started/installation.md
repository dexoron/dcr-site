# Installation

### Standalone-Installer

DCR stellt einen Standalone-Installer zum Herunterladen und Installieren von DCR bereit:

=== "macOS and Linux"

    Verwende `curl`, um das Skript herunterzuladen und mit `bash` auszuführen:

    ```sh
    $ curl -fsSL https://dcr.dexoron.su/install.sh | bash
    ```

    Falls `curl` nicht verfügbar ist, kann `wget` verwendet werden:

    ```sh
    $ wget -qO- https://dcr.dexoron.su/install.sh | bash
    ```

=== "Windows"

    Verwende `irm`, um das Skript herunterzuladen und mit `iex` auszuführen:

    ```sh
    PS> powershell -ExecutionPolicy ByPass -c "irm https://dcr.dexoron.su/install.ps1 | iex"
    ```

    Das Ändern der [Execution Policy](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_execution_policies?view=powershell-7.4#powershell-execution-policies) erlaubt das Ausführen von Skripten aus dem Internet.

!!! tip

    Das Installationsskript kann vor der Ausführung überprüft werden:

    === "macOS and Linux"

        ```sh
        $ curl -fsSL https://dcr.dexoron.su/install.sh | less
        ```

    === "Windows"

        ```sh
        PS> powershell -c "irm https://dcr.dexoron.su/install.ps1 | more"
        ```

    Installer und Binärdateien können auch direkt von [GitHub Releases](https://github.com/dexoron/dcr/releases) heruntergeladen werden.

## Manuell aus dem Quellcode bauen

```bash
git clone https://github.com/dexoron/dcr.git
cd dcr
cargo build --release
mkdir -p ~/.local/bin
ln -sf "$PWD/target/release/dcr" ~/.local/bin/dcr
```

## Installation überprüfen

```bash
dcr --version
```

Erwartetes Ausgabeformat:

```text
dcr <version> (<target>)
```

## Wichtige Hinweise zum Installer

- Die Installationsskripte bieten zwei Modi: Release-Binärdatei herunterladen oder aus `git` bauen.
- Die Binärdatei wird in ein Benutzerverzeichnis installiert und zum Pfad hinzugefügt.
- `--update` verwendet die GitHub-API und Release-Assets.
- Das Installationsskript kann DCR auch auf die neueste Version aktualisieren.

## Weiter

- [Erste Schritte](./first-steps/)
