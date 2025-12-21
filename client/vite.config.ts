// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // <--- allow connections from outside container
    // port: 5173,      // optional, match your VITE env if needed
  },
});
