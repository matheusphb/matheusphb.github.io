import { defineConfig } from 'vite';


export default defineConfig({
  // base: '/matheusphb.github.io/', // Remova ou comente esta linha
  resolve: {
    alias: {
      '@': import.meta.dirname,
    }
  }
});