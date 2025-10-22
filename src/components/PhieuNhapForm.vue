<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto">
       <!-- Header -->
       <div class="bg-gray-100 p-6 rounded-lg mb-8">
         <h1 class="text-3xl font-bold text-gray-700 flex items-center">
           <svg class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
           </svg>
           Thông tin phiếu nhập mới
         </h1>
         <p class="text-gray-600 mt-2">Điền đầy đủ thông tin để tạo phiếu nhập mới</p>
       </div>

      <!-- Form Thêm/Sửa Phiếu Nhập -->
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">{{ isEditing ? 'Sửa Phiếu Nhập' : 'Tạo Phiếu Nhập Mới' }}</h2>
        
        <form @submit.prevent="savePhieuNhap" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Mã phiếu -->
            <div>
              <label for="maPhieu" class="block text-sm font-medium text-gray-700 mb-2">Mã phiếu</label>
              <input
                type="text"
                id="maPhieu"
                v-model="currentPhieuNhap.maPhieu"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập mã phiếu"
                required
              />
            </div>

            <!-- Nguồn nhập -->
            <div>
              <label for="nguonNhap" class="block text-sm font-medium text-gray-700 mb-2">Nguồn nhập</label>
              <select
                id="nguonNhap"
                v-model="currentPhieuNhap.nguonNhap"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Chọn nguồn nhập</option>
                <option v-for="supplier in suppliers" :key="supplier" :value="supplier">{{ supplier }}</option>
              </select>
            </div>

            <!-- Tên hàng -->
            <div>
              <label for="tenHang" class="block text-sm font-medium text-gray-700 mb-2">Tên hàng</label>
              <input
                type="text"
                id="tenHang"
                v-model="currentPhieuNhap.tenHang"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập tên hàng"
                required
              />
            </div>

            <!-- Số lượng -->
            <div>
              <label for="soLuong" class="block text-sm font-medium text-gray-700 mb-2">Số lượng</label>
              <input
                type="number"
                id="soLuong"
                v-model.number="currentPhieuNhap.soLuong"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập số lượng"
                min="0"
                required
              />
            </div>

            <!-- Giá nhập -->
            <div>
              <label for="giaNhap" class="block text-sm font-medium text-gray-700 mb-2">Giá nhập</label>
              <input
                type="number"
                id="giaNhap"
                v-model.number="currentPhieuNhap.giaNhap"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập giá nhập"
                min="0"
                step="0.01"
                required
              />
            </div>

            <!-- Tình trạng -->
            <div>
              <label for="tinhTrang" class="block text-sm font-medium text-gray-700 mb-2">Tình trạng</label>
              <select
                id="tinhTrang"
                v-model="currentPhieuNhap.tinhTrang"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Chọn tình trạng</option>
                <option value="Chờ duyệt">Chờ duyệt</option>
                <option value="Đã duyệt">Đã duyệt</option>
                <option value="Đã hủy">Đã hủy</option>
              </select>
            </div>

            <!-- Tên người tạo phiếu -->
            <div>
              <label for="tenNguoiTao" class="block text-sm font-medium text-gray-700 mb-2">Tên người tạo phiếu</label>
              <input
                type="text"
                id="tenNguoiTao"
                v-model="currentPhieuNhap.tenNguoiTao"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập tên người tạo"
                required
              />
            </div>

            <!-- Thời gian -->
            <div>
              <label for="thoiGian" class="block text-sm font-medium text-gray-700 mb-2">Thời gian</label>
              <input
                type="datetime-local"
                id="thoiGian"
                v-model="currentPhieuNhap.thoiGian"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              {{ isEditing ? 'Cập nhật' : 'Tạo phiếu' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Bảng Danh sách Phiếu Nhập -->
      <div class="bg-white rounded-lg shadow-sm border">
        <!-- Header của bảng -->
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-900">Danh sách Phiếu Nhập</h3>
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
              
              <!-- Export Button -->
              <button class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 flex items-center">
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                Xuất Excel
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
                <th @click="sortBy('maPhieu')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Mã phiếu
                  <span v-if="sortColumn === 'maPhieu'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th @click="sortBy('nguonNhap')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Nguồn nhập
                  <span v-if="sortColumn === 'nguonNhap'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th @click="sortBy('tenHang')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Tên hàng
                  <span v-if="sortColumn === 'tenHang'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th @click="sortBy('soLuong')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Số lượng
                  <span v-if="sortColumn === 'soLuong'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th @click="sortBy('giaNhap')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Giá nhập
                  <span v-if="sortColumn === 'giaNhap'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th @click="sortBy('tinhTrang')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Tình trạng
                  <span v-if="sortColumn === 'tinhTrang'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th @click="sortBy('tenNguoiTao')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Tên người tạo
                  <span v-if="sortColumn === 'tenNguoiTao'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th @click="sortBy('thoiGian')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Thời gian
                  <span v-if="sortColumn === 'thoiGian'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in paginatedPhieuNhap" :key="item.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" class="form-checkbox h-4 w-4 text-blue-600" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{{ item.maPhieu }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.nguonNhap }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.tenHang }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.soLuong.toLocaleString() }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${{ item.giaNhap.toLocaleString() }}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 text-xs font-semibold rounded-full"
                        :class="{
                          'bg-yellow-100 text-yellow-800': item.tinhTrang === 'Chờ duyệt',
                          'bg-green-100 text-green-800': item.tinhTrang === 'Đã duyệt',
                          'bg-red-100 text-red-800': item.tinhTrang === 'Đã hủy'
                        }">
                    {{ item.tinhTrang }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.tenNguoiTao }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatDateTime(item.thoiGian) }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button 
                      @click="editPhieuNhap(item)" 
                      class="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                      title="Chỉnh sửa"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                      </svg>
                    </button>
                    <button 
                      @click="deletePhieuNhap(item.id)" 
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
              Hiển thị {{ (currentPage - 1) * itemsPerPage + 1 }} đến {{ Math.min(currentPage * itemsPerPage, filteredPhieuNhap.length) }} trong số {{ filteredPhieuNhap.length }} dữ liệu
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
const phieuNhapList = ref([])
const currentPhieuNhap = ref({
  id: null,
  maPhieu: '',
  nguonNhap: '',
  tenHang: '',
  soLuong: 0,
  giaNhap: 0,
  tinhTrang: '',
  tenNguoiTao: '',
  thoiGian: ''
})
const isEditing = ref(false)
const searchTerm = ref('')
const sortColumn = ref('maPhieu')
const sortDirection = ref('asc')
const currentPage = ref(1)
const itemsPerPage = 10

