// vite.config.ts
export default defineConfig({
  build: {
    outDir: "dist" // ✅ should stay "dist" (Vercel expects this)
  }
});
