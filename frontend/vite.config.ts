import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [react()],
    server: {
      proxy: {
        "/graphql": {
          target: "https://api.mccisland.net",
          changeOrigin: true,
          headers: { "X-API-Key": env.API_KEY },
        },
      },
    },
  };
});