// Dữ liệu mẫu cho dropdown
const suppliers = ref(['Nhà cung cấp A', 'Nhà cung cấp B', 'Nhà cung cấp C', 'Nhà cung cấp D', 'Nhà cung cấp E'])

// Hàm tạo ID duy nhất
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Hàm format datetime
const formatDateTime = (dateTime) => {
  if (!dateTime) return '-'
  const date = new Date(dateTime)
  return date.toLocaleString('vi-VN')
}

// Dữ liệu mẫu ban đầu
onMounted(() => {
  phieuNhapList.value = [
    { 
      id: generateUniqueId(), 
      maPhieu: 'PN001', 
      nguonNhap: 'Nhà cung cấp A', 
      tenHang: 'iPhone 15 Pro Max', 
      soLuong: 50, 
      giaNhap: 25000000, 
      tinhTrang: 'Đã duyệt', 
      tenNguoiTao: 'Nguyễn Văn A', 
      thoiGian: '2025-01-15T10:30:00' 
    },
    { 
      id: generateUniqueId(), 
      maPhieu: 'PN002', 
      nguonNhap: 'Nhà cung cấp B', 
      tenHang: 'Samsung Galaxy S24', 
      soLuong: 30, 
      giaNhap: 20000000, 
      tinhTrang: 'Chờ duyệt', 
      tenNguoiTao: 'Trần Thị B', 
      thoiGian: '2025-01-15T14:20:00' 
    },
    { 
      id: generateUniqueId(), 
      maPhieu: 'PN003', 
      nguonNhap: 'Nhà cung cấp C', 
      tenHang: 'MacBook Pro M3', 
      soLuong: 20, 
      giaNhap: 45000000, 
      tinhTrang: 'Đã duyệt', 
      tenNguoiTao: 'Lê Văn C', 
      thoiGian: '2025-01-14T09:15:00' 
    }
  ]
})

// Computed properties
const filteredPhieuNhap = computed(() => {
  let filtered = phieuNhapList.value.filter(item =>
    item.maPhieu.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    item.nguonNhap.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    item.tenHang.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    item.tenNguoiTao.toLowerCase().includes(searchTerm.value.toLowerCase())
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

const totalPages = computed(() => Math.ceil(filteredPhieuNhap.value.length / itemsPerPage))

const paginatedPhieuNhap = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredPhieuNhap.value.slice(start, end)
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

const savePhieuNhap = () => {
  if (isEditing.value) {
    const index = phieuNhapList.value.findIndex(item => item.id === currentPhieuNhap.value.id)
    if (index !== -1) {
      phieuNhapList.value[index] = { ...currentPhieuNhap.value }
    }
  } else {
    currentPhieuNhap.value.id = generateUniqueId()
    phieuNhapList.value.push({ ...currentPhieuNhap.value })
  }
  resetForm()
}

const editPhieuNhap = (item) => {
  currentPhieuNhap.value = { ...item }
  isEditing.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const deletePhieuNhap = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa phiếu nhập này?')) {
    phieuNhapList.value = phieuNhapList.value.filter(item => item.id !== id)
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value
    } else if (totalPages.value === 0) {
      currentPage.value = 1
    }
  }
}

const resetForm = () => {
  currentPhieuNhap.value = {
    id: null,
    maPhieu: '',
    nguonNhap: '',
    tenHang: '',
    soLuong: 0,
    giaNhap: 0,
    tinhTrang: '',
    tenNguoiTao: '',
    thoiGian: ''
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
