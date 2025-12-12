import React, { memo } from 'react';
import { Quote } from 'lucide-react';
import { TestimonialItem } from '../types';

interface TestimonialCarouselProps {
  testimonials: TestimonialItem[];
}

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = memo(({ testimonials }) => {
  // Duplicate list for infinite scroll - ensure we have enough content to scroll smoothly
  const duplicated = [...testimonials, ...testimonials]; 

  return (
    <div className="w-full overflow-hidden relative group">
       {/* Gradients for fade effect on edges */}
      <div className="absolute top-0 bottom-0 left-0 w-8 md:w-32 bg-gradient-to-r from-white dark:from-[#0f1115] to-transparent z-10 pointer-events-none transition-colors duration-300"></div>
      <div className="absolute top-0 bottom-0 right-0 w-8 md:w-32 bg-gradient-to-l from-white dark:from-[#0f1115] to-transparent z-10 pointer-events-none transition-colors duration-300"></div>

      <div className="flex w-max animate-scroll-x hover:pause gap-6 pl-6 py-4">
        {duplicated.map((t, i) => (
          <div 
            key={`${t.id}-${i}`}
            className="w-[300px] md:w-[450px] flex-shrink-0 bg-slate-50 dark:bg-slate-900/50 p-6 md:p-8 rounded-2xl border border-slate-100 dark:border-slate-800 hover:shadow-lg hover:border-brand-500/20 transition-all duration-300 relative flex flex-col"
          >
            <div className="absolute top-6 right-6 text-brand-200 dark:text-slate-800">
               <Quote size={40} />
            </div>
             <div className="mb-6 relative z-10 flex-grow">
                <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed text-sm md:text-base">"{t.quote}"</p>
             </div>
             <div className="flex items-center gap-4 mt-auto">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-md">
                  {t.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm">{t.author}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">{t.role}, {t.company}</div>
                </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default TestimonialCarousel;