import { defineConfig } from 'vite';

export default defineConfig({
  base: '/matheusphb.github.io/', // Adicione esta linha
  resolve: {
    alias: {
      '@': import.meta.dirname,
    }
  }
});