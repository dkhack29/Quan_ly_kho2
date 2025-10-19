<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const open = ref(false)
const emit = defineEmits(['update:open'])
const userMenuOpen = ref(false)
const drawerRef = ref(null)
const overlayRef = ref(null)
const userMenuRef = ref(null)


function showDrawer(e) {
  e && e.stopPropagation()
  open.value = true
  emit('update:open', true)
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${scrollbarWidth}px`
}

function hideDrawer() {
  open.value = false
  emit('update:open', false)
  document.body.style.overflow = ''
  document.body.style.paddingRight = ''
}

function toggleUserMenu(e) {
  e.stopPropagation()
  userMenuOpen.value = !userMenuOpen.value
}

function onClickOutside(e) {
  // đóng drawer
  if (open.value && drawerRef.value && !drawerRef.value.contains(e.target)) {
    hideDrawer()
  }
  // đóng dropdown user
  if (userMenuOpen.value && userMenuRef.value && !userMenuRef.value.contains(e.target)) {
    userMenuOpen.value = false
  }
}

function onKeydown(e) {
  if (e.key === 'Escape') {
    if (open.value) hideDrawer()
    if (userMenuOpen.value) userMenuOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('click', onClickOutside)
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('click', onClickOutside)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <div class="h-24 bg-gray-100 dark:bg-gray-300">
  <!-- Wrapper -->
  <div class="text-left transition-all duration-300" :class="open ? 'ml-70' : 'ml-0'">
    <!-- Navbar -->
    <nav class="bg-white dark:bg-gray-100 shadow h-20">
      <div class="max-w-screen-xl mx-auto px-4 flex items-center justify-between">
        <!-- Left: Drawer button + Logo -->
        <div class="flex items-center gap-3">
          <button
            @click="showDrawer"
            class="inline-flex items-center text-gray-700 bg-gray-100 hover:bg-gray-400 focus:ring-4 focus:ring-slate-300/30 font-medium rounded-lg text-sm px-3 py-2 focus:outline-none"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
          </button>
          <a href="#" class="flex items-center">
            <img src="/logo-Photoroom.png" alt="Logo" class="h-20 w-auto mr-2 object-contain"/>
            <span class="text-2xl font-bold text-gray-800 dark:text-black">Trang Chủ</span>
          </a>
        </div>

        <!-- Center: Search -->
        <div class="hidden md:flex flex-1 justify-center px-6">
          <div class="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Tìm kiếm..."
              class="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-300 focus:border-blue-300 focus:outline-none shadow-sm text-gray-700 placeholder-gray-400"
            />
            <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
                 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
          </div>
        </div>

        <!-- Right: Menu -->
        <div class="flex items-center gap-6">
        <ul class="hidden md:flex space-x-6 font-medium text-gray-700">
  <!-- Icon 1: Bell -->
  <li>
    <div class="relative w-6 h-6 group">
      <!-- Icon mặc định -->
      <svg xmlns="http://www.w3.org/2000/svg"
           class="absolute inset-0 w-6 h-6 text-gray-800 opacity-100 group-hover:opacity-0 transition duration-300"
           fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M15 17h5l-1.405-1.405C18.21 14.79 18 13.918 18 13V9a6 6 0 00-12 0v4c0 .918-.21 1.79-.595 2.595L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
      </svg>
      <!-- Icon hover -->
      <svg xmlns="http://www.w3.org/2000/svg"
           class="absolute inset-0 w-6 h-6 text-blue-400 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition duration-300"
           viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 22a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2ZM18 16V9a6 6 0 1 0-12 0v7l-2 2v1h16v-1l-2-2Z"/>
      </svg>
    </div>
  </li>

  <!-- Icon 2: Mail -->
  <li>
    <div class="relative w-6 h-6 group">
      <svg xmlns="http://www.w3.org/2000/svg"
           class="absolute inset-0 w-6 h-6 text-gray-800 opacity-100 group-hover:opacity-0 transition duration-300"
           fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 8l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg"
           class="absolute inset-0 w-6 h-6 text-blue-400 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition duration-300"
           viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5a2.25 2.25 0 0 1 2.25 2.25v.63l-10.5 6.563L1.5 7.38v-.63ZM1.5 9.75v7.5A2.25 2.25 0 0 0 3.75 19.5h16.5a2.25 2.25 0 0 0 2.25-2.25v-7.5l-10.5 6.563L1.5 9.75Z"/>
      </svg>
    </div>
  </li>

  <!-- Icon 3: Calendar -->
  <li>
    <div class="relative w-6 h-6 group">
      <svg xmlns="http://www.w3.org/2000/svg"
           class="absolute inset-0 w-6 h-6 text-gray-800 opacity-100 group-hover:opacity-0 transition duration-300"
           fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
      <svg xmlns="http://www.w3.org/2000/svg"
           class="absolute inset-0 w-6 h-6 text-blue-400 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition duration-300"
           viewBox="0 0 24 24" fill="currentColor">
        <path d="M6.75 3A.75.75 0 0 0 6 3.75v.75H5.25A2.25 2.25 0 0 0 3 6.75v12A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75v-12A2.25 2.25 0 0 0 18.75 4.5H18V3.75a.75.75 0 0 0-1.5 0V4.5h-9V3.75A.75.75 0 0 0 6.75 3Z"/>
        <path d="M5.25 8.25h13.5v10.5H5.25V8.25Z"/>
      </svg>
    </div>
  </li>
</ul>


      </div>
        <div class="relative flex items-center ml-4">
          <div class="px-4 py-3">
          <span class="block text-base text-gray-900 dark:text-gray-800">Ti Du</span>
          <span class="block text-sm  text-gray-500 truncate dark:text-gray-500">tuantu@gmail.com</span>
            </div>
          <button
            type="button"
            @click="toggleUserMenu"
            
            class="flex text-sm bg-gray-800 rounded-full focus:ring-2 focus:ring-gray-300"
          >
            <span class="sr-only">Open user menu</span>
            <img
              class="w-12 h-12 rounded-full"
              src="/z6409141730481_27026a65d4c8860e3667c8b0eb18fca1.jpg"
              alt="user photo"
            />
          </button>
      <!-- Dropdown menu -->
<transition name="fade-scale">
  <div
    v-if="userMenuOpen"
    ref="userMenuRef"
    class="absolute right-0 top-14 z-50 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-dropdown"
  >
    <!-- Header -->
    <div class="px-4 py-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border-b border-gray-100">
      <p class="text-sm font-semibold text-gray-800">Xin chào 👋</p>
      <p class="text-xs text-gray-500">Chúc bạn một ngày tốt lành!</p>
    </div>

    <!-- Menu items -->
    <div class="py-2">
      <!-- Thông Tin -->
        <a
          @click="$emit('open-profile'); userMenuOpen = false"
          class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
        >
          <svg
            class="w-5 h-5 mr-2 text-gray-400 group-hover:text-blue-500 group-hover:-translate-x-1 transition-transform duration-200"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >        
            <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
          </svg>
          Thông Tin
        </a>

      <!-- Cài Đặt -->
      <a
        href="#"
        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
      >
        <svg
          class="w-5 h-5 mr-2 text-gray-400 group-hover:text-blue-500 group-hover:-translate-x-1 transition-transform duration-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z"/>
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/>
        </svg>
        Cài Đặt
      </a>

      <!-- Đường kẻ -->
      <div class="border-t border-gray-200 my-2"></div>

      <!-- Register -->
      <a
        @click="$emit('open-register'); userMenuOpen = false"
        class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
      >
        <svg
          class="w-5 h-5 mr-2 text-gray-400 group-hover:text-blue-500 group-hover:-translate-x-1 transition-transform duration-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12h4m-2 2v-4M4 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
        </svg>
        Đăng Ký
      </a>

      <!-- Đăng Xuất -->
      <a
        href="#"
        class="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
      >
        <svg
          class="w-5 h-5 mr-2 text-red-400 group-hover:text-red-600 group-hover:-translate-x-1 transition-transform duration-200"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"/>
        </svg>
        Đăng Xuất
      </a>
    </div>
  </div>
</transition>
        </div>
      </div>    
    </nav>
  </div>
  </div>

  <!-- Overlay -->
  <transition name="fade">
    <div
      v-if="open"
      ref="overlayRef"
      class="fixed inset-0 bg-black/40 z-40"
      aria-hidden="true"
    />
  </transition>

  <!-- Drawer -->
  <transition name="slide-right">
    <aside
      v-if="open"
      id="drawer-navigation"
      ref="drawerRef"
      class="fixed top-0 left-0 z-50 w-72 max-w-full h-screen p-4 overflow-y-auto bg-white shadow-xl"
      tabindex="-1"
      role="dialog"
      aria-label="Sidebar navigation"
    >
      <div class="flex items-start justify-between mb-4">
        <h5 class="text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
          Menu
        </h5>
        <button
          @click.stop="hideDrawer"
          class="text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-300 rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-sky-400"
          aria-label="Close menu"
        >
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 
                     111.414 1.414L11.414 10l4.293 4.293a1 1 0 
                     01-1.414 1.414L10 11.414l-4.293 4.293a1 1 
                     0 01-1.414-1.414L8.586 10 4.293 
                     5.707a1 1 0 010-1.414z"/>
          </svg>
        </button>
      </div>

      <nav class="py-2">
        <ul class="space-y-2 font-medium">
          <li><a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-blue-100">Nhà Cung Cấp</a></li>
          <li><a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-blue-100">Tạo Phiếu Xuất</a></li>
          <li><a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-blue-100">Tạo Phiếu Nhập</a></li>
          <li><a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-blue-100">Loại Hàng Hóa</a></li>
          <li><a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-blue-100">Hàng Hóa</a></li>
          <li><a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-blue-100">Nhân Viên</a></li>
          <li><a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-blue-100">Nhà Kho</a></li>
          <li><a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-blue-100">Thống Kê, Báo Cáo</a></li>
          <li><a href="#" class="flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-blue-100">Xuất File, Nhập File</a></li>
        </ul>
        <!-- Footer -->
        <div class="border-t border-gray-200 p-4">
          <p class="text-sm text-gray-500">© 2025 Công ty Bé Dâu</p>
          <p class="text-sm text-gray-500">Made with by BinhTrung Studio</p>
        </div>
      </nav>
    </aside>
  </transition>
</template>

<style scoped>
/* Overlay + Drawer transitions */
.fade-enter-from, .fade-leave-to { opacity: 0; }
.fade-enter-to, .fade-leave-from { opacity: 1; }
.fade-enter-active, .fade-leave-active { transition: opacity 150ms ease; }

.slide-right-enter-from { transform: translateX(-100%); opacity: 0; }
.slide-right-enter-to { transform: translateX(0); opacity: 1; }
.slide-right-leave-from { transform: translateX(0); opacity: 1; }
.slide-right-leave-to { transform: translateX(-100%); opacity: 0; }
.slide-right-enter-active, .slide-right-leave-active {
  transition: transform 200ms ease, opacity 150ms ease;
}

/* Dropdown scale fade */
.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition: all 0.2s ease;
}

/* Hiệu ứng nổi mượt */
@keyframes dropdown {
  0% {
    opacity: 0;
    transform: translateY(-8px) scale(0.97);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.animate-dropdown {
  animation: dropdown 0.25s ease-out;
}

</style>
