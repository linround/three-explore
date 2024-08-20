import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgrLoader from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: ['es2015', 'edge88', 'firefox78', 'chrome87', 'safari14'],
  },
  server: {
    proxy: {
      '/githubAccessToken': 'https://three.ucalendar.cn/githubAccessToken',
      '/githubUserInfo': 'https://three.ucalendar.cn/githubUserInfo',
    },
  },
  plugins: [
    react(),
    svgrLoader()
  ],
})
