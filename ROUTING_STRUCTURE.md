# Synthema Frontend - Struktur Routing

## Status: ✅ Struktur Dasar Selesai

Struktur routing dan fondasi SSR-first untuk Synthema Frontend telah berhasil dibuat.

## Struktur yang Telah Dibuat

```
frontend/
├── app/
│   ├── app.vue                          # Root app component
│   │
│   ├── pages/                           # File-based routing
│   │   ├── index.vue                    # Landing page
│   │   ├── login.vue                    # Login page (uses auth layout)
│   │   │
│   │   └── projects/
│   │       ├── index.vue                # Projects list
│   │       └── [projectId]/
│   │           ├── index.vue            # Project dashboard
│   │           ├── environments.vue     # Environments management
│   │           ├── targets.vue          # Targets management
│   │           ├── api-keys.vue         # API keys management
│   │           │
│   │           ├── sessions/
│   │           │   ├── index.vue        # Sessions list
│   │           │   └── [sessionId].vue  # Session detail
│   │           │
│   │           ├── replays/
│   │           │   ├── index.vue        # Replays list
│   │           │   ├── new.vue          # Create new replay
│   │           │   └── [replayId].vue   # Replay detail
│   │           │
│   │           ├── diffs/
│   │           │   ├── index.vue        # Diffs list
│   │           │   └── [diffId].vue     # Diff detail
│   │           │
│   │           └── transforms/
│   │               ├── index.vue        # Transform rule sets list
│   │               └── [ruleSetId].vue  # Rule set detail
│   │
│   ├── layouts/
│   │   ├── default.vue                  # Default layout (authenticated)
│   │   └── auth.vue                     # Auth layout (login)
│   │
│   ├── middleware/
│   │   ├── auth.global.ts               # Global auth middleware (skeleton)
│   │   └── project-context.ts           # Project context validator
│   │
│   ├── composables/
│   │   └── useProjectContext.ts         # Project context composable
│   │
│   ├── plugins/
│   │   ├── api.client.ts                # Client-side API wrapper (skeleton)
│   │   └── api.server.ts                # Server-side API wrapper (skeleton)
│   │
│   ├── components/
│   │   └── README.md                    # Components directory guide
│   │
│   └── assets/
│       └── css/
│           └── main.css                 # Global CSS
│
├── server/
│   └── api/
│       └── health.get.ts                # Health check endpoint
│
├── public/                              # Static assets
│
├── nuxt.config.ts                       # Nuxt configuration (updated)
├── package.json
└── tsconfig.json
```

## Routing Map

### Public Routes

- `/` - Landing page
- `/login` - Login page (auth layout)

### Authenticated Routes (requires auth)

- `/projects` - Projects list
- `/projects/:projectId` - Project dashboard

### Project-Scoped Routes (requires project context)

- `/projects/:projectId/environments` - Environments management
- `/projects/:projectId/targets` - Targets management
- `/projects/:projectId/api-keys` - API keys management

#### Sessions

- `/projects/:projectId/sessions` - Sessions list
- `/projects/:projectId/sessions/:sessionId` - Session detail

#### Replays

- `/projects/:projectId/replays` - Replays list
- `/projects/:projectId/replays/new` - Create new replay
- `/projects/:projectId/replays/:replayId` - Replay detail

#### Diffs

- `/projects/:projectId/diffs` - Diffs list
- `/projects/:projectId/diffs/:diffId` - Diff detail

#### Transforms

- `/projects/:projectId/transforms` - Transform rule sets list
- `/projects/:projectId/transforms/:ruleSetId` - Rule set detail

## Konfigurasi

### SSR-First

- Default rendering: **SSR**
- `ssr: true` di `nuxt.config.ts`
- Semua pages SSR-safe

### Runtime Config

```typescript
runtimeConfig: {
  apiSecret: '',
  public: {
    apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001'
  }
}
```

### TypeScript

- Strict mode enabled
- Type checking disabled by default (dapat diaktifkan saat development)

## Status Implementasi

### ✅ Selesai

- [x] Struktur folder lengkap
- [x] Semua pages dibuat (skeleton)
- [x] Layouts (default & auth)
- [x] Middleware (skeleton)
- [x] Composables (useProjectContext)
- [x] Plugins (API wrapper skeleton)
- [x] Server API (health check)
- [x] Nuxt config (SSR-first)
- [x] Build verification (no errors)

### ⏳ Belum Diimplementasi (Sesuai Instruksi)

- [ ] UI components
- [ ] Auth logic
- [ ] API integration
- [ ] State management (Pinia)
- [ ] Data fetching
- [ ] Form handling
- [ ] Visualization/charts

## Prinsip yang Diterapkan

1. **SSR-First**: Semua pages default SSR
2. **Explicit Routing**: File-based routing yang predictable
3. **Project Context**: Eksplisit di URL (`:projectId`)
4. **Separation of Concerns**:
   - `*.client.ts` untuk client-only
   - `*.server.ts` untuk server-only
   - `composables/` untuk shared logic
5. **No Premature Implementation**: Hanya struktur, tanpa UI/logic

## Verifikasi

Build berhasil tanpa error:

```
✔ Vite client built in 176ms
✔ Vite server built in 266ms
✔ Nuxt Nitro server built in 2916ms
```

Server berjalan di: `http://localhost:3001`

## Next Steps (Untuk Development Selanjutnya)

1. Implement authentication logic di middleware
2. Buat API client dengan interceptors
3. Setup Pinia store untuk state management
4. Buat UI components
5. Implement data fetching di pages
6. Add form validation
7. Implement visualization components

---

**Catatan**: Struktur ini adalah fondasi routing & rendering. Tidak ada UI atau business logic yang diimplementasi sesuai dengan instruksi.
