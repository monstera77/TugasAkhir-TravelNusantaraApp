import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"], // Aset tambahan
      manifest: {
        name: "Travel Nusantara",
        short_name: "TravelApp",
        description: "Aplikasi Wisata Indonesia",
        theme_color: "#ffffff",
        start_url: "/", // Wajib ada
        display: "standalone", // Wajib agar seperti aplikasi native
        background_color: "#ffffff",
        icons: [
          {
            src: "/pwa-192x192.png", // Tambahkan slash di depan
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable", // Tambahkan ini
          },
          {
            src: "/pwa-512x512.png", // Tambahkan slash di depan
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable", // Tambahkan ini
          },
        ],
      },
      workbox: {
        // Pola file yang akan dicache otomatis
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg}"],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith("/api"),
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              cacheableResponse: { statuses: [0, 200] },
            },
          },
        ],
      },
    }),
  ],
});
