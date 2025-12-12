import React, { useState, useEffect, useRef, memo } from 'react';
import { 
  Bot, 
  Workflow, 
  Target, 
  Cpu, 
  MessageSquare, 
  Layers, 
  CheckCircle, 
  Mail, 
  Phone, 
  Linkedin, 
  Calendar, 
  Menu, 
  X,
  Zap,
  MessageCircle,
  Sun,
  Moon,
  Clock,
  Search,
  PenTool,
  Code2,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Quote,
  FileText,
  Database,
  Shield,
  ShieldCheck,
  Upload
} from 'lucide-react';
import ToolsCarousel from './components/ToolsCarousel';
import WorkflowDiagram from './components/WorkflowDiagram';
import TestimonialCarousel from './components/TestimonialCarousel';
import RAGArchitecture from './components/RAGArchitecture';
import ParticleBackground from './components/ParticleBackground';
import IntegrationHub from './components/IntegrationHub';
import { ServiceItem, WorkflowItem, ProcessStep, TestimonialItem } from './types';

// --- DATA DEFINITIONS ---

const services: ServiceItem[] = [
  { id: '1', title: 'AI Agent Development', description: 'Custom AI bots that handle inquiries, qualify leads, and perform tasks autonomously.', icon: Bot },
  { id: '2', title: 'Business Process Automation', description: 'End-to-end automation of repetitive tasks using n8n, Make, and Python.', icon: Workflow },
  { id: '3', title: 'CRM & Sales Automation', description: 'Sync your pipeline, automate follow-ups, and keep your CRM spotless.', icon: Target },
  { id: '4', title: 'Marketing Automation Systems', description: 'Advanced funnel architecture, from ad click to nurture sequence.', icon: Zap },
  { id: '5', title: 'AI Customer Support', description: '24/7 intelligent support systems that resolve 80% of tickets instantly.', icon: MessageSquare },
  { id: '6', title: 'System Integration', description: 'Connect disconnected apps (API, Webhooks) into a unified workflow.', icon: Layers },
];

const workflows: WorkflowItem[] = [
  // 1. Lead Qualification AI Agent Workflow
  {
    id: 'w1',
    category: 'Lead Gen',
    title: 'Lead Qualification AI Agent',
    description: 'Lead received → AI Agent qualifies → CRM updates → Auto follow-up',
    timeSaved: '10 hours / week',
    steps: [
      { 
        label: "Lead Received", 
        type: 'trigger',
        id: 'step-1'
      },
      { 
        label: 'AI Agent Qualifies', 
        type: 'action',
        id: 'step-2',
        resources: [
          { label: 'OpenAI', type: 'resource' },
          { label: 'Enrichment Data', type: 'resource' }
        ]
      },
      { 
        label: 'Update CRM', 
        type: 'action',
        id: 'step-3',
      },
      { 
        label: 'Auto Follow-up', 
        type: 'end',
        id: 'step-4'
      }
    ]
  },
  // 2. Customer Support AI Agent Workflow
  {
    id: 'w2',
    category: 'Support',
    title: 'Customer Support AI Agent',
    description: 'User question → AI Agent → Instant reply → Escalation if needed',
    timeSaved: '20 hours / week',
    steps: [
      { label: 'User Question', type: 'trigger' },
      { 
        label: 'AI Agent Analysis', 
        type: 'action',
        resources: [
          { label: 'Knowledge Base', type: 'resource' },
          { label: 'History', type: 'resource' }
        ]
      },
      { 
        label: 'Can Resolve?', 
        type: 'decision',
        branches: [
          { label: 'Instant Reply', type: 'end' },
          { label: 'Escalate to Human', type: 'end' }
        ]
      }
    ]
  },
  // 3. Marketing Automation Funnel
  {
    id: 'w3',
    category: 'Marketing',
    title: 'Marketing Automation Funnel',
    description: 'Ad click → Lead form → CRM → Email sequence → Nurturing',
    timeSaved: '15 hours / week',
    steps: [
      { label: 'Ad Click', type: 'trigger' },
      { label: 'Lead Form Sub', type: 'action' },
      { label: 'Add to CRM', type: 'action' },
      { label: 'Email Sequence', type: 'action' },
      { label: 'Nurture Loop', type: 'end' }
    ]
  },
  // 4. CRM Auto-Sync Workflow
  {
    id: 'w4',
    category: 'CRM Sync',
    title: 'CRM Auto-Sync Workflow',
    description: 'Website → CRM → Slack notification → Reporting automation',
    timeSaved: '5 hours / week',
    steps: [
      { label: 'Website Action', type: 'trigger' },
      { label: 'Sync to CRM', type: 'action' },
      { label: 'Slack Notify', type: 'action' },
      { label: 'Update Report', type: 'end' }
    ]
  },
  // 5. Content Distribution Automation
  {
    id: 'w5',
    category: 'Content',
    title: 'Content Distribution Automation',
    description: 'One content → Auto publish to social channels → Scheduled repost',
    timeSaved: '8 hours / week',
    steps: [
      { label: 'New Content', type: 'trigger' },
      { 
        label: 'Format for Platforms', 
        type: 'action',
        resources: [
            { label: 'AI Rewrite', type: 'resource'}
        ] 
      },
      { label: 'Multi-Publish', type: 'action' },
      { label: 'Schedule Repost', type: 'end' }
    ]
  }
];

