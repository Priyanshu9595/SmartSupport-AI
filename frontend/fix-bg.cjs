const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'src', 'pages');
const glob = fs.readdirSync(pagesDir).filter(f => f.endsWith('.jsx'));

glob.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let code = fs.readFileSync(filePath, 'utf8');
  let newCode = code.replace(/<section className="([^"]*)bg-slate-900([^"]*)"/g, '<section className="$1bg-transparent$2"');
  if (code !== newCode) {
    fs.writeFileSync(filePath, newCode);
    console.log('Fixed alternating section backgrounds in ' + file);
  }
});
