import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { SERVICES, BARBERS, REVIEWS } from '../data/mockData';
import type { BookingFormData, Service, Barber, Review } from '../types';

// Simulated API delay for smooth realistic UI feedback
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useServices = () => {
  return useQuery<Service[]>({
    queryKey: ['services'],
    queryFn: async () => {
      await delay(200);
      return SERVICES;
    },
    staleTime: 1000 * 60 * 5, // 5 mins
  });
};

export const useBarbers = () => {
  return useQuery<Barber[]>({
    queryKey: ['barbers'],
    queryFn: async () => {
      await delay(200);
      return BARBERS;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useReviews = () => {
  return useQuery<Review[]>({
    queryKey: ['reviews'],
    queryFn: async () => {
      await delay(200);
      return REVIEWS;
    },
    staleTime: 1000 * 60 * 5,
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookingData: BookingFormData) => {
      await delay(800); // Simulate booking submission
      const newBooking = {
        id: `BK-${Date.now()}`,
        ...bookingData,
        createdAt: new Date().toISOString(),
        status: 'CONFIRMED',
      };
      
      // Store in localStorage for demo persistence
      const currentBookings = JSON.parse(localStorage.getItem('mane_bookings') || '[]');
      currentBookings.push(newBooking);
      localStorage.setItem('mane_bookings', JSON.stringify(currentBookings));
      
      return newBooking;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['bookings'] });
    },
  });
};
