# dcr add

Add a dependency to `dcr.toml`.

## Usage

```bash
dcr add <name> [source] [options]
```

If `<source>` is omitted and a registry is configured, DCR will look up the
package by name in the registry and add it as a version dependency.

## Sources

- *omitted*: Look up in the configured registry.
- `path:./path/to/lib`: Local directory.
- `github:user/repo`: GitHub repository.
- `gitlab:user/repo`: GitLab repository.
- `git:host.com/user/repo`: Generic Git repository (HTTPS).
- `https://...`: Full Git URL.

## Options

- `--branch <name>`: Use a specific branch.
- `--tag <name>`: Use a specific tag.
- `--rev <sha>`: Use a specific commit hash.

## Examples

```bash
dcr add my_lib path:./libs/my_lib
dcr add cool_lib github:user/cool_lib
dcr add shared_lib gitlab:org/shared --branch develop
dcr add custom_lib git:git.internal.com/r/lib --tag v1.0.0
dcr add mylib                    # Looks up in registry
```
