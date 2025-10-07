import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true // if you use Django sessions/CSRF
})

// Optional: attach auth token from a store
// api.interceptors.request.use((config) => {
//   const token = useAuthStore.getState().token
//   if (token) config.headers.Authorization = `Bearer ${token}`
//   return config
// })
