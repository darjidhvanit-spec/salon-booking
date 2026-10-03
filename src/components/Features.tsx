import React from 'react';
import { Calendar, ShieldCheck, Sparkles } from 'lucide-react';
import { FEATURES } from '../data/mockData';

// Custom Chair Icon for Barber Shop
const BarberChairIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
    <path d="M5 10h14a2 2 0 0 1 2 2v2H3v-2a2 2 0 0 1 2-2Z" />
    <path d="M12 14v5" />
    <path d="M8 21h8" />
    <path d="M4 14v4" />
    <path d="M20 14v4" />
  </svg>
);

// Custom Straight Razor Icon
const StraightRazorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m3 7 8.5 8.5a2.12 2.12 0 0 0 3 0l6-6a2.12 2.12 0 0 0 0-3l-2.5-2.5a2.12 2.12 0 0 0-3 0L9 10" />
    <line x1="8" y1="12" x2="3" y2="17" />
    <line x1="14" y1="6" x2="18" y2="10" />
  </svg>
);

export const Features: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'chair':
        return <BarberChairIcon className="w-8 h-8 text-[#b8860b]" />;
      case 'razor':
        return <StraightRazorIcon className="w-8 h-8 text-[#b8860b]" />;
      case 'calendar':
        return <Calendar className="w-8 h-8 text-[#b8860b] stroke-[1.5]" />;
      case 'shield':
        return <ShieldCheck className="w-8 h-8 text-[#b8860b] stroke-[1.5]" />;
      default:
        return <Sparkles className="w-8 h-8 text-[#b8860b]" />;
    }
  };

  return (
    <section className="bg-[#f7f4ee] border-y border-stone-200/80 py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-stone-300/70">
          {FEATURES.map((feature, index) => (
            <div
              key={feature.id}
              className={`flex items-start gap-4 lg:px-6 transition-all duration-300 hover:-translate-y-1 ${index === 0 ? 'lg:pl-0' : ''
                }`}
            >
              <div className="flex-shrink-0 p-2 rounded-lg bg-white/60 border border-[#b8860b]/20 shadow-xs">
                {getIcon(feature.iconName)}
              </div>
              <div className="space-y-1">
                <h2 className="text-xs sm:text-sm font-extrabold tracking-wider text-stone-900 uppercase">
                  {feature.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
