<template>
  <div class="wave-chart-container">
    <svg :width="width" :height="height" class="wave-svg">
      <defs>
        <linearGradient :id="gradientId" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" :style="`stop-color:${color};stop-opacity:0.8`" />
          <stop offset="100%" :style="`stop-color:${color};stop-opacity:0.1`" />
        </linearGradient>
      </defs>
      
      <!-- Wave path -->
      <path
        :d="wavePath"
        :fill="`url(#${gradientId})`"
        :stroke="color"
        stroke-width="2"
        class="wave-path"
      />
      
      <!-- Data points -->
      <circle
        v-for="(point, index) in dataPoints"
        :key="index"
        :cx="point.x"
        :cy="point.y"
        r="3"
        :fill="color"
        class="data-point"
      />
    </svg>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => [10, 20, 15, 30, 25, 35, 40, 30, 45, 50, 40, 60]
  },
  color: {
    type: String,
    default: '#3B82F6'
  },
  width: {
    type: Number,
    default: 200
  },
  height: {
    type: Number,
    default: 80
  },
  animated: {
    type: Boolean,
    default: true
  }
})

const gradientId = ref(`gradient-${Math.random().toString(36).substr(2, 9)}`)
const animationOffset = ref(0)

const dataPoints = computed(() => {
  const points = []
  const stepX = props.width / (props.data.length - 1)
  
  for (let i = 0; i < props.data.length; i++) {
    const x = i * stepX
    const normalizedValue = props.data[i] / Math.max(...props.data)
    const y = props.height - (normalizedValue * props.height * 0.8) - props.height * 0.1
    points.push({ x, y })
  }
  
  return points
})

const wavePath = computed(() => {
  if (dataPoints.value.length < 2) return ''
  
  let path = `M ${dataPoints.value[0].x} ${dataPoints.value[0].y}`
  
  for (let i = 1; i < dataPoints.value.length; i++) {
    const prevPoint = dataPoints.value[i - 1]
    const currentPoint = dataPoints.value[i]
    
    // Create smooth curve using quadratic Bézier curves
    const cp1x = prevPoint.x + (currentPoint.x - prevPoint.x) / 3
    const cp1y = prevPoint.y
    const cp2x = prevPoint.x + 2 * (currentPoint.x - prevPoint.x) / 3
    const cp2y = currentPoint.y
    
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${currentPoint.x} ${currentPoint.y}`
  }
  
  // Close the path to create filled area
  path += ` L ${props.width} ${props.height} L 0 ${props.height} Z`
  
  return path
})

// Animation
onMounted(() => {
  if (props.animated) {
    const animate = () => {
      animationOffset.value += 0.02
      requestAnimationFrame(animate)
    }
    animate()
  }
})
</script>

<style scoped>
.wave-chart-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.wave-svg {
  overflow: visible;
}

.wave-path {
  transition: all 0.3s ease;
}

.data-point {
  transition: all 0.3s ease;
}

.data-point:hover {
  r: 5;
  filter: drop-shadow(0 0 4px currentColor);
}
</style>
