import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';

interface PromoBannerProps {
  onBookClick?: () => void;
}

export const PromoBanner: React.FC<PromoBannerProps> = ({ onBookClick }) => {
  return (
    <section className="bg-[#faf8f5] pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden shadow-2xl">
          
          {/* Left Dark Card - Your Style, Our Passion */}
          <div className="lg:col-span-7 relative bg-[#141414] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between min-h-[380px] overflow-hidden group">
            
            {/* Background Image with Dark Vignette */}
            <div className="absolute inset-0 z-0 opacity-25 group-hover:opacity-35 transition-opacity duration-700">
              <img
                src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=80"
                alt="Luxury barbershop vintage interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/80 to-transparent"></div>
            </div>

            {/* Content Top */}
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[1px] bg-[#c59b27]"></span>
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-stone-400 uppercase">
                  WALK IN OR BOOK ONLINE
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-white leading-tight">
                Your Style, <br />
                Our Passion.
              </h2>

              <p className="text-stone-300 text-xs sm:text-sm max-w-md font-light leading-relaxed">
                Experience the perfect blend of style, comfort, and confidence.
              </p>
            </div>

            {/* Handwritten / Script Signature */}
            <div className="relative z-10 pt-8">
              <span className="text-3xl sm:text-4xl text-[#c59b27] font-script tracking-wide block">
                Mane Barbershop
              </span>
            </div>
          </div>

          {/* Right Light Card - Book Your Appointment Today */}
          <div className="lg:col-span-5 bg-[#f5f1ea] border-t lg:border-t-0 lg:border-l border-stone-300/80 p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start space-y-6">
            
            {/* Calendar Icon Badge */}
            <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 shadow-sm flex items-center justify-center text-[#b8860b]">
              <Calendar className="w-6 h-6 stroke-[1.5]" />
            </div>

            {/* Subtitle */}
            <div className="text-xs font-extrabold tracking-[0.2em] text-[#b8860b] uppercase">
              READY FOR A FRESH LOOK?
            </div>

            {/* Title */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-stone-900 leading-snug">
              Book Your <br />
              Appointment Today
            </h3>

            {/* Book Now Button */}
            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-3 bg-[#121212] hover:bg-[#c59b27] text-white px-8 py-3.5 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md hover:shadow-xl cursor-pointer group"
            >
              <span>BOOK NOW</span>
              <ArrowRight className="w-4 h-4 text-[#c59b27] group-hover:text-white transition-transform group-hover:translate-x-1" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
