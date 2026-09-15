import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
  { ignores: ['dist/', '.astro/', 'node_modules/'] },
  js.configs.recommended,
  tseslint.configs.recommended,
  astro.configs.recommended,
  {
    languageOptions: { globals: globals.browser },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      'no-console': 'error',
      eqeqeq: 'error',
      'prefer-const': 'error',
    },
  },
  {
    files: ['scripts/**/*.mjs', '*.config.{js,mjs,ts}'],
    languageOptions: { globals: globals.node },
  },
);
