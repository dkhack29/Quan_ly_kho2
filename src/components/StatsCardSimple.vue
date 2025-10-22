<template>
  <div class="stats-card-simple">
    <div class="stats-content">
      <div class="stats-info">
        <p class="stats-label">{{ label }}</p>
        <p class="stats-value">{{ value }}</p>
        <div v-if="change" class="stats-change">
          <span>{{ change }}</span>
        </div>
      </div>
      <div class="stats-icon">
        <div class="icon-container">
          <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPath"/>
          </svg>
        </div>
      </div>
    </div>
    
    <!-- Simple Wave Chart -->
    <div class="wave-container">
      <svg width="200" height="60" viewBox="0 0 200 60">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#3B82F6;stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#3B82F6;stop-opacity:0.1" />
          </linearGradient>
        </defs>
        <path
          :d="wavePath"
          fill="url(#gradient)"
          stroke="#3B82F6"
          stroke-width="2"
        />
      </svg>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  change: {
    type: String,
    default: ''
  },
  iconPath: {
    type: String,
    default: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z'
  },
  chartData: {
    type: Array,
    default: () => [10, 20, 15, 30, 25, 35, 40, 30, 45, 50, 40, 60]
  }
})

const wavePath = computed(() => {
  const data = props.chartData
  const width = 200
  const height = 60
  const stepX = width / (data.length - 1)
  
  let path = `M 0 ${height}`
  
  for (let i = 0; i < data.length; i++) {
    const x = i * stepX
    const normalizedValue = data[i] / Math.max(...data)
    const y = height - (normalizedValue * height * 0.8) - height * 0.1
    path += ` L ${x} ${y}`
  }
  
  path += ` L ${width} ${height} Z`
  
  return path
})
</script>

<style scoped>
.stats-card-simple {
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
  background-color: white;
  color: #111827;
}

.stats-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.stats-info {
  flex: 1;
}

.stats-label {
  font-size: 0.875rem;
  font-weight: 500;
  opacity: 0.8;
  margin: 0;
}

.stats-value {
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0.25rem 0;
}

.stats-change {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  color: #16a34a;
}

.stats-icon {
  flex-shrink: 0;
}

.icon-container {
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #dbeafe;
}

.wave-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4rem;
  opacity: 0.6;
}

.wave-container svg {
  width: 100%;
  height: 100%;
}
</style>
