import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Building2, Bell, Shield, MessageSquare, Save, Check } from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="h-full flex flex-col max-w-6xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Settings</h2>
        <p className="text-slate-500 mt-2">Manage your account settings and business preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 flex-1">
        
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col space-y-1">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all ${activeTab === 'profile' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <User size={18} className={`mr-3 ${activeTab === 'profile' ? 'text-blue-600' : 'text-slate-400'}`} />
              My Profile
            </button>
            <button 
              onClick={() => setActiveTab('business')}
              className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all ${activeTab === 'business' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Building2 size={18} className={`mr-3 ${activeTab === 'business' ? 'text-blue-600' : 'text-slate-400'}`} />
              Business Info
            </button>
            <button 
              onClick={() => setActiveTab('chatbot')}
              className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all ${activeTab === 'chatbot' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <MessageSquare size={18} className={`mr-3 ${activeTab === 'chatbot' ? 'text-blue-600' : 'text-slate-400'}`} />
              Chatbot Config
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all ${activeTab === 'notifications' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Bell size={18} className={`mr-3 ${activeTab === 'notifications' ? 'text-blue-600' : 'text-slate-400'}`} />
              Notifications
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all ${activeTab === 'security' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
            >
              <Shield size={18} className={`mr-3 ${activeTab === 'security' ? 'text-blue-600' : 'text-slate-400'}`} />
              Security
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSave}>
              
              {activeTab === 'profile' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Profile Information</h3>
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="h-20 w-20 rounded-full bg-indigo-100 border-4 border-white shadow flex items-center justify-center text-indigo-700 text-2xl font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                    </div>
                    <div>
                      <button type="button" className="bg-white border border-slate-300 text-slate-700 px-4 py-2 rounded-lg text-sm font-semibold shadow-sm hover:bg-slate-50 transition">
                        Change Avatar
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name</label>
                      <input type="text" defaultValue={user?.name || ''} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                      <input type="email" defaultValue={user?.email || ''} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 cursor-not-allowed outline-none text-slate-500" disabled />
                      <p className="text-xs text-slate-400 mt-1">Email cannot be changed.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'business' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Business Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Company Name</label>
                      <input type="text" defaultValue="SmartSupport AI" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Support Email</label>
                      <input type="email" defaultValue="support@supportflow.ai" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Website URL</label>
                      <input type="url" defaultValue="https://www.supportflow.ai" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'chatbot' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Chatbot Configuration</h3>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Bot Name</label>
                    <input type="text" defaultValue="Support AI" className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Welcome Message</label>
                    <textarea defaultValue="Hi! How can I help you today?" rows={3} className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Theme Color</label>
                    <div className="flex items-center space-x-3">
                      <input type="color" defaultValue="#2563eb" className="h-10 w-10 rounded border border-slate-300 cursor-pointer" />
                      <span className="text-sm text-slate-500">Primary brand color for chat widget</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <label className="flex items-start cursor-pointer group">
                      <div className="flex items-center h-5 mt-0.5">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500" />
                      </div>
                      <div className="ml-3 text-sm">
                        <span className="font-bold text-slate-800 group-hover:text-blue-600 transition">New Ticket Alerts</span>
                        <p className="text-slate-500 mt-0.5">Receive an email when a new support ticket is created.</p>
                      </div>
                    </label>
                    <label className="flex items-start cursor-pointer group">
                      <div className="flex items-center h-5 mt-0.5">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500" />
                      </div>
                      <div className="ml-3 text-sm">
                        <span className="font-bold text-slate-800 group-hover:text-blue-600 transition">New Lead Captured</span>
                        <p className="text-slate-500 mt-0.5">Get notified instantly when the AI captures a new sales lead.</p>
                      </div>
                    </label>
                    <label className="flex items-start cursor-pointer group">
                      <div className="flex items-center h-5 mt-0.5">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-blue-600 bg-slate-100 border-slate-300 rounded focus:ring-blue-500" />
                      </div>
                      <div className="ml-3 text-sm">
                        <span className="font-bold text-slate-800 group-hover:text-blue-600 transition">Daily Summary Report</span>
                        <p className="text-slate-500 mt-0.5">Receive a daily email summarizing all bot activities and metrics.</p>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h3 className="text-xl font-bold text-slate-800 border-b border-slate-100 pb-4">Security</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full max-w-md px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-slate-700 mb-2">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full max-w-md px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition" />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-end">
                <button 
                  type="submit" 
                  className={`flex items-center px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-all ${saved ? 'bg-green-600 hover:bg-green-700 text-white shadow-green-200' : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'}`}
                >
                  {saved ? (
                    <><Check size={18} className="mr-2" /> Saved Successfully</>
                  ) : (
                    <><Save size={18} className="mr-2" /> Save Changes</>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Settings;
