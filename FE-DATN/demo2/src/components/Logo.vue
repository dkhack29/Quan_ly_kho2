<template>
  <div
    class="flex items-center space-x-3 cursor-pointer select-none"
    @click="goHome"
  >
    <img
      :src="logoDau"
      alt="Logo"
      class="h-20 w-auto object-contain"
    />
    <span class="text-2xl font-semibold text-[#071B41]">Công ty Bấu De</span>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import logoDau from '@/assets/logo-Photoroom1.png' // ✅ đường dẫn chuẩn

const router = useRouter()
const goHome = () => router.push('/')
</script>

<style scoped>

</style>
