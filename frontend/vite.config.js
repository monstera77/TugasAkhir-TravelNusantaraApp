import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.ico", "apple-touch-icon.png", "mask-icon.svg"],

      manifest: {
        name: "Travel Nusantara",
        short_name: "TravelApp",
        description: "Aplikasi Wisata Indonesia",
        theme_color: "#ffffff",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },

      workbox: {
        // 1. Cache file statis (HTML, CSS, JS, Icon Lokal)
        globPatterns: ["**/*.{js,css,html,ico,png,svg,jpg,jpeg}"],

        runtimeCaching: [
          {
            // 2. Cache API Supabase (Data Teks)
            // Ganti jadi StaleWhileRevalidate: Tampilkan Cache DULU biar cepat, baru update.
            urlPattern: ({ url }) => url.origin.includes("supabase.co"),
            handler: "StaleWhileRevalidate",
            options: {
              cacheName: "api-supabase-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // Simpan 30 Hari
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // 3. Cache Gambar Unsplash
            // Ganti jadi CacheFirst: Hemat kuota, jangan download ulang gambar yang sama.
            urlPattern: ({ url }) => url.origin.includes("unsplash.com"),
            handler: "CacheFirst",
            options: {
              cacheName: "image-unsplash-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30, // Simpan 30 Hari
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },

      // Tambahan: Supaya gampang dites di Localhost
      devOptions: {
        enabled: true,
        navigateFallback: "index.html",
      },
    }),
  ],
});
