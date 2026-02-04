<script setup lang="ts">
definePageMeta({
  layout: 'public'
})

useHead({
  title: 'Login — Synthema',
})

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')
const emailInputRef = ref(null)

const handleLogin = async () => {
  if (!email.value || !password.value) {
    errorMessage.value = 'Email and password are required.'
    return
  }
  
  loading.value = true
  errorMessage.value = ''

  try {
    const response = await $fetch('/api/v1/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value
      }
    })

    // Assuming response follows semantic structure (status, message, data)
    // If successful, redirect
    await navigateTo('/dashboard')
  } catch (err: any) {
    // Handle error without reloading
    errorMessage.value = err.response?._data?.message || 'Authentication failed. Please check your credentials.'
    
    // Focus password field or email if needed, but don't shake too aggressively
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen w-full flex flex-col lg:flex-row font-sans text-gray-900 dark:text-gray-100 bg-white dark:bg-black transition-opacity duration-700 ease-out animate-fade-in">
    
    <!-- Left Section: Brand & Atmosphere -->
    <div class="lg:w-[40%] xl:w-[35%] bg-gray-50 dark:bg-neutral-950 p-8 lg:p-12 flex flex-col justify-between relative overflow-hidden border-r border-gray-100 dark:border-neutral-900">
      
      <!-- Ambient Gradient (Subtle) -->
      <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,var(--tw-gradient-stops))] from-gray-200/40 via-transparent to-transparent dark:from-gray-800/20"></div>

      <!-- Logo / Identity -->
      <div class="relative z-10 animate-slide-up-sm" style="animation-delay: 100ms;">
        <h1 class="text-2xl font-bold tracking-tight">Synthema<span class="text-primary-500">.</span></h1>
        <p class="mt-2 text-sm text-gray-500 dark:text-gray-400 font-medium tracking-wide">Workplace Observability</p>
      </div>

      <!-- Quote / Philosophy -->
      <div class="relative z-10 hidden lg:block mt-auto animate-slide-up-sm" style="animation-delay: 200ms;">
        <p class="text-xs uppercase tracking-[0.2em] text-gray-400 dark:text-neutral-600 mb-4">System Status</p>
        <div class="flex items-center gap-3">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span class="text-sm font-medium text-gray-600 dark:text-gray-400">All Systems Operational</span>
        </div>
      </div>
    </div>

    <!-- Right Section: Login Form -->
    <div class="flex-1 flex flex-col justify-center items-center p-6 sm:p-12 lg:p-24 relative">
      <div class="w-full max-w-md animate-slide-up-sm" style="animation-delay: 300ms;">
        
        <!-- Header -->
        <div class="mb-12">
          <h2 class="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">System Access</h2>
          <p class="text-gray-500 dark:text-gray-400 text-sm">Authenticate to enter the control plane.</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin" class="space-y-8">
          
          <!-- Email Field -->
          <div class="group relative">
            <input 
              v-model="email"
              type="email" 
              id="email" 
              required
              class="peer w-full bg-transparent border-b border-gray-200 dark:border-neutral-800 py-3 text-base outline-none transition-colors focus:border-gray-900 dark:focus:border-white disabled:opacity-50 placeholder-transparent text-gray-900 dark:text-white"
              placeholder="Email"
              :disabled="loading"
            />
            <label 
              for="email" 
              class="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-gray-900 dark:peer-focus:text-white cursor-text font-medium tracking-wide"
            >
              EMAIL IDENTIFIER
            </label>
          </div>

          <!-- Password Field -->
          <div class="group relative">
            <input 
              v-model="password"
              type="password" 
              id="password" 
              required
              class="peer w-full bg-transparent border-b border-gray-200 dark:border-neutral-800 py-3 text-base outline-none transition-colors focus:border-gray-900 dark:focus:border-white disabled:opacity-50 placeholder-transparent text-gray-900 dark:text-white"
              placeholder="Password"
              :disabled="loading"
            />
            <label 
              for="password" 
              class="absolute left-0 -top-3.5 text-xs text-gray-500 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-gray-900 dark:peer-focus:text-white cursor-text font-medium tracking-wide"
            >
              SECURE KEY
            </label>
          </div>

          <!-- Error Feedback -->
          <div class="h-6">
            <transition name="fade">
              <p v-if="errorMessage" class="text-sm text-red-600 dark:text-red-400 font-medium flex items-center gap-2">
                <span class="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                {{ errorMessage }}
              </p>
            </transition>
          </div>

          <!-- Action -->
          <div class="pt-4">
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full flex items-center justify-center bg-gray-900 dark:bg-white text-white dark:text-black h-12 rounded-lg font-medium text-[15px] hover:opacity-90 active:scale-[0.99] transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              <span v-if="loading" class="mr-2">
                <svg class="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              <span :class="{ 'opacity-100': !loading, 'opacity-0': loading }">Authenticate</span>
              
              <!-- Subtle arrow on hover -->
              <svg 
                v-if="!loading"
                class="absolute right-6 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </button>
          </div>
        </form>
      </div>

       <!-- Footer Rights -->
       <div class="absolute bottom-6 w-full text-center lg:text-left lg:pl-0 animate-slide-up-sm" style="animation-delay: 400ms;">
          <p class="text-[10px] text-gray-300 dark:text-neutral-500 text-center uppercase tracking-widest pl-8">
            Synthema v1.0 • Secure Environment
          </p>
       </div>
    </div>
  </div>
</template>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.8s ease-out forwards;
}

.animate-slide-up-sm {
  animation: slideUpSm 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  opacity: 0;
  transform: translateY(10px);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUpSm {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
