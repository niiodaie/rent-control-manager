import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(async () => {
  const plugins = [react()];

  // Replit-only dev plugins
  if (process.env.NODE_ENV !== "production" && process.env.REPL_ID !== undefined) {
    const runtimeErrorOverlay = await import("@replit/vite-plugin-runtime-error-modal");
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    plugins.push(runtimeErrorOverlay.default(), cartographer());
  }

  return {
    plugins,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@shared": path.resolve(__dirname, "shared"),
        "@assets": path.resolve(__dirname, "attached_assets"),
      },
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
