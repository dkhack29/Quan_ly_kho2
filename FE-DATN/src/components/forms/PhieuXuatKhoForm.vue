<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Quản lý Phiếu Xuất Kho</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="showForm = !showForm"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span>{{ showForm ? 'Ẩn Form' : 'Tạo Phiếu Mới' }}</span>
            </button>
            <button
              class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 2m0 0l-2-2m2 2V9m6 6h-2.54a4 4 0 01-3.85-3.85V6.29a4 4 0 013.85-3.85H18a2 2 0 012 2v10a2 2 0 01-2 2z"/>
              </svg>
              <span>Quét Mã</span>
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
          <h2 class="text-lg font-semibold text-gray-900">{{ editingPhieu ? 'Chỉnh sửa phiếu xuất kho' : 'Tạo phiếu xuất kho mới' }}</h2>
        </div>
        
        <form @submit.prevent="savePhieu" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Mã phiếu -->
            <div>
              <label for="maPhieu" class="block text-sm font-medium text-gray-700 mb-2">
                Mã phiếu <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="maPhieu"
                v-model="currentPhieu.maPhieu"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập mã phiếu"
                required
              />
            </div>

            <!-- Nguồn nhập -->
            <div>
              <label for="nguonNhap" class="block text-sm font-medium text-gray-700 mb-2">
                Nguồn nhập <span class="text-red-500">*</span>
              </label>
              <select
                id="nguonNhap"
                v-model="currentPhieu.nguonNhap"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Chọn nguồn nhập</option>
                <option value="Nhà cung cấp A">Nhà cung cấp A</option>
                <option value="Nhà cung cấp B">Nhà cung cấp B</option>
                <option value="Nhà cung cấp C">Nhà cung cấp C</option>
                <option value="Kho nội bộ">Kho nội bộ</option>
              </select>
            </div>

            <!-- Tên hàng -->
            <div>
              <label for="tenHang" class="block text-sm font-medium text-gray-700 mb-2">
                Tên hàng <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="tenHang"
                v-model="currentPhieu.tenHang"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập tên hàng"
                required
              />
            </div>

            <!-- Số lượng -->
            <div>
              <label for="soLuong" class="block text-sm font-medium text-gray-700 mb-2">
                Số lượng <span class="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="soLuong"
                v-model="currentPhieu.soLuong"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập số lượng"
                min="1"
                required
              />
            </div>

            <!-- Giá xuất -->
            <div>
              <label for="giaXuat" class="block text-sm font-medium text-gray-700 mb-2">
                Giá xuất (VNĐ) <span class="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="giaXuat"
                v-model="currentPhieu.giaXuat"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập giá xuất"
                min="0"
                required
              />
            </div>

            <!-- Tình trạng -->
            <div>
              <label for="tinhTrang" class="block text-sm font-medium text-gray-700 mb-2">
                Tình trạng <span class="text-red-500">*</span>
              </label>
              <select
                id="tinhTrang"
                v-model="currentPhieu.tinhTrang"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Chọn tình trạng</option>
                <option value="Chờ duyệt">Chờ duyệt</option>
                <option value="Đã duyệt">Đã duyệt</option>
                <option value="Từ chối">Từ chối</option>
                <option value="Đã xuất">Đã xuất</option>
              </select>
            </div>

            <!-- Thời gian -->
            <div>
              <label for="thoiGian" class="block text-sm font-medium text-gray-700 mb-2">
                Thời gian <span class="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                id="thoiGian"
                v-model="currentPhieu.thoiGian"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <!-- Ghi chú -->
            <div class="md:col-span-2">
              <label for="ghiChu" class="block text-sm font-medium text-gray-700 mb-2">
                Ghi chú
              </label>
              <textarea
                id="ghiChu"
                v-model="currentPhieu.ghiChu"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập ghi chú (tùy chọn)"
              ></textarea>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button
              type="button"
              @click="resetForm"
              class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Làm mới
            </button>
            <button
              type="submit"
              class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {{ editingPhieu ? 'Cập nhật' : 'Tạo phiếu' }}
            </button>
          </div>
        </form>
      </div>

      <!-- Search and Filter -->
      <div class="bg-white rounded-lg shadow-sm border mb-6">
        <div class="p-6">
          <div class="flex flex-col md:flex-row gap-4">
            <div class="flex-1">
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Tìm kiếm phiếu xuất kho..."
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div class="flex gap-2">
              <select
                v-model="statusFilter"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Tất cả tình trạng</option>
                <option value="Chờ duyệt">Chờ duyệt</option>
                <option value="Đã duyệt">Đã duyệt</option>
                <option value="Từ chối">Từ chối</option>
                <option value="Đã xuất">Đã xuất</option>
              </select>
              <select
                v-model="sortBy"
                class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="thoiGian">Mới nhất</option>
                <option value="maPhieu">Mã phiếu</option>
                <option value="tenHang">Tên hàng</option>
                <option value="giaXuat">Giá xuất</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Section -->
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="px-6 py-4 border-b">
          <h2 class="text-lg font-semibold text-gray-900">Danh sách phiếu xuất kho</h2>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã phiếu
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nguồn nhập
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tên hàng
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số lượng
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá xuất
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tình trạng
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thời gian
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="phieu in paginatedPhieuXuatKho" :key="phieu.id" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ phieu.maPhieu }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ phieu.nguonNhap }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ phieu.tenHang }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ phieu.soLuong }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatCurrency(phieu.giaXuat) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                  <span
                    :class="{
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                      'bg-yellow-100 text-yellow-800': phieu.tinhTrang === 'Chờ duyệt',
                      'bg-green-100 text-green-800': phieu.tinhTrang === 'Đã duyệt',
                      'bg-red-100 text-red-800': phieu.tinhTrang === 'Từ chối',
                      'bg-blue-100 text-blue-800': phieu.tinhTrang === 'Đã xuất',
                    }"
                  >
                    {{ phieu.tinhTrang }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDateTime(phieu.thoiGian) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="editPhieu(phieu)"
                      class="text-blue-600 hover:text-blue-900"
                      title="Chỉnh sửa"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button
                      @click="viewPhieu(phieu)"
                      class="text-green-600 hover:text-green-900"
                      title="Xem chi tiết"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                    <button
                      @click="deletePhieu(phieu.id)"
                      class="text-red-600 hover:text-red-900"
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
        <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="prevPage"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Trước
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sau
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Hiển thị {{ (currentPage - 1) * itemsPerPage + 1 }} đến {{ Math.min(currentPage * itemsPerPage, filteredPhieuXuatKho.length) }} trong số {{ filteredPhieuXuatKho.length }} dữ liệu
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  @click="prevPage"
                  :disabled="currentPage === 1"
                  class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">Previous</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
                <button
                  v-for="page in visiblePages"
                  :key="page"
                  @click="goToPage(page)"
                  :class="{
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium': true,
                    'bg-blue-600 text-white border-blue-600': page === currentPage,
                    'bg-white border-gray-300 text-gray-700 hover:bg-gray-50': page !== currentPage,
                  }"
                >
                  {{ page }}
                </button>
                <button
                  @click="nextPage"
                  :disabled="currentPage === totalPages"
                  class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span class="sr-only">Next</span>
                  <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'

