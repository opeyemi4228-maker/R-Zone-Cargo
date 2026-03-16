const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const exts = new Set(['.js', '.jsx', '.ts', '.tsx']);
const regex = /text-white\/(?:[0-9]|[1-3][0-9])\b/g;

let totalReplacements = 0;

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      walk(full);
      continue;
    }

    if (!exts.has(path.extname(entry.name))) continue;

    let content = fs.readFileSync(full, 'utf8');
    const matches = content.match(regex);
    if (!matches) continue;

    const before = content;
    content = content.replace(regex, 'text-white/40');
    if (content !== before) {
      fs.writeFileSync(full, content, 'utf8');
      totalReplacements += matches.length;
      console.log(`Updated ${full} (${matches.length} replacements)`);
    }
  }
}

walk(root);
console.log(`Done. Total replacements: ${totalReplacements}`);
