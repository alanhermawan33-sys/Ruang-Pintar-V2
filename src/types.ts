export type ProductCategory = 
  | 'All' 
  | 'Bespoke Furniture' 
  | 'Luxury Living' 
  | 'Modern Kitchen' 
  | 'Executive Office' 
  | 'Master Bedroom' 
  | 'Architectural Works';

export interface Product {
  id: string;
  title: string;
  category: ProductCategory;
  price: number; // in IDR
  image: string;
  gallery: string[];
  description: string;
  features: string[];
  dimensions: string;
  leadTime: string;
  featured?: boolean;
  type: 'furniture' | 'interior' | 'architecture';
  isAvailable: boolean;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customNotes?: string;
}

export type OrderStatus = 'Pending' | 'In Consultation' | 'Completed' | 'Cancelled';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  address: string;
  notes?: string;
  items: CartItem[];
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
}

export interface AdminUser {
  username: string;
  isAuthenticated: boolean;
}
