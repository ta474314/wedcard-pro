// This file will register all available templates
import ClassicTemplate from './ClassicTemplate';
import ModernTemplate from './ModernTemplate';
import TraditionalTemplate from './TraditionalTemplate';
import BeachTemplate from './BeachTemplate';
import GardenTemplate from './GardenTemplate';
import LuxuryTemplate from './LuxuryTemplate';

// Define all templates with metadata
export const templatesData = [
  {
    id: 'classic',
    name: 'Classic Elegance',
    style: 'Traditional & Timeless',
    price: 'Free',
    rating: 4.8,
    category: 'classic',
    component: ClassicTemplate,
    description: 'A timeless design perfect for formal weddings',
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
    features: ['Printable', 'Customizable colors', 'RSVP integration']
  },
  {
    id: 'modern',
    name: 'Modern Romance',
    style: 'Contemporary & Minimal',
    price: 'Free',
    rating: 4.8,
    category: 'modern',
    component: ModernTemplate,
    description: 'Clean lines and contemporary style for modern couples',
    previewImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
    features: ['Digital first', 'QR code ready', 'Mobile optimized']
  },
  {
    id: 'traditional',
    name: 'Golden Era',
    style: 'Vintage Luxury',
    price: 'Premium',
    rating: 4.9,
    category: 'traditional',
    component: TraditionalTemplate,
    description: 'Rich cultural elements with golden accents',
    previewImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400',
    features: ['Golden theme', 'Traditional motifs', 'Luxury finish']
  },
  {
    id: 'beach',
    name: 'Beach Paradise',
    style: 'Destination & Tropical',
    price: 'Free',
    rating: 4.8,
    category: 'destination',
    component: BeachTemplate,
    description: 'Perfect for beach and destination weddings',
    previewImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400',
    features: ['Tropical theme', 'Sunset colors', 'Destination ready']
  },
  {
    id: 'garden',
    name: 'Garden Elegance',
    style: 'Floral & Nature',
    price: 'Premium',
    rating: 4.9,
    category: 'floral',
    component: GardenTemplate,
    description: 'Fresh and natural garden party theme',
    previewImage: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=400',
    features: ['Floral design', 'Nature inspired', 'Elegant layout']
  },
  {
    id: 'luxury',
    name: 'Royal Maharaja',
    style: 'Luxury Heritage',
    price: 'Premium',
    rating: 5.0,
    category: 'luxury',
    component: LuxuryTemplate,
    description: 'Premium design with royal aesthetic',
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
    features: ['Royal theme', 'Gold accents', 'Premium finish']
  }
];

// Get template by ID
export const getTemplateById = (id) => {
  return templatesData.find(template => template.id === id);
};

// Get templates by category
export const getTemplatesByCategory = (category) => {
  if (category === 'all') return templatesData;
  return templatesData.filter(template => template.category === category);
};