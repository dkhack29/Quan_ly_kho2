<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-6xl mx-auto relative">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Thông tin tài khoản</h1>
        <p class="text-gray-600 mt-2">Quản lý thông tin cá nhân và tài khoản</p>
      </div>

      <!-- Main Content Card -->
      <div class="bg-white rounded-lg shadow-sm border p-8 relative">
        <!-- Welcome Section -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Xin chào, {{ userInfo.ten }}</h2>
          <p class="text-gray-600">{{ currentDate }}</p>
        </div>

        <!-- Profile Section -->
        <div class="flex items-start space-x-6 mb-8">
          <!-- Avatar -->
          <div class="relative">
            <img 
              :src="userInfo.avatar" 
              :alt="userInfo.ten"
              class="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
            />
            <button 
              @click="changeAvatar"
              class="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </button>
          </div>

          <!-- User Info -->
          <div class="flex-1">
            <h3 class="text-xl font-semibold text-gray-900">{{ userInfo.ten }}</h3>
            <p class="text-gray-600">{{ userInfo.email }}</p>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-3">
            <button 
              @click="toggleEdit"
              class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Chỉnh sửa
            </button>
            <button 
              @click="changePassword"
              class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"/>
              </svg>
              Đổi mật khẩu
            </button>
          </div>
        </div>

        <!-- Personal Information Display -->
        <div class="space-y-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Thông tin cá nhân</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Left Column -->
            <div class="space-y-4">
              <!-- Tên người dùng -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tên người dùng</label>
                <div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
                  {{ userInfo.username }}
                </div>
              </div>

              <!-- Giới tính -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Giới tính</label>
                <div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
                  {{ userInfo.gender }}
                </div>
              </div>

              <!-- Ngày sinh -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Ngày sinh</label>
                <div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
                  {{ formatDate(userInfo.birthday) }}
                </div>
              </div>
            </div>

            <!-- Right Column -->
            <div class="space-y-4">
              <!-- Tên -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tên</label>
                <div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
                  {{ userInfo.ten }}
                </div>
              </div>

              <!-- Chức vụ -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Chức vụ</label>
                <div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
                  {{ userInfo.position }}
                </div>
              </div>

              <!-- Số điện thoại -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
                <div class="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-gray-900">
                  {{ userInfo.phone }}
                </div>
              </div>
            </div>
          </div>

          <!-- Email Section -->
          <div class="border-t border-gray-200 pt-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Email của tôi</h3>
            <div class="flex items-center space-x-3 mb-2">
              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span class="text-gray-900 font-medium">{{ userInfo.email }}</span>
            </div>
            <p class="text-sm text-gray-500 mb-4">Đã cập nhật 1 tháng trước</p>
            <button 
              @click="changeEmail"
              class="px-4 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Đổi email
            </button>
          </div>
        </div>

        <!-- Edit Account Modal -->
        <div v-if="showEditModal" class="absolute inset-0 flex items-center justify-center z-20" @click="closeEditModal">
          <div class="bg-white rounded-lg shadow-2xl border border-gray-200 max-w-2xl w-full mx-4 relative" @click.stop>
            <!-- Modal Header -->
            <div class="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
              <h3 class="text-lg font-semibold text-gray-900">Chỉnh sửa tài khoản</h3>
              <div class="flex items-center space-x-2">
                <div class="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-bold">D</span>
                </div>
                <button 
                  @click="closeEditModal"
                  class="w-6 h-6 bg-gray-500 rounded-full flex items-center justify-center hover:bg-gray-600"
                >
                  <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Modal Body -->
            <form @submit.prevent="saveUserInfo" class="p-4">
              <div class="grid grid-cols-2 gap-4">
                <!-- Left Column -->
                <div class="space-y-3">
                  <!-- Tên người dùng -->
                  <div>
                    <label for="modal-username" class="block text-xs font-medium text-gray-700 mb-1">Tên người dùng</label>
                    <input
                      type="text"
                      id="modal-username"
                      v-model="editForm.username"
                      class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <!-- Email -->
                  <div>
                    <label for="modal-email" class="block text-xs font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      id="modal-email"
                      v-model="editForm.email"
                      class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <!-- Right Column -->
                <div class="space-y-3">
                  <!-- Tên -->
                  <div>
                    <label for="modal-ten" class="block text-xs font-medium text-gray-700 mb-1">Tên</label>
                    <input
                      type="text"
                      id="modal-ten"
                      v-model="editForm.ten"
                      class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <!-- Số điện thoại -->
                  <div>
                    <label for="modal-phone" class="block text-xs font-medium text-gray-700 mb-1">Số điện thoại</label>
                    <input
                      type="tel"
                      id="modal-phone"
                      v-model="editForm.phone"
                      class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <!-- Ngày sinh -->
                  <div>
                    <label for="modal-birthday" class="block text-xs font-medium text-gray-700 mb-1">Ngày sinh</label>
                    <div class="relative">
                      <input
                        type="date"
                        id="modal-birthday"
                        v-model="editForm.birthday"
                        class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <div class="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
                        <svg class="h-3 w-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  <!-- Giới tính -->
                  <div>
                    <label for="modal-gender" class="block text-xs font-medium text-gray-700 mb-1">Giới tính</label>
                    <select
                      id="modal-gender"
                      v-model="editForm.gender"
                      class="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Chọn giới tính</option>
                      <option value="Nam">Nam</option>
                      <option value="Nữ">Nữ</option>
                      <option value="Khác">Khác</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Modal Footer -->
              <div class="flex justify-end space-x-2 mt-4 pt-3 border-t border-gray-200">
                <button
                  type="button"
                  @click="resetForm"
                  class="px-3 py-1.5 border border-gray-300 rounded text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  Refresh
                </button>
                <button
                  type="submit"
                  class="px-3 py-1.5 border border-transparent rounded text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500 flex items-center"
                >
                  <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                  Save
                </button>
              </div>
            </form>

            <!-- Chat/Help Button -->
            <div class="absolute bottom-2 right-2">
              <div class="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// Reactive data
