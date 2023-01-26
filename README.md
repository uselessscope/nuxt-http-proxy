# Nuxt HTTP Proxy

## Install

### Command

```console
~$ npm i nuxt-http-proxy

~$ yarn add nuxt-http-proxy
```

## Usage examples

### Config key

```ts
export default defineNuxtConfig({
  proxy: [
    {
      target: 'https://run.mocky.io/v3/cce1f89f-f9a6-4ead-9184-c8b6a2b8bbc6',
      pathFilter: '/api/mocks',
      changeOrigin: true
    }
  ]
})
```

### Runtime config

```ts
export default defineNuxtConfig({
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
```

### Component

```ts
import { useFetch } from '#imports'

const { data } = await useFetch<{ status: string }>('http://localhost:3000/api/mocks')
```

## Interfaces

```ts
/**
 * Options:
 * https://github.com/chimurai/http-proxy-middleware/blob/master/src/types.ts
 */

interface NuxtConfig {
  proxy?: Options[]
}
```
