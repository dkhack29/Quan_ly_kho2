<template>
  <div class="min-h-screen bg-gray-50 p-8">
    <div class="bg-white rounded-lg shadow-sm border p-6">
      <h1 class="text-2xl font-bold text-gray-900 mb-6">Loại Hàng Hóa</h1>
      
      <!-- Form đơn giản -->
      <div class="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 class="text-lg font-semibold text-blue-800 mb-4">Thêm loại hàng mới</h2>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">ID</label>
            <input
              v-model="formData.id"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập ID"
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Tên loại</label>
            <input
              v-model="formData.tenLoai"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập tên loại"
              required
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Mô tả</label>
            <textarea
              v-model="formData.moTa"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Nhập mô tả"
              rows="3"
            ></textarea>
          </div>
          
          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            Lưu
          </button>
        </form>
      </div>
      
      <!-- Danh sách đơn giản -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Danh sách loại hàng</h3>
        <div class="space-y-2">
          <div v-for="item in items" :key="item.id" class="bg-white p-3 rounded border">
            <div class="flex justify-between items-center">
              <div>
                <span class="font-medium">{{ item.id }}</span> - {{ item.tenLoai }}
                <p class="text-sm text-gray-600">{{ item.moTa }}</p>
              </div>
              <div class="space-x-2">
                <button class="text-blue-600 hover:text-blue-800">Sửa</button>
                <button class="text-red-600 hover:text-red-800">Xóa</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

console.log('LoaiHangSimple component loaded')

const formData = ref({
  id: '',
  tenLoai: '',
  moTa: ''
})

const items = ref([
  { id: 'LH001', tenLoai: 'Điện tử', moTa: 'Các sản phẩm điện tử' },
  { id: 'LH002', tenLoai: 'Thời trang', moTa: 'Quần áo và phụ kiện' },
  { id: 'LH003', tenLoai: 'Thực phẩm', moTa: 'Các sản phẩm thực phẩm' }
])

const handleSubmit = () => {
  if (formData.value.id && formData.value.tenLoai) {
    items.value.push({ ...formData.value })
    formData.value = { id: '', tenLoai: '', moTa: '' }
    alert('Đã thêm thành công!')
  }
}
</script>
