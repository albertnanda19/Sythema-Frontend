export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore()

  if (authStore.isAuthenticated) return

  return navigateTo({
    name: 'login',
    query: {
      redirect: to.fullPath,
    },
  })
});
