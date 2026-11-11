import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'ensure-resume-casing',
      closeBundle() {
        const distDir = path.resolve(__dirname, 'dist')
        const lowercase = path.join(distDir, 'resume.pdf')
        const uppercase = path.join(distDir, 'Resume.pdf')
        try {
          if (fs.existsSync(lowercase) && !fs.existsSync(uppercase)) {
            fs.copyFileSync(lowercase, uppercase)
          } else if (fs.existsSync(uppercase) && !fs.existsSync(lowercase)) {
            fs.copyFileSync(uppercase, lowercase)
          }
        } catch (e) {
          console.warn('Resume copy notice:', e)
        }
      }
    }
  ],
  build: {
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three')) {
              return 'vendor-three'
            }
            if (id.includes('gsap')) {
              return 'vendor-gsap'
            }
            if (id.includes('framer-motion')) {
              return 'vendor-framer'
            }
            if (id.includes('react-icons')) {
              return 'vendor-icons'
            }
            if (id.includes('react') || id.includes('react-dom') || id.includes('scheduler')) {
              return 'vendor-react'
            }
          }
        }
      }
    }
  }
})
