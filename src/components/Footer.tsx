import { useState } from 'react';
import type { FC, FormEvent } from 'react';
import {
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
} from 'lucide-react';

const InstagramIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TikTokIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const YoutubeIcon = ({ className = 'w-4 h-4' }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor" stroke="none" />
  </svg>
);

interface FooterProps {
  onNavigate?: (tab: string) => void;
  onOpenBooking?: () => void;
}

export const Footer: FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer className="bg-[#faf8f5] border-t border-stone-200/90 text-stone-700 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-stone-300/70">
          
          {/* Col 1: Brand & Socials (3 cols on LG) */}
          <div className="lg:col-span-3 space-y-4">
            {/* Logo */}
            <div
              onClick={() => onNavigate?.('home')}
              className="inline-flex flex-col items-start cursor-pointer group"
            >
              <div className="text-2xl font-serif font-black tracking-tight text-stone-900 group-hover:text-[#c59b27] transition-colors leading-none">
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

            <p className="text-xs text-stone-600 leading-relaxed max-w-xs font-normal">
              Precision cuts. Clean fades. <br />
              Premium grooming for the modern man.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full border border-stone-300 hover:border-stone-900 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full border border-stone-300 hover:border-stone-900 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="#tiktok"
                aria-label="TikTok"
                className="w-8 h-8 rounded-full border border-stone-300 hover:border-stone-900 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors text-xs font-bold"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full border border-stone-300 hover:border-stone-900 flex items-center justify-center text-stone-600 hover:text-stone-900 transition-colors"
              >
                <YoutubeIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2 cols on LG) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold tracking-widest text-stone-900 uppercase">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About Us', id: 'about' },
                { label: 'Services', id: 'services' },
                { label: 'Gallery', id: 'gallery' },
                { label: 'Pricing', id: 'pricing' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate?.(item.id)}
                    className="text-stone-600 hover:text-[#b8860b] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Services (2 cols on LG) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold tracking-widest text-stone-900 uppercase">
              SERVICES
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                'Haircut',
                'Beard Trim',
                'Hair Wash',
                'Kids Cut',
                'Shave',
                'Hair Styling',
              ].map((serviceName) => (
                <li key={serviceName}>
                  <button
                    onClick={() => onOpenBooking?.()}
                    className="text-stone-600 hover:text-[#b8860b] transition-colors cursor-pointer"
                  >
                    {serviceName}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Us (2.5 cols on LG) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-extrabold tracking-widest text-stone-900 uppercase">
              CONTACT US
            </h4>
            <ul className="space-y-2.5 text-xs text-stone-600">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#b8860b] shrink-0 mt-0.5" />
                <span>123 Barber Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                <span>(123) 456-7890</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                <span className="truncate">hello@manebarbershop.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-[#b8860b] shrink-0" />
                <span>Mon - Sun: 9AM - 8PM</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter (2.5 cols on LG) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold tracking-widest text-stone-900 uppercase">
              NEWSLETTER
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Stay updated with our latest offers and style tips.
            </p>

            <form onSubmit={handleSubscribe} className="pt-1">
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white border border-stone-300 text-stone-900 text-xs px-3.5 py-2.5 pr-10 focus:outline-none focus:border-[#b8860b] transition-colors rounded-none placeholder:text-stone-400"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-transparent hover:text-[#b8860b] text-stone-600 flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {subscribed && (
                <div className="flex items-center gap-1.5 text-[11px] text-green-700 mt-2 font-medium animate-fade-in">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Thank you for subscribing!</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 text-center text-[11px] text-stone-500 font-medium">
          © 2024 Mane Barbershop. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};
