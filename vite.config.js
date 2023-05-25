import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import qiankun from 'vite-plugin-qiankun';

const useDevMode = true

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ...(
      useDevMode ? [] : [
        reactRefresh()
      ]
    ),
    qiankun('react-sub-app', {
      useDevMode
    })
  ],
  base: '//localhost:3000',
  server: {
    port: 3000,
    origin: '//localhost:3000'
  }
})
