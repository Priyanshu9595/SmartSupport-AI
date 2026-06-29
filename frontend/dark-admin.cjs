const fs = require('fs');
const path = require('path');

const adminFiles = [
  'src/layouts/AdminLayout.jsx',
  'src/components/AdminNavbar.jsx',
  'src/components/AdminSidebar.jsx',
  'src/pages/DashboardHome.jsx',
  'src/pages/ChatbotAdmin.jsx',
  'src/pages/Tickets.jsx',
  'src/pages/KnowledgeBase.jsx',
  'src/pages/Leads.jsx',
  'src/pages/Appointments.jsx',
  'src/pages/Settings.jsx'
];

adminFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (fs.existsSync(filePath)) {
    let code = fs.readFileSync(filePath, 'utf8');
    
    // Core Backgrounds
    code = code.replace(/bg-slate-50/g, 'bg-slate-950');
    code = code.replace(/bg-white/g, 'bg-slate-900');
    code = code.replace(/bg-slate-100/g, 'bg-slate-800');
    
    // Core Text Colors
    code = code.replace(/text-slate-900/g, 'text-white');
    code = code.replace(/text-slate-800/g, 'text-slate-100');
    code = code.replace(/text-slate-700/g, 'text-slate-200');
    code = code.replace(/text-slate-600/g, 'text-slate-300');
    code = code.replace(/text-slate-500/g, 'text-slate-400');
    
    // Core Borders
    code = code.replace(/border-slate-200/g, 'border-slate-800');
    code = code.replace(/border-slate-100/g, 'border-slate-800');
    code = code.replace(/border-slate-300/g, 'border-slate-700');
    
    // Hover states
    code = code.replace(/hover:bg-slate-50/g, 'hover:bg-slate-800');
    code = code.replace(/hover:bg-slate-100/g, 'hover:bg-slate-800');
    code = code.replace(/hover:text-slate-900/g, 'hover:text-white');
    code = code.replace(/hover:text-slate-700/g, 'hover:text-slate-200');
    
    // Sidebar specific fixes
    code = code.replace(/bg-blue-50 text-blue-700/g, 'bg-blue-900\/40 text-blue-400');
    
    fs.writeFileSync(filePath, code);
    console.log('Applied dark mode to ' + file);
  } else {
    console.log('File not found: ' + file);
  }
});
