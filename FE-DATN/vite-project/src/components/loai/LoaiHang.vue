<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Left: Title -->
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Loại hàng</h1>
          </div>
          
          <!-- Center: Search -->
          <div class="flex-1 max-w-md mx-8">
            <div class="relative">
              <input
                type="text"
                placeholder="Tìm kiếm loại hàng..."
                v-model="searchQuery"
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <svg class="absolute left-3 top-2.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </div>
          </div>
          
          <!-- Right: Actions -->
          <div class="flex items-center space-x-4">
            <button
              @click="showCreateForm = true"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span>Thêm mới</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Form Section -->
      <div v-if="showCreateForm" class="bg-white rounded-lg shadow-sm border mb-8">
        <div class="px-6 py-4 border-b">
          <h2 class="text-lg font-semibold text-gray-900">
            {{ isEditing ? 'Chỉnh sửa loại hàng' : 'Thêm loại hàng mới' }}
          </h2>
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
                :disabled="isEditing"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"
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

            <!-- Hình ảnh Field -->
            <div class="md:col-span-2">
              <label for="hinhAnh" class="block text-sm font-medium text-gray-700 mb-2">
                Hình ảnh
              </label>
              <div class="flex items-center space-x-4">
                <input
                  type="file"
                  id="hinhAnh"
                  @change="handleImageUpload"
                  accept="image/*"
                  class="hidden"
                />
                <button
                  type="button"
                  @click="$refs.fileInput.click()"
                  class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  Chọn hình ảnh
                </button>
                <input
                  ref="fileInput"
                  type="file"
                  @change="handleImageUpload"
                  accept="image/*"
                  class="hidden"
                />
                <span v-if="formData.hinhAnh" class="text-sm text-gray-600">
                  {{ formData.hinhAnh.name }}
                </span>
              </div>
              
              <!-- Preview Image -->
              <div v-if="imagePreview" class="mt-4">
                <img
                  :src="imagePreview"
                  alt="Preview"
                  class="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
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
              <span>{{ isEditing ? 'Cập nhật' : 'Lưu' }}</span>
            </button>
          </div>
        </form>
      </div>

      <!-- Table Section -->
      <div class="bg-white rounded-lg shadow-sm border">
        <!-- Table Header -->
        <div class="px-6 py-4 border-b">
          <div class="flex items-center justify-between">
            <h3 class="text-lg font-semibold text-gray-900">Danh sách loại hàng</h3>
            <div class="flex items-center space-x-4">
              <select v-model="sortBy" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                <option value="id">Sắp xếp theo ID</option>
                <option value="tenLoai">Sắp xếp theo tên</option>
                <option value="moTa">Sắp xếp theo mô tả</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left">
                  <input type="checkbox" class="rounded border-gray-300" />
                </th>
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
                  Hình ảnh
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in filteredItems" :key="item.id" class="hover:bg-gray-50">
                <td class="px-6 py-4">
                  <input type="checkbox" class="rounded border-gray-300" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.id }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ item.tenLoai }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-900">
                  {{ item.moTa || '-' }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div v-if="item.hinhAnh" class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <img :src="item.hinhAnh" alt="Hình ảnh" class="w-full h-full object-cover rounded-lg" />
                  </div>
                  <div v-else class="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <svg class="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
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

        <!-- Pagination -->
        <div class="px-6 py-4 border-t bg-gray-50">
          <div class="flex items-center justify-between">
            <div class="text-sm text-gray-700">
              Hiển thị {{ currentPage * itemsPerPage - itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, totalItems) }} trong số {{ totalItems }} dữ liệu
            </div>
            <div class="flex items-center space-x-2">
              <button
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Trước
              </button>
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  'px-3 py-1 text-sm border rounded',
                  currentPage === page
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'border-gray-300 hover:bg-gray-50'
                ]"
              >
                {{ page }}
              </button>
              <button
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Sau
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

// Reactive data
const showCreateForm = ref(false)
const isEditing = ref(false)
const searchQuery = ref('')
const sortBy = ref('id')
const currentPage = ref(1)
const itemsPerPage = 10

// Form data
const formData = ref({
  id: '',
  tenLoai: '',
  moTa: '',
  hinhAnh: null
})

const imagePreview = ref('')

// Sample data
const items = ref([
  {
    id: 'LH001',
    tenLoai: 'Điện tử',
    moTa: 'Các sản phẩm điện tử và công nghệ',
    hinhAnh: null
  },
  {
    id: 'LH002',
    tenLoai: 'Thời trang',
    moTa: 'Quần áo và phụ kiện thời trang',
    hinhAnh: null
  },
  {
    id: 'LH003',
    tenLoai: 'Thực phẩm',
    moTa: 'Các sản phẩm thực phẩm và đồ uống',
    hinhAnh: null
  }
])

// Computed properties
const filteredItems = computed(() => {
  let filtered = items.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.id.toLowerCase().includes(query) ||
      item.tenLoai.toLowerCase().includes(query) ||
      (item.moTa && item.moTa.toLowerCase().includes(query))
    )
  }

  // Sort
  filtered.sort((a, b) => {
    if (sortBy.value === 'id') {
      return a.id.localeCompare(b.id)
    } else if (sortBy.value === 'tenLoai') {
      return a.tenLoai.localeCompare(b.tenLoai)
    } else if (sortBy.value === 'moTa') {
      return (a.moTa || '').localeCompare(b.moTa || '')
    }
    return 0
  })

  // Pagination
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filtered.slice(start, end)
})

const totalItems = computed(() => {
  let filtered = items.value
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.id.toLowerCase().includes(query) ||
      item.tenLoai.toLowerCase().includes(query) ||
      (item.moTa && item.moTa.toLowerCase().includes(query))
    )
  }
  return filtered.length
})

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage))

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 4)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    formData.value.hinhAnh = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imagePreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const handleSubmit = () => {
  if (!formData.value.id || !formData.value.tenLoai) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc')
    return
  }

  if (isEditing.value) {
    // Update existing item
    const index = items.value.findIndex(item => item.id === formData.value.id)
    if (index !== -1) {
      items.value[index] = { ...formData.value }
    }
  } else {
    // Add new item
    items.value.push({ ...formData.value })
  }

  resetForm()
}

const editItem = (item) => {
  formData.value = { ...item }
  isEditing.value = true
  showCreateForm.value = true
  imagePreview.value = item.hinhAnh || ''
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
    moTa: '',
    hinhAnh: null
  }
  imagePreview.value = ''
  isEditing.value = false
  showCreateForm.value = false
}

// Watch for search changes to reset pagination
watch(searchQuery, () => {
  currentPage.value = 1
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
