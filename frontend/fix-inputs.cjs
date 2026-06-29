const fs = require('fs');
const path = require('path');

const pages = [
  'Login.jsx',
  'Register.jsx',
  'Contact.jsx',
  'CustomerTicketForm.jsx',
  'BookAppointment.jsx'
];

const pagesDir = path.join(__dirname, 'src', 'pages');

pages.forEach(file => {
  const filePath = path.join(pagesDir, file);
  if (fs.existsSync(filePath)) {
    let code = fs.readFileSync(filePath, 'utf8');
    
    // Fix inputs, textareas, and selects
    code = code.replace(/border-slate-300/g, 'border-slate-700 bg-slate-800 text-white placeholder-slate-400');
    // Also if there's any stray bg-white on inputs
    
    fs.writeFileSync(filePath, code);
    console.log('Fixed inputs in ' + file);
  }
});
