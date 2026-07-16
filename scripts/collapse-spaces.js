const fs = require('fs')
const path = require('path')

const root = process.cwd()
const exts = new Set(['.js', '.jsx', '.mjs', '.ts', '.tsx', '.json', '.md', '.html'])
const excludeDirs = new Set(['.next', 'node_modules', '.git'])

function walk(dir) {
 for (const name of fs.readdirSync(dir)) {
 const full = path.join(dir, name)
 const stat = fs.statSync(full)
 if (stat.isDirectory()) {
 if (excludeDirs.has(name)) continue
 walk(full)
 continue
 }
 const ext = path.extname(name)
 if (!exts.has(ext)) continue
 try {
 let s = fs.readFileSync(full, 'utf8')
 const before = s
 // Collapse runs of two or more spaces into a single space
 s = s.replace(/ {2,}/g, ' ')
 if (s !== before) {
 fs.writeFileSync(full, s, 'utf8')
 console.log('Collapsed spaces in', full)
 }
 } catch (err) {
 console.error('skip', full, err.message)
 }
 }
}

walk(root)
console.log('Done collapsing spaces.')
