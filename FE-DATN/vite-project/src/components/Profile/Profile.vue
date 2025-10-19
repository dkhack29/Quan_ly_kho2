<template>
  <div class="max-w-4xl mx-auto p-8 bg-white rounded-2xl shadow-2xl border border-gray-100 font-['Lora']">
      <!-- Header -->
    <div class="flex flex-col md:flex-row items-center justify-between mb-8 gap-6">
      <div class="flex items-center gap-6">
        <div class="relative w-28 h-28">
          <img
            src="/z6409141730481_27026a65d4c8860e3667c8b0eb18fca1.jpg"
            alt="Avatar"
            class="w-28 h-28 rounded-full object-cover border-4 border-blue-200 shadow-lg"
          />
          <label
            class="absolute bottom-2 right-2 bg-gradient-to-r from-blue-500 to-indigo-500 p-2 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-lg"
          >
            <i class="fa-solid fa-camera text-white text-lg"></i>
            <input type="file" class="hidden" />
          </label>
        </div>
        <div>
          <h2 class="text-2xl font-extrabold text-gray-900 mb-1">Nguyễn Đức Thắng</h2>
          <p class="text-gray-500 text-base mb-1">Thứ 2, ngày 3 tháng 10, 2025</p>
          <a href="mailto:thangdn@gmail.com" class="text-blue-600 hover:underline text-base font-medium">thangdn@gmail.com</a>
        </div>
      </div>
      <div class="flex gap-4 items-center">
        <button @click="toggleEdit" :class="editing ? 'bg-gray-100 text-gray-800' : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'" class="px-6 py-2 rounded-full font-semibold shadow-md transition">
          <span v-if="!editing">Chỉnh sửa</span>
          <span v-else>Hủy</span>
        </button>
        <button class="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold shadow-md hover:from-pink-600 hover:to-purple-600 transition">Đổi mật khẩu</button>
        <button @click="$emit('close')" class="ml-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 transition">X</button>
      </div>
    </div>

    <!-- ...avatar và header đã chuyển lên trên ... -->

      <!-- Form -->
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm text-gray-700 mb-1">Tên người dùng</label>
        <input
          type="text"
          v-model="form.username"
          :readonly="!editing"
          placeholder="Tên người dùng của bạn"
          class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 shadow-sm"
        />
      </div>
      <div>
        <label class="block text-sm text-gray-700 mb-1">Tên</label>
        <input
          type="text"
          v-model="form.name"
          :readonly="!editing"
          placeholder="Tên của bạn"
          class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 shadow-sm"
        />
      </div>
      <div>
        <label class="block text-sm text-gray-700 mb-1">Giới tính</label>
        <div class="relative">
          <select
            v-model="form.gender"
            :disabled="!editing"
            class="w-full p-3 border border-gray-200 rounded-xl bg-white focus:ring-2 focus:ring-blue-400 outline-none shadow-sm appearance-none pr-10"
          >
            <option value="">Giới tính của bạn</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
            <option value="Khac">Khác</option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-3 flex items-center">
            <svg class="w-5 h-5 text-gray-400 transition-transform" :class="{'rotate-180': selectOpen}" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6 8l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
      </div>
      <div>
        <label class="block text-sm text-gray-700 mb-1">Chức vụ</label>
        <input
          type="text"
          v-model="form.chucVu"
          readonly
          class="w-full p-3 border border-gray-200 rounded-xl bg-gray-100 text-gray-600 outline-none shadow-sm"
        />
      </div>
      <div>
        <label class="block text-sm text-gray-700 mb-1">Ngày sinh</label>
        <div class="relative">
          <input
            type="date"
            v-model="form.dob"
            :disabled="!editing"
            class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 shadow-sm"
          />
          <i class="fa-solid fa-calendar-days absolute right-4 top-4 text-blue-400"></i>
        </div>
      </div>
      <div>
        <label class="block text-sm text-gray-700 mb-1">Số điện thoại</label>
        <input
          type="tel"
          v-model="form.phone"
          :readonly="!editing"
          placeholder="Số điện thoại của bạn"
          class="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-400 outline-none bg-gray-50 shadow-sm"
        />
      </div>
    </div>

      <!-- Email Section -->
  <div class="mt-10 border-t pt-6">
    <h3 class="font-bold text-gray-900 mb-3 text-lg">Email của tôi</h3>
    <div class="flex items-center justify-between">
      <div>
        <div class="flex items-center space-x-3">
          <i class="fa-solid fa-envelope text-blue-500 text-xl"></i>
          <span class="text-gray-900 font-medium text-base">{{ form.email }}</span>
        </div>
        <p class="text-sm text-gray-500 mt-1">Đã cập nhật 1 tháng trước</p>
      </div>
      <div class="flex items-center gap-3">
        <button v-if="editing" @click="save" class="bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:bg-green-700 transition">Lưu</button>
        <button v-if="editing" @click="cancel" class="bg-gray-100 px-5 py-2 rounded-full text-sm text-gray-700 transition">Hủy</button>
        <button v-else class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:from-blue-600 hover:to-indigo-600 transition">Đổi email</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import data from '../../../db.json'

const editing = ref(false)
const selectOpen = ref(false)

// find Nguyễn Văn A in db
const employee = (data?.nhanVien || []).find(e => e.tenNhanVien === 'Nguyễn Văn A') || (data?.nhanVien && data.nhanVien[0]) || null

const form = reactive({
  username: employee && employee.email ? employee.email.split('@')[0] : '',
  name: employee ? employee.tenNhanVien : '',
  gender: employee ? employee.gioiTinh : '',
  dob: employee && employee.ngaySinh ? employee.ngaySinh.slice(0,10) : '',
  phone: employee ? employee.sdt : '',
  chucVu: employee ? employee.chucVu : '',
  email: employee ? employee.email : ''
})

function toggleEdit() {
  editing.value = !editing.value
}

function save() {
  // TODO: gọi API lưu dữ liệu
  editing.value = false
}

function cancel() {
  // TODO: reset form nếu cần
  editing.value = false
}
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css");
</style>
