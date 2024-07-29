import { defineConfig } from 'unocss';
import { presetGrid } from 'unocss-preset-grid';
import transformerCompileClass from '@unocss/transformer-compile-class';

export default defineConfig({
  presets: [presetGrid()],
  transformers: [transformerCompileClass()],
});
