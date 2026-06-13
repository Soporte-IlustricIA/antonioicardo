import sharp from 'sharp'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const input  = join(__dirname, '../public/assets/favicon.png')
const output = join(__dirname, '../public/favicon-square.png')

await sharp(input)
  .resize(512, 512, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 }
  })
  .png()
  .toFile(output)

console.log('favicon-square.png generado correctamente')
