// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';


import vue from '@astrojs/vue';


// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  integrations: [mdx(), vue()],
  vite: {
    plugins: [],
  },
});