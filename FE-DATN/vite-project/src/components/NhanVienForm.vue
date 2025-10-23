<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Quản lý Nhân Viên</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="showForm = !showForm"
              class="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span>{{ showForm ? 'Ẩn Form' : 'Thêm Nhân Viên' }}</span>
            </button>
            <button
              @click="exportData"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
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

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Form Section -->
      <div v-if="showForm" class="mb-8">
        <div class="bg-white rounded-2xl shadow-xl border-0 overflow-hidden">
          <div class="bg-white border-b border-gray-200 px-8 py-6">
            <h2 class="text-2xl font-bold text-gray-900 flex items-center">
              <svg class="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
              Thông tin nhân viên mới
            </h2>
            <p class="text-gray-600 mt-1">Điền đầy đủ thông tin để tạo nhân viên mới</p>
          </div>
          
          <form @submit.prevent="handleSubmit" class="p-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Thông tin cơ bản -->
              <div class="space-y-6">
                <h3 class="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Thông tin cơ bản</h3>
                
                <!-- Mã NV -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Mã nhân viên <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                      v-model="formData.maNV"
                      type="text"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      placeholder="Nhập mã nhân viên"
                      required
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Tên nhân viên -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Tên nhân viên <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="formData.tenNV"
                    type="text"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="Nhập tên nhân viên"
                    required
                  />
                </div>

                <!-- Mã số thuế -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Mã số thuế <span class="text-red-500">*</span>
                  </label>
                  <input
                    v-model="formData.maSoThue"
                    type="text"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="Nhập mã số thuế"
                    required
                  />
                </div>

                <!-- Địa chỉ -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Địa chỉ <span class="text-red-500">*</span>
                  </label>
                  <textarea
                    v-model="formData.diaChi"
                    rows="3"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="Nhập địa chỉ"
                    required
                  ></textarea>
                </div>
              </div>

              <!-- Thông tin liên hệ -->
              <div class="space-y-6">
                <h3 class="text-lg font-semibold text-gray-800 border-b border-gray-200 pb-2">Thông tin liên hệ</h3>
                
                <!-- Số điện thoại -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Số điện thoại <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                      v-model="formData.soDienThoai"
                      type="tel"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      placeholder="Nhập số điện thoại"
                      required
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
                  <label class="block text-sm font-medium text-gray-700">
                    Email <span class="text-red-500">*</span>
                  </label>
                  <div class="relative">
                    <input
                      v-model="formData.email"
                      type="email"
                      class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                      placeholder="Nhập email"
                      required
                    />
                    <div class="absolute inset-y-0 right-0 pr-3 flex items-center">
                      <svg class="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                  </div>
                </div>

                <!-- Chức vụ -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Chức vụ
                  </label>
                  <select
                    v-model="formData.chucVu"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  >
                    <option value="">Chọn chức vụ</option>
                    <option value="CEO">CEO</option>
                    <option value="Manager">Manager</option>
                    <option value="Staff">Staff</option>
                    <option value="Intern">Intern</option>
                  </select>
                </div>

                <!-- Phòng ban -->
                <div class="space-y-2">
                  <label class="block text-sm font-medium text-gray-700">
                    Phòng ban
                  </label>
                  <select
                    v-model="formData.phongBan"
                    class="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                  >
                    <option value="">Chọn phòng ban</option>
                    <option value="IT">IT</option>
                    <option value="HR">HR</option>
                    <option value="Finance">Finance</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </select>
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
                <span>Lưu nhân viên</span>
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
                  placeholder="Tìm kiếm nhân viên..."
                  class="w-80 px-4 py-3 pl-10 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                />
                <svg class="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>
              </div>
              <select
                v-model="filterBy"
                class="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              >
                <option value="">Tất cả phòng ban</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Sales">Sales</option>
              </select>
              <select
                v-model="sortBy"
                class="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
              >
                <option value="newest">Mới nhất</option>
                <option value="oldest">Cũ nhất</option>
                <option value="name">Theo tên</option>
                <option value="department">Theo phòng ban</option>
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
              Danh sách nhân viên
            </h3>
            <div class="flex items-center space-x-4">
              <div class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {{ filteredItems.length }} nhân viên
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
                  <input
                    type="checkbox"
                    v-model="selectAll"
                    @change="toggleSelectAll"
                    class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                  />
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sort('maNV')">
                  Mã NV
                  <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sort('tenNV')">
                  Tên nhân viên
                  <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sort('maSoThue')">
                  Mã số thuế
                  <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sort('diaChi')">
                  Địa chỉ
                  <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sort('soDienThoai')">
                  Số điện thoại
                  <svg class="w-4 h-4 inline ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"/>
                  </svg>
                </th>
                <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100" @click="sort('email')">
                  Email
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
              <tr v-for="item in paginatedItems" :key="item.maNV" class="hover:bg-gray-50 transition-colors duration-200">
                <td class="px-6 py-4 whitespace-nowrap">
                  <input
                    type="checkbox"
                    v-model="selectedItems"
                    :value="item.maNV"
                    class="w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
                  />
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {{ item.maNV }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ item.tenNV }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.maSoThue }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-900">{{ item.diaChi }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.soDienThoai }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ item.email }}</div>
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
                      class="text-purple-600 hover:text-purple-900 p-2 rounded-lg hover:bg-purple-100 transition-all duration-200"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                      </svg>
                    </button>
                    <button
                      @click="deleteItem(item.maNV)"
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

