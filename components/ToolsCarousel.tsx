import React, { memo } from 'react';

const tools = [
  { name: 'n8n', url: 'https://cdn.worldvectorlogo.com/logos/n8n.svg' },
  { name: 'Make', url: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/Make_Logo_RGB.svg' },
  { name: 'Zapier', url: 'https://cdn.worldvectorlogo.com/logos/zapier.svg' },
  { name: 'GoHighLevel', url: 'https://logo.clearbit.com/gohighlevel.com' }, // Automation CRM
  { name: 'HubSpot', url: 'https://cdn.worldvectorlogo.com/logos/hubspot.svg' },
  { name: 'Salesforce', url: 'https://cdn.worldvectorlogo.com/logos/salesforce-2.svg' },
  { name: 'ActiveCampaign', url: 'https://cdn.worldvectorlogo.com/logos/activecampaign-2.svg' },
  { name: 'Airtable', url: 'https://cdn.worldvectorlogo.com/logos/airtable.svg' },
  { name: 'OpenAI', url: 'https://cdn.worldvectorlogo.com/logos/openai-2.svg' },
  { name: 'Stripe', url: 'https://cdn.worldvectorlogo.com/logos/stripe-4.svg' },
  { name: 'Shopify', url: 'https://cdn.worldvectorlogo.com/logos/shopify.svg' },
  { name: 'Slack', url: 'https://cdn.worldvectorlogo.com/logos/slack-new-logo.svg' },
];

const ToolsCarousel: React.FC = memo(() => {
  // Duplicate the list for seamless looping
  const duplicatedTools = [...tools, ...tools];

  return (
    <div className="w-full bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800 py-12 overflow-hidden relative transition-colors duration-300">
      {/* Gradient Masks */}
      <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none transition-colors duration-300"></div>
      <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none transition-colors duration-300"></div>
      
      <div className="flex w-max animate-scroll-x hover:pause items-center">
        {duplicatedTools.map((tool, index) => (
          <div 
            key={`${tool.name}-${index}`}
            className="group flex items-center justify-center mx-6 md:mx-10 w-28 md:w-36 h-16 opacity-50 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0 transform hover:scale-110 cursor-default"
            title={tool.name}
          >
            <img 
              src={tool.url} 
              alt={tool.name} 
              width="144"
              height="64"
              loading="lazy"
              className="max-h-8 md:max-h-10 w-auto object-contain dark:brightness-0 dark:invert group-hover:dark:invert-0 group-hover:dark:brightness-100 transition-all duration-300"
              onError={(e) => {
                // Fallback if image fails to load
                (e.target as HTMLImageElement).style.display = 'none';
                const span = (e.target as HTMLImageElement).nextSibling as HTMLElement;
                if(span) span.style.display = 'block';
              }}
            />
            <span className="hidden font-bold text-slate-500 dark:text-slate-400 text-sm">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

export default ToolsCarousel;