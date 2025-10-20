<template>
  <div class="min-h-screen bg-gray-50 font-sans">
    <!-- HEADER -->
    <header class="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <div class="flex items-center space-x-4">
        <i
          class="fas fa-bars text-2xl text-gray-700 cursor-pointer hover:text-blue-600"
          title="Menu"
        ></i>
        <h1 class="text-2xl font-semibold text-gray-900">Nhân viên</h1>
      </div>

      <!-- Search Header -->
      <div class="relative w-1/3">
        <input
          v-model="searchHeader"
          type="text"
          placeholder="Search here..."
          class="w-full border rounded-xl px-4 py-2 pl-10 text-gray-700 focus:ring-2 focus:ring-blue-500"
        />
        <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
      </div>

      <!-- Icons -->
      <div class="flex items-center space-x-6">
        <div class="flex items-center space-x-4 text-gray-600">
          <i class="fas fa-bell text-xl cursor-pointer hover:text-blue-600"></i>
          <i class="fas fa-envelope text-xl cursor-pointer hover:text-blue-600"></i>
          <i class="fas fa-cog text-xl cursor-pointer hover:text-blue-600"></i>
        </div>
        <div class="flex items-center space-x-3">
          <div class="text-right">
            <p class="font-semibold">CEO: Nguyễn Đức Thắng</p>
            <p class="text-sm text-gray-500">thangdn@gmail.com</p>
          </div>
          <img
            src="https://i.pravatar.cc/100"
            alt="User"
            class="w-12 h-12 rounded-full border"
          />
        </div>
      </div>
    </header>

    <!-- CONTENT -->
    <main class="p-8">
      <!-- Top actions -->
      <div class="flex items-center space-x-4 mb-4">
        <div class="relative flex-1 max-w-md">
          <input
            v-model="search"
            type="text"
            placeholder="Search here..."
            class="w-full border rounded-xl px-4 py-2 pl-10 text-gray-700 focus:ring-2 focus:ring-blue-500"
          />
          <i class="fas fa-search absolute left-3 top-3 text-gray-400"></i>
        </div>

        <button
          class="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          + Thêm nhân viên
        </button>
        <button
          class="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition"
        >
          Download Excel
        </button>
        <button
          class="bg-gray-200 px-6 py-2 rounded-xl text-gray-700 hover:bg-gray-300 transition"
        >
          Lọc
        </button>
        <button
          class="bg-gray-200 px-6 py-2 rounded-xl text-gray-700 hover:bg-gray-300 transition"
        >
          Hành động
        </button>
      </div>

      <!-- TABLE -->
      <div class="bg-white shadow rounded-2xl overflow-hidden">
        <table class="min-w-full text-left">
          <thead class="bg-gray-100 text-gray-700">
            <tr>
              <th class="px-6 py-3"><input type="checkbox" /></th>
              <th class="px-6 py-3">MÃ NV</th>
              <th class="px-6 py-3">TÊN NHÂN VIÊN</th>
              <th class="px-6 py-3">MÃ SỐ THUẾ</th>
              <th class="px-6 py-3">ĐỊA CHỈ</th>
              <th class="px-6 py-3">SỐ ĐIỆN THOẠI</th>
              <th class="px-6 py-3">EMAIL</th>
              <th class="px-6 py-3">LƯU</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="nv in paginatedNhanVien"
              :key="nv.id"
              class="border-b hover:bg-gray-50 transition"
            >
              <td class="px-6 py-3"><input type="checkbox" /></td>
              <td class="px-6 py-3 font-semibold text-gray-800">NV{{ nv.id }}</td>
              <td class="px-6 py-3">{{ nv.ten }}</td>
              <td class="px-6 py-3">{{ nv.maSoThue }}</td>
              <td class="px-6 py-3">{{ nv.diaChi }}</td>
              <td class="px-6 py-3">{{ nv.soDienThoai }}</td>
              <td class="px-6 py-3 text-green-600 font-medium">
                {{ nv.email }}
              </td>
              <td class="px-6 py-3">
                <div class="flex items-center space-x-2">
                  <i
                    class="fas fa-pen text-purple-600 cursor-pointer hover:text-purple-800"
                  ></i>
                  <i
                    class="fas fa-ellipsis-h text-gray-500 cursor-pointer hover:text-gray-700"
                  ></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <div class="flex items-center justify-end space-x-2 px-6 py-4 bg-gray-50 text-gray-600">
          <button
            class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            :disabled="currentPage === 1"
            @click="goToPage(currentPage - 1)"
          >
            « Previous
          </button>

          <button
            v-for="page in totalPages"
            :key="page"
            @click="goToPage(page)"
            class="px-3 py-1 rounded"
            :class="page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-200 hover:bg-gray-300'"
          >
            {{ page }}
          </button>

          <button
            class="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            :disabled="currentPage === totalPages"
            @click="goToPage(currentPage + 1)"
          >
            Next »
          </button>
        </div>
      </div>

      <p class="mt-3 text-gray-500">
        Hiển thị
        {{ paginatedNhanVien.length }}
        trong tổng số
        {{ filteredNhanVien.length }}
        dữ liệu
      </p>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { CallApi } from "../helper/CallApi.js";

const searchHeader = ref("");
const search = ref("");
const nhanVien = ref([]);

const currentPage = ref(1);
const itemsPerPage = 5;

onMounted(async () => {
  try {
    const res = await CallApi.get("nhanVien");
    nhanVien.value = res.data;
  } catch (error) {
    console.error("Lỗi khi gọi API:", error);
  }
});

// Reset về trang 1 khi search
watch(search, () => {
  currentPage.value = 1;
});

const filteredNhanVien = computed(() =>
  nhanVien.value.filter((nv) =>
    (nv.ten || "").toLowerCase().includes(search.value.toLowerCase())
  )
);

const totalPages = computed(() =>
  Math.ceil(filteredNhanVien.value.length / itemsPerPage)
);

const paginatedNhanVien = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredNhanVien.value.slice(start, end);
});

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
</style>
