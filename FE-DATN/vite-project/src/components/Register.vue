<script setup>
import { ref } from "vue";

const username = ref("");
const email = ref("");
const userId = ref("");
const password = ref("");
const confirmPassword = ref("");

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const register = () => {
  if (password.value !== confirmPassword.value) {
    alert("Mật khẩu xác nhận không khớp!");
    return;
  }
  console.log("Đăng ký:", username.value, email.value, userId.value, password.value);
  alert("Đăng ký thành công!");
};
</script>

<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
    <!-- Container -->
    <div class="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8 animate-fadeIn relative">
      
      <!-- Close -->
      <button 
        @click="$emit('close')" 
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
      >
        ✖
      </button>

      <!-- Header -->
      <h2 class="text-2xl font-bold text-gray-800 text-center">
        Tạo tài khoản mới
      </h2>
      <p class="text-gray-500 text-center mt-1">
        Chào mừng đến với công ty <span class="font-medium text-blue-700">Bấu De</span>
      </p>

      <!-- Form -->
      <form class="mt-6 space-y-4" @submit.prevent="register">
        <!-- Username -->
        <input
          v-model="username"
          type="text"
          placeholder="Tên tài khoản"
          required
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <!-- Email -->
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          required
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <!-- ID -->
        <input
          v-model="userId"
          type="text"
          placeholder="Id của bạn"
          required
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <!-- Password -->
        <div class="relative">
          <input
            v-model="password"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Mật khẩu"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="button"
            @click="showPassword = !showPassword"
            class="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
          >
            <i v-if="showPassword" class="fas fa-eye-slash mr-"></i>
            <i v-else class="fas fa-eye"></i>
          </button>
        </div>

        <!-- Confirm Password -->
        <div class="relative">
          <input
            v-model="confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            placeholder="Xác nhận mật khẩu"
            required
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="button"
            @click="showConfirmPassword = !showConfirmPassword"
            class="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
          >
            <i v-if="showConfirmPassword" class="fas fa-eye-slash"></i>
            <i v-else class="fas fa-eye"></i>
          </button>
        </div>

        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition-all duration-200"
        >
          Đăng ký
        </button>
      </form>

      <!-- Divider -->
      <div class="my-6 flex items-center">
        <div class="flex-grow border-t border-gray-300"></div>
        <span class="px-2 text-gray-500 text-sm">hoặc</span>
        <div class="flex-grow border-t border-gray-300"></div>
      </div>

      <!-- Google Login -->
      <button
        type="button"
        class="w-full flex items-center justify-center gap-3 py-2 border rounded-lg shadow-sm hover:bg-gray-100 transition"
      >
        <img src="https://www.svgrepo.com/show/475656/google-color.svg" class="w-5 h-5" />
        <span class="font-medium text-gray-700">Đăng nhập với Google</span>
      </button>

      <!-- Footer -->
      <p class="mt-6 text-sm text-center text-gray-600">
        Bạn đã có tài khoản?
        <a href="#" class="text-blue-600 hover:underline">Đăng nhập</a>
      </p>
    </div>
  </div>
</template>

<!-- FontAwesome for eye icon -->
<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-15px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.5s ease-out;
}
</style>
