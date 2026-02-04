export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },

  ssr: true,

  modules: ["@nuxt/ui", "@pinia/nuxt"],

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

  runtimeConfig: {
    apiSecret: "",

    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://127.0.0.1:8080",
    },
  },

  typescript: {
    strict: true,
    typeCheck: false, 
  },
});
