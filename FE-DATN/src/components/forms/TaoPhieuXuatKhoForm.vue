<template>
  <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
      <!-- Header -->
      <div class="flex items-center justify-between p-6 border-b">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
            <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900">Tạo phiếu xuất kho</h3>
        </div>
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
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Nhập mã phiếu"
              required
            />
          </div>

          <!-- Nguồn xuất -->
          <div>
            <label for="nguonXuat" class="block text-sm font-medium text-gray-700 mb-2">
              Nguồn xuất <span class="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nguonXuat"
              v-model="formData.nguonXuat"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Nhập tên nguồn xuất"
              required
            />
          </div>

          <!-- Giá trị -->
          <div>
            <label for="giaTri" class="block text-sm font-medium text-gray-700 mb-2">
              Giá trị (VNĐ) <span class="text-red-500">*</span>
            </label>
            <input
              type="number"
              id="giaTri"
              v-model="formData.giaTri"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Nhập giá trị"
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
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
              v-model="formData.thoiGian"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Nhập ghi chú (tùy chọn)"
            ></textarea>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex justify-end space-x-3 mt-6 pt-4 border-t">
          <button
            type="button"
            @click="resetForm"
            class="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            <span>Làm mới</span>
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            <span>Lưu</span>
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
  nguonXuat: '',
  giaTri: 0,
  tinhTrang: 'Chờ duyệt',
  thoiGian: '',
  ghiChu: ''
})

// Methods
const savePhieu = () => {
  if (!formData.maPhieu || !formData.nguonXuat || !formData.giaTri || !formData.tinhTrang || !formData.thoiGian) {
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
