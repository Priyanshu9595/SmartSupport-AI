import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Users, Phone, Mail, FileText, CheckCircle, Clock, XCircle, Search, Filter, Download, Plus, MessageSquare } from 'lucide-react';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const { data } = await api.get('/leads');
      setLeads(data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/leads/${id}`, { status });
      setLeads(leads.map(l => l._id === id ? { ...l, status } : l));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleAddNote = async (id, currentNote) => {
    const note = prompt('Enter note for this lead:', currentNote || '');
    if (note === null) return;
    try {
      await api.put(`/leads/${id}`, { notes: note });
      setLeads(leads.map(l => l._id === id ? { ...l, notes: note } : l));
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Interest', 'Status', 'Date', 'Notes'];
    const csvData = leads.map(l => [
      l.name, l.email, l.phone || '', l.interestedService || '', l.status, new Date(l.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' }), l.notes || ''
    ]);
    
    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'leads_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'New': return <span className="px-2.5 py-1 bg-brand-50 text-brand-600 text-[11px] font-semibold rounded-md border border-brand-200 flex items-center w-max uppercase tracking-wider"><Clock size={12} className="mr-1.5"/> New</span>;
      case 'Contacted': return <span className="px-2.5 py-1 bg-warning-bg text-warning-text text-[11px] font-semibold rounded-md border border-warning-text/20 flex items-center w-max uppercase tracking-wider"><MessageSquare size={12} className="mr-1.5"/> Contacted</span>;
      case 'Interested': return <span className="px-2.5 py-1 bg-brand-50 text-brand-600 text-[11px] font-semibold rounded-md border border-brand-200 flex items-center w-max uppercase tracking-wider"><FileText size={12} className="mr-1.5"/> Interested</span>;
      case 'Converted': return <span className="px-2.5 py-1 bg-success-bg text-success-text text-[11px] font-semibold rounded-md border border-success-text/20 flex items-center w-max uppercase tracking-wider"><CheckCircle size={12} className="mr-1.5"/> Converted</span>;
      case 'Not Interested': return <span className="px-2.5 py-1 bg-subtle text-text-secondary text-[11px] font-semibold rounded-md border border-border flex items-center w-max uppercase tracking-wider"><XCircle size={12} className="mr-1.5"/> Not Interested</span>;
      default: return <span className="px-2.5 py-1 bg-subtle text-text-secondary text-[11px] font-semibold rounded-md border border-border flex items-center w-max uppercase tracking-wider">{status}</span>;
    }
  };

  if (loading) return (
    <div className="flex h-full items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="flex flex-col max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">Lead Management</h2>
          <p className="text-[14px] text-text-secondary mt-1">Track and convert potential customers captured by the AI.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleExportCSV} className="bg-surface text-text-primary px-4 py-2 rounded-lg font-medium flex items-center border border-border shadow-sm hover:bg-subtle transition group text-[13px]">
            <Download size={16} className="mr-2 group-hover:-translate-y-0.5 transition-transform text-success-text" />
            Export CSV
          </button>
          <div className="bg-surface text-text-primary px-4 py-2 rounded-lg font-medium flex items-center border border-border shadow-sm text-[13px]">
            <Users size={18} className="mr-2 text-brand-600" />
            {leads.length} Total Leads
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input 
            type="text" 
            placeholder="Search leads by name, email, or phone..." 
            className="w-full pl-9 pr-4 py-2 bg-surface border border-border-strong rounded-lg focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 outline-none shadow-sm transition text-[13px] text-text-primary placeholder:text-text-muted"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <select 
            className="pl-9 pr-8 py-2 bg-surface border border-border-strong rounded-lg outline-none shadow-sm font-medium text-text-primary text-[13px] appearance-none focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Interested">Interested</option>
            <option value="Converted">Converted</option>
            <option value="Not Interested">Not Interested</option>
          </select>
        </div>
      </div>

      <div className="bg-surface rounded-xl border border-border shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-border">
            <thead className="bg-subtle sticky top-0 z-10 backdrop-blur-sm">
              <tr>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Interest</th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Notes</th>
                <th className="px-6 py-3 text-right text-[12px] font-semibold text-text-secondary uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-surface divide-y divide-border">
              {leads
                .filter(l => statusFilter === 'All' || l.status === statusFilter)
                .filter(l => 
                  (l.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                  (l.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                  (l.phone || '').includes(searchQuery)
                ).length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center text-text-secondary">
                      <Users size={48} className="mb-4 opacity-20" />
                      <p className="text-[14px] font-semibold text-text-primary">No leads found.</p>
                      <p className="text-[12px]">Try adjusting your search or filters.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                leads
                  .filter(l => statusFilter === 'All' || l.status === statusFilter)
                  .filter(l => 
                    (l.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                    (l.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                    (l.phone || '').includes(searchQuery)
                  ).map(lead => (
                  <tr key={lead._id} className="hover:bg-subtle transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-brand-50 border border-brand-100 rounded-xl flex items-center justify-center text-brand-600 font-bold text-[14px]">
                          {lead.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-3">
                          <div className="text-[13px] font-semibold text-text-primary">{lead.name}</div>
                          <div className="text-[12px] font-medium text-text-secondary flex items-center mt-0.5 hover:text-brand-600 cursor-pointer"><Mail size={12} className="mr-1.5"/> {lead.email}</div>
                          {lead.phone && <div className="text-[12px] font-medium text-text-secondary flex items-center mt-0.5"><Phone size={12} className="mr-1.5"/> {lead.phone}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-[12px] font-semibold text-text-primary bg-subtle px-3 py-1.5 rounded-lg border border-border w-max shadow-sm">
                        <FileText size={14} className="text-text-muted mr-1.5" />
                        {lead.interestedService || 'General Inquiry'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-[13px] font-medium text-text-secondary">
                      {new Date(lead.createdAt).toLocaleDateString('en-IN', { timeZone: 'Asia/Kolkata' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[13px] text-text-secondary max-w-xs truncate" title={lead.notes}>
                        {lead.notes || <span className="text-text-muted italic">No notes</span>}
                      </div>
                      <button 
                        onClick={() => handleAddNote(lead._id, lead.notes)}
                        className="text-[11px] font-semibold text-brand-600 hover:text-brand-700 mt-1 uppercase tracking-wider"
                      >
                        {lead.notes ? 'Edit Note' : '+ Add Note'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-[13px] font-medium">
                      <select 
                        value={lead.status}
                        onChange={(e) => updateStatus(lead._id, e.target.value)}
                        className="bg-surface border border-border-strong text-text-primary text-[12px] rounded-lg focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 block px-2.5 py-1.5 font-medium cursor-pointer outline-none transition-all shadow-sm ml-auto"
                      >
                        <option value="New">Mark New</option>
                        <option value="Contacted">Mark Contacted</option>
                        <option value="Interested">Mark Interested</option>
                        <option value="Converted">Mark Converted</option>
                        <option value="Not Interested">Mark Not Interested</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leads;
