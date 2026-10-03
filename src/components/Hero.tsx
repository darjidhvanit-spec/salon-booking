import { useState, useEffect, useRef } from 'react';
import type { FC } from 'react';
import {
  ArrowRight,
  Star,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Scissors,
  Sparkles,
  Clock,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { CLIENT_AVATARS } from '../data/mockData';

interface HeroProps {
  onBookClick?: () => void;
  onViewServices?: () => void;
}

interface HeroSlide {
  id: string;
  category: string;
  title: string;
  subtitle: string;
  tag: string;
  duration: string;
  image: string;
  accent: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'fade-scissor',
    category: 'Signature Cut',
    tag: 'MASTER STYLIST',
    title: 'Precision Fade & Scissor Craft',
    subtitle: 'Sculpted to your head shape with hot lather neck shave & custom styling.',
    duration: '45 mins • Classic & Modern',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=85',
    accent: '#c59b27',
  },
  {
    id: 'hot-shave',
    category: 'Royal Shave',
    tag: 'TRADITIONAL LUXURY',
    title: 'Straight-Razor & 3x Steam Towel',
    subtitle: 'Pre-shave essential oils, warm steam infusion and cold soothing aloe finish.',
    duration: '45 mins • Pure Relaxation',
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=1200&q=85',
    accent: '#d4af37',
  },
  {
    id: 'beard-sculpt',
    category: 'Beard Sculpting',
    tag: 'RAZOR SHARP',
    title: 'Custom Beard Detailing & Lineup',
    subtitle: 'Symmetrical contouring, straight razor edging, and argan beard treatment.',
    duration: '30 mins • Sharp Contour',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=1200&q=85',
    accent: '#e6ca65',
  },
  {
    id: 'vip-lounge',
    category: 'VIP Experience',
    tag: 'EST. 2012',
    title: 'The Gentlemen’s Sanctuary',
    subtitle: 'Vintage leather chairs, single-malt scotch, and an unmatched grooming retreat.',
    duration: 'Full Service • Exclusive Lounge',
    image: 'https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&w=1200&q=85',
    accent: '#b8860b',
  },
];

