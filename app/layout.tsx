import React from 'react';

// Metadata is defined here for reference, but in a static SPA deployment, 
// SEO tags are primarily handled by index.html.
export const metadata = {
  title: 'Tadios | AI Automation Specialist',
  description: 'Expert in AI Agents, n8n Automation, and Digital Marketing Systems.',
};

export default function RootLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    // We use a div here instead of html/body because index.html already provides the shell.
    // This wrapper applies the global font and background styles to the React app root.
    <div className="antialiased min-h-screen flex flex-col font-sans text-slate-900 dark:text-slate-50 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {children}
    </div>
  );
}