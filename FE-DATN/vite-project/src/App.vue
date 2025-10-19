<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar_Navbar/Sidebar.vue'
import Register from './components/Register/Register.vue'
import Profile from './components/Profile/Profile.vue'

const showRegister = ref(false)
const showProfile = ref(false)
const sidebarOpen = ref(false)

function handleSidebarOpen(val) {
  sidebarOpen.value = val
}
</script>

<template>
  <div class="min-h-screen dark:bg-gray-300">
    <Sidebar 
      @open-register="showRegister = true"
      @open-profile="showProfile = true"
      @update:open="handleSidebarOpen"
    />
    <!-- Register Modal -->
    <Register v-if="showRegister" @close="showRegister = false" />
    <!-- Profile dịch phải khi sidebar mở -->
      <div :class="sidebarOpen ? 'transition-all duration-300 ml-72' : 'transition-all duration-300 ml-0'">
        <router-view />
        <Profile v-if="showProfile" @close="showProfile = false" />
      </div>
  </div>
</template>
