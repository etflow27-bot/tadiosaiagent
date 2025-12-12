import React, { memo } from 'react';
import { FileText, Database, Sparkles, Search, MessageSquare, ArrowRight, FileSpreadsheet, File } from 'lucide-react';

const RAGArchitecture: React.FC = memo(() => {
  return (
    <div className="w-full bg-[#15171E] rounded-2xl border border-slate-800 p-8 md:p-12 relative overflow-hidden group">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-brand-500/10 blur-[100px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        
        {/* Step 1: Ingestion */}
        <div className="flex flex-col items-center gap-4 text-center w-full md:w-auto">
          <div className="relative">
            <div className="flex -space-x-4">
               <div className="w-12 h-16 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-slate-400 shadow-lg transform -rotate-6 z-10">
                 <FileText size={24} />
               </div>
               <div className="w-12 h-16 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-green-500 shadow-lg transform rotate-0 z-20">
                 <FileSpreadsheet size={24} />
               </div>
               <div className="w-12 h-16 bg-slate-800 border border-slate-700 rounded-lg flex items-center justify-center text-blue-500 shadow-lg transform rotate-6 z-10">
                 <File size={24} />
               </div>
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-700 text-[10px] px-2 py-0.5 rounded-full text-slate-300 border border-slate-600 whitespace-nowrap">
              Your Data
            </div>
          </div>
          <div className="text-sm font-semibold text-slate-300">Ingestion</div>
        </div>

        {/* Arrow 1 */}
        <div className="hidden md:flex flex-col items-center">
          <div className="h-[2px] w-16 bg-gradient-to-r from-slate-700 to-brand-500/50 relative">
             <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 bg-brand-500 rounded-full animate-pulse"></div>
          </div>
          <span className="text-[10px] text-slate-500 mt-2">Chunking</span>
        </div>

        {/* Step 2: Vector DB */}
        <div className="flex flex-col items-center gap-4 text-center w-full md:w-auto">
          <div className="relative w-20 h-20 bg-slate-900 rounded-full border border-brand-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(234,75,113,0.2)]">
            <Database size={32} className="text-brand-500" />
            
            {/* Orbiting particles */}
            <div className="absolute inset-0 border border-slate-700 rounded-full opacity-30 animate-spin-slow"></div>
            <div className="absolute -top-1 left-1/2 w-2 h-2 bg-brand-400 rounded-full blur-[1px]"></div>
          </div>
          <div className="text-sm font-semibold text-slate-300">Vector Database</div>
        </div>

        {/* Arrow 2 */}
        <div className="hidden md:flex flex-col items-center">
          <div className="h-[2px] w-16 bg-gradient-to-r from-brand-500/50 to-purple-500/50 relative">
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <span className="text-[10px] text-slate-500 mt-2">Semantic Search</span>
        </div>

        {/* Step 3: RAG Engine */}
        <div className="flex flex-col items-center gap-4 text-center w-full md:w-auto">
          <div className="relative w-24 h-16 bg-slate-800 rounded-xl border border-slate-600 flex items-center justify-center gap-2 shadow-xl">
             <Search size={18} className="text-purple-400" />
             <ArrowRight size={14} className="text-slate-500" />
             <Sparkles size={18} className="text-yellow-400" />
             <div className="absolute -top-3 right-[-10px] bg-purple-600 text-[10px] px-2 py-0.5 rounded text-white font-bold">RAG</div>
          </div>
          <div className="text-sm font-semibold text-slate-300">Retrieval Engine</div>
        </div>

        {/* Arrow 3 */}
        <div className="hidden md:flex flex-col items-center">
          <div className="h-[2px] w-16 bg-gradient-to-r from-purple-500/50 to-green-500/50 relative">
             <div className="absolute top-1/2 right-0 -translate-y-1/2 w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
          <span className="text-[10px] text-slate-500 mt-2">Response</span>
        </div>

        {/* Step 4: Chat Interface */}
        <div className="flex flex-col items-center gap-4 text-center w-full md:w-auto">
          <div className="w-48 bg-white dark:bg-slate-900 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 p-3 text-left transform scale-110">
             <div className="flex items-center gap-2 mb-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                <div className="w-6 h-6 bg-brand-600 rounded-full flex items-center justify-center text-white text-[10px]">AI</div>
                <div className="text-[10px] font-bold text-slate-900 dark:text-white">Company Agent</div>
             </div>
             <div className="space-y-2">
                <div className="bg-slate-100 dark:bg-slate-800 p-1.5 rounded text-[8px] text-slate-500 w-3/4">
                  How do I request PTO?
                </div>
                <div className="bg-brand-50 dark:bg-brand-900/20 p-2 rounded text-[8px] text-slate-700 dark:text-slate-300">
                  <span className="font-bold text-brand-600 dark:text-brand-400 block mb-1">According to the Employee Handbook (p.12):</span>
                  Submit request via HR portal 2 weeks in advance.
                </div>
             </div>
          </div>
          <div className="text-sm font-semibold text-slate-300">Employee Chat</div>
        </div>

      </div>
    </div>
  );
});

export default RAGArchitecture;