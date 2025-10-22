<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="bg-gray-100 p-6 rounded-lg mb-8">
        <h1 class="text-3xl font-bold text-gray-700 flex items-center">
          <svg class="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/>
          </svg>
          Xuất nhập file
        </h1>
        <p class="text-gray-600 mt-2">Quản lý xuất nhập dữ liệu file Excel</p>
      </div>

      <!-- Main Content - Two Column Layout -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        <!-- Left Section: Export File -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <svg class="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
            </svg>
            Xuất file
          </h2>

          <!-- Export Form -->
          <form @submit.prevent="exportFile" class="space-y-6">
            <!-- File Name Input -->
            <div>
              <label for="fileName" class="block text-sm font-medium text-gray-700 mb-2">Nhập tên file</label>
              <input
                type="text"
                id="fileName"
                v-model="exportForm.fileName"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nhập tên file của bạn"
                required
              />
            </div>

            <!-- File Information -->
            <div>
              <label for="fileInfo" class="block text-sm font-medium text-gray-700 mb-2">Thông tin file</label>
              <textarea
                id="fileInfo"
                v-model="exportForm.fileInfo"
                rows="4"
                class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Thông tin abc"
              ></textarea>
            </div>

            <!-- Export Button -->
            <div class="flex justify-end">
              <button
                type="submit"
                class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Export
              </button>
            </div>
          </form>

          <!-- Exported Files List -->
          <div class="mt-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Files đã xuất</h3>
            <div class="space-y-3">
              <div v-for="file in exportedFiles" :key="file.id" class="bg-gray-50 rounded-lg p-4 border">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center">
                    <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                    </svg>
                    <div>
                      <p class="font-medium text-gray-900">{{ file.name }}</p>
                      <p class="text-sm text-gray-500">{{ file.size }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-600">{{ file.progress }}%</span>
                    <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="file.status === 'completed' ? 'bg-green-100' : 'bg-red-100'">
                      <svg v-if="file.status === 'completed'" class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      <svg v-else class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" :style="{ width: file.progress + '%' }"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Section: Import File -->
        <div class="bg-white rounded-lg shadow-sm border p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <svg class="w-6 h-6 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"/>
            </svg>
            Tải tệp lên
          </h2>

          <!-- Upload Area -->
          <div 
            @drop="handleDrop"
            @dragover.prevent
            @dragenter.prevent
            class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-gray-400 transition-colors cursor-pointer"
            :class="{ 'border-blue-400 bg-blue-50': isDragOver }"
            @click="triggerFileInput"
          >
            <input
              ref="fileInput"
              type="file"
              @change="handleFileSelect"
              accept=".xlsx,.xls,.csv"
              class="hidden"
            />
            
            <div class="flex flex-col items-center">
              <svg class="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
              <p class="text-lg font-medium text-gray-700 mb-2">Tải tệp lên chỉ</p>
              <p class="text-sm text-gray-500 mb-4">Kéo thả file vào đây hoặc click để chọn file</p>
              <div class="w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                <svg class="w-2 h-2 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Import Button -->
          <div class="flex justify-end mt-6">
            <button
              @click="importFile"
              class="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-500 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Import
            </button>
          </div>

          <!-- Imported Files List -->
          <div class="mt-8">
            <h3 class="text-lg font-medium text-gray-900 mb-4">Files đã nhập</h3>
            <div class="space-y-3">
              <div v-for="file in importedFiles" :key="file.id" class="bg-gray-50 rounded-lg p-4 border">
                <div class="flex items-center justify-between mb-2">
                  <div class="flex items-center">
                    <svg class="w-8 h-8 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
                    </svg>
                    <div>
                      <p class="font-medium text-gray-900">{{ file.name }}</p>
                      <p class="text-sm text-gray-500">{{ file.size }}</p>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-sm text-gray-600">{{ file.progress }}%</span>
                    <div class="w-8 h-8 rounded-full flex items-center justify-center" :class="file.status === 'completed' ? 'bg-green-100' : 'bg-red-100'">
                      <svg v-if="file.status === 'completed'" class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                      </svg>
                      <svg v-else class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div class="bg-blue-600 h-2 rounded-full transition-all duration-300" :style="{ width: file.progress + '%' }"></div>
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
import { ref, onMounted } from 'vue'

// Reactive data
const exportForm = ref({
  fileName: '',
  fileInfo: ''
})

const isDragOver = ref(false)
const fileInput = ref(null)

// Sample data
const exportedFiles = ref([
  {
    id: 1,
    name: 'Products.xls',
    size: '30 MB',
    progress: 100,
    status: 'completed'
  }
])

const importedFiles = ref([
  {
    id: 1,
    name: 'PhoneList.xls',
    size: '15 MB',
    progress: 65,
    status: 'incomplete'
  }
])

// Methods
const exportFile = () => {
  if (!exportForm.value.fileName) return
  
  const newFile = {
    id: Date.now(),
    name: exportForm.value.fileName + '.xls',
    size: Math.floor(Math.random() * 50) + 10 + ' MB',
    progress: 0,
    status: 'incomplete'
  }
  
  exportedFiles.value.push(newFile)
  
  // Simulate progress
  let progress = 0
  const interval = setInterval(() => {
    progress += 10
    newFile.progress = progress
    
    if (progress >= 100) {
      newFile.status = 'completed'
      clearInterval(interval)
    }
  }, 200)
  
  // Reset form
  exportForm.value.fileName = ''
  exportForm.value.fileInfo = ''
}

const importFile = () => {
  if (fileInput.value.files.length === 0) return
  
  const file = fileInput.value.files[0]
  const newFile = {
    id: Date.now(),
    name: file.name,
    size: (file.size / 1024 / 1024).toFixed(1) + ' MB',
    progress: 0,
    status: 'incomplete'
  }
  
  importedFiles.value.push(newFile)
  
  // Simulate progress
  let progress = 0
  const interval = setInterval(() => {
    progress += Math.random() * 20
    if (progress > 100) progress = 100
    newFile.progress = Math.floor(progress)
    
    if (progress >= 100) {
      newFile.status = 'completed'
      clearInterval(interval)
    }
  }, 300)
  
  // Reset file input
  fileInput.value.value = ''
}

const handleDrop = (e) => {
  e.preventDefault()
  isDragOver.value = false
  
  const files = e.dataTransfer.files
  if (files.length > 0) {
    fileInput.value.files = files
    importFile()
  }
}

const handleFileSelect = (e) => {
  importFile()
}

const triggerFileInput = () => {
  fileInput.value.click()
}

// Drag events
const handleDragEnter = () => {
  isDragOver.value = true
}

const handleDragLeave = () => {
  isDragOver.value = false
}

onMounted(() => {
  // Add drag event listeners
  const uploadArea = document.querySelector('[data-upload-area]')
  if (uploadArea) {
    uploadArea.addEventListener('dragenter', handleDragEnter)
    uploadArea.addEventListener('dragleave', handleDragLeave)
  }
})
</script>

<style scoped>
/* Custom styles if needed */
</style>
