<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const open = ref(false)
const userMenuOpen = ref(false)
const drawerRef = ref(null)
const overlayRef = ref(null)
const userMenuRef = ref(null)


function showDrawer(e) {
  e && e.stopPropagation()
  open.value = true
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = 'hidden'
  document.body.style.paddingRight = `${scrollbarWidth}px`
}

function hideDrawer() {
  open.value = false
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

const emit = defineEmits(['switch-view', 'open-register'])

function handleLoaiHangClick() {
  console.log('LoaiHang button clicked')
  emit('switch-view', 'loai-hang')
  console.log('Event emitted: loai-hang')
}

function handleNhaCungCapClick() {
  console.log('NhaCungCap button clicked')
  emit('switch-view', 'nha-cung-cap')
  console.log('Event emitted: nha-cung-cap')
}

function handleHangHoaClick() {
  console.log('HangHoa button clicked')
  emit('switch-view', 'hang-hoa')
  console.log('Event emitted: hang-hoa')
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
  <div class="min-h-screen bg-gray-100 dark:bg-gray-300">
  <!-- Wrapper -->
  <div class="text-left transition-all duration-300" :class="open ? 'ml-70' : 'ml-0'">
    <!-- Navbar -->
    <nav class="bg-white dark:bg-gray-300 h-20">
      <div class="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        <!-- Left: Drawer button + Logo -->
        <div class="flex items-center gap-3">
          <button
            @click="showDrawer"
            class="inline-flex items-center text-gray-700 bg-gray-300 hover:bg-gray-400 focus:ring-4 focus:ring-slate-300/30 font-medium rounded-lg text-sm px-3 py-2 focus:outline-none"
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
              class="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm text-gray-700 placeholder-gray-400"
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
           class="absolute inset-0 w-6 h-6 text-gray-600 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition duration-300"
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
           class="absolute inset-0 w-6 h-6 text-gray-600 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition duration-300"
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
           class="absolute inset-0 w-6 h-6 text-gray-600 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition duration-300"
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
      <transition name="fade">
            <div
              v-if="userMenuOpen"
              ref="userMenuRef"
              class="absolute right-0 top-12 z-50 w-48 bg-white rounded-md shadow-lg py-2 border border-gray-200"
            >
              <a @click="emit('open-register'); userMenuOpen = false" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Register</a>
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
          class="text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-sky-400"
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
          <li><button @click="handleNhaCungCapClick" class="w-full text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-400">Nhà Cung Cấp</button></li>
          <li><button @click="() => { console.log('TaoPhieuXuat clicked'); emit('switch-view', 'tao-phieu-xuat') }" class="w-full text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-400">Tạo Phiếu Xuất</button></li>
          <li><button @click="() => { console.log('TaoPhieuNhap clicked'); emit('switch-view', 'tao-phieu-nhap') }" class="w-full text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-400">Tạo Phiếu Nhập</button></li>
          <li><button @click="handleLoaiHangClick" class="w-full text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-400">Loại Hàng Hóa</button></li>
          <li><button @click="handleHangHoaClick" class="w-full text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-400">Hàng Hóa</button></li>
          <li><button @click="() => { console.log('NhanVien clicked'); emit('switch-view', 'nhan-vien') }" class="w-full text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-400">Nhân Viên</button></li>
          <li><button @click="() => { console.log('NhaKho clicked'); emit('switch-view', 'nha-kho') }" class="w-full text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-400">Nhà Kho</button></li>
          <li><button @click="() => { console.log('ThongKe clicked'); emit('switch-view', 'thong-ke') }" class="w-full text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-400">Thống Kê, Báo Cáo</button></li>
          <li><button @click="() => { console.log('XuatNhapFile clicked'); emit('switch-view', 'xuat-nhap-file') }" class="w-full text-left flex items-center p-2 text-gray-900 rounded-lg dark:text-gray-700 hover:bg-gray-100 dark:hover:bg-slate-400">Xuất File, Nhập File</button></li>
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
</style>
