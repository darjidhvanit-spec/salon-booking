import { useState, useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TopBanner, Navbar, Footer, BookingModal } from './components';
import {
  HomePage,
  AboutPage,
  ServicesPage,
  GalleryPage,
  PricingPage,
  ContactPage,
  BookingPage,
} from './pages';
import type { Service } from './types';

// Create a singleton TanStack Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5,
    },
  },
});

function MainApp() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Scroll to top smoothly when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  const handleOpenBooking = (service?: Service) => {
    if (service) {
      setSelectedService(service);
    }
    setIsBookingModalOpen(true);
  };

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5] text-stone-900 selection:bg-[#c59b27] selection:text-white">
      {/* 1. Top Offer Banner */}
      <TopBanner onBookClick={() => handleOpenBooking()} />

      {/* 2. Main Luxury Navbar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* 3. Page Routing View */}
      <div className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onOpenBooking={() => handleOpenBooking()}
            onSelectService={(service) => handleOpenBooking(service)}
            onNavigate={handleNavigate}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage onOpenBooking={() => handleOpenBooking()} />
        )}

        {activeTab === 'services' && (
          <ServicesPage
            onSelectService={(service) => handleOpenBooking(service)}
            onOpenBooking={() => setIsBookingModalOpen(true)}
          />
        )}

        {activeTab === 'gallery' && <GalleryPage />}

        {activeTab === 'pricing' && (
          <PricingPage onOpenBooking={() => handleOpenBooking()} />
        )}

        {activeTab === 'contact' && <ContactPage />}

        {activeTab === 'booking' && (
          <BookingPage
            initialService={selectedService}
            onNavigateHome={() => setActiveTab('home')}
          />
        )}
      </div>

      {/* 4. Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* 5. Booking Modal (TanStack Query Powered) */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => {
          setIsBookingModalOpen(false);
          setSelectedService(null);
        }}
        preSelectedService={selectedService}
      />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainApp />
    </QueryClientProvider>
  );
}
