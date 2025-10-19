<script setup>
import { useRouter } from "vue-router";
import Logo from "@/components/Logo.vue";
import errorImg from '@/assets/404-Error.png';

const router = useRouter();
const goHome = () => router.push("/");
</script>

<template>
  <div class="bg-white min-h-screen flex flex-col font-sans relative">
    <!-- Logo -->
    <div class="w-full flex items-center justify-start px-10 py-5 absolute top-0 left-0 bg-white z-10">
      <Logo />
    </div>

    <div class="flex flex-1 items-center justify-between w-full px-16 pt-40">
      <!-- Cột trái -->
      <div class="flex flex-col justify-center items-end w-1/2 pr-16">
        <div class="max-w-xl text-left space-y-8">
          <h1 class="text-7xl font-extrabold text-gray-900">Oops....</h1>
          <h2 class="text-4xl font-semibold text-gray-800">
            Trang này không tồn tại
          </h2>
          <p class="text-gray-500 leading-relaxed text-2xl">
            Trang này không tồn tại hoặc không thể tìm thấy! <br />
            Vui lòng quay về trang chủ.
          </p>
          <button
            @click="goHome"
            class="bg-blue-600 text-white px-10 py-5 rounded-xl hover:bg-blue-700 transition flex items-center gap-3 text-2xl shadow-lg"
          >
            <span class="text-3xl">←</span> Trở về trang chủ
          </button>
        </div>
      </div>

      <!-- Cột phải -->
      <div class="flex flex-col justify-center items-start w-1/2 pl-16">
        <div class="text-center">
          <img
            :src="errorImg"
            alt="404 Error"
            class="w-[600px] max-w-full object-contain mx-auto rounded-xl border-0 shadow-none"
          />
        </div>
      </div>
    </div>
  </div>
</template>
