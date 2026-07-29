import React, { useState } from 'react';
import { faqs } from '../constants/faqs';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

const PublicKB = () => {
  const [search, setSearch] = useState('');
  const [expandedId, setExpandedId] = useState(null);

  const filteredArticles = faqs.filter(a => 
    a.question.toLowerCase().includes(search.toLowerCase()) || 
    a.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-transparent flex flex-col font-sans">
      <main className="flex-1 max-w-4xl w-full mx-auto p-4 sm:p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">How can we help?</h1>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-3.5 text-slate-500" size={20} />
            <input 
              type="text" 
              placeholder="Search for answers..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-900 dark:border-white/50 shadow-md bg-slate-900/70 backdrop-blur-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none text-lg transition-all"
            />
          </div>
        </div>

        <div className="space-y-4">
          {filteredArticles.length === 0 ? (
            <div className="text-center text-slate-500 py-8 bg-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-900 dark:border-white/50 shadow-md">
              No articles found matching "{search}".
            </div>
          ) : (
            filteredArticles.map((article, index) => (
              <div 
                key={index} 
                className="bg-slate-900/60 hover:bg-slate-800/80 backdrop-blur-sm rounded-xl px-6 py-5 border border-slate-800/60 transition-all duration-200 cursor-pointer shadow-sm"
                onClick={() => setExpandedId(expandedId === index ? null : index)}
              >
                <h3 className="text-base md:text-lg font-semibold text-slate-200 flex justify-between items-center">
                  {article.question}
                  <ChevronDown className={`transition-transform duration-300 shrink-0 ml-4 ${expandedId === index ? 'rotate-180 text-blue-500' : 'text-slate-500'}`} size={20} />
                </h3>
                <div className={`overflow-hidden transition-all duration-300 ${expandedId === index ? 'max-h-96 mt-3 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed">{article.answer}</p>
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
