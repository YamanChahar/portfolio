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
})
