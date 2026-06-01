const sidebars = {
  docs: [
  "README",
  {
    "type": "category",
    "label": "Getting Started",
    "items": [
      "getting-started/installation",
      "getting-started/first-steps"
    ]
  },
  {
    "type": "category",
    "label": "Commands",
    "items": [
      "commands/project-commands",
      "commands/build-commands",
      "commands/dependency-commands",
      "commands/quality-commands",
      "commands/gen-commands",
      "commands/system-commands"
    ]
  },
  {
    "type": "category",
    "label": "Reference",
    "items": [
      "reference/dcr-toml",
      "reference/build-profiles",
      "reference/dependencies",
      "reference/workspaces",
      "reference/build-system",
      "reference/cross-compilation",
      "reference/environment-variables",
      "reference/platform-support"
    ]
  },
  {
    "type": "category",
    "label": "Testing",
    "items": [
      "testing/test-framework",
      "testing/running-tests"
    ]
  },
  {
    "type": "category",
    "label": "Recipes",
    "items": [
      "recipes/cross-to-windows",
      "recipes/library-project",
      "recipes/multi-package-workspace"
    ]
  },
  {
    "type": "category",
    "label": "Other",
    "items": [
      "ide-integration",
      "self-update",
      "faq",
      "changelog",
      "contributing"
    ]
  }
],
};

export default sidebars;
