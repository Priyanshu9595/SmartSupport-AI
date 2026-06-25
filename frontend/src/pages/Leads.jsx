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
      l.name, l.email, l.phone || '', l.interestedService || '', l.status, new Date(l.createdAt).toLocaleDateString(), l.notes || ''
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
      case 'New': return <span className="px-3 py-1.5 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100 flex items-center w-max"><Clock size={12} className="mr-1.5"/> New</span>;
      case 'Contacted': return <span className="px-3 py-1.5 bg-amber-50 text-amber-700 text-xs font-bold rounded-lg border border-amber-100 flex items-center w-max"><MessageSquare size={12} className="mr-1.5"/> Contacted</span>;
      case 'Interested': return <span className="px-3 py-1.5 bg-purple-50 text-purple-700 text-xs font-bold rounded-lg border border-purple-100 flex items-center w-max"><FileText size={12} className="mr-1.5"/> Interested</span>;
      case 'Converted': return <span className="px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-100 flex items-center w-max"><CheckCircle size={12} className="mr-1.5"/> Converted</span>;
      case 'Not Interested': return <span className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg border border-slate-200 flex items-center w-max"><XCircle size={12} className="mr-1.5"/> Not Interested</span>;
      default: return <span className="px-3 py-1.5 bg-gray-50 text-gray-700 text-xs font-bold rounded-lg border border-gray-200">{status}</span>;
    }
  };

  if (loading) return (
    <div className="flex h-full items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );

  return (
    <div className="h-full flex flex-col max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Lead Management</h2>
          <p className="text-slate-500 mt-2">Track and convert potential customers captured by the AI.</p>
        </div>
        <div className="flex gap-4">
          <button onClick={handleExportCSV} className="bg-white text-slate-700 px-5 py-3 rounded-xl font-bold flex items-center border border-slate-200 shadow-sm hover:bg-slate-50 transition group">
            <Download size={18} className="mr-2 group-hover:-translate-y-0.5 transition-transform text-emerald-600" />
            Export CSV
          </button>
          <div className="bg-white text-slate-700 px-5 py-3 rounded-xl font-bold flex items-center border border-slate-200 shadow-sm">
            <Users size={20} className="mr-3 text-indigo-600" />
            {leads.length} Total Leads
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search leads by name, email, or phone..." 
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none shadow-sm transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <select 
            className="pl-9 pr-8 py-3 bg-white border border-slate-200 rounded-xl outline-none shadow-sm font-semibold text-slate-700 appearance-none focus:ring-2 focus:ring-blue-500"
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

      <div className="flex-1 overflow-hidden bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col">
        <div className="overflow-x-auto flex-1">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50/80 sticky top-0 z-10 backdrop-blur-sm">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Interest</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-slate-500 uppercase tracking-wider">Notes</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-50">
              {leads
                .filter(l => statusFilter === 'All' || l.status === statusFilter)
                .filter(l => 
                  (l.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                  (l.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                  (l.phone || '').includes(searchQuery)
                ).length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center text-slate-400">
                      <Users size={48} className="mb-4 opacity-20" />
                      <p className="text-lg font-semibold text-slate-600">No leads found.</p>
                      <p className="text-sm">Try adjusting your search or filters.</p>
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
                  <tr key={lead._id} className="hover:bg-slate-50/80 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-indigo-50 border border-indigo-100 rounded-xl flex items-center justify-center text-indigo-700 font-bold text-lg">
                          {lead.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-bold text-slate-900">{lead.name}</div>
                          <div className="text-sm font-medium text-slate-500 flex items-center mt-1 hover:text-blue-600 cursor-pointer"><Mail size={12} className="mr-1.5"/> {lead.email}</div>
                          {lead.phone && <div className="text-sm font-medium text-slate-500 flex items-center mt-1"><Phone size={12} className="mr-1.5"/> {lead.phone}</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center text-sm font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100 w-max">
                        <FileText size={14} className="text-slate-400 mr-2" />
                        {lead.interestedService || 'General Inquiry'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-slate-600 max-w-xs truncate" title={lead.notes}>
                        {lead.notes || <span className="text-slate-400 italic">No notes</span>}
                      </div>
                      <button 
                        onClick={() => handleAddNote(lead._id, lead.notes)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-800 mt-1"
                      >
                        {lead.notes ? 'Edit Note' : '+ Add Note'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <select 
                        value={lead.status}
                        onChange={(e) => updateStatus(lead._id, e.target.value)}
                        className="bg-white border-2 border-slate-200 text-slate-800 text-xs rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 block px-3 py-1.5 font-bold cursor-pointer outline-none transition-all hover:border-slate-300 ml-auto"
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