const dashboardTabs = [
  { id: 'Lead Gen', role: 'Sales', action: 'Qualify leads 24/7' },
  { id: 'Support', role: 'Support', action: 'Instant AI answers' },
  { id: 'Marketing', role: 'Marketing', action: 'Full funnel auto' },
  { id: 'CRM Sync', role: 'Ops', action: 'Keep data synced' },
  { id: 'Content', role: 'Social', action: 'Auto-distribute' }
];

const processSteps: ProcessStep[] = [
  { number: '1', title: 'Audit', description: 'Identify manual tasks', icon: Search },
  { number: '2', title: 'Design', description: 'Build automation architecture', icon: PenTool },
  { number: '3', title: 'Build', description: 'Develop workflows & AI agents', icon: Code2 },
  { number: '4', title: 'Optimize', description: 'Monitor, improve, scale', icon: TrendingUp }
];

const testimonials: TestimonialItem[] = [
  { 
    id: 't1', 
    quote: "Tadios automated our entire lead generation flow. We went from manually copying data to having a 24/7 sales machine that qualifies leads while we sleep.", 
    author: "Sarah Jenkins", 
    role: "Marketing Director",
    company: "GrowthX Agency"
  },
  { 
    id: 't2', 
    quote: "The AI support agent reduced our ticket volume by 80% in the first month. The implementation was smooth and the ROI was immediate. Truly game-changing.", 
    author: "Mark Davis", 
    role: "Founder", 
    company: "TechFlow Solutions"
  },
  { 
    id: 't3', 
    quote: "Professional, fast, and technically brilliant. The n8n workflows Tadios built are flawless and have saved our operations team countless hours every week.", 
    author: "James Liu", 
    role: "Operations Manager",
    company: "ScaleUp Inc."
  },
  { 
    id: 't4', 
    quote: "We were drowning in manual data entry. Tadios redesigned our CRM sync process and now everything just works. Best investment we made this year.", 
    author: "Elena K.", 
    role: "Head of Sales",
    company: "Nova Systems"
  },
  { 
    id: 't5', 
    quote: "The marketing funnel automation is incredible. Our conversion rates went up 40% because leads are contacted instantly. Highly recommend Tadios.", 
    author: "Michael Ross", 
    role: "CEO",
    company: "Elevate Digital"
  }
];

// --- COMPONENTS ---

