import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

// attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')

  const url = config.url || ''

  // 🚫 DO NOT SEND TOKEN FOR LOGIN / REGISTER
  const isAuthRoute =
    url.includes('/auth/login') ||
    url.includes('/auth/register')

  if (!isAuthRoute && token) {
    config.headers.Authorization = `Bearer ${token}`
  } else {
    delete config.headers.Authorization
  }

  return config
})

// handle logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(err)
  }
)

export default api