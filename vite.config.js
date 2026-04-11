import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const siteUrl = (env.VITE_SITE_URL || '').replace(/\/+$/, '')

  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'html-og-absolute-urls',
        transformIndexHtml(html) {
          if (mode === 'production' && !siteUrl) {
            console.warn(
              '\n[wedding] Thiếu VITE_SITE_URL trong .env.production — Zalo/Facebook cần URL https đầy đủ cho og:image. Ví dụ: VITE_SITE_URL=https://ten-mien-cua-ban.com\n'
            )
          }
          const pageUrl = siteUrl ? `${siteUrl}/` : ''
          const imageUrl = siteUrl ? `${siteUrl}/preview.jpg` : '/preview.jpg'
          let out = html
            .replaceAll('__OG_PAGE_URL__', pageUrl)
            .replaceAll('__OG_IMAGE_URL__', imageUrl)
          if (!pageUrl) {
            out = out.replace(/<meta property="og:url"[^>]*>\s*/g, '')
            out = out.replace(/<link rel="canonical"[^>]*>\s*/g, '')
          }
          return out
        },
      },
    ],
  }
})
