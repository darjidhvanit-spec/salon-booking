export interface Service {
  id: string;
  name: string;
  category: 'hair' | 'beard' | 'combo' | 'treatment';
  price: number;
  duration: string;
  image: string;
  description: string;
  popular?: boolean;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  rating: number;
  reviewsCount: number;
  image: string;
  bio: string;
  specialties: string[];
}

export interface BookingFormData {
  serviceId: string;
  barberId: string;
  date: string;
  time: string;
  customerName: string;
  email: string;
  phone: string;
  notes?: string;
}

export interface Review {
  id: string;
  name: string;
  role?: string;
  avatar: string;
  rating: number;
  comment: string;
  service: string;
  date: string;
}

export interface Feature {
  id: string;
  title: string;
  description: string;
  iconName: 'chair' | 'razor' | 'calendar' | 'shield';
}
