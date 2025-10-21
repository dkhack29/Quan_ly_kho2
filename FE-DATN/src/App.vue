<script setup>
import { ref, computed, onMounted } from 'vue'
import Sidebar from './components/ui/sidebar/Sidebar.vue'
import Register from './components/auth/register/Register.vue'
import Login from './components/auth/Login.vue'
import LoaiHangForm from './components/forms/LoaiHangForm.vue'
import NhaCungCapForm from './components/forms/NhaCungCapForm.vue'
import HangHoaForm from './components/forms/HangHoaForm.vue'
import TaiKhoanForm from './components/forms/TaiKhoanForm.vue'
import NhanVienForm from './components/forms/NhanVienForm.vue'
import LineChart from './components/ui/Charts/LineChart.vue'
import BarChart from './components/ui/Charts/BarChart.vue'
import AreaChart from './components/ui/Charts/AreaChart.vue'

const showRegister = ref(false)
const showLogin = ref(false)
const isLoggedIn = ref(false)
const currentView = ref('home')

const switchView = (view) => {
  currentView.value = view
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
  // Check if user is already logged in
  const savedLoginState = localStorage.getItem('isLoggedIn')
  if (savedLoginState === 'true') {
    isLoggedIn.value = true
  } else {
    showLogin.value = true
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
    <!-- Login Form -->
    <Login 
      v-if="showLogin && !isLoggedIn"
      @login-success="handleLoginSuccess"
      @show-register="showRegisterForm"
    />
    
    <!-- Register Form -->
    <Register 
      v-if="showRegister && !isLoggedIn"
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
      <div v-if="currentView === 'home'" class="min-h-screen bg-gray-100 p-8">
        <div class="max-w-7xl mx-auto">
          <!-- Summary Cards Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <!-- Card 1: Số lượng nhân viên -->
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Số lượng nhân viên</p>
                  <p class="text-3xl font-bold text-gray-900">562</p>
                </div>
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"/>
                  </svg>
                </div>
              </div>
              <div class="mt-4">
                <div class="flex items-center text-sm text-green-600">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                  </svg>
                  <span>+12% so với tháng trước</span>
                </div>
              </div>
            </div>

            <!-- Card 2: Nhà cung cấp -->
            <div class="bg-white rounded-lg shadow-sm border p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-600">Nhà cung cấp</p>
                  <p class="text-3xl font-bold text-gray-900">45</p>
                </div>
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                  </svg>
                </div>
              </div>
              <div class="mt-4">
                <div class="flex items-center text-sm text-blue-600">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                  </svg>
                  <span>+8% so với tháng trước</span>
                </div>
              </div>
            </div>

            <!-- Card 3: Số phiếu nhập -->
            <div class="bg-blue-600 rounded-lg shadow-sm p-6 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-blue-100">Số phiếu nhập</p>
                  <p class="text-3xl font-bold">1,200</p>
                </div>
                <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
                  </svg>
                </div>
              </div>
              <div class="mt-4">
                <div class="flex items-center text-sm text-blue-100">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                  </svg>
                  <span>+5% so với tháng trước</span>
                </div>
              </div>
            </div>

            <!-- Card 4: Số phiếu xuất -->
            <div class="bg-green-600 rounded-lg shadow-sm p-6 text-white">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-green-100">Số phiếu xuất</p>
                  <p class="text-3xl font-bold">850</p>
                </div>
                <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                </div>
              </div>
              <div class="mt-4">
                <div class="flex items-center text-sm text-green-100">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
                  </svg>
                  <span>+3% so với tháng trước</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Chart Section -->
          <div class="bg-white rounded-lg shadow-sm border mb-8">
            <div class="px-6 py-4 border-b">
              <div class="flex items-center justify-between">
                <h3 class="text-lg font-semibold text-gray-900">Thống kê số phiếu nhập, xuất kho</h3>
                <div class="flex space-x-2">
                  <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">2025</button>
                  <button class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">2024</button>
                  <button class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">2023</button>
                </div>
              </div>
            </div>
            <div class="p-6">
              <div class="h-64">
                <LineChart :data="importExportData" />
              </div>
            </div>
          </div>

          <!-- Bottom Statistics Row -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <!-- Thống kê chi tiêu -->
            <div class="bg-white rounded-lg shadow-sm border">
              <div class="px-6 py-4 border-b">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold text-gray-900">Thống kê chi tiêu</h3>
                  <div class="flex space-x-2">
                    <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">2025</button>
                    <button class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">2024</button>
                    <button class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">2023</button>
                  </div>
                </div>
              </div>
              <div class="p-6">
                <div class="text-3xl font-bold text-gray-900 mb-4">12.434.000 VND</div>
                <div class="h-32">
                  <AreaChart :data="spendingData" />
                </div>
              </div>
            </div>

            <!-- Tổng tiền phiếu xuất, nhập -->
            <div class="bg-white rounded-lg shadow-sm border">
              <div class="px-6 py-4 border-b">
                <div class="flex items-center justify-between">
                  <h3 class="text-lg font-semibold text-gray-900">Tổng tiền phiếu xuất, nhập</h3>
                  <div class="flex space-x-2">
                    <button class="px-3 py-1 text-sm bg-blue-600 text-white rounded-md">Ngày</button>
                    <button class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Tháng</button>
                    <button class="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">Năm</button>
                  </div>
                </div>
              </div>
              <div class="p-6 space-y-6">
                <!-- Biểu đồ tổng tiền -->
                <div class="border rounded-lg p-4">
                  <div class="flex items-center justify-between mb-4">
                    <h4 class="font-medium text-gray-900">So sánh tổng tiền</h4>
                    <span class="text-xs text-gray-500">Cập nhật: 19/10/2025</span>
                  </div>
                  <div class="h-40">
                    <BarChart :data="moneyData" />
                  </div>
                  <div class="mt-4 grid grid-cols-2 gap-4">
                    <div class="text-center">
                      <div class="text-lg font-bold text-red-600">45.230.000 VND</div>
                      <div class="text-sm text-gray-600">Phiếu xuất</div>
                    </div>
                    <div class="text-center">
                      <div class="text-lg font-bold text-green-600">38.150.000 VND</div>
                      <div class="text-sm text-gray-600">Phiếu nhập</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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