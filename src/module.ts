import { hash, objectHash } from 'ohash'
import { addServerHandler, createResolver, defineNuxtModule } from '@nuxt/kit'
import type { Nuxt } from '@nuxt/schema'
import type { NitroConfig } from 'nitropack'
import type { Options } from 'http-proxy-middleware'

export type ModuleOptions = Options[]

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-http-proxy',
    configKey: 'proxy'
  },

  defaults: [],

  setup: (moduleOptions: ModuleOptions, nuxt: Nuxt) => {
    const { resolve } = createResolver(import.meta.url)
    nuxt.options.build.transpile.push(resolve('./runtime'), 'http-proxy')

    moduleOptions = Object.keys(moduleOptions).reduce(
      (accumulator: Options[], key: any) => {
        accumulator.push(moduleOptions[key])
        return accumulator
      },
      []
    )

    moduleOptions = nuxt.options.runtimeConfig.proxy = [
      ...nuxt.options.runtimeConfig.proxy || [],
      ...moduleOptions || []
    ]

    const createMiddleware = (options: Options) => {
      const config = JSON.stringify(options, (key: string, value: any) => {
        return typeof value === 'function' ? value() : value
      })

      return `
        import createMiddleware from '${resolve()}/runtime/middleware'
        export default createMiddleware(${config})
      `
    }

    nuxt.hook('nitro:config', (nitroConfig: NitroConfig) => {
      nitroConfig.virtual = nitroConfig.virtual || {}

      moduleOptions.forEach((item: Options) => {
        if (nitroConfig.virtual) {
          const handler = `http-proxy/${hash(objectHash(item))}.mjs`

          nitroConfig.virtual[handler] = createMiddleware(item)
          addServerHandler({ handler, middleware: true })
        }
      })
    })
  }
})
