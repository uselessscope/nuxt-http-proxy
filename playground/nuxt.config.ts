import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['../src/module'],

  // proxy: [
  //   {
  //     target: 'https://run.mocky.io/v3/cce1f89f-f9a6-4ead-9184-c8b6a2b8bbc6',
  //     pathFilter: '/api/mocks',
  //     changeOrigin: true
  //   }
  // ],

  runtimeConfig: {
    proxy: [
      {
        target: 'https://run.mocky.io/v3/cce1f89f-f9a6-4ead-9184-c8b6a2b8bbc6',
        pathFilter: '/api/mocks',
        changeOrigin: true
      }
    ]
  }
})
