export interface MenuItem {
  id: string;
  nameAr: string;
  nameEn: string;
  category: CategoryId;
  price: number;
  descriptionAr: string;
  descriptionEn: string;
  image: string;
  secondaryImage?: string;
  ingredientsAr: string[];
  ingredientsEn: string[];
  allergensAr: string[];
  allergensEn: string[];
  calories: number;
  prepTime: string;
  isAvailable: boolean;
  isSignature?: boolean;
  curatorNotesAr: string;
  curatorNotesEn: string;
  sizes: { id: string; nameAr: string; nameEn: string; priceDiff: number }[];
  extras: { id: string; nameAr: string; nameEn: string; price: number }[];
  accentColor: string;
  originAr: string;
  originEn: string;
}

export type CategoryId =
  | 'signature'
  | 'mains'
  | 'appetizers'
  | 'desserts'
  | 'coffee'
  | 'beverages';

export interface CategoryInfo {
  id: CategoryId;
  nameAr: string;
  nameEn: string;
  subtitleAr: string;
  subtitleEn: string;
}

export interface CartItem {
  cartItemId: string;
  item: MenuItem;
  selectedSize: { id: string; nameAr: string; nameEn: string; priceDiff: number };
  selectedExtras: { id: string; nameAr: string; nameEn: string; price: number }[];
  quantity: number;
  unitPrice: number;
  notes?: string;
}

export type DiningType = 'dine_in' | 'pickup' | 'delivery';

export type PaymentMethod = 'whatsapp_transfer' | 'card_mada_applepay' | 'cash_on_delivery';

export interface OrderCustomerInfo {
  name: string;
  phone: string;
  diningType: DiningType;
  tableOrAddress: string;
  paymentPreference: PaymentMethod;
  notes?: string;
}

export interface SavedOrder {
  id: string;
  orderNumber: string;
  timestamp: string;
  items: CartItem[];
  customerInfo: OrderCustomerInfo;
  subtotal: number;
  vat: number;
  deliveryFee: number;
  grandTotal: number;
  status: 'new' | 'preparing' | 'completed';
}
