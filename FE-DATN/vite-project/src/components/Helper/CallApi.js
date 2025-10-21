import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_BASE_API || 'http://localhost:3000/api'
const API_TIMEOUT = 10000

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  }
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

const handleError = (error) => {
  return {
    message: error.response?.data?.message || error.message || 'Unknown error',
    status: error.response?.status || 0,
    data: error.response?.data,
    originalError: error
  }
}

const apiRequest = async (method, url, data = null, config = {}) => {
  try {
    const response = await apiClient[method](url, data, config)
    return response.data
  } catch (error) {
    throw handleError(error)
  }
}

export const api = {
  get: (url, params = {}) => apiRequest('get', url, null, { params }),
  post: (url, data = {}) => apiRequest('post', url, data),
  put: (url, data = {}) => apiRequest('put', url, data),
  delete: (url) => apiRequest('delete', url),
  patch: (url, data = {}) => apiRequest('patch', url, data),
  
  upload: (url, formData, onProgress = null) => 
    apiRequest('post', url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: onProgress
    })
}

export const testApiConnection = async () => {
  try {
    const response = await api.get('/health')
    return { success: true, data: response }
  } catch (error) {
    return { success: false, error: error.message }
  }
}

export default api
