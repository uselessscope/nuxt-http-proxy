import { createProxyMiddleware, Options } from 'http-proxy-middleware'
import { eventHandler, H3Event } from 'h3'

export default function (options: Options) {
  const proxyMiddleware = createProxyMiddleware(options)

  return eventHandler(async (event: H3Event) => {
    await new Promise((resolve, reject) => {
      proxyMiddleware(event.node.req, event.node.res, (error?: unknown) => {
        error ? reject(error) : resolve(true)
      })
    })
  })
}
