import type { FC } from 'react';
import { Scissors } from 'lucide-react';

interface TopBannerProps {
  onBookClick?: () => void;
}

export const TopBanner: FC<TopBannerProps> = ({ onBookClick }) => {
  return (
    <div className="bg-[#121212] text-white py-2 px-4 text-xs sm:text-sm font-medium tracking-wider flex items-center justify-center gap-2 border-b border-stone-800">
      <Scissors className="w-3.5 h-3.5 text-[#c59b27] -rotate-45" />
      <span className="uppercase text-stone-300">
        Book online & get <strong className="text-[#c59b27] font-semibold">10% OFF</strong> your first visit
      </span>
      {onBookClick && (
        <button
          onClick={onBookClick}
          className="ml-2 underline text-[#c59b27] hover:text-white transition-colors cursor-pointer text-xs"
        >
          Claim Offer
        </button>
      )}
    </div>
  );
};
