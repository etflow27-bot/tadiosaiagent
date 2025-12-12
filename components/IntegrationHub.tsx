import React, { memo } from 'react';
import { 
  Workflow, 
  Ticket, 
  Database, 
  User, 
  Search, 
  Mail, 
  Zap,
  Globe,
  MessageSquare
} from 'lucide-react';

const IntegrationHub: React.FC = memo(() => {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] flex items-center justify-center overflow-visible">
      {/* 1. Background Glow (The "Blend") */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-slate-800/80 blur-[100px] rounded-full pointer-events-none z-0"></div>
      
      {/* 2. Radiant Lines SVG */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="grad-blue" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#a855f7" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="grad-orange" x1="100%" y1="0%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ff6d5a" stopOpacity="0" />
            <stop offset="50%" stopColor="#ff6d5a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="1" />
          </linearGradient>
          
          <mask id="fade-mask">
             <rect x="0" y="0" width="800" height="400" fill="url(#grad-mask)" />
             <radialGradient id="grad-mask" cx="50%" cy="50%" r="50%">
                <stop offset="40%" stopColor="white" />
                <stop offset="100%" stopColor="black" />
             </radialGradient>
          </mask>
        </defs>

        {/* Left Side Radiating Lines (Blue/Purple) */}
        <g stroke="url(#grad-blue)" strokeWidth="1.5" fill="none" className="opacity-70">
           {/* Top fan */}
           <path d="M 50 50 C 200 120, 280 180, 360 195" />
           <path d="M 30 100 C 180 140, 280 190, 360 200" />
           <path d="M 20 180 C 150 190, 280 200, 360 205" />
           {/* Bottom fan */}
           <path d="M 20 220 C 150 210, 280 200, 360 205" />
           <path d="M 30 300 C 180 260, 280 210, 360 200" />
           <path d="M 50 350 C 200 280, 280 220, 360 195" />
        </g>

        {/* Right Side Radiating Lines (Orange/Red) */}
        <g stroke="url(#grad-orange)" strokeWidth="1.5" fill="none" className="opacity-70">
           {/* Top fan */}
           <path d="M 750 50 C 600 120, 520 180, 440 195" />
           <path d="M 770 100 C 620 140, 520 190, 440 200" />
           <path d="M 780 180 C 650 190, 520 200, 440 205" />
           {/* Bottom fan */}
           <path d="M 780 220 C 650 210, 520 200, 440 205" />
           <path d="M 770 300 C 620 260, 520 210, 440 200" />
           <path d="M 750 350 C 600 280, 520 220, 440 195" />
        </g>
      </svg>

      {/* 3. Central Hub Node */}
      <div className="relative z-20 w-24 h-24 md:w-32 md:h-32 bg-[#1e2029] rounded-[2rem] border border-slate-700 shadow-2xl flex items-center justify-center ring-4 ring-slate-900/50 transform transition-transform hover:scale-105 duration-500">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2rem] opacity-50"></div>
        <Workflow size={48} className="text-slate-200 relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
        {/* Inner Hub Glow */}
        <div className="absolute inset-0 rounded-[2rem] shadow-[0_0_40px_rgba(59,130,246,0.2)] animate-pulse-slow"></div>
      </div>

      {/* 4. Floating Satellite Nodes (Icons) - Left */}
      <div className="absolute left-[5%] top-[30%] z-20 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="w-12 h-12 bg-[#0f1115]/90 backdrop-blur border border-purple-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.2)]">
           <Ticket size={20} className="text-purple-400" />
        </div>
      </div>
      <div className="absolute left-[-2%] top-[50%] -translate-y-1/2 z-20 animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="w-14 h-14 bg-[#0f1115]/90 backdrop-blur border border-blue-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]">
           <Database size={24} className="text-blue-400" />
        </div>
      </div>
      <div className="absolute left-[5%] top-[70%] z-20 animate-fade-in" style={{ animationDelay: '0.6s' }}>
        <div className="w-12 h-12 bg-[#0f1115]/90 backdrop-blur border border-indigo-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
           <User size={20} className="text-indigo-400" />
        </div>
      </div>

      {/* 5. Floating Satellite Nodes (Icons) - Right */}
      <div className="absolute right-[5%] top-[30%] z-20 animate-fade-in" style={{ animationDelay: '0.3s' }}>
        <div className="w-12 h-12 bg-[#0f1115]/90 backdrop-blur border border-orange-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)]">
           <Search size={20} className="text-orange-400" />
        </div>
      </div>
      <div className="absolute right-[-2%] top-[50%] -translate-y-1/2 z-20 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="w-14 h-14 bg-[#0f1115]/90 backdrop-blur border border-pink-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(236,72,153,0.2)]">
           <Zap size={24} className="text-pink-400" />
        </div>
      </div>
      <div className="absolute right-[5%] top-[70%] z-20 animate-fade-in" style={{ animationDelay: '0.7s' }}>
        <div className="w-12 h-12 bg-[#0f1115]/90 backdrop-blur border border-red-500/30 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.2)]">
           <Mail size={20} className="text-red-400" />
        </div>
      </div>
    </div>
  );
});

export default IntegrationHub;