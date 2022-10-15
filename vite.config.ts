import { resolve } from "path"
import { defineConfig } from "vite"
import eslintPlugin from "vite-plugin-eslint"

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Momentum Preflight",
      fileName: `momentum-preflight`,
    },
    rollupOptions: {
      external: ["vue", "@inertiajs/inertia", "@inertiajs/inertia-vue3"],
    },
  },
  plugins: [eslintPlugin()],
})