// State
const showForm = ref(false)
const editingPhieu = ref(null)
const searchQuery = ref('')
const statusFilter = ref('')
const sortBy = ref('thoiGian')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const currentPhieu = reactive({
  id: null,
  maPhieu: '',
  nguonNhap: '',
  tenHang: '',
  soLuong: 0,
  giaXuat: 0,
  tinhTrang: 'Chờ duyệt',
  thoiGian: '',
  ghiChu: ''
})

const phieuXuatKho = ref([
  {
    id: 1,
    maPhieu: 'PXK001',
    nguonNhap: 'Nhà cung cấp A',
    tenHang: 'Hàng hóa X',
    soLuong: 100,
    giaXuat: 500000,
    tinhTrang: 'Đã duyệt',
    thoiGian: '2025-11-13T15:00',
    ghiChu: 'Phiếu xuất kho tháng 11'
  },
  {
    id: 2,
    maPhieu: 'PXK002',
    nguonNhap: 'Nhà cung cấp B',
    tenHang: 'Hàng hóa Y',
    soLuong: 50,
    giaXuat: 750000,
    tinhTrang: 'Chờ duyệt',
    thoiGian: '2025-11-14T10:30',
    ghiChu: 'Xuất hàng cho khách hàng VIP'
  },
  {
    id: 3,
    maPhieu: 'PXK003',
    nguonNhap: 'Nhà cung cấp A',
    tenHang: 'Hàng hóa Z',
    soLuong: 200,
    giaXuat: 250000,
    tinhTrang: 'Đã xuất',
    thoiGian: '2025-11-15T09:00',
    ghiChu: 'Đã xuất thành công'
  },
  {
    id: 4,
    maPhieu: 'PXK004',
    nguonNhap: 'Nhà cung cấp C',
    tenHang: 'Hàng hóa A',
    soLuong: 75,
    giaXuat: 1200000,
    tinhTrang: 'Từ chối',
    thoiGian: '2025-11-16T14:45',
    ghiChu: 'Không đủ hàng trong kho'
  },
  {
    id: 5,
    maPhieu: 'PXK005',
    nguonNhap: 'Nhà cung cấp B',
    tenHang: 'Hàng hóa B',
    soLuong: 120,
    giaXuat: 600000,
    tinhTrang: 'Đã duyệt',
    thoiGian: '2025-11-17T11:15',
    ghiChu: 'Xuất hàng theo đơn đặt hàng'
  }
])

