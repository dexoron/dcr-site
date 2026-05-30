# dcr clean

Removes build artifacts in `target/`.

## Usage

```sh
dcr clean
dcr clean --debug
dcr clean --release
dcr clean --all
dcr clean --release --all
```

## Behavior

- Without arguments: removes entire `target/`.
- With profile: removes only the profile-specific directory. Respects `build.target` from config: if `build.target = "aarch64-unknown-linux-gnu"`, cleans `target/aarch64-unknown-linux-gnu/<profile>/`.
- With `--all`: also cleans all workspace members.
- Additionally removes paths from `build.clean` if configured.
- `build.clean` supports `{profile}` and version placeholders.

## Validation

- `dcr.toml` must exist.
- Unknown flags are treated as error.
- If `target` or selected profile directory does not exist, command prints a warning.
