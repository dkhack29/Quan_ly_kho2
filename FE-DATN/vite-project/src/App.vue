<script setup>
import { ref } from 'vue'
import Sidebar from './components/sidebar/Sidebar.vue'
import Register from './components/register/Register.vue'
import LoaiHangForm from './components/LoaiHangForm.vue'
import NhaCungCapForm from './components/NhaCungCapForm.vue'

const showRegister = ref(false)
const currentView = ref('loai-hang') // Default view

const switchView = (view) => {
  console.log('Switching to view:', view)
  currentView.value = view
  console.log('Current view is now:', currentView.value)
}
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <Sidebar 
      @open-register="showRegister = true"
      @switch-view="switchView"
    />

    <div class="ml-0 transition-all duration-300 min-h-screen">
      <!-- Debug Panel -->
      <div class="fixed top-4 right-4 z-50 bg-blue-100 p-3 rounded-lg border border-blue-300 text-sm">
        <div class="font-bold text-blue-800">Debug Info:</div>
        <div>Current View: <span class="font-mono bg-blue-200 px-2 py-1 rounded">{{ currentView }}</span></div>
      </div>
      
      <LoaiHangForm v-if="currentView === 'loai-hang'" />
      <NhaCungCapForm v-else-if="currentView === 'nha-cung-cap'" />
      
      <div v-else-if="currentView === 'tao-phieu-xuat'" class="p-8">
        <div class="bg-white rounded-lg shadow-sm border p-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">Tạo Phiếu Xuất</h1>
          <p class="text-gray-600">Trang tạo phiếu xuất đang được phát triển...</p>
        </div>
      </div>
      
      <div v-else-if="currentView === 'tao-phieu-nhap'" class="p-8">
        <div class="bg-white rounded-lg shadow-sm border p-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">Tạo Phiếu Nhập</h1>
          <p class="text-gray-600">Trang tạo phiếu nhập đang được phát triển...</p>
        </div>
      </div>
      
      <div v-else-if="currentView === 'hang-hoa'" class="p-8">
        <div class="bg-white rounded-lg shadow-sm border p-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">Hàng Hóa</h1>
          <p class="text-gray-600">Trang hàng hóa đang được phát triển...</p>
        </div>
      </div>
      
      <div v-else-if="currentView === 'nhan-vien'" class="p-8">
        <div class="bg-white rounded-lg shadow-sm border p-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">Nhân Viên</h1>
          <p class="text-gray-600">Trang quản lý nhân viên đang được phát triển...</p>
        </div>
      </div>
      
      <div v-else-if="currentView === 'nha-kho'" class="p-8">
        <div class="bg-white rounded-lg shadow-sm border p-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">Nhà Kho</h1>
          <p class="text-gray-600">Trang quản lý nhà kho đang được phát triển...</p>
        </div>
      </div>
      
      <div v-else-if="currentView === 'thong-ke'" class="p-8">
        <div class="bg-white rounded-lg shadow-sm border p-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">Thống Kê, Báo Cáo</h1>
          <p class="text-gray-600">Trang thống kê và báo cáo đang được phát triển...</p>
        </div>
      </div>
      
      <div v-else-if="currentView === 'xuat-nhap-file'" class="p-8">
        <div class="bg-white rounded-lg shadow-sm border p-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">Xuất File, Nhập File</h1>
          <p class="text-gray-600">Trang xuất nhập file đang được phát triển...</p>
        </div>
      </div>
      
      <div v-else class="p-8">
        <div class="bg-white rounded-lg shadow-sm border p-8">
          <h1 class="text-2xl font-bold text-gray-900 mb-4">Chào mừng đến với hệ thống quản lý kho</h1>
          <p class="text-gray-600 mb-4">Vui lòng chọn một mục từ menu bên trái để bắt đầu.</p>
        </div>
      </div>
    </div>

    <Register v-if="showRegister" @close="showRegister = false" />
  </div>
</template>
