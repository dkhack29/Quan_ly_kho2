<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto">
       <!-- Header -->
       <div class="bg-gray-100 p-6 rounded-lg mb-8">
         <h1 class="text-3xl font-bold text-gray-700 flex items-center">
           <svg class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
           </svg>
           Thông tin hàng hóa mới
         </h1>
         <p class="text-gray-600 mt-2">Điền đầy đủ thông tin để tạo hàng hóa mới</p>
       </div>

      <!-- Form Thêm/Sửa Hàng hóa -->
      <div class="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-6">{{ isEditing ? 'Sửa Hàng hóa' : 'Thêm Hàng hóa Mới' }}</h2>
        
        <form @submit.prevent="saveHangHoa" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Mã HH -->
            <div>
              <label for="maHH" class="block text-sm font-medium text-gray-700 mb-2">Mã HH</label>
              <input
                type="text"
                id="maHH"
                v-model="currentHangHoa.maHH"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập mã hàng hóa"
                required
              />
            </div>

            <!-- Tên HH -->
            <div>
              <label for="tenHH" class="block text-sm font-medium text-gray-700 mb-2">Tên HH</label>
              <input
                type="text"
                id="tenHH"
                v-model="currentHangHoa.tenHH"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập tên hàng hóa"
                required
              />
            </div>

            <!-- Nhà CC -->
            <div>
              <label for="nhaCC" class="block text-sm font-medium text-gray-700 mb-2">Nhà CC</label>
              <select
                id="nhaCC"
                v-model="currentHangHoa.nhaCC"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Chọn nhà cung cấp</option>
                <option v-for="supplier in suppliers" :key="supplier" :value="supplier">{{ supplier }}</option>
              </select>
            </div>

            <!-- Loại -->
            <div>
              <label for="loai" class="block text-sm font-medium text-gray-700 mb-2">Loại</label>
              <select
                id="loai"
                v-model="currentHangHoa.loai"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Chọn loại hàng</option>
                <option v-for="type in types" :key="type" :value="type">{{ type }}</option>
              </select>
            </div>

            <!-- Số lượng -->
            <div>
              <label for="soLuong" class="block text-sm font-medium text-gray-700 mb-2">Số lượng</label>
              <input
                type="number"
                id="soLuong"
                v-model.number="currentHangHoa.soLuong"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập số lượng"
                min="0"
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

      <!-- Bảng Danh sách Hàng hóa -->
      <div class="bg-white rounded-lg shadow-sm border">
        <!-- Header của bảng -->
        <div class="px-6 py-4 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h3 class="text-lg font-semibold text-gray-900">Danh sách Hàng hóa</h3>
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
                <th @click="sortBy('maHH')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Mã HH
                  <span v-if="sortColumn === 'maHH'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th @click="sortBy('tenHH')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Tên HH
                  <span v-if="sortColumn === 'tenHH'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th @click="sortBy('nhaCC')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Nhà CC
                  <span v-if="sortColumn === 'nhaCC'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th @click="sortBy('loai')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Loại
                  <span v-if="sortColumn === 'loai'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th @click="sortBy('soLuong')" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100">
                  Số lượng
                  <span v-if="sortColumn === 'soLuong'" class="ml-1">{{ sortDirection === 'asc' ? '▲' : '▼' }}</span>
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in paginatedHangHoa" :key="item.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" class="form-checkbox h-4 w-4 text-blue-600" />
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{{ item.maHH }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.tenHH }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.nhaCC }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.loai }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ item.soLuong.toLocaleString() }}</td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button 
                      @click="editHangHoa(item)" 
                      class="text-indigo-600 hover:text-indigo-900 p-1 rounded hover:bg-indigo-50"
                      title="Chỉnh sửa"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                      </svg>
                    </button>
                    <button 
                      @click="deleteHangHoa(item.id)" 
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
              Hiển thị {{ (currentPage - 1) * itemsPerPage + 1 }} đến {{ Math.min(currentPage * itemsPerPage, filteredHangHoa.length) }} trong số {{ filteredHangHoa.length }} dữ liệu
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
const hangHoaList = ref([])
const currentHangHoa = ref({
  id: null,
  maHH: '',
  tenHH: '',
  nhaCC: '',
  loai: '',
  soLuong: 0
})
const isEditing = ref(false)
const searchTerm = ref('')
const sortColumn = ref('maHH')
const sortDirection = ref('asc')
const currentPage = ref(1)
const itemsPerPage = 10

