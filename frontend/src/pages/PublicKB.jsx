import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import ChatbotWidget from '../components/ChatbotWidget';

const PublicKB = () => {
  const [articles, setArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data } = await api.get('/kb/public');
      setArticles(data);
    } catch (error) {
      console.error('Error fetching KB:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredArticles = articles.filter(a => 
    a.question.toLowerCase().includes(search.toLowerCase()) || 
    a.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans">
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">How can we help?</h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search for answers..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-white/50 shadow-md bg-white/70 backdrop-blur-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none text-lg transition-all"
            />
          </div>
        </div>

        {loading ? (
          <div className="text-center text-slate-500">Loading articles...</div>
        ) : (
          <div className="space-y-4">
            {filteredArticles.length === 0 ? (
              <div className="text-center text-slate-500 py-8 bg-white/60 backdrop-blur-xl rounded-2xl border border-white/50 shadow-md">
                No articles found matching "{search}".
              </div>
            ) : (
              filteredArticles.map(article => (
                <div key={article._id} className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-md border border-white/50 overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <button 
                    onClick={() => setExpandedId(expandedId === article._id ? null : article._id)}
                    className="w-full px-6 py-4 flex justify-between items-center focus:outline-none hover:bg-white/40 transition-colors"
                  >
                    <span className="font-semibold text-slate-800 text-left">{article.question}</span>
                    {expandedId === article._id ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
                  </button>
                  {expandedId === article._id && (
                    <div className="px-6 pb-4 pt-2 border-t border-slate-100 text-slate-600 leading-relaxed">
                      {article.answer}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default PublicKB;
