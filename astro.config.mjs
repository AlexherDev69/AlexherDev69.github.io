// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Repo AlexherDev69.github.io -> site servi à la racine, base "/" par défaut.
// https://astro.build/config
export default defineConfig({
  site: 'https://AlexherDev69.github.io',
  integrations: [react()],
});
