# dcr tree

Displays a visual dependency tree for the current project (similar to `cargo tree`).

## Usage

```sh
dcr tree
dcr tree --invert
dcr tree -p some-package
```

## What it shows

- All direct and transitive dependencies
- Version of each dependency
- Whether a dependency is a registry, git, or path dependency

## Notes

- Useful for debugging dependency issues and understanding the build graph.
- Output format is inspired by `cargo tree`.
