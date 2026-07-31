import React, { useState } from 'react';
import { faqs } from '../constants/faqs';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const PublicKB = () => {
  const { user } = useAuth();
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const filteredArticles = faqs.filter(a => 
    a.question.toLowerCase().includes(search.toLowerCase()) || 
    a.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-bg-app flex flex-col font-sans">
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8">
        <div className="text-center mb-12">
          {!user && <h1 className="text-3xl font-bold text-text-primary mb-4 tracking-tight">How can we help?</h1>}
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-3.5 text-text-muted" size={20} />
            <input 
              type="text" 
              placeholder="Search for answers..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-border-strong shadow-sm bg-surface focus:ring-3 focus:ring-brand-600/12 focus:border-brand-600 outline-none text-[15px] transition-all text-text-primary placeholder:text-text-muted"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredArticles.length === 0 ? (
            <div className="text-center text-text-secondary py-8 bg-surface rounded-2xl border border-border shadow-sm text-[14px]">
              No articles found matching "{search}".
            </div>
          ) : (
            filteredArticles.map((article, index) => (
              <div 
                key={index} 
                className="bg-surface hover:bg-subtle rounded-xl px-6 py-5 border border-border transition-all duration-200 cursor-pointer shadow-sm"
                onClick={() => setExpandedId(expandedId === index ? null : index)}
              >
                <h3 className="text-[15px] md:text-[16px] font-semibold text-text-primary flex justify-between items-center">
                  {article.question}
                  <ChevronDown className={`transition-transform duration-300 shrink-0 ml-4 ${expandedId === index ? 'rotate-180 text-brand-600' : 'text-text-muted'}`} size={20} />
                </h3>
                <div className={`overflow-hidden transition-all duration-300 ${expandedId === index ? 'max-h-96 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-text-secondary text-[14px] md:text-[15px] leading-relaxed">{article.answer}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default PublicKB;