// 1. Reveal On Scroll Component
const Reveal: React.FC<{ children: React.ReactNode; className?: string; delay?: number }> = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={ref} 
      className={`${className} transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- MAIN COMPONENT ---

const App: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Lead Gen');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) {
        return storedTheme === 'dark';
      }
      // Default to true (Dark Mode) if no preference is stored
      return true;
    }
    return true;
  });

  // Optimized Scroll Animation Logic using requestAnimationFrame
  const processSectionRef = useRef<HTMLDivElement>(null);
  const [processProgress, setProcessProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // 1. Process Section Line Logic
          if (processSectionRef.current) {
            const rect = processSectionRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const start = windowHeight * 0.8; 
            const scrollAmount = start - rect.top;
            const totalScrollNeeded = rect.height; 
            const progress = Math.min(Math.max(scrollAmount / totalScrollNeeded, 0), 1);
            setProcessProgress(progress);
          }

          // 2. Global Scroll Progress Logic
          const totalHeight = document.body.scrollHeight - window.innerHeight;
          const currentProgress = window.scrollY / totalHeight;
          setScrollProgress(currentProgress);

          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false);
    }
  };

  const activeWorkflow = workflows.find(w => w.category === activeCategory) || workflows[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 font-sans selection:bg-brand-500/30 selection:text-brand-600 dark:selection:text-brand-300 transition-colors duration-300 overflow-x-hidden">
      
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.05] z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      {/* Global Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 bg-brand-600 z-[60] transition-all duration-100 ease-out" style={{ width: `${scrollProgress * 100}%` }}></div>

      {/* Navigation */}
      <header className="fixed top-0 w-full bg-white/90 dark:bg-slate-950/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 transition-all duration-300">
        <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => window.scrollTo(0,0)}>
            <div className="w-9 h-9 bg-gradient-to-br from-brand-500 to-brand-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform duration-300">
              <Workflow size={20} />
            </div>
            <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 tracking-tight">
              Tadios
            </div>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {['About', 'Services', 'Workflows', 'Contact'].map(item => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                {item}
              </button>
            ))}
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <a href="https://calendly.com/tadiyey127/30min" target="_blank" rel="noopener noreferrer" className="relative overflow-hidden group px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-full shadow-lg shadow-brand-500/25 hover:shadow-brand-500/40 transition-all hover:-translate-y-0.5 active:translate-y-0">
               <span className="relative z-10">Book Consultation</span>
               {/* Shimmer Effect */}
               <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer skew-x-[-20deg]"></div>
            </a>
          </nav>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            <button 
                onClick={toggleTheme} 
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button className="text-slate-700 dark:text-slate-200 p-1" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden absolute w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'}`}>
          <nav className="px-6 py-4 flex flex-col space-y-4">
            {['About', 'Services', 'Workflows', 'Contact'].map(item => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase())} className="text-left font-medium py-2 text-slate-600 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors">
                {item}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-28 pb-12 lg:pt-48 lg:pb-32 overflow-hidden">
          <ParticleBackground />
          
          {/* Abstract Background Gradient */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[1000px] h-[400px] md:h-[600px] bg-brand-500/10 dark:bg-brand-500/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none z-0"></div>
          
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
              {/* Left Content */}
              <div className="w-full lg:w-3/5 text-center lg:text-left space-y-6 md:space-y-8 animate-fade-in-up">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50/80 dark:bg-brand-900/20 text-brand-600 dark:text-brand-300 text-xs font-bold uppercase tracking-wider border border-brand-100 dark:border-brand-500/20 backdrop-blur-sm mb-2 shadow-sm shadow-brand-500/10">
                  <Bot size={14} className="animate-pulse" />
                  <span>AI Agent Specialist</span>
                </div>
                
                {/* Updated Heading Structure */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-slate-900 dark:text-white mb-2">
                  Automate with <br className="hidden md:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-600 to-purple-600 animate-gradient-x">
                    Intelligent AI Agents
                  </span>
                </h1>
                
                {/* Styled Tagline */}
                <div className="font-serif italic text-xl md:text-2xl text-slate-500 dark:text-slate-400 opacity-80 mb-6">
                  with Built-In Support for Modern Marketing Needs.
                </div>
                
                <p className="text-base md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light mt-4">
                  Stop trading time for tasks. I build intelligent systems and AI agents that handle your marketing, sales, and operations <span className="text-slate-900 dark:text-white font-medium">while you sleep.</span>
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                  <button onClick={() => scrollToSection('services')} className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
                    Explore Services
                  </button>
                  <a href="https://calendly.com/tadiyey127/30min" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-bold rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all hover:-translate-y-1 flex items-center justify-center gap-2 group">
                    <span>Book Free Audit</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>

              {/* Right Content - Interactive Visual */}
              <div className="w-full lg:w-2/5 flex justify-center lg:justify-end relative h-[300px] lg:h-[450px] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                 <IntegrationHub />
              </div>
            </div>
          </div>
        </section>

        {/* Tools Carousel Section */}
        <section className="bg-white dark:bg-slate-900 transition-colors duration-300 border-b border-slate-100 dark:border-slate-800">
          <div className="container mx-auto px-6 pt-8">
            <p className="text-center text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Trusted Technology Stack</p>
          </div>
          <ToolsCarousel />
        </section>

        {/* Trust & Stats Section */}
        <section className="py-16 md:py-20 bg-slate-50/50 dark:bg-[#0B0F17] transition-colors duration-300 border-b border-slate-100 dark:border-slate-800/50">
          <div className="container mx-auto px-6">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 className="text-3xl font-bold mb-4 md:mb-6 text-slate-900 dark:text-white tracking-tight">Trusted by Forward-Thinking Teams</h2>
                <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 font-light leading-relaxed">
                  Tadios helps businesses scale faster, increase efficiency, and unlock new growth through intelligent automation and AI agent systems.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 lg:gap-12">
              {[
                { label: "Experience Delivering Agentic AI", value: "24+", suffix: "Months" },
                { label: "Projects Completed", value: "30+", suffix: "" },
                { label: "Avg. ROI in First Year", value: "$200K+", suffix: "" },
                { label: "Avg. Hours/Week Saved", value: "30+", suffix: "" },
              ].map((stat, idx) => (
                <Reveal key={idx} delay={idx * 100} className="text-center p-4 md:p-6 rounded-2xl bg-white dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
                  <div className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-brand-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{stat.suffix}</div>
                  <div className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-tight">{stat.label}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-16 md:py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
          <div className="container mx-auto px-6 max-w-4xl text-center">
            <Reveal>
              <h2 className="text-3xl font-bold mb-6 md:mb-8 text-slate-900 dark:text-white tracking-tight">The Architect Behind The Bots</h2>
              <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 mb-10 md:mb-12 leading-relaxed font-light">
                I'm Tadios, an automation engineer obsessed with efficiency. I bridge the gap between creative marketing strategy and rigorous engineering logic. My mission is simple: <span className="font-bold text-slate-900 dark:text-white bg-brand-100 dark:bg-brand-900/30 px-1 rounded">Build assets that work while you sleep.</span>
              </p>
            </Reveal>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { icon: Cpu, title: "Automation Engineering", desc: "Robust workflows that don't break." },
                { icon: Bot, title: "AI Agent Development", desc: "Intelligent bots for support & sales." },
                { icon: Target, title: "Marketing Systems", desc: "Data-driven growth infrastructure." }
              ].map((item, i) => (
                <Reveal key={i} delay={i * 100}>
                  <div className="p-6 md:p-8 bg-slate-50 dark:bg-[#0f1115] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-500/30 transition-all duration-300 group h-full">
                    <item.icon className="w-10 h-10 text-slate-400 dark:text-slate-500 group-hover:text-brand-500 transition-colors mx-auto mb-4 md:mb-6" />
                    <h3 className="font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-16 md:py-24 bg-[#0a0a0a] relative overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[128px] pointer-events-none"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-900/10 rounded-full blur-[128px] pointer-events-none"></div>

          <div className="container mx-auto px-6 relative z-10">
            <Reveal>
              <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white tracking-tight">
                  Where Marketing Strategy Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-500 to-purple-500">AI Precision</span>
                </h2>
                <p className="text-base md:text-lg text-slate-400 font-light leading-relaxed">
                  Most agencies run ads. Some devs write code. We do both. We build workflows and agents that help your business.
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Card 1 */}
              <Reveal delay={100}>
                <div className="group relative p-6 md:p-8 h-full rounded-3xl bg-slate-900 border border-slate-800 transition-all duration-300 hover:border-brand-500/50 hover:shadow-[0_0_30px_rgba(234,75,113,0.15)] flex flex-col overflow-hidden">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:bg-brand-500/10 group-hover:border-brand-500/30 transition-all duration-500">
                    <TrendingUp size={24} className="text-brand-500 md:w-7 md:h-7" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 group-hover:text-brand-400 transition-colors">The "Growth Engineer" Advantage</h3>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    We don't just build automations; we build revenue systems. Every agent we deploy is designed with your marketing ROI in mind.
                  </p>
                </div>
              </Reveal>

              {/* Card 2 */}
              <Reveal delay={200}>
                <div className="group relative p-6 md:p-8 h-full rounded-3xl bg-slate-900 border border-slate-800 transition-all duration-300 hover:border-purple-500/50 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col overflow-hidden">
                   <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:bg-purple-500/10 group-hover:border-purple-500/30 transition-all duration-500">
                    <Cpu size={24} className="text-purple-500 md:w-7 md:h-7" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 group-hover:text-purple-400 transition-colors">Custom-Built, Not Cookie-Cutter</h3>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    We build workflows and agents that help your business, rather than forcing you into a template.
                  </p>
                </div>
              </Reveal>

              {/* Card 3 */}
              <Reveal delay={300}>
                <div className="group relative p-6 md:p-8 h-full rounded-3xl bg-slate-900 border border-slate-800 transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] flex flex-col overflow-hidden">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 group-hover:bg-blue-500/10 group-hover:border-blue-500/30 transition-all duration-500">
                    <ShieldCheck size={24} className="text-blue-500 md:w-7 md:h-7" />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-3 md:mb-4 group-hover:text-blue-400 transition-colors">Zero-Error Execution</h3>
                  <p className="text-sm md:text-base text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    Manual data entry leads to lost leads. Our systems ensure 100% accuracy in your CRM, email marketing, and sales pipelines.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-16 md:py-24 bg-slate-50/50 dark:bg-slate-950 transition-colors duration-300 relative">
          {/* Decorative Dot Background (Replaced Grid) */}
          <div className="absolute inset-0 bg-dot-slate-300 dark:bg-dot-slate-800 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none"></div>
          
          <div className="container mx-auto px-6 relative z-10">
            <Reveal className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 tracking-tight">Professional Services</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg">Scalable solutions designed to replace manual labor with intelligent code.</p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {services.map((service, index) => (
                <Reveal key={service.id} delay={index * 50}>
                  <div className="h-full bg-white dark:bg-slate-900/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-brand-500/50 hover:shadow-2xl hover:shadow-brand-500/10 transition-all duration-300 group flex flex-col hover:-translate-y-1">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-slate-400 shadow-sm mb-4 md:mb-6 group-hover:scale-110 group-hover:bg-brand-500 group-hover:text-white transition-all duration-300">
                      <service.icon size={24} className="md:w-7 md:h-7" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">{service.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 mb-6 md:mb-8 text-sm leading-relaxed flex-grow">{service.description}</p>
                    <button onClick={() => scrollToSection('contact')} className="text-slate-900 dark:text-white font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all mt-auto">
                      Learn More <ArrowRight size={16} className="text-brand-500" />
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Visual Workflows - Dark Dashboard Style */}
        <section id="workflows" className="py-16 md:py-24 bg-slate-100 dark:bg-[#0B0F17] transition-colors duration-300 relative">
          <div className="w-full px-4 md:px-6">
            <Reveal className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">Automation That Saves You Hours</h2>
              <p className="text-slate-600 dark:text-slate-400">Select a category to see real-world workflow architecture.</p>
            </Reveal>

            {/* Canvas Container */}
            <Reveal delay={200} className="bg-[#15171E] rounded-2xl p-4 md:p-6 shadow-2xl border border-slate-800 overflow-hidden w-full max-w-[1600px] mx-auto ring-1 ring-white/10">
              {/* Dot Grid Background */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

              {/* Tabs */}
              <div className="relative z-10 grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {dashboardTabs.map((tab) => {
                  const isActive = activeCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCategory(tab.id)}
                      className={`
                        text-left p-4 rounded-xl border transition-all duration-300 relative overflow-hidden group
                        ${isActive 
                          ? 'bg-[#1e2029] border-brand-500/50 shadow-[0_0_20px_rgba(234,75,113,0.1)]' 
                          : 'bg-[#1e2029]/50 border-slate-800 hover:bg-[#1e2029] hover:border-slate-700'
                        }
                      `}
                    >
                      {isActive && <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>}
                      <div className="flex flex-col">
                        <span className={`text-xs font-bold uppercase tracking-wider mb-1 ${isActive ? 'text-brand-500' : 'text-slate-500'}`}>{tab.role}</span>
                        <span className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>{tab.action}</span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Workflow Diagram */}
              <div className="relative z-10 min-h-[400px] md:min-h-[500px] bg-[#0f1115] rounded-xl border border-slate-800/50 flex items-center justify-center overflow-auto custom-scrollbar">
                <WorkflowDiagram steps={activeWorkflow.steps} />
              </div>

              {/* Stats Footer */}
              <div className="relative z-10 mt-6 flex items-center justify-between px-4 py-3 bg-[#1e2029] rounded-lg border border-slate-800">
                 <div className="flex items-center gap-2">
                    <Clock size={16} className="text-brand-500" />
                    <span className="text-slate-400 text-sm">Est. Time Saved:</span>
                    <span className="text-white font-bold text-sm">{activeWorkflow.timeSaved}</span>
                 </div>
                 <div className="text-xs text-slate-500">Live Architecture v2.4</div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Internal RAG Agent Section */}
        <section className="py-16 md:py-24 bg-white dark:bg-slate-900 transition-colors duration-300 border-b border-slate-100 dark:border-slate-800">
           <div className="container mx-auto px-6">
             <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                <div className="w-full lg:w-1/2">
                   <Reveal>
                      <div className="inline-block px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-purple-200 dark:border-purple-800">
                        New Capability
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                        Internal RAG-Powered <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-brand-500">Company AI Agent</span>
                      </h2>
                      <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                        Transform how your team accesses knowledge. Using a secure Retrieval-Augmented Generation (RAG) system, we index your internal documents, SOPs, and workflows to provide instant, accurate answers grounded in your real data.
                      </p>
                      
                      <div className="space-y-4 mb-8">
                         {[
                           "Ingest PDFs, Notion, Google Drive & Sharepoint",
                           "Vector embeddings for semantic search",
                           "Strict role-based access control",
                           "Citations linked to original sources"
                         ].map((item, i) => (
                           <div key={i} className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center shrink-0">
                                <CheckCircle size={14} className="text-green-600 dark:text-green-400" />
                              </div>
                              <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">{item}</span>
                           </div>
                         ))}
                      </div>

                      <a href="https://calendly.com/tadiyey127/30min" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-xl hover:bg-slate-800 dark:hover:bg-slate-200 transition-all shadow-lg hover:translate-y-[-2px]">
                         <span>Contact us to implement</span>
                         <ArrowRight size={18} />
                      </a>
                   </Reveal>
                </div>
                
                <div className="w-full lg:w-1/2">
                   <Reveal delay={200}>
                      <RAGArchitecture />
                   </Reveal>
                </div>
             </div>
           </div>
        </section>

        {/* Our Automation Process */}
        <section className="py-16 md:py-24 bg-slate-50 dark:bg-[#0B0F17] relative transition-colors duration-300">
           <div className="container mx-auto px-6 relative z-10" ref={processSectionRef}>
              <Reveal className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">Our Automation Process</h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg">From analysis to deployment, we follow a rigorous 4-step framework to ensure success.</p>
              </Reveal>

              <div className="relative">
                 {/* Desktop Progress Line */}
                 <div className="hidden md:block absolute top-[24px] left-0 w-full h-1 bg-slate-200 dark:bg-slate-800 z-0">
                    <div 
                      className="h-full bg-brand-500" 
                      style={{ width: `${processProgress * 100}%` }}
                    ></div>
                 </div>

                 {/* Mobile Progress Line */}
                 <div className="md:hidden absolute left-[24px] top-0 bottom-0 w-1 bg-slate-200 dark:bg-slate-800 z-0">
                    <div 
                      className="w-full bg-brand-500" 
                      style={{ height: `${processProgress * 100}%` }}
                    ></div>
                 </div>

                 <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
                    {processSteps.map((step, idx) => {
                      const StepIcon = step.icon || Search;
                      const isActive = processProgress > (idx / 4);
                      
                      return (
                        <div key={idx} className="relative z-10 flex flex-row md:flex-col items-start md:items-center gap-6 md:gap-4 group">
                           {/* Icon Bubble */}
                           <div className={`
                             w-12 h-12 md:w-14 md:h-14 rounded-full border-4 flex items-center justify-center shrink-0 transition-all duration-300
                             ${isActive 
                               ? 'bg-brand-600 border-brand-100 dark:border-brand-900 text-white shadow-[0_0_20px_rgba(234,75,113,0.3)] scale-110' 
                               : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-400'
                             }
                           `}>
                              <StepIcon size={20} className="md:w-6 md:h-6" />
                           </div>

                           <div className="text-left md:text-center pt-2">
                              <h3 className={`text-xl font-bold mb-1 transition-colors ${isActive ? 'text-brand-600 dark:text-brand-400' : 'text-slate-900 dark:text-white'}`}>
                                {step.title}
                              </h3>
                              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                                {step.description}
                              </p>
                           </div>
                        </div>
                      );
                    })}
                 </div>
              </div>
           </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 md:py-24 bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
           <div className="container mx-auto px-6 mb-12 text-center">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">What Clients Say</h2>
           </div>
           <TestimonialCarousel testimonials={testimonials} />
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 md:py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative">
          <div className="container mx-auto px-6">
            <Reveal>
              <div className="bg-[#15171E] rounded-3xl p-6 md:p-14 overflow-hidden relative shadow-2xl border border-slate-800">
                 {/* Background Glow */}
                 <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-500/10 blur-[100px] rounded-full pointer-events-none"></div>

                 <div className="relative z-10 flex flex-col md:flex-row gap-12 items-center">
                    <div className="w-full md:w-1/2 space-y-8">
                       <div>
                         <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to scale?</h2>
                         <p className="text-lg text-slate-400 leading-relaxed">
                           Book a free 30-minute consultation. We'll audit your current processes and identify immediate automation opportunities.
                         </p>
                       </div>

                       <div className="space-y-6">
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-brand-500 shrink-0">
                                <Mail size={24} />
                             </div>
                             <div>
                                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Email</div>
                                <a href="mailto:tadiyey127@gmail.com" className="text-white hover:text-brand-400 transition-colors text-lg">tadiyey127@gmail.com</a>
                             </div>
                          </div>
                          
                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-brand-500 shrink-0">
                                <Phone size={24} />
                             </div>
                             <div>
                                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">Phone</div>
                                <a href="tel:+251970738088" className="text-white hover:text-brand-400 transition-colors text-lg">+251 970 738 088</a>
                             </div>
                          </div>

                          <div className="flex items-center gap-4">
                             <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-brand-500 shrink-0">
                                <Linkedin size={24} />
                             </div>
                             <div>
                                <div className="text-sm text-slate-500 font-bold uppercase tracking-wider">LinkedIn</div>
                                <a href="https://www.linkedin.com/in/tadioseyayu/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-400 transition-colors text-lg">Connect with Tadios</a>
                             </div>
                          </div>
                       </div>
                    </div>

                    <div className="w-full md:w-1/2">
                       <div className="bg-slate-900/50 p-8 rounded-2xl border border-slate-800 text-center space-y-6 backdrop-blur-sm">
                          <div className="w-20 h-20 bg-brand-600 rounded-full flex items-center justify-center mx-auto text-white shadow-xl shadow-brand-500/20 mb-4 animate-pulse-slow">
                             <Calendar size={40} />
                          </div>
                          <h3 className="text-2xl font-bold text-white">Free Consultation</h3>
                          <p className="text-slate-400">
                             No sales pressure. Just a friendly chat about your business goals and how automation can help.
                          </p>
                          <a 
                            href="https://calendly.com/tadiyey127/30min" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="block w-full py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-brand-500/25"
                          >
                            Book a Time on Calendly
                          </a>
                       </div>
                    </div>
                 </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="bg-white dark:bg-slate-950 py-12 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                 <div className="w-6 h-6 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                   <Workflow size={14} />
                 </div>
                 <span className="text-lg font-bold text-slate-900 dark:text-white">Tadios</span>
              </div>
              <p className="text-slate-500 text-sm">Built by Tadios — Automation & AI Agent Systems</p>
            </div>
            
            <div className="flex gap-6">
               <a href="https://www.linkedin.com/in/tadioseyayu/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-brand-600 transition-colors">
                 <Linkedin size={20} />
               </a>
               <a href="mailto:tadiyey127@gmail.com" className="text-slate-400 hover:text-brand-600 transition-colors">
                 <Mail size={20} />
               </a>
            </div>
          </div>
          <div className="mt-8 text-center text-xs text-slate-400 border-t border-slate-100 dark:border-slate-800 pt-8">
            &copy; {new Date().getFullYear()} Tadios Automation. All rights reserved.
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button - Mobile Optimized */}
      <a
        href="https://wa.me/251970738088"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 p-3 md:p-4 bg-[#25D366] hover:bg-[#20b85a] text-white rounded-full shadow-2xl hover:scale-110 transition-all duration-300 group flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
        {/* Inline SVG for WhatsApp Logo to ensure it renders correctly */}
        <svg 
          viewBox="0 0 24 24" 
          className="w-6 h-6 md:w-7 md:h-7 fill-white"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
        {/* Tooltip */}
        <span className="absolute right-full mr-3 bg-white dark:bg-slate-800 text-slate-800 dark:text-white text-xs font-bold py-1 px-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden md:block">
          Chat on WhatsApp
        </span>
      </a>

    </div>
  );
};

export default App;