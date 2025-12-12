import React from 'react';

// Next.js Metadata for SEO on Vercel deployment
export const metadata = {
  title: 'Tadios | AI Automation Specialist',
  description: 'Expert in AI Agents, n8n Automation, and Digital Marketing Systems. Stop trading time for tasks—build assets that work while you sleep.',
  keywords: 'AI Automation, n8n expert, Make.com specialist, AI Agents, Business Automation, Digital Marketing Automation, Tadios, CRM Integration',
  openGraph: {
    type: 'website',
    title: 'Tadios | AI Automation Specialist',
    description: 'Stop trading time for tasks. I build intelligent systems and AI agents that handle your marketing, sales, and operations while you sleep.',
    url: 'https://tadios.com',
    images: [
      {
        url: 'https://cdn.worldvectorlogo.com/logos/n8n.svg',
        width: 800,
        height: 600,
        alt: 'Tadios Automation',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet" />
        
        {/* Tailwind CSS & Configuration */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            tailwind.config = {
              darkMode: 'class',
              theme: {
                extend: {
                  fontFamily: {
                    sans: ['Inter', 'sans-serif'],
                    serif: ['Playfair Display', 'serif'],
                  },
                  colors: {
                    brand: {
                      50: '#fff1f2',
                      100: '#ffe4e6',
                      200: '#fecdd3',
                      300: '#fda4af',
                      400: '#fb7185',
                      500: '#ff6d5a', 
                      600: '#ea4b71', 
                      700: '#be123c',
                      800: '#9f1239',
                      900: '#881337',
                    },
                    slate: {
                      50: '#f9fafb',
                      100: '#f3f4f6',
                      200: '#e5e7eb',
                      300: '#d1d5db',
                      400: '#9ca3af',
                      500: '#6b7280',
                      600: '#4b5563',
                      700: '#374151',
                      800: '#1f2937',
                      900: '#111827',
                      950: '#020617',
                    }
                  },
                  animation: {
                    'scroll-x': 'scrollX 40s linear infinite',
                    'fade-in': 'fadeIn 0.4s ease-out forwards',
                    'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                    'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                    'shimmer': 'shimmer 2.5s infinite',
                    'flow': 'flow 1s linear infinite',
                  },
                  keyframes: {
                    scrollX: {
                      '0%': { transform: 'translateX(0)' },
                      '100%': { transform: 'translateX(-50%)' },
                    },
                    fadeIn: {
                      '0%': { opacity: '0' },
                      '100%': { opacity: '1' },
                    },
                    fadeInUp: {
                      '0%': { opacity: '0', transform: 'translateY(20px)' },
                      '100%': { opacity: '1', transform: 'translateY(0)' },
                    },
                    shimmer: {
                      '100%': { transform: 'translateX(100%)' }
                    },
                    flow: {
                       '0%': { strokeDashoffset: '20' },
                       '100%': { strokeDashoffset: '0' }
                    }
                  }
                },
              },
            }
          `
        }} />
        <style dangerouslySetInnerHTML={{
          __html: `
            body {
              font-family: 'Inter', sans-serif;
              background-color: #f9fafb;
              color: #111827;
              overflow-x: hidden;
            }
            .no-scrollbar::-webkit-scrollbar { display: none; }
            .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            .bg-dot-slate-300 { background-image: radial-gradient(circle, #cbd5e1 1.5px, transparent 1.5px); background-size: 24px 24px; }
            .dark .bg-dot-slate-800 { background-image: radial-gradient(circle, #334155 1.5px, transparent 1.5px); background-size: 24px 24px; }
            ::-webkit-scrollbar { width: 10px; }
            ::-webkit-scrollbar-track { background: #0f172a; }
            ::-webkit-scrollbar-thumb { background: #334155; border-radius: 5px; border: 2px solid #0f172a; }
            ::-webkit-scrollbar-thumb:hover { background: #475569; }
            ::selection { background-color: rgba(234, 75, 113, 0.3); color: #fff; }
          `
        }} />
      </head>
      <body className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 transition-colors duration-300">
        <div className="antialiased min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}