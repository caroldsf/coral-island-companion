import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const dist = resolve('dist')
const index = await readFile(resolve(dist, 'index.html'), 'utf8')
const scriptTag = index.match(/<script type="module"[^>]*src="([^"]+)"[^>]*><\/script>/)
const styleTag = index.match(/<link rel="stylesheet"[^>]*href="([^"]+)"[^>]*>/)

if (!scriptTag || !styleTag) throw new Error('Arquivos do Vite ausentes no HTML compilado')

const [script, style] = await Promise.all([
  readFile(resolve(dist, scriptTag[1]), 'utf8'),
  readFile(resolve(dist, styleTag[1]), 'utf8'),
])

const standalone = index
  .replace(scriptTag[0], () => '<script type="module">' + script.replace(/<\/script/gi, '<\\/script') + '</script>')
  .replace(styleTag[0], () => '<style>' + style + '</style>')

await writeFile('index.html', standalone)
