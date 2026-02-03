/**
 * Client-side API plugin
 * Base wrapper for API calls from browser
 * No interceptor logic yet
 */
export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

  // TODO: Setup axios or fetch wrapper
  // TODO: Add base URL configuration
  // TODO: Add request/response interceptors

  const api = {
    // Placeholder API methods
  };

  return {
    provide: {
      api,
    },
  };
});
