// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// import path from "path";

// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//   resolve: {
//     alias: { "@": path.resolve(__dirname, "./src") },
//   },
//   server: { host: "::", port: 8080 },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  assetsInclude: ["**/*.JPEG", "**/*.JPG", "**/*.PNG", "**/*.WEBP"],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  server: { host: "::", port: 8080 },
});