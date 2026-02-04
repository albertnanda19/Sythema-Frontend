// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  // SSR-first configuration
  ssr: true,

  // Modules
  modules: ["@nuxt/ui", "@pinia/nuxt"],

  // Global CSS
  css: ["~/assets/css/main.css"],

  app: {
    head: {
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap",
        },
      ],
    },
  },

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
