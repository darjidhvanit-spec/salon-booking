import { useState } from 'react';
import type { FC } from 'react';

const GALLERY_ITEMS = [
  {
    id: 1,
    title: 'Low Skin Fade & Textured Top',
    category: 'fades',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
    barber: 'Marcus Vance',
  },
  {
    id: 2,
    title: 'Executive Scissor Cut & Part',
    category: 'classic',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    barber: 'Elena Rostova',
  },
  {
    id: 3,
    title: 'Sculpted Beard & Razor Lineup',
    category: 'beard',
    image: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=800&q=80',
    barber: 'Dominic Cruz',
  },
  {
    id: 4,
    title: 'Vintage Salon Vibe & Styling',
    category: 'ambiance',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=800&q=80',
    barber: 'MANE Studio',
  },
  {
    id: 5,
    title: 'Modern Taper & Clean Outline',
    category: 'fades',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
    barber: 'Leo Sterling',
  },
  {
    id: 6,
    title: 'Junior Gentleman Crop',
    category: 'classic',
    image: 'https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?auto=format&fit=crop&w=800&q=80',
    barber: 'Marcus Vance',
  },
];

export const GalleryPage: FC = () => {
  const [filter, setFilter] = useState<string>('all');

  const filteredItems = GALLERY_ITEMS.filter((item) =>
    filter === 'all' ? true : item.category === filter
  );

  return (
    <div className="bg-[#faf8f5] py-16 sm:py-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#b8860b]"></span>
            <span className="text-xs font-bold tracking-[0.25em] text-[#b8860b] uppercase">
              LOOKBOOK & PORTFOLIO
            </span>
            <span className="w-6 h-[1px] bg-[#b8860b]"></span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-stone-900 tracking-tight">
            Our <span className="text-[#b8860b] italic font-serif">Masterpieces</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            A visual showcase of recent haircuts, fades, beard sculptures, and salon moments.
          </p>
        </div>

        {/* Filters */}
        <div className="flex justify-center gap-2">
          {[
            { id: 'all', label: 'All Work' },
            { id: 'fades', label: 'Fades & Tapers' },
            { id: 'beard', label: 'Beards & Shaves' },
            { id: 'classic', label: 'Classic Cuts' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className={`px-5 py-2 text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                filter === tab.id
                  ? 'bg-[#121212] text-white'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-stone-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative group overflow-hidden bg-stone-900 border border-stone-200 shadow-md aspect-4/5"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#c59b27]">
                  By {item.barber}
                </span>
                <h3 className="text-base font-serif font-bold text-white mt-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