console.log('NhanVienForm component loaded')

// Reactive data
const showForm = ref(false)
const searchQuery = ref('')
const filterBy = ref('')
const sortBy = ref('newest')
const currentPage = ref(1)
const itemsPerPage = ref(10)
const selectAll = ref(false)
const selectedItems = ref([])

const formData = ref({
  maNV: '',
  tenNV: '',
  maSoThue: '',
  diaChi: '',
  soDienThoai: '',
  email: '',
  chucVu: '',
  phongBan: ''
})

// Sample data
const items = ref([
  {
    maNV: 'NV001',
    tenNV: 'Nguyễn Văn A',
    maSoThue: '123456789123',
    diaChi: 'Trảng Dài, Biên Hòa, Đồng Nai',
    soDienThoai: '0123456789',
    email: 'NVA@Gmail.com',
    chucVu: 'CEO',
    phongBan: 'IT'
  },
  {
    maNV: 'NV002',
    tenNV: 'Trần Văn C',
    maSoThue: '123456789124',
    diaChi: 'Bửu Long, Biên Hòa, Đồng Nai',
    soDienThoai: '0123456789',
    email: 'TVC@Gmail.com',
    chucVu: 'Manager',
    phongBan: 'HR'
  },
  {
    maNV: 'NV003',
    tenNV: 'Nguyễn Gia B',
    maSoThue: '123456789125',
    diaChi: 'Tân Mai, Biên Hòa, Đồng Nai',
    soDienThoai: '0123456789',
    email: 'NGB@Gmail.com',
    chucVu: 'Staff',
    phongBan: 'Finance'
  },
  {
    maNV: 'NV004',
    tenNV: 'Lê Thị D',
    maSoThue: '123456789126',
    diaChi: 'Long Bình, Biên Hòa, Đồng Nai',
    soDienThoai: '0123456789',
    email: 'LTD@Gmail.com',
    chucVu: 'Staff',
    phongBan: 'Marketing'
  },
  {
    maNV: 'NV005',
    tenNV: 'Phạm Văn E',
    maSoThue: '123456789127',
    diaChi: 'Tam Hiệp, Biên Hòa, Đồng Nai',
    soDienThoai: '0123456789',
    email: 'PVE@Gmail.com',
    chucVu: 'Staff',
    phongBan: 'Sales'
  }
])

// Computed properties
const filteredItems = computed(() => {
  let filtered = items.value

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(item =>
      item.maNV.toLowerCase().includes(query) ||
      item.tenNV.toLowerCase().includes(query) ||
      item.email.toLowerCase().includes(query) ||
      item.diaChi.toLowerCase().includes(query)
    )
  }

  if (filterBy.value) {
    filtered = filtered.filter(item => item.phongBan === filterBy.value)
  }

  // Sort items
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'newest':
        return b.maNV.localeCompare(a.maNV)
      case 'oldest':
        return a.maNV.localeCompare(b.maNV)
      case 'name':
        return a.tenNV.localeCompare(b.tenNV)
      case 'department':
        return a.phongBan.localeCompare(b.phongBan)
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
  if (!formData.value.maNV || !formData.value.tenNV || !formData.value.maSoThue || !formData.value.diaChi || !formData.value.soDienThoai || !formData.value.email) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc')
    return
  }

  // Add new item
  items.value.push({ ...formData.value })
  alert('Đã thêm nhân viên thành công!')
  resetForm()
}

const editItem = (item) => {
  formData.value = { ...item }
  showForm.value = true
}

const viewItem = (item) => {
  alert(`Xem chi tiết nhân viên: ${item.tenNV}`)
}

const deleteItem = (maNV) => {
  if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
    const index = items.value.findIndex(item => item.maNV === maNV)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }
}

const resetForm = () => {
  formData.value = {
    maNV: '',
    tenNV: '',
    maSoThue: '',
    diaChi: '',
    soDienThoai: '',
    email: '',
    chucVu: '',
    phongBan: ''
  }
  showForm.value = false
}

const exportData = () => {
  alert('Chức năng xuất Excel đang được phát triển...')
}

const sort = (field) => {
  console.log(`Sorting by ${field}`)
}

const toggleSelectAll = () => {
  if (selectAll.value) {
    selectedItems.value = paginatedItems.value.map(item => item.maNV)
  } else {
    selectedItems.value = []
  }
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

onMounted(() => {
  // Set default values
  formData.value.maNV = 'NV' + String(items.value.length + 1).padStart(3, '0')
})
</script>
