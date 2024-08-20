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
        target: 'https://github.com/login/oauth/access_token',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/github/, ''),
      },
      '/githubUserInfo': {
        target: 'https://api.github.com/user',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/github/, ''),
      },
    },
  },
  plugins: [
    react(),
    svgrLoader()
  ],
})
