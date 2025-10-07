import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ mode }) => {
  loadEnv(mode, process.cwd(), '') // optional, keeps env loading consistent
  return {
    plugins: [react(), tsconfigPaths()],
    server: {
      port: 5173,
      proxy: { '/api': { target: 'http://127.0.0.1:8000', changeOrigin: true, secure: false } }
    }
  }
})