export const Hero: FC<HeroProps> = ({ onBookClick, onViewServices }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const slideIntervalRef = useRef<number | null>(null);

  const SLIDE_DURATION = 5000; // 5 seconds per slide
  const TICK_RATE = 50; // Update progress every 50ms

  // Handle slide transitions & auto progress timer
  useEffect(() => {
    if (!isPlaying || isHovered) {
      if (slideIntervalRef.current) clearInterval(slideIntervalRef.current);
      return;
    }

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentSlide((curr) => (curr + 1) % HERO_SLIDES.length);
          return 0;
        }
        return prev + (TICK_RATE / SLIDE_DURATION) * 100;
      });
    }, TICK_RATE);

    slideIntervalRef.current = timer as unknown as number;

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlaying, isHovered, currentSlide]);

  const handleSelectSlide = (index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSlide((curr) => (curr === 0 ? HERO_SLIDES.length - 1 : curr - 1));
    setProgress(0);
  };

  const handleNext = () => {
    setCurrentSlide((curr) => (curr + 1) % HERO_SLIDES.length);
    setProgress(0);
  };

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#faf8f5] via-[#f7f3eb] to-[#f2ece1] pt-8 pb-16 lg:py-20">

      {/* Background Subtle Ambient Lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#c59b27]/10 rounded-full blur-3xl pointer-events-none -z-0"></div>
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-[#dfb94f]/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">

          {/* Left Hero Content */}
          <div className="lg:col-span-6 z-10 space-y-6 sm:space-y-8 animate-fade-in">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 shadow-xs">
              <span className="h-2 w-2 rounded-full bg-[#b8860b] animate-ping"></span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#b8860b]"></span>
              <span className="text-xs font-bold tracking-[0.25em] text-[#8c6507] uppercase">
                LOOK GOOD. FEEL CONFIDENT.
              </span>
            </div>

            {/* Main Luxury Title */}
            <h1 className="text-4xl sm:text-6xl lg:text-[4.6rem] font-serif tracking-tight text-stone-900 leading-[1.06]">
              More Than <br />
              a <span className="italic font-normal text-[#b8860b] font-serif relative">
                Haircut
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#c59b27]/40 pointer-events-none"
                  viewBox="0 0 200 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C50 3 150 2 197 9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-stone-600 text-base sm:text-lg max-w-md font-normal leading-relaxed">
              Precision cuts. Clean fades. <br />
              Elevated grooming for the modern gentleman who demands excellence.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onBookClick}
                className="inline-flex items-center justify-center gap-3 bg-[#121212] hover:bg-[#c59b27] text-white px-7 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-300 shadow-lg hover:shadow-[#c59b27]/20 hover:-translate-y-0.5 cursor-pointer group rounded-xs"
              >
                <span>BOOK YOUR APPOINTMENT</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-[#c59b27] group-hover:text-white" />
              </button>

              <button
                onClick={onViewServices}
                className="inline-flex items-center justify-center bg-white/90 hover:bg-white text-stone-900 border border-stone-300 px-7 py-4 text-xs font-bold tracking-widest uppercase transition-all duration-200 hover:border-stone-900 shadow-sm hover:shadow cursor-pointer rounded-xs"
              >
                VIEW SERVICES
              </button>
            </div>

            {/* Social Proof (Happy Clients) */}
            <div className="pt-4 sm:pt-6 flex flex-wrap items-center gap-5 border-t border-stone-200/80">
              {/* Overlapping Avatars */}
              <div className="flex -space-x-3 overflow-hidden">
                {CLIENT_AVATARS.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`Satisfied client ${index + 1}`}
                    className="inline-block h-11 w-11 rounded-full ring-2 ring-[#faf8f5] object-cover shadow-sm transition-transform hover:scale-110 hover:z-10"
                  />
                ))}
              </div>

              {/* Rating & Count */}
              <div>
                <div className="text-xs font-bold tracking-wider text-stone-900 uppercase flex items-center gap-1.5">
                  <span>1K+ HAPPY CLIENTS</span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
                <div className="flex items-center gap-1.5 text-[#c59b27] mt-0.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-[#c59b27] text-[#c59b27]"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-stone-800">4.98 / 5.0</span>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-stone-500 pl-2 border-l border-stone-300/70">
                <ShieldCheck className="w-4 h-4 text-[#c59b27]" />
                <span>100% Satisfaction Guaranteed</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Showcase with Rich Animations */}
          <div className="lg:col-span-6 relative">

            {/* Ambient Golden Halo Glow behind showcase */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#c59b27]/30 via-[#dfb94f]/20 to-[#a27a1b]/20 rounded-3xl blur-2xl animate-pulse-glow pointer-events-none -z-10"></div>

            {/* Main Showcase Container */}
            <div
              className="relative mx-auto max-w-lg lg:max-w-none group"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >

              {/* Outer Decorative Luxury Border */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-stone-950 border border-[#c59b27]/40 ring-1 ring-white/10">

                {/* Images Layer with Crossfade & Ken-Burns Zoom */}
                <div className="relative h-[440px] sm:h-[500px] lg:h-[540px] w-full overflow-hidden bg-stone-900">
                  {HERO_SLIDES.map((slide, index) => {
                    const isActive = index === currentSlide;
                    return (
                      <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                          }`}
                      >
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className={`w-full h-full object-cover object-center transition-transform duration-7000 ease-out ${isActive ? 'scale-105' : 'scale-100'
                            }`}
                        />
                      </div>
                    );
                  })}

                  {/* Gradient overlays for readability and luxury depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/95 via-stone-950/30 to-stone-950/20 z-10 pointer-events-none"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-stone-950/50 via-transparent to-stone-950/30 z-10 pointer-events-none"></div>

                  {/* Top-Right Rotating Luxury Stamp Badge */}
                  <div className="absolute top-4 right-4 z-20 hidden sm:flex items-center justify-center">
                    <div className="relative w-20 h-20 flex items-center justify-center">
                      <svg
                        className="absolute inset-0 w-full h-full animate-rotate-slow text-[#c59b27]/80"
                        viewBox="0 0 100 100"
                      >
                        <defs>
                          <path
                            id="circlePath"
                            d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0"
                          />
                        </defs>
                        <text className="text-[8.5px] font-bold tracking-[0.22em] uppercase fill-[#dfb94f]">
                          <textPath href="#circlePath">
                            ★ MANE BARBERSHOP ★ LUXURY CRAFT ★
                          </textPath>
                        </text>
                      </svg>
                      <div className="w-10 h-10 rounded-full bg-[#121212]/90 border border-[#c59b27]/60 flex items-center justify-center text-[#dfb94f] shadow-lg backdrop-blur-md">
                        <Scissors className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Top-Left Live Status Floating Tag */}
                  <div className="absolute top-4 left-4 z-20 animate-float-slow">
                    <button
                      onClick={onBookClick}
                      className="group/tag inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-stone-900/85 backdrop-blur-md border border-[#c59b27]/40 text-stone-200 text-xs shadow-lg hover:border-[#c59b27] hover:bg-stone-900 transition-all cursor-pointer"
                    >
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                      </span>
                      <span className="font-medium text-stone-300">Barbers Ready</span>
                      <span className="text-[#dfb94f] font-bold group-hover/tag:translate-x-0.5 transition-transform">
                        • Book Slot →
                      </span>
                    </button>
                  </div>

                  {/* Manual Arrow Controls (Appear on hover) */}
                  <button
                    onClick={handlePrev}
                    aria-label="Previous Slide"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#c59b27] text-white border border-white/20 hover:border-[#c59b27] flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-110 shadow-lg"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <button
                    onClick={handleNext}
                    aria-label="Next Slide"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/60 hover:bg-[#c59b27] text-white border border-white/20 hover:border-[#c59b27] flex items-center justify-center opacity-80 hover:opacity-100 transition-all duration-300 backdrop-blur-md cursor-pointer hover:scale-110 shadow-lg"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  {/* Bottom Active Slide Details Content Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 sm:p-7 z-20">
                    {/* Badge and Duration */}
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#c59b27]/20 border border-[#c59b27]/50 text-[#dfb94f] text-[11px] font-bold tracking-widest uppercase">
                        <Sparkles className="w-3 h-3 text-[#dfb94f]" />
                        <span>{activeSlideData.tag}</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-stone-300 text-xs bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded border border-white/10">
                        <Clock className="w-3.5 h-3.5 text-[#dfb94f]" />
                        <span>{activeSlideData.duration}</span>
                      </div>
                    </div>

                    {/* Slide Title */}
                    <h3 className="text-xl sm:text-2xl font-serif text-white tracking-wide font-medium">
                      {activeSlideData.title}
                    </h3>

                    {/* Slide Subtitle */}
                    <p className="text-stone-300 text-xs sm:text-sm mt-1 max-w-md line-clamp-2">
                      {activeSlideData.subtitle}
                    </p>

                    {/* Progress Bar & Indicators */}
                    <div className="mt-4 pt-3 border-t border-white/15 flex items-center justify-between gap-4">

                      {/* Slide Thumbnail / Category Navigation Tabs */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {HERO_SLIDES.map((slide, idx) => {
                          const isCurrent = idx === currentSlide;
                          return (
                            <button
                              key={slide.id}
                              onClick={() => handleSelectSlide(idx)}
                              className={`relative px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 cursor-pointer overflow-hidden ${isCurrent
                                ? 'bg-[#c59b27] text-stone-950 font-bold shadow-md shadow-[#c59b27]/30 scale-105'
                                : 'bg-white/10 hover:bg-white/20 text-stone-300 border border-white/10 hover:border-white/30'
                                }`}
                            >
                              <span>{slide.category}</span>
                              {isCurrent && isPlaying && !isHovered && (
                                <div
                                  className="absolute bottom-0 left-0 h-[2px] bg-stone-950 transition-all"
                                  style={{ width: `${progress}%` }}
                                />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      {/* Play/Pause Button */}
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/25 text-white/80 hover:text-white border border-white/10 flex items-center justify-center transition-colors cursor-pointer shrink-0"
                      >
                        {isPlaying ? (
                          <Pause className="w-3.5 h-3.5" />
                        ) : (
                          <Play className="w-3.5 h-3.5 ml-0.5" />
                        )}
                      </button>

                    </div>
                  </div>

                </div>

              </div>

              {/* Floating Live Stylist Card (Bottom-Left overlap) */}
              <div className="absolute -bottom-6 -left-4 sm:-left-6 z-30 animate-float-slow hidden sm:block">
                <div
                  onClick={onBookClick}
                  className="group/card gold-glass p-3.5 rounded-2xl shadow-2xl flex items-center gap-3.5 cursor-pointer hover:border-[#c59b27] hover:scale-105 transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                      alt="Marcus Vance"
                      className="w-12 h-12 rounded-xl object-cover ring-2 ring-[#c59b27]/80"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-stone-900 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold tracking-widest text-[#dfb94f] uppercase flex items-center gap-1">
                      <span>MASTER BARBER</span>
                    </div>
                    <div className="text-xs font-bold text-white tracking-wide">
                      Marcus Vance
                    </div>
                    <div className="text-[11px] text-stone-300 font-medium flex items-center gap-1.5 mt-0.5">
                      <span className="text-emerald-400 font-bold">Next Slot: 10:30 AM</span>
                      <span className="text-[#c59b27] group-hover/card:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Rating Badge (Bottom-Right overlap) */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 z-30 animate-float-reverse">
                <div className="gold-glass p-3.5 sm:p-4 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#c59b27]/40">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#c59b27] to-[#8c6507] flex items-center justify-center text-white shadow-inner font-serif font-bold text-lg">
                    ★
                  </div>
                  <div>
                    <div className="text-xs font-bold tracking-wider text-white uppercase flex items-center gap-1">
                      <span>Rated #1 Barbershop</span>
                    </div>
                    <div className="text-[11px] text-[#dfb94f] font-semibold flex items-center gap-1 mt-0.5">
                      <span>4.98 Rating</span>
                      <span className="text-stone-400">• Voted Best 2024</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

