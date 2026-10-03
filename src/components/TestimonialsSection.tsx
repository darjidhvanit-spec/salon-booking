import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useReviews } from '../services/api';

export const TestimonialsSection: React.FC = () => {
  const { data: reviews } = useReviews();

  return (
    <section className="bg-[#f7f4ee] py-20 border-t border-stone-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <div className="flex items-center justify-center gap-2">
            <span className="h-[1px] w-6 bg-[#b8860b]"></span>
            <span className="text-xs font-bold tracking-[0.25em] text-[#b8860b] uppercase">
              CLIENT TESTIMONIALS
            </span>
            <span className="h-[1px] w-6 bg-[#b8860b]"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-stone-900">
            Trusted By Gentlemen of <span className="italic font-serif text-[#b8860b]">Taste</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Read authentic reviews from clients who experience our craft day in and day out.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews?.map((review) => (
            <div
              key={review.id}
              className="bg-white p-8 border border-stone-200/80 relative shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 text-[#b8860b]/20 absolute top-6 right-6" />

              <div className="space-y-4">
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-[#c59b27]">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#c59b27] text-[#c59b27]" />
                  ))}
                </div>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed italic font-normal">
                  "{review.comment}"
                </p>
              </div>

              {/* Author */}
              <div className="pt-6 mt-6 border-t border-stone-100 flex items-center gap-3.5">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-11 h-11 rounded-full object-cover ring-2 ring-[#c59b27]/30"
                />
                <div>
                  <h4 className="text-xs font-bold text-stone-900 tracking-wider uppercase">
                    {review.name}
                  </h4>
                  <p className="text-[11px] text-[#b8860b] font-medium">
                    {review.service}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
