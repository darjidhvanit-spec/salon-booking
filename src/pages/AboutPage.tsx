import type { FC } from 'react';
import { useBarbers } from '../services/api';
import { ArrowRight } from 'lucide-react';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: FC<AboutPageProps> = ({ onOpenBooking }) => {
  const { data: barbers } = useBarbers();

  return (
    <div className="bg-[#faf8f5] py-16 sm:py-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Story Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-2">
              <span className="w-6 h-[1px] bg-[#b8860b]"></span>
              <span className="text-xs font-bold tracking-[0.25em] text-[#b8860b] uppercase">
                THE MANE LEGACY
              </span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-serif text-stone-900 leading-tight">
              A Haven of <br />
              <span className="text-[#b8860b] italic font-serif">Craftsmanship</span> & Style
            </h1>

            <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
              Established with a singular mission: to restore the time-honored barbershop tradition while pioneering modern precision styling. At MANE, every haircut is an bespoke experience, tailored to emphasize individual character and elevate personal confidence.
            </p>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              From our custom Italian leather chairs to our signature essential-oil infused hot steam towels, no detail is overlooked. We invite you to sit back, relax with a complimentary beverage, and let our artisans redefine your grooming routine.
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-3 bg-[#121212] hover:bg-[#c59b27] text-white px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-md cursor-pointer"
              >
                <span>BOOK AN APPOINTMENT</span>
                <ArrowRight className="w-4 h-4 text-[#c59b27]" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1512690459411-b9245aed614b?auto=format&fit=crop&w=1200&q=80"
                alt="MANE Barbershop interior"
                className="w-full h-[450px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white p-4 bg-[#121212]/80 backdrop-blur-xs border border-stone-700">
                <div className="text-xs font-extrabold tracking-widest uppercase text-[#c59b27]">
                  Master Craftsmanship
                </div>
                <div className="text-xs text-stone-300 mt-0.5">
                  Over 10,000+ Precision haircuts delivered since 2018
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Master Barbers Team Section */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="text-xs font-bold tracking-[0.25em] text-[#b8860b] uppercase">
              OUR ARTISANS
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif text-stone-900">
              Meet the <span className="text-[#b8860b] italic font-serif">Master Barbers</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              Each barber at MANE brings years of international training, precision mastery, and a true passion for grooming.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {barbers?.map((barber) => (
              <div
                key={barber.id}
                className="bg-white border border-stone-200/90 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-64 overflow-hidden bg-stone-900">
                  <img
                    src={barber.image}
                    alt={barber.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider">
                    {barber.name}
                  </h3>
                  <div className="text-xs text-[#b8860b] font-medium">
                    {barber.role}
                  </div>
                  <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {barber.bio}
                  </p>
                  <div className="pt-2 flex flex-wrap gap-1">
                    {barber.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded-none font-medium"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
