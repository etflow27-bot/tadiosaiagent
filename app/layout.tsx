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
    <div className="antialiased min-h-screen flex flex-col transition-colors duration-300">
      {children}
    </div>
  );
}