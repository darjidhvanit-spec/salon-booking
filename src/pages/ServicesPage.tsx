import React, { useState } from 'react';
import { useServices } from '../services/api';
import type { Service } from '../types';
import { Sparkles, Clock, ArrowRight } from 'lucide-react';

interface ServicesPageProps {
  onSelectService: (service: Service) => void;
  onOpenBooking: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectService,
  onOpenBooking,
}) => {
  const { data: services, isLoading } = useServices();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'hair', label: 'Haircuts & Styling' },
    { id: 'beard', label: 'Beard Grooming' },
    { id: 'treatment', label: 'Spa & Scalp' },
    { id: 'combo', label: 'Signature Packages' },
  ];

  const filteredServices = services?.filter((s) =>
    activeCategory === 'all' ? true : s.category === activeCategory
  );

  return (
    <div className="bg-[#faf8f5] py-16 sm:py-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#b8860b]"></span>
            <span className="text-xs font-bold tracking-[0.25em] text-[#b8860b] uppercase">
              OUR MENU
            </span>
            <span className="w-6 h-[1px] bg-[#b8860b]"></span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-stone-900 tracking-tight">
            Services & <span className="text-[#b8860b] italic font-serif">Treatments</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Every service includes a complimentary beverage, hot towel neck shave, and bespoke styling consultation.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#121212] text-white shadow-md'
                  : 'bg-white text-stone-700 border border-stone-300 hover:border-stone-900'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Services List Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-80 bg-stone-200"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices?.map((service) => (
              <div
                key={service.id}
                className="bg-white border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Photo */}
                  <div className="relative h-56 overflow-hidden bg-stone-900">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {service.popular && (
                      <div className="absolute top-3 right-3 bg-[#c59b27] text-white text-[10px] font-extrabold tracking-widest uppercase px-3 py-1 shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Popular
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-base font-serif font-bold text-stone-900 uppercase">
                        {service.name}
                      </h3>
                      <span className="text-lg font-serif font-extrabold text-[#b8860b]">
                        ${service.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-stone-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{service.duration}</span>
                    </div>

                    <p className="text-xs text-stone-600 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Card Action */}
                <div className="p-6 pt-0">
                  <button
                    onClick={() => {
                      onSelectService(service);
                      onOpenBooking();
                    }}
                    className="w-full bg-[#f7f4ee] hover:bg-[#121212] hover:text-white text-stone-900 border border-stone-300 py-3 text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer group/btn"
                  >
                    <span>Book This Service</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#b8860b] group-hover/btn:text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
