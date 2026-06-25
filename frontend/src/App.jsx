import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import LandingPage from './pages/LandingPage';
import CustomerTicketForm from './pages/CustomerTicketForm';
import PublicKB from './pages/PublicKB';
import BookAppointment from './pages/BookAppointment';
import Features from './pages/Features';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardHome from './pages/DashboardHome';
import CustomerDashboard from './pages/CustomerDashboard';
import Tickets from './pages/Tickets';
import KnowledgeBase from './pages/KnowledgeBase';
import Leads from './pages/Leads';
import Appointments from './pages/Appointments';
import ChatbotAdmin from './pages/ChatbotAdmin';
import Settings from './pages/Settings';
import GlobalBackground from './components/GlobalBackground';

function App() {
  return (
    <AuthProvider>
      <GlobalBackground />
      <Router>
        <div className="relative z-0 min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/services" element={<Features />} />
              <Route path="/inquiry" element={<Contact />} />
              <Route path="/help" element={<PublicKB />} />
              <Route path="/submit-ticket" element={<CustomerTicketForm />} />
              <Route path="/book-demo" element={<BookAppointment />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Route>

            {/* Protected Customer Route */}
            <Route element={<ProtectedRoute allowedRoles={['Customer', 'Admin', 'Support Agent']} />}>
              <Route path="/my-profile" element={<CustomerDashboard />} />
            </Route>

            {/* Protected Routes (Admin/Agent) */}
            <Route element={<ProtectedRoute allowedRoles={['Admin', 'Support Agent']} />}>
              <Route path="/dashboard" element={<AdminLayout />}>
                <Route index element={<DashboardHome />} />
                {/* Other routes will be added here */}
                <Route path="tickets" element={<Tickets />} />
                <Route path="kb" element={<KnowledgeBase />} />
                <Route path="leads" element={<Leads />} />
                <Route path="appointments" element={<Appointments />} />
                <Route path="chatbot" element={<ChatbotAdmin />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;


