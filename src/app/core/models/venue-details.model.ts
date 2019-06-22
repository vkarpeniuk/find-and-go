import { Tip, Category } from '@models*';

export interface VenueDetails {
  categories: Category[];
  twitter: string;
  phone: string;
  facebookName: string;
  status: string;
  isOpen: boolean;
  id: string;
  likes: number;
  address: string;
  city: string;
  country: string;
  name: string;
  photos: string[];
  price: number; //1-4
  rating: number; //0-10
  tipsCount: number;
  tips: Tip[];
  url: string;
}
