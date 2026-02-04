import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(async () => {
  const authStore = useAuthStore()

  const headers = useRequestHeaders(['cookie'])

  const { data, error } = await useFetch('/api/v1/auth/me', {
    method: 'GET',
    headers,
    credentials: 'include',
  })

  if (error.value) {
    authStore.setGuest()
    return
  }

  authStore.setFromMeResponse(data.value)
})
