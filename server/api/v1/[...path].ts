import { defineEventHandler, getProxyRequestHeaders, getRequestHeader, getRequestURL, proxyRequest } from 'h3'

const stripSecureAttribute = (cookies: string[]): string[] => {
  return cookies.map((cookie) => cookie.replace(/;\s*secure\b/gi, ''))
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const url = getRequestURL(event)
  const param = (event.context.params as Record<string, unknown> | undefined)?.path

  const rawPath = Array.isArray(param) ? param.join('/') : typeof param === 'string' ? param : ''
  let path = rawPath.replace(/^\/+/, '')
  path = path.replace(/^api\/v1\/+/, '')
  const base = String(config.public.apiBase || '').replace(/\/+$/, '')

  const targetPath = path ? `/api/v1/${path}` : '/api/v1'
  const target = `${base}${targetPath}${url.search}`

  const headers = getProxyRequestHeaders(event, { host: false }) as Record<string, string>
  delete headers.origin
  delete headers.referer
  delete headers['sec-fetch-site']
  delete headers['sec-fetch-mode']
  delete headers['sec-fetch-dest']
  delete headers['sec-fetch-user']

  const requestHost = (getRequestHeader(event, 'host') || '').split(':')[0]
  const isHttps = getRequestURL(event).protocol === 'https:'

  return proxyRequest(event, target, {
    streamRequest: true,
    headers,
    cookieDomainRewrite: requestHost ? { '*': requestHost } : undefined,
    cookiePathRewrite: { '*': '/' },
    onResponse: (event) => {
      if (process.env.NODE_ENV !== 'production') {
        event.node.res.setHeader('x-synthema-proxy-target', target)
        event.node.res.setHeader('x-synthema-proxy-method', String(event.method || ''))
      }
      if (isHttps) return

      const current = event.node.res.getHeader('set-cookie')
      const cookies = Array.isArray(current) ? current.map(String) : typeof current === 'string' ? [current] : []

      if (cookies.length === 0) return

      event.node.res.setHeader('set-cookie', stripSecureAttribute(cookies))
    },
  })
})
