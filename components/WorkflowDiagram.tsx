import React, { memo, useId } from 'react';
import { 
  ArrowDown, 
  Webhook, 
  Database, 
  Mail, 
  FileText, 
  Split, 
  Bot, 
  Globe, 
  CheckCircle, 
  Image,
  Server,
  FileSpreadsheet,
  Search,
  Play,
  Sparkles,
  Hash,
  UserPlus,
  ClipboardList,
  ShieldAlert,
  Terminal,
  BarChart3,
  BrainCircuit,
  Lock,
  Network,
  Zap,
  MousePointerClick
} from 'lucide-react';
import { WorkflowStep } from '../types';

interface WorkflowDiagramProps {
  steps: WorkflowStep[];
}

// Icon mapper helper
const getNodeIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('form') || l.includes('create user')) return <ClipboardList size={20} />;
    if (l.includes('manager') || l.includes('decision') || l.includes('analyze') || l.includes('severity')) return <Split size={20} />;
    if (l.includes('channel') || l.includes('slack')) return <Hash size={20} />;
    if (l.includes('agent') || l.includes('ai') || l.includes('parse')) return <Bot size={20} />;
    if (l.includes('anthropic') || l.includes('model')) return <BrainCircuit size={20} />;
    if (l.includes('postgres') || l.includes('memory')) return <Database size={20} />;
    if (l.includes('entra') || l.includes('id')) return <Lock size={20} />;
    if (l.includes('jira')) return <Network size={20} />;
    if (l.includes('profile')) return <UserPlus size={20} />;
    if (l.includes('security') || l.includes('incident')) return <ShieldAlert size={20} />;
    if (l.includes('api') || l.includes('call')) return <Terminal size={20} />;
    if (l.includes('insight') || l.includes('review')) return <BarChart3 size={20} />;
    if (l.includes('click') || l.includes('execute') || l.includes('manual')) return <MousePointerClick size={20} />;
    if (l.includes('scrape') || l.includes('browser') || l.includes('url')) return <Search size={20} />;
    if (l.includes('sheet') || l.includes('excel') || l.includes('csv')) return <FileSpreadsheet size={20} />;
    if (l.includes('gemini') || l.includes('extract')) return <Sparkles size={20} />;
    if (l.includes('webhook')) return <Webhook size={20} />;
    if (l.includes('mail') || l.includes('gmail')) return <Mail size={20} />;
    if (l.includes('hubspot') || l.includes('crm') || l.includes('salesforce') || l.includes('deal')) return <Database size={20} />;
    if (l.includes('notion') || l.includes('airtable')) return <FileText size={20} />;
    if (l.includes('http')) return <Globe size={20} />;
    if (l.includes('dall') || l.includes('image')) return <Image size={20} />;
    if (l.includes('jira') || l.includes('ticket')) return <Server size={20} />;
    return <Zap size={20} />;
};

