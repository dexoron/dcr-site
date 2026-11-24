import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

// Minimal theme for the docs code blocks: the Figma design shows commands in
// the body colour and comments in the muted colour, without other syntax hues.
const docsTheme = {
  name: 'dcr-docs',
  type: 'dark',
  colors: {
    'editor.background': '#212126',
    'editor.foreground': '#e4e4e7',
  },
  settings: [
    {
      settings: {
        foreground: '#e4e4e7',
        background: '#212126',
      },
    },
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: '#8b8b93' },
    },
  ],
};

export default defineConfig({
  output: 'static',
  compressHTML: true,
  integrations: [mdx()],
  markdown: {
    shikiConfig: {
      theme: docsTheme,
    },
  },
  build: {
    inlineStylesheets: 'auto',
  },
  devToolbar: {
    enabled: false,
  },
});
