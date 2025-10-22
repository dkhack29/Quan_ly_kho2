<script setup>
import { ref, computed, onMounted } from 'vue'
import Sidebar from './components/sidebar/Sidebar.vue'
import Register from './components/register/Register.vue'
import Login from './components/Login.vue'
import LoaiHangForm from './components/LoaiHangForm.vue'
import NhaCungCapForm from './components/NhaCungCapForm.vue'
import HangHoaForm from './components/HangHoaForm.vue'
import TaiKhoanForm from './components/TaiKhoanForm.vue'
import LineChart from './components/Charts/LineChart.vue'
import BarChart from './components/Charts/BarChart.vue'
import AreaChart from './components/Charts/AreaChart.vue'
import WaveChart from './components/Charts/WaveChart.vue'
import PhieuNhapForm from './components/PhieuNhapForm.vue'
import PhieuXuatForm from './components/PhieuXuatForm.vue'
import Loading from './components/Loading.vue'
import StatsCardSimple from './components/StatsCardSimple.vue'
import HomeDashboard from './components/HomeDashboard.vue'
import NhanVienForm from './components/NhanVienForm.vue'
import XuatNhapFileForm from './components/XuatNhapFileForm.vue'

const showRegister = ref(false)
const showLogin = ref(false)
const isLoggedIn = ref(false)
const currentView = ref('home')
const isLoading = ref(false)

const switchView = (view) => {
  isLoading.value = true
  currentView.value = view
  
  // Simulate loading time
  setTimeout(() => {
    isLoading.value = false
  }, 1500)
}

const handleLoginSuccess = () => {
  isLoggedIn.value = true
  showLogin.value = false
}

const handleLogout = () => {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userEmail')
  isLoggedIn.value = false
  showLogin.value = true
  currentView.value = 'home'
}

const handleRegisterSuccess = (userData) => {
  showLogin.value = true
}

const showLoginForm = () => {
  showRegister.value = false
  showLogin.value = true
}

const showRegisterForm = () => {
  showLogin.value = false
  showRegister.value = true
}

const handleCloseRegister = () => {
  showRegister.value = false
  showLogin.value = true
}

onMounted(() => {
  // Show loading on app start
  isLoading.value = true
  
  // Check if user is already logged in
  const savedLoginState = localStorage.getItem('isLoggedIn')
  
  // Simulate loading time
  setTimeout(() => {
    isLoading.value = false
    if (savedLoginState === 'true') {
      isLoggedIn.value = true
    } else {
      showLogin.value = true
    }
  }, 2000) // 2 seconds loading
})

// Dữ liệu cho biểu đồ thống kê phiếu nhập/xuất
const importExportData = computed(() => ({
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  datasets: [
    {
      label: 'Phiếu xuất kho',
      data: [65, 59, 80, 81, 56, 55, 40, 45, 50, 60, 70, 75],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: false
    },
    {
      label: 'Phiếu nhập kho',
      data: [28, 48, 40, 19, 86, 27, 90, 35, 45, 55, 65, 70],
      borderColor: '#10B981',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      tension: 0.4,
      fill: false
    }
  ]
}))

// Dữ liệu cho biểu đồ chi tiêu
const spendingData = computed(() => ({
  labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
  datasets: [
    {
      label: 'Chi tiêu (VND)',
      data: [1200000, 1900000, 3000000, 5000000, 2000000, 3000000, 4500000, 3200000, 2800000, 3500000, 4200000, 3800000],
      borderColor: '#3B82F6',
      backgroundColor: 'rgba(59, 130, 246, 0.2)',
      tension: 0.4,
      fill: true
    }
  ]
}))

// Dữ liệu cho biểu đồ tổng tiền phiếu
const moneyData = computed(() => ({
  labels: ['Xuất', 'Nhập'],
  datasets: [
    {
      label: 'Tổng tiền (VND)',
      data: [45230000, 38150000],
      backgroundColor: ['#EF4444', '#10B981'],
      borderColor: ['#DC2626', '#059669'],
      borderWidth: 1
    }
  ]
}))
</script>

