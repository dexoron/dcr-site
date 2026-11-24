import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * DCR documentation synced from dexoron/dcr (`npm run docs:sync`).
 *
 * English lives in `en/`; other locales are added by the same script once
 * translations exist. `sidebar_label` is the navigation and page title.
 */
const docs = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/docs' }),
  schema: z.object({
    sidebar_label: z.string(),
  }),
});

export const collections = { docs };
