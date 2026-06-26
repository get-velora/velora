import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    // This adapter automatically handles all deployment configurations for Vercel
    adapter: adapter(),
    paths: {
      base: /** @type {any} */ (process.env.BASE_PATH || '')
    }
  },
};
export default config;