# Package section

## Schema

```toml
[package]
name        = "my-app"
version     = "0.1.0"
type        = "app"
description = "My application"
author      = "John Doe"
license     = "MIT"
```

## Fields

- `name` (string, required): used as output artifact base name.
- `version` (string, required): used in `dcr.lock` project entry.
- `type` (string, optional): project type (`app`, `lib`, `none`).
- `description` (string, optional): human-readable project description.
- `author` (string, optional): single author name.
- `authors` (array of strings, optional): list of authors.
- `license` (string, optional): project license identifier (e.g. `MIT`, `GPL-3.0-or-later`).
- `homepage` (string, optional): project homepage URL.
- `repository` (string, optional): source repository URL.
- `readme` (string, optional): path to README file.
- `keywords` (array of strings, optional): project keywords.
- `categories` (array of strings, optional): project categories.

## Notes

- Empty `name` or `version` makes config invalid.
- `dcr new` sets `name` from the passed project name.
- `dcr init` sets `name` from current directory name.
- If `type = "lib"`, DCR generates `include/` and `lib/` directories in the target path, copying public headers and built libraries.
