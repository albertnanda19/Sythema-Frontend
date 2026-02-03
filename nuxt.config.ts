// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // SSR-first configuration
  ssr: true,

  // Modules
  modules: ["@nuxt/ui"],

  // Global CSS
  css: ["~/assets/css/main.css"],

  // Nuxt UI configuration
  ui: {
    prefix: "Nuxt",
    fonts: false,
    colorMode: false,
    mdc: true,
    experimental: {
      componentDetection: true,
    },
    theme: {
      colors: ["primary", "error", "warning", "success", "info"],
      transitions: false,
      defaultVariants: {
        color: "neutral",
        size: "sm",
      },
    },
  },

  // Runtime config
  runtimeConfig: {
    // Server-side only
    apiSecret: "",

    // Public config (exposed to client)
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3001",
    },
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: false, // Enable during development if needed
  },
});
