import { Tip, Category } from '@models*';

export interface VenueDetails {
  categories: Category[];
  twitter: string;
  phone: string;
  facebook: string;
  facebookName: string;
  instagram: string;
  status: string;
  isOpen: boolean;
  id: string;
  likes: number;
  address: string;
  city: string;
  country: string;
  name: string;
  photos: string[];
  bestPhoto: string;
  price: number;
  rating: number;
  tips: Tip[];
  url: string;
}
