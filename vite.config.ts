import {defineConfig} from 'vite'
import {svelte} from '@sveltejs/vite-plugin-svelte'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/dev-jeans/',
  plugins: [svelte()],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  // TODO. 프록시 설정하기
  // server: {
  //   proxy: {
  //     '/api': 'http://ec2-34-229-49-163.compute-1.amazonaws.com:8080',
  //   },
  // },
})
