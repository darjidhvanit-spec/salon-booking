import type { FC } from 'react';
import { Check, Sparkles, ArrowRight } from 'lucide-react';

interface PricingPageProps {
  onOpenBooking: () => void;
}

export const PricingPage: FC<PricingPageProps> = ({ onOpenBooking }) => {
  const membershipPlans = [
    {
      name: 'Silver Club',
      price: 65,
      period: '/ month',
      description: 'Ideal for the gentleman who keeps their cut sharp bi-weekly.',
      features: [
        '2 Precision Haircuts per month',
        'Complimentary Neck & Ear Shave',
        '10% off all retail styling products',
        'Priority online scheduling',
      ],
      popular: false,
    },
    {
      name: 'Gold Executive',
      price: 110,
      period: '/ month',
      description: 'Our most comprehensive package for total grooming mastery.',
      features: [
        'Unlimited Haircuts & Beard Trims',
        '1 Hot Towel Royal Shave monthly',
        'Free scalp detox treatment',
        '20% off all retail grooming products',
        'Complimentary premium whiskey/espresso',
        'Dedicated VIP chair booking',
      ],
      popular: true,
    },
    {
      name: 'Platinum Grooming',
      price: 180,
      period: '/ month',
      description: 'The ultimate luxury experience for executives and tastemakers.',
      features: [
        'All Gold benefits included',
        'Weekly full signature service combo',
        'Family/Guest pass (1 haircut/mo)',
        'Private salon after-hours booking',
        'Complimentary grooming care gift box',
      ],
      popular: false,
    },
  ];

  return (
    <div className="bg-[#faf8f5] py-16 sm:py-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2">
            <span className="w-6 h-[1px] bg-[#b8860b]"></span>
            <span className="text-xs font-bold tracking-[0.25em] text-[#b8860b] uppercase">
              TRANSPARENT PRICING
            </span>
            <span className="w-6 h-[1px] bg-[#b8860b]"></span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif text-stone-900 tracking-tight">
            VIP Memberships & <span className="text-[#b8860b] italic font-serif">Plans</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600">
            Enjoy exclusive grooming privileges, priority appointments, and substantial savings with our monthly membership tiers.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {membershipPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white border p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${
                plan.popular
                  ? 'border-[#c59b27] shadow-2xl ring-1 ring-[#c59b27] -translate-y-2'
                  : 'border-stone-200/90 shadow-sm hover:shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#121212] text-[#c59b27] text-[10px] font-extrabold tracking-widest uppercase px-4 py-1 flex items-center gap-1 shadow-md border border-[#c59b27]">
                  <Sparkles className="w-3 h-3" />
                  MOST POPULAR
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-serif font-bold text-stone-900 uppercase">
                    {plan.name}
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    {plan.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl sm:text-5xl font-serif font-extrabold text-stone-900">
                    ${plan.price}
                  </span>
                  <span className="text-xs text-stone-500 font-medium">
                    {plan.period}
                  </span>
                </div>

                <div className="h-[1px] bg-stone-200 w-full"></div>

                {/* Features List */}
                <ul className="space-y-3">
                  {plan.features.map((feat, fIndex) => (
                    <li key={fIndex} className="flex items-start gap-2.5 text-xs text-stone-700">
                      <Check className="w-4 h-4 text-[#b8860b] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <button
                  onClick={onOpenBooking}
                  className={`w-full py-3.5 text-xs font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    plan.popular
                      ? 'bg-[#121212] hover:bg-[#c59b27] text-white shadow-md'
                      : 'bg-[#f7f4ee] hover:bg-stone-900 hover:text-white text-stone-900 border border-stone-300'
                  }`}
                >
                  <span>Select Membership</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
