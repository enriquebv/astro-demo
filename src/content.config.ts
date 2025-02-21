import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const slides = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/slides', pattern: '**/*.md' }),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		image: z.string(),
	}),
});

export const collections = { slides };
