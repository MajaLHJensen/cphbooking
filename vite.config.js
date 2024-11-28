import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vite.dev/config/
export default defineConfig({
  base: "/cphbooking",
  plugins: [TanStackRouterVite(), react()],
  cssCodeSplit: false // Prevent CSS from being split into chunks
});


