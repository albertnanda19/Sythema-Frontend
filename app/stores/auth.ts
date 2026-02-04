import { defineStore } from 'pinia'

export type AuthUser = {
  id: string
  email: string
  roles: string[]
}

type AuthState = {
  isAuthenticated: boolean
  user: AuthUser | null
}

const isRecord = (value: unknown): value is Record<string, unknown> => {
  return typeof value === 'object' && value !== null
}

const extractUserLike = (value: unknown): AuthUser | null => {
  if (!isRecord(value)) return null

  const id = value.id
  const email = value.email
  const roles = value.roles

  if (typeof id !== 'string') return null
  if (typeof email !== 'string') return null

  if (Array.isArray(roles)) {
    const roleStrings = roles.filter((r): r is string => typeof r === 'string')
    return { id, email, roles: roleStrings }
  }

  return { id, email, roles: [] }
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    isAuthenticated: false,
    user: null,
  }),

  actions: {
    setAuthenticated(user: AuthUser) {
      this.isAuthenticated = true
      this.user = user
    },

    setGuest() {
      this.isAuthenticated = false
      this.user = null
    },

    setFromMeResponse(response: unknown) {
      if (!isRecord(response)) {
        this.setGuest()
        return
      }

      const data = (response as Record<string, unknown>).data

      const user = extractUserLike((isRecord(data) ? (data as Record<string, unknown>).user : null) ?? data)

      if (!user) {
        this.setGuest()
        return
      }

      this.setAuthenticated(user)
    },
  },
})
