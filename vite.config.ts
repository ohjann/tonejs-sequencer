/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Served from https://ohjann.github.io/tonejs-sequencer/ in production.
export default defineConfig({
  base: "/tonejs-sequencer/",
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
  },
});
