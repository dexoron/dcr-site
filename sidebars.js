const sidebars = {
  docs: [
  "README",
  {
    "type": "category",
    "label": "Getting started",
    "items": [
      "getting-started/installation",
      "getting-started/create-your-first-project",
      "getting-started/project-structure",
      "getting-started/build-and-run"
    ]
  },
  {
    "type": "category",
    "label": "Configuration",
    "items": [
      "configuration/dcr.toml-overview",
      "configuration/package-section",
      "configuration/build-section",
      "configuration/dependencies-section",
      "configuration/build-profiles"
    ]
  },
  {
    "type": "category",
    "label": "Commands",
    "items": [
      "commands/global-options",
      "commands/dcr-init-or-new",
      "commands/dcr-add",
      "commands/dcr-build",
      "commands/dcr-run",
      "commands/dcr-clean",
      "commands/dcr-gen",
      "commands/dcr-test",
      "commands/dcr-fmt",
      "commands/dcr-tree"
    ]
  },
  {
    "type": "category",
    "label": "Dependencies & Build",
    "items": [
      "dependencies-and-build/dependency-format",
      "dependencies-and-build/local-dependencies",
      "dependencies-and-build/versioning-and-lock-file",
      "dependencies-and-build/target-directory",
      "dependencies-and-build/cross-compilation",
      "dependencies-and-build/compilers-and-linking"
    ]
  },
  {
    "type": "category",
    "label": "Reference & Help",
    "items": [
      "reference-and-help/cli-reference",
      "reference-and-help/config-reference",
      "reference-and-help/workspace-guide",
      "reference-and-help/flags-and-environment",
      "reference-and-help/troubleshooting-map",
      "reference-and-help/faq",
      "reference-and-help/contributing-and-bug-reports"
    ]
  }
],
};

export default sidebars;
