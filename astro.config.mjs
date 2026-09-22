import { defineConfig } from 'astro/config';

// Use '/' for impleax.github.io, or '/portfolio/' for a repository named portfolio.
const base = process.env.BASE_PATH || '/';

export default defineConfig({
  site: process.env.SITE_URL || 'https://impleax.github.io',
  base,
  output: 'static',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
});