// Computed
const filteredPhieuXuatKho = computed(() => {
  let filtered = phieuXuatKho.value

  // Search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(phieu => 
      phieu.maPhieu.toLowerCase().includes(query) ||
      phieu.tenHang.toLowerCase().includes(query) ||
      phieu.nguonNhap.toLowerCase().includes(query)
    )
  }

  // Status filter
  if (statusFilter.value) {
    filtered = filtered.filter(phieu => phieu.tinhTrang === statusFilter.value)
  }

  // Sort
  filtered.sort((a, b) => {
    if (sortBy.value === 'thoiGian') {
      return new Date(b.thoiGian) - new Date(a.thoiGian)
    } else if (sortBy.value === 'maPhieu') {
      return a.maPhieu.localeCompare(b.maPhieu)
    } else if (sortBy.value === 'tenHang') {
      return a.tenHang.localeCompare(b.tenHang)
    } else if (sortBy.value === 'giaXuat') {
      return b.giaXuat - a.giaXuat
    }
    return 0
  })

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredPhieuXuatKho.value.length / itemsPerPage.value))

const paginatedPhieuXuatKho = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredPhieuXuatKho.value.slice(start, end)
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
      for (let i = 1; i <= 5; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    } else if (current >= total - 3) {
      pages.push(1)
      pages.push('...')
      for (let i = total - 4; i <= total; i++) {
        pages.push(i)
      }
    } else {
      pages.push(1)
      pages.push('...')
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push(i)
      }
      pages.push('...')
      pages.push(total)
    }
  }
  
  return pages
})

// Methods
const savePhieu = () => {
  if (!currentPhieu.maPhieu || !currentPhieu.nguonNhap || !currentPhieu.tenHang || !currentPhieu.soLuong || !currentPhieu.giaXuat || !currentPhieu.tinhTrang || !currentPhieu.thoiGian) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc!')
    return
  }

  if (editingPhieu.value) {
    // Update existing phieu
    const index = phieuXuatKho.value.findIndex(p => p.id === currentPhieu.id)
    if (index !== -1) {
      phieuXuatKho.value.splice(index, 1, { ...currentPhieu })
      alert('Cập nhật phiếu xuất kho thành công!')
    }
  } else {
    // Add new phieu
    const newId = phieuXuatKho.value.length ? Math.max(...phieuXuatKho.value.map(p => p.id)) + 1 : 1
    phieuXuatKho.value.push({ ...currentPhieu, id: newId })
    alert('Tạo phiếu xuất kho thành công!')
  }
  
  resetForm()
}

const editPhieu = (phieu) => {
  Object.keys(currentPhieu).forEach(key => {
    currentPhieu[key] = phieu[key]
  })
  editingPhieu.value = phieu
  showForm.value = true
}

const viewPhieu = (phieu) => {
  alert(`Chi tiết phiếu ${phieu.maPhieu}:\nTên hàng: ${phieu.tenHang}\nSố lượng: ${phieu.soLuong}\nGiá xuất: ${formatCurrency(phieu.giaXuat)}\nTình trạng: ${phieu.tinhTrang}\nThời gian: ${formatDateTime(phieu.thoiGian)}\nGhi chú: ${phieu.ghiChu || 'Không có'}`)
}

const deletePhieu = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa phiếu xuất kho này?')) {
    phieuXuatKho.value = phieuXuatKho.value.filter(p => p.id !== id)
    alert('Xóa phiếu xuất kho thành công!')
    
    // Adjust current page if needed
    if (paginatedPhieuXuatKho.value.length === 0 && currentPage.value > 1) {
      currentPage.value--
    }
  }
}

const resetForm = () => {
  showForm.value = false
  editingPhieu.value = null
  Object.keys(currentPhieu).forEach(key => {
    if (key === 'id') {
      currentPhieu[key] = null
    } else if (key === 'tinhTrang') {
      currentPhieu[key] = 'Chờ duyệt'
    } else if (key === 'thoiGian') {
      currentPhieu[key] = new Date().toISOString().slice(0, 16)
    } else {
      currentPhieu[key] = ''
    }
  })
}

const goToPage = (page) => {
  if (page !== '...' && page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const formatDateTime = (dateTime) => {
  if (!dateTime) return ''
  const date = new Date(dateTime)
  return date.toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// Initialize
onMounted(() => {
  currentPhieu.thoiGian = new Date().toISOString().slice(0, 16)
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
