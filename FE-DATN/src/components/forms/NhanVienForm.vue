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
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              <span>{{ showForm ? 'Ẩn Form' : 'Thêm Nhân Viên' }}</span>
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
          <h2 class="text-lg font-semibold text-gray-900">Thông tin nhân viên</h2>
        </div>
        
        <form @submit.prevent="handleSubmit" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Mã NV -->
            <div>
              <label for="maNV" class="block text-sm font-medium text-gray-700 mb-2">
                Mã nhân viên <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="maNV"
                v-model="formData.maNV"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập mã nhân viên"
                required
              />
            </div>

            <!-- Họ tên -->
            <div>
              <label for="hoTen" class="block text-sm font-medium text-gray-700 mb-2">
                Họ và tên <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="hoTen"
                v-model="formData.hoTen"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập họ và tên"
                required
              />
            </div>

            <!-- Ngày sinh -->
            <div>
              <label for="ngaySinh" class="block text-sm font-medium text-gray-700 mb-2">
                Ngày sinh <span class="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="ngaySinh"
                v-model="formData.ngaySinh"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <!-- Giới tính -->
            <div>
              <label for="gioiTinh" class="block text-sm font-medium text-gray-700 mb-2">
                Giới tính <span class="text-red-500">*</span>
              </label>
              <select
                id="gioiTinh"
                v-model="formData.gioiTinh"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
                <option value="Khác">Khác</option>
              </select>
            </div>

            <!-- Số điện thoại -->
            <div>
              <label for="soDT" class="block text-sm font-medium text-gray-700 mb-2">
                Số điện thoại <span class="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="soDT"
                v-model="formData.soDT"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập số điện thoại"
                required
              />
            </div>

            <!-- Email -->
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                v-model="formData.email"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập email"
                required
              />
            </div>

            <!-- Địa chỉ -->
            <div class="md:col-span-2">
              <label for="diaChi" class="block text-sm font-medium text-gray-700 mb-2">
                Địa chỉ <span class="text-red-500">*</span>
              </label>
              <textarea
                id="diaChi"
                v-model="formData.diaChi"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập địa chỉ"
                required
              ></textarea>
            </div>

            <!-- Chức vụ -->
            <div>
              <label for="chucVu" class="block text-sm font-medium text-gray-700 mb-2">
                Chức vụ <span class="text-red-500">*</span>
              </label>
              <select
                id="chucVu"
                v-model="formData.chucVu"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Chọn chức vụ</option>
                <option value="Quản lý">Quản lý</option>
                <option value="Nhân viên kho">Nhân viên kho</option>
                <option value="Nhân viên bán hàng">Nhân viên bán hàng</option>
                <option value="Kế toán">Kế toán</option>
                <option value="Thủ kho">Thủ kho</option>
              </select>
            </div>

            <!-- Lương cơ bản -->
            <div>
              <label for="luongCoBan" class="block text-sm font-medium text-gray-700 mb-2">
                Lương cơ bản (VNĐ)
              </label>
              <input
                type="number"
                id="luongCoBan"
                v-model="formData.luongCoBan"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập lương cơ bản"
                min="0"
              />
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
              Lưu thông tin
            </button>
          </div>
        </form>
      </div>

      <!-- Table Section -->
      <div class="bg-white rounded-lg shadow-sm border">
        <div class="px-6 py-4 border-b">
          <h2 class="text-lg font-semibold text-gray-900">Danh sách nhân viên</h2>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mã NV
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Họ tên
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày sinh
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giới tính
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Số điện thoại
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Chức vụ
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(nhanVien, index) in danhSachNhanVien" :key="index" class="hover:bg-gray-50">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {{ nhanVien.maNV }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ nhanVien.hoTen }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ formatDate(nhanVien.ngaySinh) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ nhanVien.gioiTinh }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {{ nhanVien.soDT }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {{ nhanVien.chucVu }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div class="flex space-x-2">
                    <button
                      @click="editNhanVien(nhanVien, index)"
                      class="text-blue-600 hover:text-blue-900"
                    >
                      Sửa
                    </button>
                    <button
                      @click="deleteNhanVien(index)"
                      class="text-red-600 hover:text-red-900"
                    >
                      Xóa
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
import { ref, reactive } from 'vue'

// State
const showForm = ref(false)
const danhSachNhanVien = ref([
  {
    maNV: 'NV001',
    hoTen: 'Nguyễn Văn An',
    ngaySinh: '1990-01-15',
    gioiTinh: 'Nam',
    soDT: '0123456789',
    email: 'an.nguyen@example.com',
    diaChi: '123 Đường ABC, Quận 1, TP.HCM',
    chucVu: 'Quản lý',
    luongCoBan: 15000000
  },
  {
    maNV: 'NV002',
    hoTen: 'Trần Thị Bình',
    ngaySinh: '1992-05-20',
    gioiTinh: 'Nữ',
    soDT: '0987654321',
    email: 'binh.tran@example.com',
    diaChi: '456 Đường XYZ, Quận 2, TP.HCM',
    chucVu: 'Nhân viên kho',
    luongCoBan: 8000000
  }
])

const formData = reactive({
  maNV: '',
  hoTen: '',
  ngaySinh: '',
  gioiTinh: '',
  soDT: '',
  email: '',
  diaChi: '',
  chucVu: '',
  luongCoBan: ''
})

// Methods
const handleSubmit = () => {
  // Validate form
  if (!formData.maNV || !formData.hoTen || !formData.ngaySinh || !formData.gioiTinh || !formData.soDT || !formData.email || !formData.diaChi || !formData.chucVu) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc!')
    return
  }

  // Check if employee code already exists
  const existingIndex = danhSachNhanVien.value.findIndex(nv => nv.maNV === formData.maNV)
  
  if (existingIndex !== -1) {
    // Update existing employee
    danhSachNhanVien.value[existingIndex] = { ...formData }
    alert('Cập nhật thông tin nhân viên thành công!')
  } else {
    // Add new employee
    danhSachNhanVien.value.push({ ...formData })
    alert('Thêm nhân viên mới thành công!')
  }

  resetForm()
  showForm.value = false
}

const resetForm = () => {
  Object.keys(formData).forEach(key => {
    formData[key] = ''
  })
}

const editNhanVien = (nhanVien, index) => {
  Object.keys(formData).forEach(key => {
    formData[key] = nhanVien[key]
  })
  showForm.value = true
}

const deleteNhanVien = (index) => {
  if (confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
    danhSachNhanVien.value.splice(index, 1)
    alert('Xóa nhân viên thành công!')
  }
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('vi-VN')
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
