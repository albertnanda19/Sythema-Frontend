# Troubleshooting - TypeScript Errors

## Error: `Cannot find name 'definePageMeta'`

### Penyebab

Error ini adalah **false positive** dari TypeScript language server. Nuxt menggunakan auto-imports, dan type definitions di-generate secara otomatis di folder `.nuxt/types/`.

### Solusi

#### 1. Generate Type Definitions (Sudah Dilakukan)

```bash
bunx nuxi prepare
```

Ini akan generate semua type definitions di `.nuxt/types/`.

#### 2. Reload VSCode TypeScript Server

**Cara 1: Command Palette**

1. Tekan `Cmd/Ctrl + Shift + P`
2. Ketik: `TypeScript: Restart TS Server`
3. Enter

**Cara 2: Reload Window**

1. Tekan `Cmd/Ctrl + Shift + P`
2. Ketik: `Developer: Reload Window`
3. Enter

**Cara 3: Close & Reopen VSCode**

- Close VSCode completely
- Reopen project folder

#### 3. Pastikan Extensions Terinstall

Extensions yang direkomendasikan (sudah ada di `.vscode/extensions.json`):

- **Vue - Official** (Vue.volar)
- **TypeScript Vue Plugin** (Vue.vscode-typescript-vue-plugin)
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)

Install dengan:

1. Buka Extensions panel (`Cmd/Ctrl + Shift + X`)
2. VSCode akan suggest recommended extensions
3. Click "Install All"

#### 4. Verifikasi TypeScript SDK

VSCode settings (sudah dikonfigurasi di `.vscode/settings.json`):

```json
{
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,
  "vue.server.hybridMode": true
}
```

Jika muncul prompt "Use Workspace Version", pilih **Yes**.

### Verifikasi

Setelah reload, error seharusnya hilang. Untuk memverifikasi:

1. **Check Type Definitions**:

```bash
grep "definePageMeta" .nuxt/types/imports.d.ts
```

Output seharusnya:

```
const definePageMeta: typeof import('../../node_modules/nuxt/dist/pages/runtime/composables').definePageMeta
```

2. **Run Dev Server**:

```bash
bun run dev
```

Jika build berhasil tanpa error, berarti type definitions sudah benar.

### Catatan Penting

- Error ini **TIDAK mempengaruhi runtime**
- Aplikasi tetap bisa di-build dan di-run
- Ini hanya masalah IntelliSense/autocomplete di editor
- Setelah reload TypeScript server, error akan hilang

### Auto-Imports yang Tersedia

Nuxt auto-import beberapa functions/composables:

- `definePageMeta` - Define page metadata
- `defineNuxtRouteMiddleware` - Define route middleware
- `useRoute` - Access current route
- `useRouter` - Access router instance
- `navigateTo` - Navigate to route
- `useState` - Reactive state
- `useFetch` - Fetch data
- `useAsyncData` - Async data fetching
- Dan banyak lagi...

Semua sudah ter-type di `.nuxt/types/imports.d.ts`.

---

**TL;DR**: Reload TypeScript server di VSCode dengan `Cmd/Ctrl + Shift + P` → `TypeScript: Restart TS Server`
