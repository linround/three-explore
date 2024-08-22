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
      '/githubAccessToken': {
        rewrite: (path) => path.replace(/^\/githubAccessToken/, ''),
        changeOrigin: true,
        target: 'https://three.ucalendar.cn/githubAccessToken',
      },
      '/githubCode': {
        rewrite: (path) => path.replace(/^\/githubCode/, ''),
        changeOrigin: true,
        target: 'https://three.ucalendar.cn/githubCode',
      },
    },
  },
  plugins: [
    react(),
    svgrLoader()
  ],
})
