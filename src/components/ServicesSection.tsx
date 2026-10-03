import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useServices } from '../services/api';
import type { Service } from '../types';

interface ServicesSectionProps {
  onSelectService?: (service: Service) => void;
  onViewAll?: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onViewAll,
}) => {
  const { data: services, isLoading } = useServices();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-[#faf8f5] py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
          <div className="lg:col-span-8 space-y-4">
            {/* Tag */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold tracking-[0.25em] text-[#b8860b] uppercase">
                OUR SERVICES
              </span>
              <span className="h-[1px] w-8 bg-[#b8860b]"></span>
            </div>

            {/* Title */}
            <h2 className="text-3xl sm:text-5xl font-serif tracking-tight text-stone-900 leading-tight">
              Precision in <br className="hidden sm:inline" />
              Every <span className="text-[#b8860b] italic font-serif">Detail</span>
            </h2>

            {/* Description */}
            <p className="text-stone-600 text-sm sm:text-base max-w-lg font-normal">
              From timeless cuts to modern styles, we've got you covered.
            </p>
          </div>

          <div className="lg:col-span-4 lg:text-right">
            <button
              onClick={onViewAll}
              className="inline-flex items-center justify-center bg-[#121212] hover:bg-[#c59b27] text-white px-7 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
            >
              VIEW ALL SERVICES
            </button>
          </div>
        </div>

        {/* Services Cards Grid / Slider */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-stone-200 h-96 rounded-none"></div>
            ))}
          </div>
        ) : (
          <div
            ref={scrollContainerRef}
            className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-6 overflow-x-auto pb-4 sm:pb-0 scrollbar-none snap-x"
          >
            {services?.slice(0, 4).map((service) => (
              <div
                key={service.id}
                onClick={() => onSelectService?.(service)}
                className="min-w-[270px] sm:min-w-0 bg-[#f4efe8] flex-1 flex flex-col group cursor-pointer border border-stone-200/80 hover:border-[#c59b27] transition-all duration-300 hover:shadow-xl snap-start"
              >
                {/* Image Container */}
                <div className="relative h-64 sm:h-72 overflow-hidden bg-stone-900">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                  />
                  {service.popular && (
                    <div className="absolute top-3 right-3 bg-[#c59b27] text-white text-[10px] font-extrabold tracking-widest uppercase px-2.5 py-1 flex items-center gap-1 shadow-md">
                      <Sparkles className="w-3 h-3" />
                      Popular
                    </div>
                  )}
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#121212]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-stone-900 text-xs font-bold tracking-widest uppercase px-4 py-2 shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      Book Service
                    </span>
                  </div>
                </div>

                {/* Details Footer */}
                <div className="p-5 flex-1 flex flex-col justify-between bg-[#f5f1ea]">
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold tracking-wider text-stone-900 uppercase group-hover:text-[#b8860b] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-stone-500 mt-1 line-clamp-2">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-300/60 flex items-center justify-between">
                    <span className="text-sm font-extrabold text-stone-900 font-serif">
                      ${service.price}
                    </span>
                    <span className="text-[11px] text-stone-500 font-medium">
                      {service.duration}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Navigation Slider Controls (< >) */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={() => handleScroll('left')}
            className="w-10 h-10 rounded-full border border-stone-300 hover:border-stone-900 flex items-center justify-center text-stone-700 hover:text-stone-950 transition-colors bg-white shadow-xs cursor-pointer active:scale-95"
            aria-label="Previous Services"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleScroll('right')}
            className="w-10 h-10 rounded-full border border-stone-300 hover:border-stone-900 flex items-center justify-center text-stone-700 hover:text-stone-950 transition-colors bg-white shadow-xs cursor-pointer active:scale-95"
            aria-label="Next Services"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};
