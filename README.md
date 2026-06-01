# DCR Site

DCR documentation website built with [Docusaurus](https://docusaurus.io/).

## Development

```bash
# Install dependencies
bun install

# Sync latest docs from dcr repo
bun run sync

# Start dev server
bun run start

# Build for production
bun run build
```

## Documentation

Documentation is synced from the [dcr](https://github.com/dexoron/dcr) repository's `docs/` directory.

Run `bun run sync` to pull the latest docs before building or developing.
