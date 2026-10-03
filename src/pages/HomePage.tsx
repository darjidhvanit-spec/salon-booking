import type { FC } from 'react';
import {
  Hero,
  Features,
  ServicesSection,
  PromoBanner,
  TestimonialsSection,
} from '../components';
import type { Service } from '../types';

interface HomePageProps {
  onOpenBooking: () => void;
  onSelectService: (service: Service) => void;
  onNavigate: (tab: string) => void;
}

export const HomePage: FC<HomePageProps> = ({
  onOpenBooking,
  onSelectService,
  onNavigate,
}) => {
  return (
    <main>
      {/* 1. Hero Section */}
      <Hero
        onBookClick={onOpenBooking}
        onViewServices={() => onNavigate('services')}
      />

      {/* 2. 4-Column Feature Bar */}
      <Features />

      {/* 3. Services Section with Slider */}
      <ServicesSection
        onSelectService={(service) => {
          onSelectService(service);
          onOpenBooking();
        }}
        onViewAll={() => onNavigate('services')}
      />

      {/* 4. Split Promo Banner */}
      <PromoBanner onBookClick={onOpenBooking} />

      {/* 5. Client Testimonials */}
      <TestimonialsSection />
    </main>
  );
};
