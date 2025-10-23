<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Quản lý Phiếu Nhập Kho</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="showForm = !showForm"
              class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span>{{ showForm ? 'Ẩn Form' : 'Tạo Phiếu Nhập' }}</span>
            </button>
            <button
              @click="scanCode"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v2m0-4h-2m6 0V9a2 2 0 00-2-2H8a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2z"/>
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
      <div v-if="showForm" class="mb-8">
        <div class="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
          <div class="bg-white border-b border-gray-200 px-8 py-6">
            <h2 class="text-2xl font-bold text-gray-900 flex items-center">
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
              </svg>
              Thông tin phiếu nhập kho
            </h2>
            <p class="text-gray-600 mt-1">Điền đầy đủ thông tin để tạo phiếu nhập kho mới</p>
          </div>
          
          <form @submit.prevent="handleSubmit" class="p-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Thông tin phiếu -->
              <div class="space-y-6">
                <h3 class="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Thông tin phiếu</h3>
                
                <!-- Mã phiếu -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Mã phiếu <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                      v-model="formData.maPhieu"
                      type="text"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Nhập mã phiếu"
                      required
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Nguồn nhập -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Nguồn nhập <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="formData.nguonNhap"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  >
                    <option value="">Chọn nguồn nhập</option>
                    <option value="Nhà cung cấp A">Nhà cung cấp A</option>
                    <option value="Nhà cung cấp B">Nhà cung cấp B</option>
                    <option value="Nhà cung cấp C">Nhà cung cấp C</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>

                <!-- Tên hàng -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Tên hàng <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="formData.tenHang"
                    type="text"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Nhập tên hàng"
                    required
                  />
                </div>

                <!-- Số lượng -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Số lượng <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="formData.soLuong"
                    type="number"
                    min="1"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Nhập số lượng"
                    required
                  />
                </div>
              </div>

              <!-- Thông tin giá và trạng thái -->
              <div class="space-y-6">
                <h3 class="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Thông tin bổ sung</h3>
                
                <!-- Giá nhập -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Giá nhập <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                      v-model="formData.giaNhap"
                      type="number"
                      min="0"
                      step="0.01"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Nhập giá nhập"
                      required
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <span class="text-gray-500">VND</span>
                    </div>
                  </div>
                </div>

                <!-- Tình trạng -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Tình trạng <span class="text-red-500">*</span>
                  </label>
                  <select
                    v-model="formData.tinhTrang"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  >
                    <option value="">Chọn tình trạng</option>
                    <option value="Chờ duyệt">Chờ duyệt</option>
                    <option value="Đã duyệt">Đã duyệt</option>
                    <option value="Đã hủy">Đã hủy</option>
                  </select>
                </div>

                <!-- Tên người tạo -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Tên người tạo <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="formData.tenNguoiTao"
                    type="text"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Nhập tên người tạo"
                    required
                  />
                </div>

                <!-- Thời gian -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Thời gian <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="formData.thoiGian"
                    type="datetime-local"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    required
                  />
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
                class="px-8 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl transition-all duration-200 font-medium flex items-center space-x-2 shadow-lg"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
                <span>Lưu phiếu nhập</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Search and Filter Section -->
      <div class="bg-white rounded-2xl shadow-xl border-0 overflow-hidden mb-6">
        <div class="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-4">
              <div class="relative">
                <input
                  v-model="searchQuery"
                  type="text"
                  placeholder="Tìm kiếm phiếu nhập..."
                  class="w-80 px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                />
                <svg class="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <select
                v-model="sortBy"
                class="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="name">Theo tên</option>
                <option value="status">Theo trạng thái</option>
              </select>
            </div>
            <div class="flex items-center space-x-4">
              <button
                @click="exportData"
                class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-3 rounded-xl flex items-center space-x-2 transition-all duration-200"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <span>Xuất Excel</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Table Section -->
      <div class="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
        <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b">
          <div class="flex items-center justify-between">
            <h3 class="text-xl font-bold text-gray-800 flex items-center">
              <svg class="w-6 h-6 mr-3 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Danh sách phiếu nhập kho
            </h3>
            <div class="flex items-center space-x-4">
              <div class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {{ filteredItems.length }} phiếu nhập
              </div>
            </div>
          </div>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="w-full">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sort('maPhieu')">
                  Mã phiếu
                  <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sort('nguonNhap')">
                  Nguồn nhập
                  <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sort('tenHang')">
                  Tên hàng
                  <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sort('soLuong')">
                  Số lượng
                  <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sort('giaNhap')">
                  Giá nhập
                  <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sort('tinhTrang')">
                  Tình trạng
                  <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sort('tenNguoiTao')">
                  Tên người tạo
                  <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sort('thoiGian')">
                  Thời gian
                  <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in paginatedItems" :key="item.maPhieu" class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {{ item.maPhieu }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ item.nguonNhap }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.tenHang }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.soLuong }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatCurrency(item.giaNhap) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span :class="getStatusClass(item.tinhTrang)" class="px-3 py-1 rounded-full text-sm font-medium">
                    {{ item.tinhTrang }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.tenNguoiTao }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ formatDate(item.thoiGian) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex items-center space-x-3">
                    <button
                      @click="viewItem(item)"
                      class="text-blue-600 hover:text-blue-900 p-2 rounded-lg hover:bg-blue-100 transition-all duration-200"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                      </svg>
                    </button>
                    <button
                      @click="editItem(item)"
                      class="text-green-600 hover:text-green-900 p-2 rounded-lg hover:bg-green-100 transition-all duration-200"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button
                      @click="deleteItem(item.maPhieu)"
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

        <!-- Pagination -->
        <div class="bg-gray-50 px-8 py-4 flex items-center justify-between">
          <div class="text-sm text-gray-700">
            Hiển thị {{ (currentPage - 1) * itemsPerPage + 1 }} - {{ Math.min(currentPage * itemsPerPage, filteredItems.length) }} trong số {{ filteredItems.length }} dữ liệu
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="previousPage"
              :disabled="currentPage === 1"
              class="px-3 py-2 text-sm bg-gray-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              << Previous
            </button>
            <button
              v-for="page in visiblePages"
              :key="page"
              @click="goToPage(page)"
              :class="page === currentPage ? 'bg-gray-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-100'"
              class="px-3 py-2 text-sm rounded-lg transition-colors"
            >
              {{ page }}
            </button>
            <button
              @click="nextPage"
              :disabled="currentPage === totalPages"
              class="px-3 py-2 text-sm bg-gray-600 text-white rounded-lg disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors"
            >
              Next >>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