<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Loading Screen -->
    <div v-if="isLoading" class="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
      <div class="text-center">
        <Loading />
        <p class="mt-4 text-gray-600 font-medium">Đang tải...</p>
      </div>
    </div>

    <!-- Login Form -->
    <Login 
      v-if="showLogin && !isLoggedIn && !isLoading"
      @login-success="handleLoginSuccess"
      @show-register="showRegisterForm"
    />
    
    <!-- Register Form -->
    <Register 
      v-if="showRegister && !isLoggedIn && !isLoading"
      @close="handleCloseRegister"
      @register-success="handleRegisterSuccess"
      @show-login="showLoginForm"
    />
    
    <!-- Main App (only show when logged in) -->
    <div v-else-if="isLoggedIn && !isLoading">

      <!-- Sidebar -->
  <Sidebar 
    @open-register="showRegister = true"
        @switch-view="switchView"
        @logout="handleLogout"
      />

      <!-- Main Content Area - Positioned below sidebar -->
      <div class="pt-20 min-h-screen">
      <!-- Home Page -->
      <div v-if="currentView === 'home'" class="min-h-screen bg-gray-100 p-8">
        <div class="max-w-7xl mx-auto">
          <HomeDashboard />
        </div>
      </div>

      <!-- Loại Hàng Hóa -->
      <LoaiHangForm v-else-if="currentView === 'loai-hang'" />
      
      <!-- Nhà Cung Cấp -->
      <NhaCungCapForm v-else-if="currentView === 'nha-cung-cap'" />
      
      <!-- Hàng Hóa -->
      <HangHoaForm v-else-if="currentView === 'hang-hoa'" />
      
      <!-- Trang Tài Khoản -->
      <TaiKhoanForm v-else-if="currentView === 'tai-khoan'" />
      
      <!-- Tạo Phiếu Xuất -->
      <PhieuXuatForm v-else-if="currentView === 'tao-phieu-xuat'" />
      
      <!-- Tạo Phiếu Nhập -->
      <PhieuNhapForm v-else-if="currentView === 'tao-phieu-nhap'" />
      
      <!-- Hàng Hóa -->
      <div v-else-if="currentView === 'hang-hoa'" class="min-h-screen bg-gray-100 p-8">
        <div class="max-w-7xl mx-auto">
          <div class="bg-white rounded-lg shadow-sm border p-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-4">Hàng Hóa</h1>
            <p class="text-gray-600">Trang hàng hóa đang được phát triển...</p>
          </div>
        </div>
      </div>
      
      <!-- Nhân Viên -->
      <NhanVienForm v-else-if="currentView === 'nhan-vien'" />
      
      <!-- Nhà Kho -->
      <div v-else-if="currentView === 'nha-kho'" class="min-h-screen bg-gray-100 p-8">
        <div class="max-w-7xl mx-auto">
          <div class="bg-white rounded-lg shadow-sm border p-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-4">Nhà Kho</h1>
            <p class="text-gray-600">Trang quản lý nhà kho đang được phát triển...</p>
          </div>
        </div>
      </div>
      
      <!-- Thống Kê -->
      <div v-else-if="currentView === 'thong-ke'" class="min-h-screen bg-gray-100 p-8">
        <div class="max-w-7xl mx-auto">
          <div class="bg-white rounded-lg shadow-sm border p-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-4">Thống Kê, Báo Cáo</h1>
            <p class="text-gray-600">Trang thống kê và báo cáo đang được phát triển...</p>
          </div>
        </div>
      </div>
      
      <!-- Xuất Nhập File -->
      <XuatNhapFileForm v-else-if="currentView === 'xuat-nhap-file'" />
      </div>
    </div>
  </div>
</template>