<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Quản lý Loại Hàng Hóa</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="showForm = !showForm"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span>{{ showForm ? 'Ẩn Form' : 'Thêm Mới' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Form Section -->
      <div v-if="showForm" class="bg-white rounded-lg shadow-sm border mb-8">
        <div class="px-6 py-4 border-b">
          <h2 class="text-lg font-semibold text-gray-900">Thêm loại hàng mới</h2>
        </div>
        
        <form @submit.prevent="handleSubmit" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- ID Field -->
            <div>
              <label for="id" class="block text-sm font-medium text-gray-700 mb-2">
                ID <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="id"
                v-model="formData.id"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập ID loại hàng"
                required
              />
            </div>

            <!-- Tên loại Field -->
            <div>
              <label for="tenLoai" class="block text-sm font-medium text-gray-700 mb-2">
                Tên loại <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="tenLoai"
                v-model="formData.tenLoai"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập tên loại hàng"
                required
              />
            </div>

            <!-- Mô tả Field -->
            <div class="md:col-span-2">
              <label for="moTa" class="block text-sm font-medium text-gray-700 mb-2">
                Mô tả
              </label>
              <textarea
                id="moTa"
                v-model="formData.moTa"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập mô tả loại hàng"
              ></textarea>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex items-center justify-end space-x-4 mt-6 pt-6 border-t">
            <button
              type="button"
              @click="resetForm"
              class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
              </svg>
              <span>Lưu</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Table Section -->
      <div class="bg-white rounded-lg shadow-sm border">
        <!-- Table Header -->
        <div class="px-6 py-4 border-b">
          <h3 class="text-lg font-semibold text-gray-900">Danh sách loại hàng</h3>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên loại
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mô tả
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in items" :key="item.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.tenLoai }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ item.moTa || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-2">
                    <button
                      @click="editItem(item)"
                      class="text-blue-600 hover:text-blue-900 p-1 rounded"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button
                      @click="deleteItem(item.id)"
                      class="text-red-600 hover:text-red-900 p-1 rounded"
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

console.log('LoaiHangForm component loaded')

// Reactive data
const showForm = ref(false)
const formData = ref({
  id: '',
  tenLoai: '',
  moTa: ''
})

// Sample data
const items = ref([
  {
    id: 'LH001',
    tenLoai: 'Điện tử',
    moTa: 'Các sản phẩm điện tử và công nghệ'
  },
  {
    id: 'LH002',
    tenLoai: 'Thời trang',
    moTa: 'Quần áo và phụ kiện thời trang'
  },
  {
    id: 'LH003',
    tenLoai: 'Thực phẩm',
    moTa: 'Các sản phẩm thực phẩm và đồ uống'
  }
])

// Methods
const handleSubmit = () => {
  if (!formData.value.id || !formData.value.tenLoai) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc')
    return
  }

  // Add new item
  items.value.push({ ...formData.value })
  alert('Đã thêm loại hàng thành công!')
  resetForm()
}

const editItem = (item) => {
  formData.value = { ...item }
  showForm.value = true
}

const deleteItem = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa loại hàng này?')) {
    const index = items.value.findIndex(item => item.id === id)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }
}

const resetForm = () => {
  formData.value = {
    id: '',
    tenLoai: '',
    moTa: ''
  }
  showForm.value = false
}
</script>
