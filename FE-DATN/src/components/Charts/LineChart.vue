<template>
  <div class="chart-container bg-gray-50 rounded-lg p-4 flex items-center justify-center">
    <div class="text-center">
      <div class="text-2xl font-bold text-gray-600 mb-2">📊</div>
      <div class="text-sm text-gray-500">Biểu đồ thống kê</div>
      <div class="text-xs text-gray-400 mt-1">Đang tải dữ liệu...</div>
    </div>
  </div>
</template>

<script setup>
// Tạm thời disable Chart.js để tránh lỗi
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  options: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 100%;
  width: 100%;
  min-height: 200px;
}
</style>
