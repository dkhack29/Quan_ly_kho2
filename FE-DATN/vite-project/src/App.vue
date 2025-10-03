<script setup>
import { ref } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Register from './components/Register.vue'

const showRegister = ref(false)
</script>

<template>
  <Sidebar 
    @open-register="showRegister = true"
  />

  <!-- Register Modal -->
  <Register v-if="showRegister" @close="showRegister = false" />
</template>
