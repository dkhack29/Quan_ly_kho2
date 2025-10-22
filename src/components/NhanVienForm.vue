<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto">
       <!-- Header -->
       <div class="bg-gray-100 p-6 rounded-lg mb-8">
         <h1 class="text-3xl font-bold text-gray-700 flex items-center">
           <svg class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
           </svg>
           Thông tin nhân viên mới
         </h1>
         <p class="text-gray-600 mt-2">Điền đầy đủ thông tin để tạo nhân viên mới</p>
       </div>

      <!-- Form Thêm/Sửa Nhân viên -->
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">{{ isEditing ? 'Sửa Nhân viên' : 'Thêm Nhân viên Mới' }}</h2>
        
        <form @submit.prevent="saveNhanVien" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Mã NV -->
            <div>
              <label for="maNV" class="block text-sm font-medium text-gray-700 mb-2">Mã NV</label>
              <input
                type="text"
                id="maNV"
                v-model="currentNhanVien.maNV"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập mã nhân viên"
                required
              />
            </div>

            <!-- Tên nhân viên -->
            <div>
              <label for="tenNV" class="block text-sm font-medium text-gray-700 mb-2">Tên nhân viên</label>
              <input
                type="text"
                id="tenNV"
                v-model="currentNhanVien.tenNV"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập tên nhân viên"
                required
              />
            </div>

            <!-- Mã số thuế -->
            <div>
              <label for="maSoThue" class="block text-sm font-medium text-gray-700 mb-2">Mã số thuế</label>
              <input
                type="text"
                id="maSoThue"
                v-model="currentNhanVien.maSoThue"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập mã số thuế"
                required
              />
            </div>

            <!-- Địa chỉ -->
            <div>
              <label for="diaChi" class="block text-sm font-medium text-gray-700 mb-2">Địa chỉ</label>
              <input
                type="text"
                id="diaChi"
                v-model="currentNhanVien.diaChi"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập địa chỉ"
                required
              />
            </div>

            <!-- Số điện thoại -->
            <div>
              <label for="soDienThoai" class="block text-sm font-medium text-gray-700 mb-2">Số điện thoại</label>
              <input
                type="tel"
                id="soDienThoai"
                v-model="currentNhanVien.soDienThoai"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                v-model="currentNhanVien.email"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập email"
                required
              />
            </div>
          </div>

           <!-- Buttons -->
           <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200">
             <button
               type="button"
               @click="resetForm"
               class="px-6 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
             >
               Hủy
             </button>
             <button
               type="submit"
               class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
             >
               {{ isEditing ? 'Cập nhật' : 'Thêm mới' }}
             </button>
           </div>
        </form>
      </div>

      <!-- Bảng Danh sách Nhân viên -->
      <div class="bg-white rounded-lg shadow-sm border">
        <!-- Header của bảng -->
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-900">Danh sách Nhân viên</h3>
            <div class="flex items-center space-x-3">
              <!-- Search -->
              <div class="relative">
                <input
                  type="text"
                  v-model="searchTerm"
                  placeholder="Tìm kiếm..."
                  class="pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                  </svg>
                </div>
              </div>
              
              <!-- Filter Button -->
              <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"/>
                </svg>
                Lọc
              </button>

              <!-- Action Button -->
              <button class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"/>
                </svg>
                Hành động
              </button>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input type="checkbox" class="form-checkbox h-4 w-4 text-blue-600" />
                </th>
                <th @click="sortBy('maNV')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Mã NV
                  <span v-if="sortColumn === 'maNV'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th @click="sortBy('tenNV')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Tên nhân viên
                  <span v-if="sortColumn === 'tenNV'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th @click="sortBy('maSoThue')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Mã số thuế
                  <span v-if="sortColumn === 'maSoThue'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th @click="sortBy('diaChi')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Địa chỉ
                  <span v-if="sortColumn === 'diaChi'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th @click="sortBy('soDienThoai')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Số điện thoại
                  <span v-if="sortColumn === 'soDienThoai'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th @click="sortBy('email')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Email
                  <span v-if="sortColumn === 'email'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in paginatedNhanVien" :key="item.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" class="form-checkbox h-4 w-4 text-blue-600" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{{ item.maNV }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.tenNV }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.maSoThue }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.diaChi }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.soDienThoai }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.email }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button 
                      @click="editNhanVien(item)" 
                      class="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                      title="Chỉnh sửa"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                      </svg>
                    </button>
                    <button 
                      @click="deleteNhanVien(item.id)" 
                      class="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                      title="Xóa"
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
        <div class="px-6 py-4 border-t border-gray-200">
          <div class="flex justify-between items-center">
            <div class="text-sm text-gray-700">
              Hiển thị {{ (currentPage - 1) * itemsPerPage + 1 }} đến {{ Math.min(currentPage * itemsPerPage, filteredNhanVien.length) }} trong số {{ filteredNhanVien.length }} dữ liệu
            </div>
            <nav class="flex items-center space-x-2">
              <button
                @click="prevPage"
                :disabled="currentPage === 1"
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <button
                v-for="page in visiblePages"
                :key="page"
                @click="goToPage(page)"
                class="px-3 py-2 text-sm font-medium rounded-md"
                :class="page === currentPage 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'"
              >
                {{ page }}
              </button>
              
              <button
                @click="nextPage"
                :disabled="currentPage === totalPages"
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive data
const nhanVienList = ref([])
const currentNhanVien = ref({
  id: null,
  maNV: '',
  tenNV: '',
  maSoThue: '',
  diaChi: '',
  soDienThoai: '',
  email: ''
})
const isEditing = ref(false)
const searchTerm = ref('')
const sortColumn = ref('maNV')
const sortDirection = ref('asc')
const currentPage = ref(1)
const itemsPerPage = 10

