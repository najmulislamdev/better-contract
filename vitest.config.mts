import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// Some CI/agent environments export NODE_ENV=production globally. That makes Vite
// resolve the *production* builds of react/react-dom, which omit `React.act` and break
// React Testing Library. Force the test environment before Vite reads the value.
// (assigned via Object.assign because Next.js types NODE_ENV as read-only.)
Object.assign(process.env, { NODE_ENV: "test" });

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["**/*.test.{ts,tsx}"],
    exclude: ["node_modules/**", ".next/**"],
  },
});
