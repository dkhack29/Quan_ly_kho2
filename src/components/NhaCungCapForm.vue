<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Quản lý Nhà Cung Cấp</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="showForm = !showForm"
              class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span>{{ showForm ? 'Ẩn Form' : 'Thêm Nhà Cung Cấp' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Form Section với card đẹp -->
      <div v-if="showForm" class="mb-8">
        <div class="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
          <div class="bg-gray-500 px-8 py-6">
            <h2 class="text-2xl font-bold text-white flex items-center">
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              Thông tin nhà cung cấp mới
            </h2>
            <p class="text-green-100 mt-1">Điền đầy đủ thông tin để tạo nhà cung cấp mới</p>
          </div>
          
          <form @submit.prevent="handleSubmit" class="p-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Thông tin cơ bản -->
              <div class="space-y-6">
                <h3 class="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Thông tin cơ bản</h3>
                
                <!-- ID NCC -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Mã nhà cung cấp <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                      v-model="formData.id"
                      type="text"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Nhập mã NCC"
                      required
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Tên NCC -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Tên nhà cung cấp <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="formData.tenNCC"
                    type="text"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Nhập tên nhà cung cấp"
                    required
                  />
                </div>

                <!-- Địa chỉ -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">Địa chỉ</label>
                  <textarea
                    v-model="formData.diaChi"
                    rows="3"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Nhập địa chỉ nhà cung cấp"
                  ></textarea>
                </div>
              </div>

              <!-- Thông tin liên hệ -->
              <div class="space-y-6">
                <h3 class="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Thông tin liên hệ</h3>
                
                <!-- Số điện thoại -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">Số điện thoại</label>
                  <div class="relative">
                    <input
                      v-model="formData.soDienThoai"
                      type="tel"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Nhập số điện thoại"
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Email -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">Email</label>
                  <div class="relative">
                    <input
                      v-model="formData.email"
                      type="email"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Nhập email nhà cung cấp"
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Website -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">Website</label>
                  <div class="relative">
                    <input
                      v-model="formData.website"
                      type="url"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="https://example.com"
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Form Actions -->
            <div class="flex items-center justify-end space-x-4 mt-8 pt-8 border-t border-gray-200">
              <button
                type="button"
                @click="resetForm"
                class="px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-200 font-medium"
              >
                Hủy bỏ
              </button>
              <button
                type="submit"
                class="px-8 py-3 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-all duration-200 font-medium flex items-center space-x-2 shadow-lg"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Lưu nhà cung cấp</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Table Section với thiết kế hiện đại -->
      <div class="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-800 flex items-center">
              <svg class="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Danh sách nhà cung cấp
            </h3>
            <div class="flex items-center space-x-4">
              <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {{ items.length }} nhà cung cấp
              </div>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã NCC
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên nhà cung cấp
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Địa chỉ
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Liên hệ
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in items" :key="item.id" class="hover:bg-blue-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      {{ item.id }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ item.tenNCC }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">{{ item.diaChi || '-' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.soDienThoai || '-' }}</div>
                  <div class="text-sm text-gray-500">{{ item.email || '-' }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-3">
                    <button
                      @click="editItem(item)"
                      class="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-100 transition-all duration-200"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button
                      @click="deleteItem(item.id)"
                      class="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-100 transition-all duration-200"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

console.log('NhaCungCapForm component loaded')

// Reactive data
const showForm = ref(false)
const formData = ref({
  id: '',
  tenNCC: '',
  diaChi: '',
  soDienThoai: '',
  email: '',
  website: ''
})

// Sample data
const items = ref([
  {
    id: 'NCC001',
    tenNCC: 'Công ty TNHH ABC',
    diaChi: '123 Đường ABC, Quận 1, TP.HCM',
    soDienThoai: '0123456789',
    email: 'contact@abc.com',
    website: 'https://abc.com'
  },
  {
    id: 'NCC002',
    tenNCC: 'Công ty Cổ phần XYZ',
    diaChi: '456 Đường XYZ, Quận 2, TP.HCM',
    soDienThoai: '0987654321',
    email: 'info@xyz.com',
    website: 'https://xyz.com'
  },
  {
    id: 'NCC003',
    tenNCC: 'Công ty TNHH DEF',
    diaChi: '789 Đường DEF, Quận 3, TP.HCM',
    soDienThoai: '0369258147',
    email: 'hello@def.com',
    website: 'https://def.com'
  }
])

// Methods
const handleSubmit = () => {
  if (!formData.value.id || !formData.value.tenNCC) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc')
    return
  }

  // Add new item
  items.value.push({ ...formData.value })
  alert('Đã thêm nhà cung cấp thành công!')
  resetForm()
}

const editItem = (item) => {
  formData.value = { ...item }
  showForm.value = true
}

const deleteItem = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa nhà cung cấp này?')) {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }
}

const resetForm = () => {
  formData.value = {
    id: '',
    tenNCC: '',
    diaChi: '',
    soDienThoai: '',
    email: '',
    website: ''
  }
  showForm.value = false
}
</script>
