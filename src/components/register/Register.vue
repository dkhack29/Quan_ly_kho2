<script setup>
import { ref } from "vue";

const emit = defineEmits(['close', 'register-success', 'show-login'])

const username = ref("");
const email = ref("");
const userId = ref("");
const password = ref("");
const confirmPassword = ref("");

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const errorMessage = ref("");

const register = async () => {
  errorMessage.value = "";
  
  // Validation
  if (!username.value || !email.value || !userId.value || !password.value) {
    errorMessage.value = "Vui lòng điền đầy đủ thông tin";
    return;
  }
  
  if (password.value !== confirmPassword.value) {
    errorMessage.value = "Mật khẩu xác nhận không khớp!";
    return;
  }
  
  if (password.value.length < 6) {
    errorMessage.value = "Mật khẩu phải có ít nhất 6 ký tự";
    return;
  }
  
  isLoading.value = true;
  
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock success
    emit('register-success', {
      username: username.value,
      email: email.value,
      userId: userId.value
    });
    
    // Reset form
    username.value = "";
    email.value = "";
    userId.value = "";
    password.value = "";
    confirmPassword.value = "";
    
    alert("Đăng ký thành công! Bạn có thể đăng nhập ngay bây giờ.");
    emit('close');
  } catch (error) {
    errorMessage.value = "Có lỗi xảy ra, vui lòng thử lại";
  } finally {
    isLoading.value = false;
  }
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

      <!-- Error Message -->
      <div v-if="errorMessage" class="mt-4 bg-red-50 border border-red-200 rounded-md p-3">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <p class="text-sm text-red-800">{{ errorMessage }}</p>
          </div>
        </div>
      </div>

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
          :disabled="isLoading"
          class="w-full py-2 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
        >
          <span v-if="isLoading" class="mr-2">
            <svg class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </span>
          {{ isLoading ? 'Đang đăng ký...' : 'Đăng ký' }}
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
        <button @click="$emit('show-login')" class="text-blue-600 hover:underline">Đăng nhập</button>
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
