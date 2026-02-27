const fs = require('node:fs');

const files = ['package.json', 'client/package.json', 'server/package.json'];

for (const file of files) {
  const raw = fs.readFileSync(file, 'utf8');
  JSON.parse(raw);
}

console.log('package.json files are valid');
