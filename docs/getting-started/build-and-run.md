# Build and run

## Build

Debug (default):

```sh
dcr build
# or
dcr build --debug
dcr build --target linux --debug
dcr build --debug --clean
```

Release:

```sh
dcr build --release
dcr build --target windows --release
```

## Run

```sh
dcr run
# or
dcr run --target macos
dcr run --release
dcr run --target linux --release
dcr run --release --force
```

`dcr run` first builds, then launches the produced binary.

## Clean artifacts

```sh
dcr clean
```

Profile-only cleanup:

```sh
dcr clean --debug
dcr clean --release
dcr clean --all
dcr clean --release --all
```

## Notes

- `run` is unavailable for `build.kind = "staticlib"`, `build.kind = "sharedlib"`, `build.kind = "efi"`, and `build.kind = "elf"`.
- Build profile flag (`--debug` / `--release`) can be passed in any argument position.
- Unknown profile flags produce an error.
- In workspace root, `clean --all` cleans all member projects.
- `--target` builds/runs for specified target (short names: `linux`, `macos`, `windows`).
- `--clean` for `build`/`run` removes `target/<target>/<profile>` and paths from `build.clean`.
