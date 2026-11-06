import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 60_000,
  use: { baseURL: process.env.E2E_URL ?? 'http://localhost:4181/facultad/' },
  webServer: process.env.E2E_URL ? undefined : { command: 'npx vite preview --port 4181 --strictPort', port: 4181, reuseExistingServer: false },
  projects: [
    { name: 'chrome-desktop', use: { channel: 'chrome', viewport: { width: 1280, height: 860 } } },
    { name: 'edge-mobile', use: { channel: 'msedge', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
});
