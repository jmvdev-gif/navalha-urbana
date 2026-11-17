export interface Service {
  id: string;
  name: string;
  price: number;
  duration: string;
  durationMinutes: number;
  description: string;
  isPremium?: boolean;
  iconName: string;
}

export interface Barber {
  id: string;
  name: string;
  role: string;
  subtitle: string;
  bio: string;
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  tag: string;
}

export const SERVICES: Service[] = [
  {
    id: "corte-classico",
    name: "Corte Clássico",
    price: 80,
    duration: "45 min",
    durationMinutes: 45,
    description: "Corte tradicional na tesoura ou máquina, com acabamento impecável e finalização com pomada premium.",
    iconName: "Scissors",
  },
  {
    id: "barba-tradicional",
    name: "Barba Tradicional (Toalha Quente)",
    price: 60,
    duration: "30 min",
    durationMinutes: 30,
    description: "Toalha quente, massagem facial, alinhamento perfeito e hidratação de óleo essenciais.",
    iconName: "Sparkles",
  },
  {
    id: "combo-navalha-urbana",
    name: "Combo Navalha Urbana",
    price: 130,
    duration: "1h 20 min",
    durationMinutes: 80,
    description: "O pacote completo para um visual impecável: corte personalizado, barboterapia e alinhamento facial.",
    isPremium: true,
    iconName: "Crown",
  },
];

export const BARBERS: Barber[] = [
  {
    id: "tiago-silva",
    name: "Tiago Silva",
    role: "MASTER BARBER",
    subtitle: "Especialista em Degradê e Barboterapia",
    bio: "Com mais de 10 anos de experiência, mestre no ofício do homem contemporâneo.",
    imageUrl: "https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "lucas-mendes",
    name: "Lucas Mendes",
    role: "ESPECIALISTA EM FADES",
    subtitle: "Mestre em Fade & Texturas",
    bio: "A precisão técnica que seu estilo precisa para um degradê limpo e marcante.",
    imageUrl: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "bruno-costa",
    name: "Bruno Costa",
    role: "BARBOTERAPIA",
    subtitle: "Tratamentos & Toalha Quente",
    bio: "Especialista em visagismo de barba e técnicas de relaxamento facial.",
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: "carlos-rocha",
    name: "Carlos Rocha",
    role: "ESTILO CLÁSSICO",
    subtitle: "Navalha & Cortes Vintage",
    bio: "Excelência em acabamento artesanal na navalha clássica.",
    imageUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
  },
];

export const GALLERY: GalleryItem[] = [
  {
    id: "g1",
    title: "Mid Fade & Textura",
    imageUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=800&q=80",
    tag: "@navalha.urbana",
  },
  {
    id: "g2",
    title: "Alinhamento de Barba",
    imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=800&q=80",
    tag: "@navalha.urbana",
  },
  {
    id: "g3",
    title: "Low Fade Limpo",
    imageUrl: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=800&q=80",
    tag: "@navalha.urbana",
  },
  {
    id: "g4",
    title: "Corte Clássico Retrô",
    imageUrl: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=800&q=80",
    tag: "@navalha.urbana",
  },
];

export const AVAILABLE_SLOTS = ["09:00", "10:00", "11:00", "14:00", "15:30", "16:00", "17:30"];
