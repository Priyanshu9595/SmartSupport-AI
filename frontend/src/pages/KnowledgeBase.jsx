import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Book, Edit3, Trash2, CheckCircle, XCircle, Search, Filter, Plus, FileText, Sparkles } from 'lucide-react';

const KnowledgeBase = () => {
  const [activeTab, setActiveTab] = useState('published'); // 'published' | 'drafts'
  const [articles, setArticles] = useState([]);
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'published') {
        const { data } = await api.get('/kb?status=published');
        setArticles(data);
      } else {
        const [faqRes, kbRes] = await Promise.all([
          api.get('/faq-suggestions'),
          api.get('/kb?status=draft')
        ]);
        const pendingFaqs = faqRes.data.filter(d => d.status === 'pending');
        const kbDrafts = kbRes.data.map(kb => ({
          _id: kb._id,
          suggestedQuestion: kb.question,
          suggestedAnswer: kb.answer,
          isKbDraft: true
        }));
        setDrafts([...pendingFaqs, ...kbDrafts]);
      }
    } catch (error) {
      console.error('Error fetching KB data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (draft) => {
    try {
      if (draft.isKbDraft) {
        if (!draft.suggestedAnswer || draft.suggestedAnswer === 'Pending Admin Answer') {
          alert('Please write an answer before publishing.');
          return;
        }
        await api.put(`/kb/${draft._id}`, { status: 'published', answer: draft.suggestedAnswer });
      } else {
        // If it's an FAQ suggestion, they might have edited it too, so update it first if needed, 
        // but for simplicity we can just approve it. 
        // To be thorough, let's update the suggestion first if it was edited.
        await api.post(`/faq-suggestions/${draft._id}/approve`, { suggestedAnswer: draft.suggestedAnswer });
      }
      setDrafts(drafts.filter(d => d._id !== draft._id));
      alert('Draft approved and published to Knowledge Base.');
    } catch (error) {
      console.error('Error approving draft:', error);
    }
  };

  const handleReject = async (draft) => {
    try {
      if (draft.isKbDraft) {
        await api.delete(`/kb/${draft._id}`);
      } else {
        await api.post(`/faq-suggestions/${draft._id}/reject`);
      }
      setDrafts(drafts.filter(d => d._id !== draft._id));
    } catch (error) {
      console.error('Error rejecting draft:', error);
    }
  };

  const handleAddFaq = async () => {
    const q = prompt('Enter FAQ Question:');
    if (!q) return;
    const a = prompt('Enter FAQ Answer:');
    if (!a) return;
    const c = prompt('Enter Category (e.g., General, Billing, Technical):', 'General');
    
    try {
      const { data } = await api.post('/kb', {
        title: q,
        question: q,
        answer: a,
        category: c || 'General',
        status: 'published'
      });
      setArticles([data, ...articles]);
    } catch (error) {
      console.error('Error adding FAQ:', error);
    }
  };

  const handleDeleteFaq = async (id) => {
    if(!window.confirm('Are you sure you want to delete this FAQ?')) return;
    try {
      await api.delete(`/kb/${id}`);
      setArticles(articles.filter(a => a._id !== id));
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  return (
    <div className="flex flex-col max-w-7xl mx-auto w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-text-primary tracking-tight">Knowledge Base</h2>
          <p className="text-[14px] text-text-secondary mt-1">Manage your public FAQ articles and AI-generated drafts.</p>
        </div>
        
        <div className="bg-subtle p-1.5 rounded-xl border border-border inline-flex shadow-sm w-max">
          <button 
            onClick={() => setActiveTab('published')} 
            className={`px-4 py-2 text-[13px] font-semibold rounded-lg transition-all flex items-center ${activeTab === 'published' ? 'bg-surface text-brand-700 shadow-sm border border-border-strong' : 'text-text-secondary hover:text-text-primary'}`}
          >
            <Book size={16} className="mr-2" />
            Published Articles
          </button>
          <button 
            onClick={() => setActiveTab('drafts')} 
            className={`px-4 py-2 text-[13px] font-semibold rounded-lg transition-all flex items-center ml-1 ${activeTab === 'drafts' ? 'bg-surface text-warning-text shadow-sm border border-border-strong' : 'text-text-secondary hover:text-text-primary'}`}
          >
            <Sparkles size={16} className="mr-2" />
            AI Drafts 
            {activeTab !== 'drafts' && drafts.length > 0 && <span className="ml-2 bg-warning-text text-white text-[10px] px-2 py-0.5 rounded-full font-bold">{drafts.length}</span>}
          </button>
        </div>
      </div>

      {activeTab === 'published' && (
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <div className="flex-1 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <input 
                type="text" 
                placeholder="Search FAQs..." 
                className="w-full pl-10 pr-4 py-2 bg-surface border border-border-strong rounded-xl focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 outline-none shadow-sm transition text-[13px] text-text-primary placeholder:text-text-muted"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
              <select 
                className="pl-9 pr-8 py-2 bg-surface border border-border-strong rounded-xl outline-none shadow-sm font-semibold text-text-primary text-[13px] appearance-none focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="All">All Categories</option>
                {Array.from(new Set(articles.map(a => a.category))).map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>
          <button onClick={handleAddFaq} className="bg-brand-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-brand-700 shadow-sm hover:shadow-md transition-all flex items-center group text-[13px]">
            <Plus size={18} className="mr-2 group-hover:scale-110 transition-transform" /> Add FAQ
          </button>
        </div>
      )}

      <div className="bg-surface rounded-2xl shadow-sm border border-border">
        {loading ? (
          <div className="flex h-full items-center justify-center py-12">
             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-600"></div>
          </div>
        ) : activeTab === 'published' ? (
          <div className="p-6 bg-bg-app rounded-b-2xl">
            {articles.length === 0 ? (
              <div className="text-center py-20 text-text-secondary flex flex-col items-center">
                <Book size={64} className="mb-4 opacity-20" />
                <p className="text-[14px] font-bold text-text-primary">No published articles yet.</p>
                <p className="text-text-secondary text-[13px] mt-1">Add your first FAQ to help customers find answers faster.</p>
                <button onClick={handleAddFaq} className="mt-6 text-brand-600 font-bold bg-brand-50 px-4 py-2 rounded-lg hover:bg-brand-100 transition text-[13px]">Create First FAQ</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles
                  .filter(a => categoryFilter === 'All' || a.category === categoryFilter)
                  .filter(a => a.question.toLowerCase().includes(searchQuery.toLowerCase()) || a.answer.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map(article => (
                  <div key={article._id} className="p-6 bg-surface border border-border rounded-2xl hover:border-brand-300 hover:shadow-md transition-all group flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <span className="text-[11px] font-bold text-brand-700 bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-lg mr-3 inline-block mb-3 uppercase tracking-wider">{article.category}</span>
                        <h3 className="font-bold text-text-primary text-[15px] leading-tight">{article.question}</h3>
                      </div>
                      <div className="flex space-x-2 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => handleDeleteFaq(article._id)} className="hover:text-danger-text hover:bg-danger-bg p-2 rounded-lg transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <div className="h-px w-full bg-border mb-4"></div>
                      <p className="text-[13px] text-text-secondary leading-relaxed bg-subtle p-4 rounded-xl border border-border">{article.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="p-6 bg-warning-bg/30 rounded-b-2xl">
            <div className="mb-6 bg-warning-bg border border-warning-text/20 p-4 rounded-2xl flex items-start space-x-4 shadow-sm">
               <div className="p-3 bg-white rounded-xl text-warning-text border border-warning-text/10 shadow-sm">
                  <Sparkles size={24} />
               </div>
               <div>
                  <h4 className="font-bold text-text-primary mb-1 text-[14px]">AI Auto-Drafts</h4>
                  <p className="text-[13px] text-text-secondary">These FAQs were automatically generated by our AI from recently resolved support tickets. Review, approve, or reject them to keep your knowledge base up to date automatically.</p>
               </div>
            </div>
            {drafts.length === 0 ? (
              <div className="text-center py-20 text-text-secondary flex flex-col items-center">
                <CheckCircle size={64} className="mb-4 text-success-text opacity-50" />
                <p className="text-[14px] font-bold text-text-primary">All caught up!</p>
                <p className="text-[13px] mt-1">No pending AI drafts. Resolve more tickets to generate new suggestions.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {drafts.map(draft => (
                  <div key={draft._id} className="p-6 bg-surface border-2 border-warning-text/20 rounded-2xl shadow-sm hover:shadow-md hover:border-warning-text/40 transition-all flex flex-col relative group">
                    <div className="absolute -top-3 -right-3 text-[11px] font-extrabold text-warning-text bg-white border-2 border-warning-text/20 px-3 py-1 rounded-xl shadow-sm uppercase tracking-wider">
                      AI Draft
                    </div>
                    <div className="mb-6 pt-2">
                      <div className="flex items-start mb-4 space-x-3">
                         <div className="mt-1 text-text-muted"><FileText size={18} /></div>
                         <h3 className="font-bold text-text-primary text-[14px] leading-tight">{draft.suggestedQuestion}</h3>
                      </div>
                      <textarea 
                        className="w-full text-[13px] text-text-primary bg-subtle p-4 rounded-xl border border-border focus:border-brand-400 focus:ring-3 focus:ring-brand-600/12 outline-none leading-relaxed transition-all resize-y min-h-[100px] placeholder:text-text-muted"
                        placeholder="Write the answer here..."
                        value={draft.suggestedAnswer === 'Pending Admin Answer' ? '' : draft.suggestedAnswer}
                        onChange={(e) => {
                          const newDrafts = drafts.map(d => 
                            d._id === draft._id ? { ...d, suggestedAnswer: e.target.value } : d
                          );
                          setDrafts(newDrafts);
                        }}
                      />
                    </div>
                    <div className="mt-auto flex justify-end space-x-3 pt-4 border-t border-border opacity-80 group-hover:opacity-100 transition-opacity">
                      <button onClick={() => handleReject(draft)} className="flex items-center text-[12px] font-bold text-text-secondary hover:text-danger-text transition px-4 py-2 rounded-xl hover:bg-danger-bg border border-transparent hover:border-danger-text/20">
                        <XCircle size={16} className="mr-2" /> Reject
                      </button>
                      <button onClick={() => handleApprove(draft)} className="flex items-center text-[12px] font-bold text-white bg-success-text hover:opacity-90 transition px-5 py-2 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5">
                        <CheckCircle size={16} className="mr-2" /> {draft.isKbDraft ? 'Answer & Publish' : 'Approve'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default KnowledgeBase;
