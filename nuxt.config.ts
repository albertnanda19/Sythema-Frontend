// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
  css: ["~/assets/css/main.css"],
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
});