// Hàm tạo ID duy nhất
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Dữ liệu mẫu ban đầu
onMounted(() => {
  nhanVienList.value = [
    { 
      id: generateUniqueId(), 
      maNV: 'NV001', 
      tenNV: 'Nguyễn Văn A', 
      maSoThue: '123456789123', 
      diaChi: 'Trảng Dài', 
      soDienThoai: '0123456789', 
      email: 'NVA@Gmail.com' 
    },
    { 
      id: generateUniqueId(), 
      maNV: 'NV002', 
      tenNV: 'Trần Văn C', 
      maSoThue: '123456789123', 
      diaChi: 'Bửu Long', 
      soDienThoai: '0123456789', 
      email: 'TVC@Gmail.com' 
    },
    { 
      id: generateUniqueId(), 
      maNV: 'NV003', 
      tenNV: 'Nguyễn Gia B', 
      maSoThue: '123456789123', 
      diaChi: 'Tân Mai', 
      soDienThoai: '0123456789', 
      email: 'NGB@Gmail.com' 
    },
    { 
      id: generateUniqueId(), 
      maNV: 'NV004', 
      tenNV: 'Lê Thị D', 
      maSoThue: '123456789123', 
      diaChi: 'Tân Mai', 
      soDienThoai: '0123456789', 
      email: 'LTD@Gmail.com' 
    },
    { 
      id: generateUniqueId(), 
      maNV: 'NV005', 
      tenNV: 'Phạm Văn E', 
      maSoThue: '123456789123', 
      diaChi: 'Trảng Dài', 
      soDienThoai: '0123456789', 
      email: 'PVE@Gmail.com' 
    }
  ]
})

// Computed properties
const filteredNhanVien = computed(() => {
  let filtered = nhanVienList.value.filter(item =>
    item.maNV.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    item.tenNV.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    item.maSoThue.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    item.diaChi.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    item.soDienThoai.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    item.email.toLowerCase().includes(searchTerm.value.toLowerCase())
  )

  if (sortColumn.value) {
    filtered.sort((a, b) => {
      const aValue = a[sortColumn.value]
      const bValue = b[sortColumn.value]

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortDirection.value === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      }
      return sortDirection.value === 'asc' ? aValue - bValue : bValue - aValue
    })
  }
  return filtered
})

const totalPages = computed(() => Math.ceil(filteredNhanVien.value.length / itemsPerPage))

const paginatedNhanVien = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredNhanVien.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push(i)
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) pages.push(i)
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) pages.push(i)
      pages.push('...')
      pages.push(total)
    }
  }
  return pages
})

// Methods
const sortBy = (column) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortColumn.value = column
    sortDirection.value = 'asc'
  }
}

const saveNhanVien = () => {
  if (isEditing.value) {
    const index = nhanVienList.value.findIndex(item => item.id === currentNhanVien.value.id)
    if (index !== -1) {
      nhanVienList.value[index] = { ...currentNhanVien.value }
    }
  } else {
    currentNhanVien.value.id = generateUniqueId()
    nhanVienList.value.push({ ...currentNhanVien.value })
  }
  resetForm()
}

const editNhanVien = (item) => {
  currentNhanVien.value = { ...item }
  isEditing.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const deleteNhanVien = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
    nhanVienList.value = nhanVienList.value.filter(item => item.id !== id)
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value
    } else if (totalPages.value === 0) {
      currentPage.value = 1
    }
  }
}

const resetForm = () => {
  currentNhanVien.value = {
    id: null,
    maNV: '',
    tenNV: '',
    maSoThue: '',
    diaChi: '',
    soDienThoai: '',
    email: ''
  }
  isEditing.value = false
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToPage = (page) => {
  if (typeof page === 'number') {
    currentPage.value = page
  }
}
</script>

<style scoped>
/* Custom styles nếu cần */
</style>
