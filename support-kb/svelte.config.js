import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';

// Not part of the desk's export: the smallest build that renders the kb as the desk sees it.
export default {
  extensions: ['.svelte', '.svx'],
  preprocess: [
    mdsvex({
      extensions: ['.svx'],
      layout: { runbook: new URL('./src/lib/layouts/runbook.svelte', import.meta.url).pathname },
    }),
  ],
  kit: {
    adapter: adapter({ pages: '../rendered/site', assets: '../rendered/site' }),
    alias: { '#lib': 'src/lib' },
    prerender: { entries: ['/kb'] },
  },
};
