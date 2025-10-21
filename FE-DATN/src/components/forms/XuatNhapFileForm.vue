<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <div class="flex items-center">
            <h1 class="text-2xl font-bold text-gray-900">Xuất Nhập File</h1>
          </div>
          <div class="flex items-center space-x-4">
            <button
              @click="showExportForm = !showExportForm"
              class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <span>{{ showExportForm ? 'Ẩn Export' : 'Xuất File' }}</span>
            </button>
            <button
              @click="showImportForm = !showImportForm"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              <span>{{ showImportForm ? 'Ẩn Import' : 'Nhập File' }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Export Section -->
        <div v-if="showExportForm" class="bg-white rounded-lg shadow-sm border">
          <div class="px-6 py-4 border-b">
            <h2 class="text-lg font-semibold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              Xuất File
            </h2>
          </div>
          
          <form @submit.prevent="handleExport" class="p-6">
            <div class="space-y-6">
              <!-- Tên file -->
              <div>
                <label for="exportFileName" class="block text-sm font-medium text-gray-700 mb-2">
                  Tên file <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="exportFileName"
                  v-model="exportData.fileName"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Nhập tên file của bạn"
                  required
                />
              </div>

              <!-- Loại dữ liệu -->
              <div>
                <label for="exportDataType" class="block text-sm font-medium text-gray-700 mb-2">
                  Loại dữ liệu <span class="text-red-500">*</span>
                </label>
                <select
                  id="exportDataType"
                  v-model="exportData.dataType"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="">Chọn loại dữ liệu</option>
                  <option value="hang-hoa">Hàng hóa</option>
                  <option value="nha-cung-cap">Nhà cung cấp</option>
                  <option value="nhan-vien">Nhân viên</option>
                  <option value="loai-hang">Loại hàng</option>
                  <option value="phieu-nhap">Phiếu nhập</option>
                  <option value="phieu-xuat">Phiếu xuất</option>
                </select>
              </div>

              <!-- Định dạng file -->
              <div>
                <label for="exportFileFormat" class="block text-sm font-medium text-gray-700 mb-2">
                  Định dạng file <span class="text-red-500">*</span>
                </label>
                <select
                  id="exportFileFormat"
                  v-model="exportData.fileFormat"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="">Chọn định dạng</option>
                  <option value="xlsx">Excel (.xlsx)</option>
                  <option value="csv">CSV (.csv)</option>
                  <option value="pdf">PDF (.pdf)</option>
                  <option value="json">JSON (.json)</option>
                </select>
              </div>

              <!-- Mô tả -->
              <div>
                <label for="exportDescription" class="block text-sm font-medium text-gray-700 mb-2">
                  Mô tả file
                </label>
                <textarea
                  id="exportDescription"
                  v-model="exportData.description"
                  rows="4"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Mô tả về file xuất..."
                ></textarea>
              </div>

              <!-- Action Buttons -->
              <div class="flex justify-end space-x-4 pt-4 border-t">
                <button
                  type="button"
                  @click="resetExportForm"
                  class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Làm mới
                </button>
                <button
                  type="submit"
                  class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <span>Xuất File</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Import Section -->
        <div v-if="showImportForm" class="bg-white rounded-lg shadow-sm border">
          <div class="px-6 py-4 border-b">
            <h2 class="text-lg font-semibold text-gray-900 flex items-center">
              <svg class="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
              </svg>
              Nhập File
            </h2>
          </div>
          
          <form @submit.prevent="handleImport" class="p-6">
            <div class="space-y-6">
              <!-- Upload Area -->
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">
                  Chọn file <span class="text-red-500">*</span>
                </label>
                <div
                  @drop="handleFileDrop"
                  @dragover.prevent
                  @dragenter.prevent
                  class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors"
                  :class="{ 'border-blue-400 bg-blue-50': isDragOver }"
                >
                  <input
                    ref="fileInput"
                    type="file"
                    @change="handleFileSelect"
                    accept=".xlsx,.csv,.pdf,.json"
                    class="hidden"
                  />
                  <div class="flex flex-col items-center space-y-4">
                    <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                    </svg>
                    <div class="text-center">
                      <p class="text-lg font-medium text-gray-700">Kéo thả file vào đây</p>
                      <p class="text-sm text-gray-500">hoặc</p>
                      <button
                        type="button"
                        @click="$refs.fileInput.click()"
                        class="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Chọn file từ máy tính
                      </button>
                    </div>
                    <p class="text-xs text-gray-400">Hỗ trợ: .xlsx, .csv, .pdf, .json</p>
                  </div>
                </div>
              </div>

              <!-- File Info -->
              <div v-if="importData.selectedFile" class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-center space-x-3">
                  <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  <div class="flex-1">
                    <p class="font-medium text-gray-900">{{ importData.selectedFile.name }}</p>
                    <p class="text-sm text-gray-500">{{ formatFileSize(importData.selectedFile.size) }}</p>
                  </div>
                  <button
                    @click="removeFile"
                    class="text-red-600 hover:text-red-800"
                  >
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Loại dữ liệu -->
              <div>
                <label for="importDataType" class="block text-sm font-medium text-gray-700 mb-2">
                  Loại dữ liệu <span class="text-red-500">*</span>
                </label>
                <select
                  id="importDataType"
                  v-model="importData.dataType"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Chọn loại dữ liệu</option>
                  <option value="hang-hoa">Hàng hóa</option>
                  <option value="nha-cung-cap">Nhà cung cấp</option>
                  <option value="nhan-vien">Nhân viên</option>
                  <option value="loai-hang">Loại hàng</option>
                  <option value="phieu-nhap">Phiếu nhập</option>
                  <option value="phieu-xuat">Phiếu xuất</option>
                </select>
              </div>

              <!-- Ghi đè dữ liệu -->
              <div class="flex items-center">
                <input
                  id="overwriteData"
                  type="checkbox"
                  v-model="importData.overwrite"
                  class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label for="overwriteData" class="ml-2 block text-sm text-gray-700">
                  Ghi đè dữ liệu hiện có
                </label>
              </div>

              <!-- Action Buttons -->
              <div class="flex justify-end space-x-4 pt-4 border-t">
                <button
                  type="button"
                  @click="resetImportForm"
                  class="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Làm mới
                </button>
                <button
                  type="submit"
                  :disabled="!importData.selectedFile"
                  class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
                  </svg>
                  <span>Nhập File</span>
                </button>
              </div>
            </div>
          </form>
        </div>

        <!-- Progress Section -->
        <div v-if="showProgress" class="lg:col-span-2 bg-white rounded-lg shadow-sm border">
          <div class="px-6 py-4 border-b">
            <h2 class="text-lg font-semibold text-gray-900">Tiến trình xử lý</h2>
          </div>
          <div class="p-6">
            <div class="space-y-4">
              <div v-for="(task, index) in progressTasks" :key="index" class="flex items-center space-x-4">
                <div class="flex-shrink-0">
                  <div v-if="task.status === 'completed'" class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                    </svg>
                  </div>
                  <div v-else-if="task.status === 'error'" class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                    <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </div>
                  <div v-else class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <div class="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
                <div class="flex-1">
                  <p class="font-medium text-gray-900">{{ task.name }}</p>
                  <p class="text-sm text-gray-500">{{ task.description }}</p>
                </div>
                <div class="text-sm text-gray-500">
                  {{ task.progress }}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// State
const showExportForm = ref(false)
const showImportForm = ref(false)
const showProgress = ref(false)
const isDragOver = ref(false)

const exportData = reactive({
  fileName: '',
  dataType: '',
  fileFormat: '',
  description: ''
})

const importData = reactive({
  selectedFile: null,
  dataType: '',
  overwrite: false
})

const progressTasks = ref([
  { name: 'Đọc file', description: 'Đang đọc dữ liệu từ file...', progress: 0, status: 'pending' },
  { name: 'Xác thực dữ liệu', description: 'Kiểm tra tính hợp lệ của dữ liệu...', progress: 0, status: 'pending' },
  { name: 'Xử lý dữ liệu', description: 'Đang xử lý và lưu dữ liệu...', progress: 0, status: 'pending' }
])

// Methods
const handleExport = () => {
  if (!exportData.fileName || !exportData.dataType || !exportData.fileFormat) {
    alert('Vui lòng điền đầy đủ thông tin bắt buộc!')
    return
  }

  showProgress.value = true
  simulateProgress()
  alert(`Đang xuất file: ${exportData.fileName}.${exportData.fileFormat}`)
}

const handleImport = () => {
  if (!importData.selectedFile || !importData.dataType) {
    alert('Vui lòng chọn file và loại dữ liệu!')
    return
  }

  showProgress.value = true
  simulateProgress()
  alert(`Đang nhập file: ${importData.selectedFile.name}`)
}

const handleFileSelect = (event) => {
  const file = event.target.files[0]
  if (file) {
    importData.selectedFile = file
  }
}

const handleFileDrop = (event) => {
  event.preventDefault()
  isDragOver.value = false
  
  const files = event.dataTransfer.files
  if (files.length > 0) {
    importData.selectedFile = files[0]
  }
}

const removeFile = () => {
  importData.selectedFile = null
  const fileInput = document.querySelector('input[type="file"]')
  if (fileInput) fileInput.value = ''
}

const resetExportForm = () => {
  Object.keys(exportData).forEach(key => {
    exportData[key] = ''
  })
}

const resetImportForm = () => {
  importData.selectedFile = null
  importData.dataType = ''
  importData.overwrite = false
  const fileInput = document.querySelector('input[type="file"]')
  if (fileInput) fileInput.value = ''
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

const simulateProgress = () => {
  progressTasks.value.forEach((task, index) => {
    setTimeout(() => {
      task.status = 'processing'
      const interval = setInterval(() => {
        task.progress += 10
        if (task.progress >= 100) {
          task.progress = 100
          task.status = 'completed'
          clearInterval(interval)
        }
      }, 100)
    }, index * 1000)
  })
}
</script>

<style scoped>
/* Custom styles if needed */
</style>
