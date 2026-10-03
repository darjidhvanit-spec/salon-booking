import type { Service, Barber, Feature, Review } from '../types';

export const FEATURES: Feature[] = [
  {
    id: 'f1',
    title: 'EXPERT BARBERS',
    description: 'Skilled professionals who care.',
    iconName: 'chair',
  },
  {
    id: 'f2',
    title: 'PREMIUM PRODUCTS',
    description: 'We use only top quality products.',
    iconName: 'razor',
  },
  {
    id: 'f3',
    title: 'EASY BOOKING',
    description: 'Book online in seconds and save your time.',
    iconName: 'calendar',
  },
  {
    id: 'f4',
    title: 'HYGIENE FIRST',
    description: 'We follow the highest standards of hygiene.',
    iconName: 'shield',
  },
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'HAIRCUT',
    category: 'hair',
    price: 35,
    duration: '45 mins',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80',
    description: 'Precision scissor and clipper cut tailored to your head shape and desired style, finished with hot neck shave and styling.',
    popular: true,
  },
  {
    id: 's2',
    name: 'BEARD TRIM',
    category: 'beard',
    price: 20,
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1517832606299-7ae9b720a186?auto=format&fit=crop&w=800&q=80',
    description: 'Sculpting, shaping, and precision edging with straight razor lining, hot towel, and nourishing beard oil treatment.',
    popular: true,
  },
  {
    id: 's3',
    name: 'HAIR WASH',
    category: 'treatment',
    price: 15,
    duration: '20 mins',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=800&q=80',
    description: 'Deep cleansing scalp detox and conditioning treatment paired with a relaxing acupressure head massage.',
  },
  {
    id: 's4',
    name: 'KIDS CUT',
    category: 'hair',
    price: 25,
    duration: '30 mins',
    image: 'https://images.unsplash.com/photo-1595878715977-2e8f8df18ea8?auto=format&fit=crop&w=800&q=80',
    description: 'Gentle, patient, and stylish haircuts for young gentlemen (under 12) in a friendly and fun environment.',
  },
  {
    id: 's5',
    name: 'ROYAL SHAVE & HOT TOWEL',
    category: 'beard',
    price: 40,
    duration: '45 mins',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80',
    description: 'Classic straight razor wet shave with pre-shave essential oils, 3 hot steam towels, cold towel finish, and aftershave balm.',
  },
  {
    id: 's6',
    name: 'THE MANE SIGNATURE COMBO',
    category: 'combo',
    price: 60,
    duration: '75 mins',
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80',
    description: 'Full signature haircut, beard sculpting with straight razor edge, relaxing hair wash & scalp massage, and styling product.',
    popular: true,
  }
];

export const BARBERS: Barber[] = [
  {
    id: 'b1',
    name: 'Marcus Vance',
    role: 'Master Barber & Founder',
    rating: 4.98,
    reviewsCount: 420,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    bio: 'Over 12 years of experience crafting signature fades, classic scissor work, and traditional wet shaves in London and New York.',
    specialties: ['Skin Fades', 'Classic Scissor Work', 'Beard Sculpting'],
  },
  {
    id: 'b2',
    name: 'Elena Rostova',
    role: 'Senior Stylist',
    rating: 4.95,
    reviewsCount: 310,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    bio: 'Specialist in modern textured crops, taper fades, scalp treatments, and tailored hair designs.',
    specialties: ['Textured Crops', 'Scalp Therapy', 'Hair Coloring'],
  },
  {
    id: 'b3',
    name: 'Leo Sterling',
    role: 'Fade & Line Specialist',
    rating: 4.92,
    reviewsCount: 285,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Master of razor-sharp geometric lineups, low/mid fades, and intricate hair art.',
    specialties: ['Precision Lineups', 'Low Fades', 'Kids Styling'],
  },
  {
    id: 'b4',
    name: 'Dominic Cruz',
    role: 'Beard & Shave Artisan',
    rating: 4.97,
    reviewsCount: 350,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: 'Dedicated to the craft of authentic hot towel straight-razor shaving and majestic beard grooming.',
    specialties: ['Hot Towel Shave', 'Beard Restoration', 'Facials'],
  },
];

export const CLIENT_AVATARS = [
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
  'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
];

export const REVIEWS: Review[] = [
  {
    id: 'r1',
    name: 'Alexander Hayes',
    role: 'Regular Client',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'The best barbershop experience in the city. The attention to detail, hot towel treatment, and precision fade are unmatched.',
    service: 'The Mane Signature Combo',
    date: '2 days ago',
  },
  {
    id: 'r2',
    name: 'David Miller',
    role: 'Executive',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Impeccable atmosphere, premium scotch, and Marcus gave me the sharpest cut of my life. Highly recommended!',
    service: 'Haircut & Beard Trim',
    date: '1 week ago',
  },
  {
    id: 'r3',
    name: 'Julian Bennett',
    role: 'Architect',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=150&q=80',
    rating: 5,
    comment: 'Super easy online booking, no waiting time, and world-class hygiene. Mane sets the gold standard.',
    service: 'Royal Shave & Hot Towel',
    date: '2 weeks ago',
  },
];

export const TIME_SLOTS = [
  '09:00 AM',
  '09:45 AM',
  '10:30 AM',
  '11:15 AM',
  '12:00 PM',
  '01:30 PM',
  '02:15 PM',
  '03:00 PM',
  '03:45 PM',
  '04:30 PM',
  '05:15 PM',
  '06:00 PM',
  '06:45 PM',
  '07:30 PM',
];
