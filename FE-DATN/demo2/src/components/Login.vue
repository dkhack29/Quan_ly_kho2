<script setup>
import { ref } from 'vue'
import Logo from '@/components/Logo.vue' 

const showPassword = ref(false)
const togglePassword = () => {
  showPassword.value = !showPassword.value
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 flex flex-col items-center">
    <!-- Header -->
    <header class="w-full max-w-7xl pt-8 px-4 flex items-center self-start">
      <Logo />
    </header>
    <div class="flex-grow flex items-center justify-center w-full pb-16">
      <div class="bg-white p-10 md:p-12 rounded-2xl shadow-xl w-full max-w-sm">
        <h2 class="text-3xl font-bold text-center mb-1 text-[#071B41]">
          ĐĂNG NHẬP
        </h2>
        <p class="text-gray-500 text-center mb-8">Chào mừng quay trở lại</p>

        <form class="space-y-4">
          <!-- Username -->
          <div>
            <label for="username" class="sr-only">Tên đăng nhập hoặc Email</label>
            <input
              type="text"
              id="username"
              placeholder="Tên đăng nhập hoặc Email"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>

          <!-- Password -->
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              placeholder="Mật khẩu"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 text-base pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
            <button
              type="button"
              @click="togglePassword"
              class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <!-- icon con mắt -->
              <svg
                v-if="!showPassword"
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5
                  c4.477 0 8.268 2.943 9.542 7
                  -1.274 4.057-5.065 7-9.542 7
                  -4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>

              <!-- icon con mắt gạch chéo -->
              <svg
                v-else
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13.875 18.825A10.05 10.05 0 0112 19
                  c-4.478 0-8.269-2.943-9.543-7
                  a10.05 10.05 0 012.003-3.368
                  m3.016-2.59A9.959 9.959 0 0112 5
                  c4.477 0 8.268 2.943 9.542 7
                  a9.956 9.956 0 01-4.043 5.197
                  M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 3l18 18"
                />
              </svg>
            </button>
          </div>

          <!-- Remember + Forgot -->
          <div class="flex justify-between items-center text-sm">
            <div class="flex items-center">
              <input
                type="checkbox"
                id="remember"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label for="remember" class="ml-2 text-gray-500 select-none">
                Ghi nhớ tài khoản
              </label>
            </div>
            <a href="#" class="text-blue-500 hover:text-blue-700 font-medium">
              Quên mật khẩu?
            </a>
          </div>

          <!-- Buttons -->
          <button
            type="submit"
            class="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
          >
            Đăng nhập
          </button>

          <button
            type="button"
            class="w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-semibold py-3 rounded-lg flex items-center justify-center space-x-2 transition duration-200"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google Logo"
              class="w-5 h-5"
            />
            <span>Đăng nhập với Google</span>
          </button>
        </form>

        <p class="text-center text-gray-500 mt-6 text-sm">
          Bạn chưa có tài khoản?
          <a href="#" class="text-blue-500 hover:text-blue-700 font-medium ml-1">
            Đăng ký
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