// Dữ liệu mẫu cho dropdown
const suppliers = ref(['Samsung', 'Apple', 'OPPO', 'XIEOMI', 'LG', 'Sony', 'Huawei', 'OnePlus'])
const types = ref(['Điện thoại', 'LapTop', 'Ipad', 'Phụ kiện', 'Thiết bị gia dụng', 'Đồng hồ thông minh'])

// Hàm tạo ID duy nhất
const generateUniqueId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Dữ liệu mẫu ban đầu
onMounted(() => {
  hangHoaList.value = [
    { id: generateUniqueId(), maHH: 'HH001', tenHH: 'iPhone 15 Pro Max', nhaCC: 'Apple', loai: 'Điện thoại', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH002', tenHH: 'Samsung Galaxy S24 Ultra', nhaCC: 'Samsung', loai: 'Điện thoại', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH003', tenHH: 'MacBook Pro M3', nhaCC: 'Apple', loai: 'LapTop', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH004', tenHH: 'iPad Air 5', nhaCC: 'Apple', loai: 'Ipad', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH005', tenHH: 'OPPO Find X6 Pro', nhaCC: 'OPPO', loai: 'Điện thoại', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH006', tenHH: 'Xiaomi 14 Ultra', nhaCC: 'XIEOMI', loai: 'Điện thoại', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH007', tenHH: 'Samsung Galaxy Tab S9', nhaCC: 'Samsung', loai: 'Ipad', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH008', tenHH: 'Dell XPS 15', nhaCC: 'Samsung', loai: 'LapTop', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH009', tenHH: 'HP Spectre x360', nhaCC: 'Samsung', loai: 'LapTop', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH010', tenHH: 'LG Gram 17', nhaCC: 'LG', loai: 'LapTop', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH011', tenHH: 'Sony Xperia 1 V', nhaCC: 'Sony', loai: 'Điện thoại', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH012', tenHH: 'Google Pixel 8 Pro', nhaCC: 'Apple', loai: 'Điện thoại', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH013', tenHH: 'Asus ROG Zephyrus G14', nhaCC: 'Samsung', loai: 'LapTop', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH014', tenHH: 'Microsoft Surface Pro 9', nhaCC: 'Apple', loai: 'Ipad', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH015', tenHH: 'OnePlus 11', nhaCC: 'OPPO', loai: 'Điện thoại', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH016', tenHH: 'Redmi Note 13 Pro', nhaCC: 'XIEOMI', loai: 'Điện thoại', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH017', tenHH: 'Samsung Odyssey G9', nhaCC: 'Samsung', loai: 'Phụ kiện', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH018', tenHH: 'Apple Watch Series 9', nhaCC: 'Apple', loai: 'Phụ kiện', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH019', tenHH: 'AirPods Pro 2', nhaCC: 'Apple', loai: 'Phụ kiện', soLuong: 100 },
    { id: generateUniqueId(), maHH: 'HH020', tenHH: 'Sony WH-1000XM5', nhaCC: 'Sony', loai: 'Phụ kiện', soLuong: 100 }
  ]
})

// Computed properties
const filteredHangHoa = computed(() => {
  let filtered = hangHoaList.value.filter(item =>
    item.maHH.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    item.tenHH.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    item.nhaCC.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    item.loai.toLowerCase().includes(searchTerm.value.toLowerCase())
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

const totalPages = computed(() => Math.ceil(filteredHangHoa.value.length / itemsPerPage))

const paginatedHangHoa = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredHangHoa.value.slice(start, end)
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

const saveHangHoa = () => {
  if (isEditing.value) {
    const index = hangHoaList.value.findIndex(item => item.id === currentHangHoa.value.id)
    if (index !== -1) {
      hangHoaList.value[index] = { ...currentHangHoa.value }
    }
  } else {
    currentHangHoa.value.id = generateUniqueId()
    hangHoaList.value.push({ ...currentHangHoa.value })
  }
  resetForm()
}

const editHangHoa = (item) => {
  currentHangHoa.value = { ...item }
  isEditing.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const deleteHangHoa = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa hàng hóa này?')) {
    hangHoaList.value = hangHoaList.value.filter(item => item.id !== id)
    if (currentPage.value > totalPages.value && totalPages.value > 0) {
      currentPage.value = totalPages.value
    } else if (totalPages.value === 0) {
      currentPage.value = 1
    }
  }
}

const resetForm = () => {
  currentHangHoa.value = {
    id: null,
    maHH: '',
    tenHH: '',
    nhaCC: '',
    loai: '',
    soLuong: 0
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