console.log('PhieuNhapKhoForm component loaded')

// Reactive data
const showForm = ref(false)
const searchQuery = ref('')
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(10)

const formData = ref({
  maPhieu: '',
  nguonNhap: '',
  tenHang: '',
  soLuong: '',
  giaNhap: '',
  tinhTrang: '',
  tenNguoiTao: '',
  thoiGian: ''
})

// Sample data
const items = ref([
  {
    maPhieu: 'PN001',
    nguonNhap: 'Nhà cung cấp A',
    tenHang: 'Laptop Dell XPS 13',
    soLuong: 5,
    giaNhap: 25000000,
    tinhTrang: 'Đã duyệt',
    tenNguoiTao: 'Nguyễn Văn A',
    thoiGian: '2025-01-15T10:30:00'
  },
  {
    maPhieu: 'PN002',
    nguonNhap: 'Nhà cung cấp B',
    tenHang: 'iPhone 15 Pro',
    soLuong: 10,
    giaNhap: 30000000,
    tinhTrang: 'Chờ duyệt',
    tenNguoiTao: 'Trần Thị B',
    thoiGian: '2025-01-14T14:20:00'
  },
  {
    maPhieu: 'PN003',
    nguonNhap: 'Nhà cung cấp C',
    tenHang: 'Samsung Galaxy S24',
    soLuong: 8,
    giaNhap: 22000000,
    tinhTrang: 'Đã duyệt',
    tenNguoiTao: 'Lê Văn C',
    thoiGian: '2025-01-13T09:15:00'
  }
])

// Computed properties
const filteredItems = computed(() => {
  let filtered = items.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.maPhieu.toLowerCase().includes(query) ||
      item.tenHang.toLowerCase().includes(query) ||
      item.nguonNhap.toLowerCase().includes(query) ||
      item.tenNguoiTao.toLowerCase().includes(query)
    )
  }

  // Sort items
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'newest':
        return new Date(b.thoiGian) - new Date(a.thoiGian)
      case 'oldest':
        return new Date(a.thoiGian) - new Date(b.thoiGian)
      case 'name':
        return a.tenHang.localeCompare(b.tenHang)
      case 'status':
        return a.tinhTrang.localeCompare(b.tinhTrang)
      default:
        return 0
    }
  })

  return filtered
})

const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage.value))

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredItems.value.slice(start, end)
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 2)
  const end = Math.min(totalPages.value, currentPage.value + 2)
  
  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

// Methods
const handleSubmit = () => {
  if (!formData.value.maPhieu || !formData.value.tenHang || !formData.value.soLuong || !formData.value.giaNhap) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc')
    return
  }

  // Add new item
  items.value.push({ ...formData.value })
  alert('Đã tạo phiếu nhập kho thành công!')
  resetForm()
}

const editItem = (item) => {
  formData.value = { ...item }
  showForm.value = true
}

const viewItem = (item) => {
  alert(`Xem chi tiết phiếu: ${item.maPhieu}`)
}

const deleteItem = (maPhieu) => {
  if (confirm('Bạn có chắc chắn muốn xóa phiếu nhập này?')) {
    const index = items.value.findIndex(item => item.maPhieu === maPhieu)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }
}

const resetForm = () => {
  formData.value = {
    maPhieu: '',
    nguonNhap: '',
    tenHang: '',
    soLuong: '',
    giaNhap: '',
    tinhTrang: '',
    tenNguoiTao: '',
    thoiGian: ''
  }
  showForm.value = false
}

const scanCode = () => {
  alert('Chức năng quét mã đang được phát triển...')
}

const exportData = () => {
  alert('Chức năng xuất Excel đang được phát triển...')
}

const sort = (field) => {
  // Implement sorting logic
  console.log(`Sorting by ${field}`)
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const goToPage = (page) => {
  currentPage.value = page
}

const getStatusClass = (status) => {
  switch (status) {
    case 'Đã duyệt':
      return 'bg-gray-100 text-gray-700'
    case 'Chờ duyệt':
      return 'bg-yellow-50 text-yellow-700'
    case 'Đã hủy':
      return 'bg-red-50 text-red-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount)
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  // Set default values
  formData.value.thoiGian = new Date().toISOString().slice(0, 16)
  formData.value.tenNguoiTao = 'Nguyễn Đức Thắng'
})
</script>