const showEditModal = ref(false)
const userInfo = ref({
  ten: 'Nguyễn Đức Thắng',
  email: 'thangdn@gmail.com',
  username: 'thangdn',
  gender: 'Nam',
  birthday: '1990-01-15',
  position: 'Quản lý',
  phone: '0123456789',
  avatar: '/z6409141730481_27026a65d4c8860e3667c8b0eb18fca1.jpg'
})

const editForm = ref({
  ten: '',
  email: '',
  username: '',
  gender: '',
  birthday: '',
  phone: ''
})

// Computed
const currentDate = computed(() => {
  const now = new Date()
  const days = ['Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7']
  const months = ['tháng 1', 'tháng 2', 'tháng 3', 'tháng 4', 'tháng 5', 'tháng 6', 'tháng 7', 'tháng 8', 'tháng 9', 'tháng 10', 'tháng 11', 'tháng 12']
  
  const dayName = days[now.getDay()]
  const day = now.getDate()
  const month = months[now.getMonth()]
  const year = now.getFullYear()
  
  return `${dayName}, ngày ${day} ${month}, ${year}`
})

// Methods
const toggleEdit = () => {
  // Mở modal và load dữ liệu vào form
  editForm.value = { ...userInfo.value }
  showEditModal.value = true
}

const closeEditModal = () => {
  showEditModal.value = false
}

const resetForm = () => {
  // Reset form về dữ liệu gốc
  editForm.value = { ...userInfo.value }
}

const saveUserInfo = () => {
  // Cập nhật thông tin người dùng
  userInfo.value = { ...editForm.value }
  
  // Lưu vào localStorage
  localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
  
  // Hiển thị thông báo thành công
  alert('Thông tin đã được cập nhật thành công!')
  
  // Đóng modal
  showEditModal.value = false
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN')
}

const changeAvatar = () => {
  // Tạo input file ẩn
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  
  input.onchange = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        userInfo.value.avatar = e.target.result
        localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
      }
      reader.readAsDataURL(file)
    }
  }
  
  input.click()
}

const changePassword = () => {
  const newPassword = prompt('Nhập mật khẩu mới:')
  if (newPassword) {
    const confirmPassword = prompt('Xác nhận mật khẩu mới:')
    if (newPassword === confirmPassword) {
      alert('Mật khẩu đã được thay đổi thành công!')
    } else {
      alert('Mật khẩu xác nhận không khớp!')
    }
  }
}

const changeEmail = () => {
  const newEmail = prompt('Nhập email mới:')
  if (newEmail) {
    const confirmEmail = prompt('Xác nhận email mới:')
    if (newEmail === confirmEmail) {
      userInfo.value.email = newEmail
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
      alert('Email đã được thay đổi thành công!')
    } else {
      alert('Email xác nhận không khớp!')
    }
  }
}

// Load user info from localStorage on mount
onMounted(() => {
  const savedUserInfo = localStorage.getItem('userInfo')
  if (savedUserInfo) {
    userInfo.value = { ...userInfo.value, ...JSON.parse(savedUserInfo) }
  }
  
  // Add ESC key listener
  const handleEscKey = (event) => {
    if (event.key === 'Escape' && showEditModal.value) {
      closeEditModal()
    }
  }
  
  document.addEventListener('keydown', handleEscKey)
  
  // Cleanup on unmount
  onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleEscKey)
  })
})
</script>

<style scoped>
/* Custom styles nếu cần */
</style>