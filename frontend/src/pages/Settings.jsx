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
    <div className="flex flex-col max-w-6xl mx-auto w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-text-primary tracking-tight">Settings</h2>
        <p className="text-[14px] text-text-secondary mt-1">Manage your account settings and business preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 flex-1">
        
        {/* Settings Sidebar */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="flex flex-col space-y-1">
            <button 
              onClick={() => setActiveTab('profile')}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${activeTab === 'profile' ? 'bg-brand-50 text-brand-600' : 'text-text-secondary hover:bg-subtle hover:text-text-primary'}`}
            >
              <User size={18} className={`mr-3 ${activeTab === 'profile' ? 'text-brand-600' : 'text-text-muted'}`} />
              My Profile
            </button>
            <button 
              onClick={() => setActiveTab('business')}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${activeTab === 'business' ? 'bg-brand-50 text-brand-600' : 'text-text-secondary hover:bg-subtle hover:text-text-primary'}`}
            >
              <Building2 size={18} className={`mr-3 ${activeTab === 'business' ? 'text-brand-600' : 'text-text-muted'}`} />
              Business Info
            </button>
            <button 
              onClick={() => setActiveTab('chatbot')}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${activeTab === 'chatbot' ? 'bg-brand-50 text-brand-600' : 'text-text-secondary hover:bg-subtle hover:text-text-primary'}`}
            >
              <MessageSquare size={18} className={`mr-3 ${activeTab === 'chatbot' ? 'text-brand-600' : 'text-text-muted'}`} />
              Chatbot Config
            </button>
            <button 
              onClick={() => setActiveTab('notifications')}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${activeTab === 'notifications' ? 'bg-brand-50 text-brand-600' : 'text-text-secondary hover:bg-subtle hover:text-text-primary'}`}
            >
              <Bell size={18} className={`mr-3 ${activeTab === 'notifications' ? 'text-brand-600' : 'text-text-muted'}`} />
              Notifications
            </button>
            <button 
              onClick={() => setActiveTab('security')}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all ${activeTab === 'security' ? 'bg-brand-50 text-brand-600' : 'text-text-secondary hover:bg-subtle hover:text-text-primary'}`}
            >
              <Shield size={18} className={`mr-3 ${activeTab === 'security' ? 'text-brand-600' : 'text-text-muted'}`} />
              Security
            </button>
          </nav>
        </div>

        {/* Settings Content */}
        <div className="flex-1 bg-surface rounded-xl shadow-sm border border-border overflow-hidden">
          <div className="p-8">
            <form onSubmit={handleSave}>
              
              {activeTab === 'profile' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h3 className="text-xl font-semibold text-text-primary border-b border-border pb-4">Profile Information</h3>
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="h-20 w-20 rounded-full bg-brand-50 border border-brand-50 shadow-sm flex items-center justify-center text-brand-600 text-2xl font-bold">
                      {user?.name?.charAt(0)?.toUpperCase() || 'A'}
                    </div>
                    <div>
                      <button type="button" className="bg-surface border border-border text-text-primary px-4 py-2 rounded-lg text-[13px] font-medium shadow-sm hover:bg-subtle transition">
                        Change Avatar
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[13px] font-medium text-text-primary mb-1">Full Name</label>
                      <input type="text" defaultValue={user?.name || ''} className="w-full px-3 py-2 rounded-lg border border-border-strong text-text-primary focus:border-brand-600 focus:ring-3 focus:ring-brand-600/12 outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-text-primary mb-1">Email Address</label>
                      <input type="email" defaultValue={user?.email || ''} className="w-full px-3 py-2 rounded-lg border border-border-strong bg-subtle text-text-muted cursor-not-allowed outline-none transition" disabled />
                      <p className="text-[12px] text-text-muted mt-1">Email cannot be changed.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'business' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h3 className="text-xl font-semibold text-text-primary border-b border-border pb-4">Business Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[13px] font-medium text-text-primary mb-1">Company Name</label>
                      <input type="text" defaultValue="SmartSupport AI" className="w-full px-3 py-2 rounded-lg border border-border-strong text-text-primary focus:border-brand-600 focus:ring-3 focus:ring-brand-600/12 outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-text-primary mb-1">Support Email</label>
                      <input type="email" defaultValue="support@supportflow.ai" className="w-full px-3 py-2 rounded-lg border border-border-strong text-text-primary focus:border-brand-600 focus:ring-3 focus:ring-brand-600/12 outline-none transition" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-[13px] font-medium text-text-primary mb-1">Website URL</label>
                      <input type="url" defaultValue="https://www.supportflow.ai" className="w-full px-3 py-2 rounded-lg border border-border-strong text-text-primary focus:border-brand-600 focus:ring-3 focus:ring-brand-600/12 outline-none transition" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'chatbot' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h3 className="text-xl font-semibold text-text-primary border-b border-border pb-4">Chatbot Configuration</h3>
                  <div>
                    <label className="block text-[13px] font-medium text-text-primary mb-1">Bot Name</label>
                    <input type="text" defaultValue="Support AI" className="w-full px-3 py-2 rounded-lg border border-border-strong text-text-primary focus:border-brand-600 focus:ring-3 focus:ring-brand-600/12 outline-none transition" />
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-text-primary mb-1">Welcome Message</label>
                    <textarea defaultValue="Hi! How can I help you today?" rows={3} className="w-full px-3 py-2 rounded-lg border border-border-strong text-text-primary focus:border-brand-600 focus:ring-3 focus:ring-brand-600/12 outline-none transition resize-none"></textarea>
                  </div>
                  <div>
                    <label className="block text-[13px] font-medium text-text-primary mb-1">Theme Color</label>
                    <div className="flex items-center space-x-3">
                      <input type="color" defaultValue="#2563eb" className="h-8 w-8 rounded border border-border-strong cursor-pointer" />
                      <span className="text-[13px] text-text-secondary">Primary brand color for chat widget</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h3 className="text-xl font-semibold text-text-primary border-b border-border pb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <label className="flex items-start cursor-pointer group">
                      <div className="flex items-center h-5 mt-0.5">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-600 bg-surface border-border-strong rounded focus:ring-brand-600" />
                      </div>
                      <div className="ml-3 text-sm">
                        <span className="font-medium text-text-primary group-hover:text-brand-600 transition">New Ticket Alerts</span>
                        <p className="text-[13px] text-text-secondary mt-0.5">Receive an email when a new support ticket is created.</p>
                      </div>
                    </label>
                    <label className="flex items-start cursor-pointer group">
                      <div className="flex items-center h-5 mt-0.5">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-600 bg-surface border-border-strong rounded focus:ring-brand-600" />
                      </div>
                      <div className="ml-3 text-sm">
                        <span className="font-medium text-text-primary group-hover:text-brand-600 transition">New Lead Captured</span>
                        <p className="text-[13px] text-text-secondary mt-0.5">Get notified instantly when the AI captures a new sales lead.</p>
                      </div>
                    </label>
                    <label className="flex items-start cursor-pointer group">
                      <div className="flex items-center h-5 mt-0.5">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-brand-600 bg-surface border-border-strong rounded focus:ring-brand-600" />
                      </div>
                      <div className="ml-3 text-sm">
                        <span className="font-medium text-text-primary group-hover:text-brand-600 transition">Daily Summary Report</span>
                        <p className="text-[13px] text-text-secondary mt-0.5">Receive a daily email summarizing all bot activities and metrics.</p>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <h3 className="text-xl font-semibold text-text-primary border-b border-border pb-4">Security</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[13px] font-medium text-text-primary mb-1">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full max-w-md px-3 py-2 rounded-lg border border-border-strong text-text-primary focus:border-brand-600 focus:ring-3 focus:ring-brand-600/12 outline-none transition" />
                    </div>
                    <div>
                      <label className="block text-[13px] font-medium text-text-primary mb-1">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full max-w-md px-3 py-2 rounded-lg border border-border-strong text-text-primary focus:border-brand-600 focus:ring-3 focus:ring-brand-600/12 outline-none transition" />
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-border flex justify-end">
                <button 
                  type="submit" 
                  className={`flex items-center px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${saved ? 'bg-success-text text-white' : 'bg-brand-600 hover:bg-brand-700 text-white shadow-sm'}`}
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
