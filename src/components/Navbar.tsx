import React, { useState } from 'react';
import { Menu, X, Scissors, Calendar } from 'lucide-react';

interface NavbarProps {
  activeTab?: string;
  onNavigate?: (tab: string) => void;
  onOpenBooking?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab = 'home',
  onNavigate,
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT' },
    { id: 'services', label: 'SERVICES' },
    { id: 'gallery', label: 'GALLERY' },
    { id: 'pricing', label: 'PRICING' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (id: string) => {
    if (onNavigate) {
      onNavigate(id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#faf8f5]/95 backdrop-blur-md border-b border-stone-200/70 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex flex-col items-center cursor-pointer group select-none"
          >
            <div className="text-2xl sm:text-3xl font-serif font-black tracking-tighter text-stone-900 group-hover:text-[#c59b27] transition-colors leading-none">
              M
            </div>
            <div className="text-sm font-extrabold tracking-[0.25em] text-stone-900">
              MANE
            </div>
            <div className="text-[9px] tracking-[0.2em] text-stone-500 uppercase font-medium flex items-center gap-1">
              <span className="w-2 h-[1px] bg-stone-400"></span>
              BARBERSHOP
              <span className="w-2 h-[1px] bg-stone-400"></span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-xs font-bold tracking-widest transition-colors relative py-1 cursor-pointer ${
                    isActive
                      ? 'text-stone-950 font-extrabold'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#c59b27] rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* CTA Button & Mobile Menu Trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="hidden sm:inline-flex items-center gap-2 bg-[#121212] hover:bg-[#c59b27] text-white px-6 py-2.5 rounded-none text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer group"
            >
              <Calendar className="w-3.5 h-3.5 text-[#c59b27] group-hover:text-white transition-colors" />
              <span>BOOK NOW</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-stone-800 hover:text-[#c59b27] transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf8f5] border-b border-stone-200 px-6 pt-3 pb-6 space-y-4 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left text-sm font-bold tracking-wider py-2 flex items-center justify-between ${
                    isActive ? 'text-[#c59b27]' : 'text-stone-700'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#c59b27]"></span>}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              if (onOpenBooking) onOpenBooking();
            }}
            className="w-full bg-[#121212] hover:bg-[#c59b27] text-white py-3 text-xs font-bold tracking-widest uppercase transition-colors flex items-center justify-center gap-2 mt-2"
          >
            <Scissors className="w-4 h-4 text-[#c59b27]" />
            <span>BOOK APPOINTMENT</span>
          </button>
        </div>
      )}
    </header>
  );
};
