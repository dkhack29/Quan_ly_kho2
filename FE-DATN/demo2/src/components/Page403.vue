<template>
  <div
    class="bg-white flex flex-col justify-center items-center font-sans fixed inset-0 overflow-hidden"
  >
    <!-- Header -->
    <div
      class="w-full flex items-center justify-start px-10 py-5 absolute top-0 left-0 bg-white z-10"
    >
      <Logo />
    </div>

    <!-- Nội dung chính -->
    <div class="flex items-center justify-between w-full h-full px-16 pt-[100px]">
      <div class="flex flex-col justify-center items-end w-1/2 pr-16">
        <div class="max-w-lg text-left">
          <h1 class="text-5xl font-bold text-gray-900 mb-6">Không đủ quyền</h1>
          <p class="text-gray-500 text-2xl mb-10 leading-relaxed">
            Bạn không có đủ quyền hạn để dùng trang này
          </p>
        </div>
      </div>

      <div class="flex flex-col justify-center items-start w-1/2 pl-16">
        <div class="text-center">
          <img
            src="@/assets/page403.jpg"
            alt="403 Error"
            class="w-[620px] max-w-full object-contain mx-auto"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from '@/components/Logo.vue'
</script>

<style scoped>
html,
body {
  height: 100%;
  margin: 0;
  overflow: hidden;
}
</style>
