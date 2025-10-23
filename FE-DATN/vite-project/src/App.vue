<script setup>
import { ref, computed, onMounted } from 'vue'
import Sidebar from './components/sidebar/Sidebar.vue'
import Register from './components/register/Register.vue'
import Login from './components/Login.vue'
import LoaiHangForm from './components/LoaiHangForm.vue'
import NhaCungCapForm from './components/NhaCungCapForm.vue'
import HangHoaForm from './components/HangHoaForm.vue'
import TaiKhoanForm from './components/TaiKhoanForm.vue'
import PhieuNhapKhoForm from './components/PhieuNhapKhoForm.vue'
import PhieuXuatKhoForm from './components/PhieuXuatKhoForm.vue'
import NhanVienForm from './components/NhanVienForm.vue'
import LineChart from './components/Charts/LineChart.vue'
import BarChart from './components/Charts/BarChart.vue'
import AreaChart from './components/Charts/AreaChart.vue'
import Dashboard from './components/Dashboard.vue'
import Loading from './components/Loading.vue'

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
  // Show loading on initial load
  isLoading.value = true
  
  // Check if user is already logged in
  const savedLoginState = localStorage.getItem('isLoggedIn')
  if (savedLoginState === 'true') {
    setTimeout(() => {
      isLoggedIn.value = true
      isLoading.value = false
    }, 2000)
  } else {
    setTimeout(() => {
      showLogin.value = true
      isLoading.value = false
    }, 2000)
  }
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
    <Loading v-if="isLoading" />
    
    <!-- Login Form -->
    <Login 
      v-else-if="showLogin && !isLoggedIn"
      @login-success="handleLoginSuccess"
      @show-register="showRegisterForm"
    />
    
    <!-- Register Form -->
    <Register 
      v-else-if="showRegister && !isLoggedIn"
      @close="handleCloseRegister"
      @register-success="handleRegisterSuccess"
      @show-login="showLoginForm"
    />
    
    <!-- Main App (only show when logged in) -->
    <div v-else-if="isLoggedIn">
      <!-- Sidebar -->
  <Sidebar 
    @open-register="showRegister = true"
        @switch-view="switchView"
        @logout="handleLogout"
      />

      <!-- Main Content Area - Positioned below sidebar -->
      <div class="pt-20 min-h-screen">
      <!-- Home Page -->
      <Dashboard v-if="currentView === 'home'" />

      <!-- Loại Hàng Hóa -->
      <LoaiHangForm v-else-if="currentView === 'loai-hang'" />
      
      <!-- Nhà Cung Cấp -->
      <NhaCungCapForm v-else-if="currentView === 'nha-cung-cap'" />
      
      <!-- Hàng Hóa -->
      <HangHoaForm v-else-if="currentView === 'hang-hoa'" />
      
      <!-- Trang Tài Khoản -->
      <TaiKhoanForm v-else-if="currentView === 'tai-khoan'" />
      
      <!-- Phiếu Nhập Kho -->
      <PhieuNhapKhoForm v-else-if="currentView === 'phieu-nhap-kho'" />
      
      <!-- Phiếu Xuất Kho -->
      <PhieuXuatKhoForm v-else-if="currentView === 'phieu-xuat-kho'" />
      
      <!-- Nhân Viên -->
      <NhanVienForm v-else-if="currentView === 'nhan-vien'" />
      
      <!-- Tạo Phiếu Xuất -->
      <div v-else-if="currentView === 'tao-phieu-xuat'" class="min-h-screen bg-gray-100 p-8">
        <div class="max-w-7xl mx-auto">
          <div class="bg-white rounded-lg shadow-sm border p-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-4">Tạo Phiếu Xuất</h1>
            <p class="text-gray-600">Trang tạo phiếu xuất đang được phát triển...</p>
          </div>
        </div>
      </div>
      
      <!-- Tạo Phiếu Nhập -->
      <div v-else-if="currentView === 'tao-phieu-nhap'" class="min-h-screen bg-gray-100 p-8">
        <div class="max-w-7xl mx-auto">
          <div class="bg-white rounded-lg shadow-sm border p-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-4">Tạo Phiếu Nhập</h1>
            <p class="text-gray-600">Trang tạo phiếu nhập đang được phát triển...</p>
          </div>
        </div>
      </div>
      
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
      <div v-else-if="currentView === 'nhan-vien'" class="min-h-screen bg-gray-100 p-8">
        <div class="max-w-7xl mx-auto">
          <div class="bg-white rounded-lg shadow-sm border p-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-4">Nhân Viên</h1>
            <p class="text-gray-600">Trang quản lý nhân viên đang được phát triển...</p>
          </div>
        </div>
      </div>
      
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
      <div v-else-if="currentView === 'xuat-nhap-file'" class="min-h-screen bg-gray-100 p-8">
        <div class="max-w-7xl mx-auto">
          <div class="bg-white rounded-lg shadow-sm border p-8">
            <h1 class="text-2xl font-bold text-gray-900 mb-4">Xuất File, Nhập File</h1>
            <p class="text-gray-600">Trang xuất nhập file đang được phát triển...</p>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>