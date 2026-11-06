import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/facultad/',
  plugins: [react()],
  test: { environment: 'jsdom', include: ['tests/unit/**/*.test.ts'] },
} as never);
