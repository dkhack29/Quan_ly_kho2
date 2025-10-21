<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b">
        <h3 class="text-xl font-bold text-gray-900">Tạo phiếu xuất kho mới</h3>
        <button
          @click="$emit('close')"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Form Content -->
      <form @submit.prevent="savePhieu" class="p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Left Column -->
          <div class="space-y-4">
            <!-- Mã phiếu -->
            <div>
              <label for="maPhieu" class="block text-sm font-medium text-gray-700 mb-2">
                Mã phiếu <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="maPhieu"
                v-model="formData.maPhieu"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập mã phiếu"
                required
              />
            </div>

            <!-- Tên hàng -->
            <div>
              <label for="tenHang" class="block text-sm font-medium text-gray-700 mb-2">
                Tên hàng <span class="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="tenHang"
                v-model="formData.tenHang"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập tên hàng"
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
                v-model="formData.giaXuat"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
                min="0"
                required
              />
            </div>

            <!-- Thời gian -->
            <div>
              <label for="thoiGian" class="block text-sm font-medium text-gray-700 mb-2">
                Thời gian <span class="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                id="thoiGian"
                v-model="formData.thoiGian"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <!-- Ghi chú -->
            <div>
              <label for="ghiChu" class="block text-sm font-medium text-gray-700 mb-2">
                Ghi chú
              </label>
              <textarea
                id="ghiChu"
                v-model="formData.ghiChu"
                rows="3"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập ghi chú (tùy chọn)"
              ></textarea>
            </div>
          </div>

          <!-- Right Column -->
          <div class="space-y-4">
            <!-- Nguồn nhập -->
            <div>
              <label for="nguonNhap" class="block text-sm font-medium text-gray-700 mb-2">
                Nguồn nhập <span class="text-red-500">*</span>
              </label>
              <select
                id="nguonNhap"
                v-model="formData.nguonNhap"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Chọn nguồn nhập</option>
                <option value="Nhà cung cấp A">Nhà cung cấp A</option>
                <option value="Nhà cung cấp B">Nhà cung cấp B</option>
                <option value="Nhà cung cấp C">Nhà cung cấp C</option>
                <option value="Nhập khẩu">Nhập khẩu</option>
                <option value="Sản xuất nội bộ">Sản xuất nội bộ</option>
              </select>
            </div>

            <!-- Số lượng -->
            <div>
              <label for="soLuong" class="block text-sm font-medium text-gray-700 mb-2">
                Số lượng <span class="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="soLuong"
                v-model="formData.soLuong"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="0"
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
                v-model="formData.tinhTrang"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="Chờ duyệt">Chờ duyệt</option>
                <option value="Đã duyệt">Đã duyệt</option>
                <option value="Từ chối">Từ chối</option>
                <option value="Đã xuất">Đã xuất</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-3 mt-8 pt-6 border-t">
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
            Tạo phiếu
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'

// Emits
const emit = defineEmits(['close', 'save'])

// Props
const props = defineProps({
  editData: {
    type: Object,
    default: null
  }
})

// Form data
const formData = reactive({
  id: null,
  maPhieu: '',
  tenHang: '',
  giaXuat: 0,
  thoiGian: '',
  ghiChu: '',
  nguonNhap: '',
  soLuong: 0,
  tinhTrang: 'Chờ duyệt'
})

// Methods
const savePhieu = () => {
  if (!formData.maPhieu || !formData.tenHang || !formData.giaXuat || !formData.nguonNhap || !formData.soLuong || !formData.tinhTrang || !formData.thoiGian) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc!')
    return
  }

  emit('save', { ...formData })
  resetForm()
}

const resetForm = () => {
  Object.keys(formData).forEach(key => {
    if (key === 'id') {
      formData[key] = null
    } else if (key === 'tinhTrang') {
      formData[key] = 'Chờ duyệt'
    } else if (key === 'thoiGian') {
      formData[key] = new Date().toISOString().slice(0, 16)
    } else {
      formData[key] = ''
    }
  })
}

// Initialize
onMounted(() => {
  if (props.editData) {
    Object.keys(formData).forEach(key => {
      formData[key] = props.editData[key] || formData[key]
    })
  } else {
    formData.thoiGian = new Date().toISOString().slice(0, 16)
  }
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
