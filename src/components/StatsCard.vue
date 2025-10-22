<template>
  <div class="stats-card" :class="cardClass">
    <div class="stats-content">
      <div class="stats-info">
        <p class="stats-label">{{ label }}</p>
        <p class="stats-value" :class="valueClass">{{ value }}</p>
        <div v-if="change" class="stats-change" :class="changeClass">
          <svg style="width: 1rem; height: 1rem; margin-right: 0.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 11l5-5m0 0l5 5m-5-5v12"/>
          </svg>
          <span>{{ change }}</span>
        </div>
      </div>
      <div class="stats-icon">
        <div class="icon-container" :class="iconClass">
          <svg style="width: 1.5rem; height: 1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="iconPath"/>
          </svg>
        </div>
      </div>
    </div>
    
    <!-- Wave Chart -->
    <div class="wave-container">
      <WaveChart 
        :data="chartData" 
        :color="chartColor" 
        :width="200" 
        :height="60"
        :animated="true"
      />
    </div>
  </div>
</template>

<script setup>
import WaveChart from './Charts/WaveChart.vue'

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
  type: {
    type: String,
    default: 'default', // default, primary, success
    validator: (value) => ['default', 'primary', 'success'].includes(value)
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

const cardClass = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'primary-card'
    case 'success':
      return 'success-card'
    default:
      return 'default-card'
  }
})

const valueClass = computed(() => {
  switch (props.type) {
    case 'primary':
    case 'success':
      return 'text-white'
    default:
      return 'text-gray-900'
  }
})

const changeClass = computed(() => {
  switch (props.type) {
    case 'primary':
    case 'success':
      return 'text-white opacity-80'
    default:
      return 'text-green-600'
  }
})

const iconClass = computed(() => {
  switch (props.type) {
    case 'primary':
      return 'icon-primary'
    case 'success':
      return 'icon-success'
    default:
      return 'icon-default'
  }
})

const chartColor = computed(() => {
  switch (props.type) {
    case 'primary':
    case 'success':
      return 'rgba(255, 255, 255, 0.8)'
    default:
      return '#3B82F6'
  }
})
</script>

<style scoped>
.stats-card {
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border: 1px solid #e5e7eb;
  padding: 1.5rem;
  position: relative;
  overflow: hidden;
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
}

.stats-value {
  font-size: 1.875rem;
  font-weight: 700;
  margin-top: 0.25rem;
}

.stats-change {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  margin-top: 0.5rem;
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

/* Card types */
.primary-card {
  background-color: #2563eb;
  color: white;
}

.success-card {
  background-color: #16a34a;
  color: white;
}

.default-card {
  background-color: white;
  color: #111827;
}

/* Icon types */
.icon-primary {
  background-color: #3b82f6;
}

.icon-success {
  background-color: #22c55e;
}

.icon-default {
  background-color: #dbeafe;
}

/* Text colors */
.text-white {
  color: white;
}

.text-gray-900 {
  color: #111827;
}

.text-green-600 {
  color: #16a34a;
}

.opacity-80 {
  opacity: 0.8;
}
</style>
