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
            // Cache API Supabase (Agar data teks wisata tersimpan)
            urlPattern: ({ url }) => url.origin.includes("supabase.co"),
            handler: "NetworkFirst", // Coba internet dulu, kalau mati baru ambil cache
            options: {
              cacheName: "api-supabase-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // Simpan 1 Hari
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ url }) => url.origin.includes("unsplash.com"),
            handler: "StaleWhileRevalidate", // Tampilkan cache dulu biar cepat, sambil update background
            options: {
              cacheName: "image-unsplash-cache",
              expiration: {
                maxEntries: 100, // Simpan maksimal 100 gambar
                maxAgeSeconds: 60 * 60 * 24 * 7, // Simpan 1 Minggu
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