const WorkflowDiagram: React.FC<WorkflowDiagramProps> = memo(({ steps }) => {
  const baseId = useId();
  
  const renderNode = (step: WorkflowStep, isLast: boolean, index: number, parentPath: string = 'root') => {
    // Determine colors based on type
    let borderColor = 'border-slate-700';
    let iconBg = 'bg-slate-800';
    let textColor = 'text-slate-200';
    let glowColor = '';
    
    // Unique ID for this node's connectors to prevent ID collisions in SVG
    const nodeId = `${baseId}-${parentPath}-${index}`;
    
    switch(step.type) {
        case 'trigger':
            borderColor = 'border-brand-500/50';
            iconBg = 'bg-gradient-to-br from-brand-600 to-brand-700';
            glowColor = 'shadow-[0_0_20px_rgba(234,75,113,0.15)]';
            break;
        case 'decision':
            borderColor = 'border-purple-500/50';
            iconBg = 'bg-gradient-to-br from-purple-600 to-purple-800';
            glowColor = 'shadow-[0_0_20px_rgba(168,85,247,0.15)]';
            break;
        case 'action':
            borderColor = 'border-slate-600';
            iconBg = 'bg-gradient-to-br from-slate-700 to-slate-800';
            break;
        case 'end':
            borderColor = 'border-slate-700';
            iconBg = 'bg-slate-800';
            textColor = 'text-slate-400';
            break;
    }

    return (
      <div key={nodeId} className="flex items-center">
        <div className="flex flex-col items-center group/node">
          
          {/* MAIN NODE CARD */}
          <div className={`
            relative flex flex-col items-center justify-center p-4 rounded-2xl w-48 transition-all duration-300 z-20
            bg-[#1e2029]/90 backdrop-blur-sm border ${borderColor} ${glowColor}
            hover:scale-105 hover:border-opacity-100 hover:shadow-2xl hover:z-30 hover:bg-[#252836]
          `}>
             {/* Trigger Ripple Effect */}
             {step.type === 'trigger' && (
               <div className="absolute inset-0 rounded-2xl ring-2 ring-brand-500/50 animate-ping opacity-20 pointer-events-none duration-1000"></div>
             )}

             {/* Connection Points */}
             <div className="absolute -left-[6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-600 border-2 border-[#1e2029]"></div>
             
             {(!step.branches || step.branches.length === 0) && (
               <div className="absolute -right-[6px] top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-slate-600 border-2 border-[#1e2029]"></div>
             )}

             <div className="flex items-center gap-3 w-full">
                 <div className={`
                   w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg ring-1 ring-white/10 shrink-0
                   ${iconBg} transition-transform duration-300 group-hover/node:rotate-6
                 `}>
                   {getNodeIcon(step.label)}
                 </div>
                 
                 <div className="flex flex-col text-left overflow-hidden">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 truncate group-hover/node:text-brand-400 transition-colors">
                        {step.subLabel || step.type}
                    </span>
                    <span className={`text-xs font-bold ${textColor} leading-tight line-clamp-2 group-hover/node:text-white transition-colors`}>
                        {step.label}
                    </span>
                 </div>
             </div>
          </div>

          {/* RESOURCES (Attached Below) */}
          {step.resources && step.resources.length > 0 && (
            <div className="flex items-start justify-center gap-4 mt-6 relative animate-fade-in pl-4">
              {/* Vertical Dotted Line */}
              <div className="absolute top-[-24px] left-1/2 -translate-x-1/2 w-[2px] h-6 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMiIgaGVpZ2h0PSI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xIDB2MiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNDc1NTY5IiBzdHJva2Utd2lkdGg9IjIiLz48L3N2Zz4=')] opacity-50"></div>
              
              {step.resources.map((resource, idx) => (
                <div key={idx} className="flex flex-col items-center relative group/res mt-2">
                   <div className="flex flex-col items-center text-center w-20">
                      <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300 mb-1.5 shadow-sm z-10 transition-all duration-200 group-hover/res:scale-110 group-hover/res:border-brand-500/50 group-hover/res:text-white group-hover/res:bg-slate-700">
                        {getNodeIcon(resource.label)}
                      </div>
                      <span className="text-[9px] text-slate-400 font-medium leading-tight px-1 group-hover/res:text-brand-400 transition-colors">{resource.label}</span>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* BRANCHES (Splitting to Right) */}
        {step.branches && step.branches.length > 0 ? (
          <div className="flex flex-col justify-center gap-6 ml-12 relative animate-fade-in">
            {step.branches.map((branch, idx) => {
              const branchPathId = `path-${nodeId}-${idx}`;
              return (
                <div key={idx} className="flex items-center relative">
                  {/* Curved Animated Connector */}
                  <svg className="absolute left-[-48px] top-1/2 -translate-y-1/2 w-12 h-24 overflow-visible pointer-events-none z-0">
                      <defs>
                        <path 
                          id={branchPathId}
                          d={`M 0 0 C 24 0, 24 ${idx === 0 ? -40 : 40}, 48 ${idx === 0 ? -10 : 10}`}
                        />
                      </defs>
                      <use 
                        href={`#${branchPathId}`}
                        fill="none"
                        stroke="#475569"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        className="opacity-50"
                      />
                      {/* Animated Data Packet */}
                      <circle r="2.5" fill={idx === 0 ? "#4ade80" : "#f87171"}>
                        <animateMotion dur="2s" repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                          <mpath href={`#${branchPathId}`} />
                        </animateMotion>
                      </circle>

                      <circle cx="24" cy={idx === 0 ? -20 : 20} r="10" fill="#1e2029" stroke="#4b5563" strokeWidth="1" />
                      <text x="24" y={idx === 0 ? -18 : 22} fontSize="9" fill="#9ca3af" textAnchor="middle" dominantBaseline="middle" fontWeight="bold">
                        {idx === 0 ? 'YES' : 'NO'}
                      </text>
                  </svg>

                  {renderNode(branch, true, idx, nodeId)}
                </div>
              );
            })}
          </div>
        ) : (
          /* STANDARD ANIMATED CONNECTION */
          !isLast && (
            <div className="w-16 h-1 mx-1 relative z-0 flex items-center justify-center">
                 <svg className="w-full h-4 overflow-visible">
                     <line 
                        x1="0" y1="50%" x2="100%" y2="50%" 
                        stroke="#475569" 
                        strokeWidth="2" 
                        strokeDasharray="4 4" 
                        className="opacity-60" 
                     />
                     {/* Animated Data Packet */}
                     <circle r="2.5" cy="50%" fill="#94a3b8">
                        <animate attributeName="cx" from="0%" to="100%" dur="1.5s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0;1;1;0" keyTimes="0;0.1;0.9;1" dur="1.5s" repeatCount="indefinite" />
                     </circle>
                 </svg>
            </div>
          )
        )}
      </div>
    );
  };

  return (
    <div className="w-full relative">
      {/* Desktop View (Horizontal / Graph) */}
      <div className="hidden md:flex items-start justify-center min-w-max space-x-0 relative z-10 py-12 px-8">
        {steps.map((step, idx) => (
           <React.Fragment key={idx}>
             {renderNode(step, idx === steps.length - 1, idx)}
           </React.Fragment>
        ))}
      </div>

      {/* Mobile View (Vertical Timeline) */}
      <div className="md:hidden flex flex-col items-center relative z-10 py-4 px-4 w-full">
        {/* Vertical Line Background */}
        <div className="absolute left-[24px] top-8 bottom-8 w-0.5 bg-slate-800"></div>

        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
             <div className="relative flex items-start w-full mb-8 last:mb-0 group">
                {/* Timeline Dot */}
                <div className={`
                  relative z-10 w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-lg border-4 border-[#0f1115]
                  ${step.type === 'trigger' ? 'bg-brand-600 text-white' : 'bg-slate-800 text-slate-300 border-slate-700'}
                `}>
                   {getNodeIcon(step.label)}
                </div>

                {/* Content Card */}
                <div className="ml-4 flex-1 bg-[#1e2029] p-4 rounded-xl border border-slate-800 shadow-md">
                   <div className="flex justify-between items-start mb-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{step.type}</span>
                   </div>
                   <h4 className="text-sm font-bold text-white mb-3">{step.label}</h4>

                   {/* Resources Mobile */}
                   {step.resources && (
                     <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-700/50">
                       {step.resources.map((res, rIdx) => (
                         <div key={rIdx} className="flex items-center gap-1.5 bg-slate-800/50 px-2 py-1 rounded text-xs text-slate-400 border border-slate-700">
                           <div className="scale-75">{getNodeIcon(res.label)}</div>
                           <span>{res.label}</span>
                         </div>
                       ))}
                     </div>
                   )}

                   {/* Branches Mobile */}
                   {step.branches && (
                     <div className="mt-3 space-y-2">
                       {step.branches.map((branch, bIdx) => (
                         <div key={bIdx} className="flex items-center gap-3 bg-slate-800/30 p-2 rounded-lg border border-slate-700/50">
                            <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${bIdx === 0 ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                                {bIdx === 0 ? 'YES' : 'NO'}
                            </span>
                            <div className="flex items-center gap-2 text-slate-300">
                               <div className="scale-75">{getNodeIcon(branch.label)}</div>
                               <span className="text-xs">{branch.label}</span>
                            </div>
                         </div>
                       ))}
                     </div>
                   )}
                </div>
             </div>
             
             {/* Connector Line for Mobile (Standard steps) */}
             {idx < steps.length - 1 && !step.branches && (
                <div className="absolute left-[24px] h-8 w-0.5 bg-slate-800 -bottom-8 overflow-hidden">
                   <div className="w-full h-full bg-brand-500/50 animate-pulse"></div>
                </div>
             )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
});

export default WorkflowDiagram;