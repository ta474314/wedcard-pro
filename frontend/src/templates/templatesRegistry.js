import ClassicTemplate from './ClassicTemplate';
import ModernTemplate from './ModernTemplate';
import LuxuryTemplate from './LuxuryTemplate';
import TraditionalTemplate from './TraditionalTemplate';
import BeachTemplate from './BeachTemplate';
import GardenTemplate from './GardenTemplate';

const thumbnails = {
  classic: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
  modern: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
  luxury: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400',
  traditional: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
  beach: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
  garden: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400',
};

export const templatesRegistry = [
  {
    id: 1,
    name: 'Royal Maharaja',
    component: LuxuryTemplate,
    category: 'luxury',
    style: 'Luxury Heritage',
    price: 'Premium',
    rating: 5.0,
    image: thumbnails.luxury,
  },
  {
    id: 2,
    name: 'Modern Romance',
    component: ModernTemplate,
    category: 'modern',
    style: 'Contemporary',
    price: 'Free',
    rating: 4.8,
    image: thumbnails.modern,
  },
  {
    id: 3,
    name: 'Golden Era',
    component: ClassicTemplate,
    category: 'vintage',
    style: 'Vintage Luxury',
    price: 'Premium',
    rating: 4.9,
    image: thumbnails.classic,
  },
  {
    id: 4,
    name: 'Beach Paradise',
    component: BeachTemplate,
    category: 'destination',
    style: 'Destination',
    price: 'Free',
    rating: 4.8,
    image: thumbnails.beach,
  },
  {
    id: 5,
    name: 'Garden Elegance',
    component: GardenTemplate,
    category: 'floral',
    style: 'Floral',
    price: 'Premium',
    rating: 4.9,
    image: thumbnails.garden,
  },
  {
    id: 6,
    name: 'Divine Blessings',
    component: TraditionalTemplate,
    category: 'spiritual',
    style: 'Spiritual',
    price: 'Premium',
    rating: 4.7,
    image: thumbnails.traditional,
  },
];