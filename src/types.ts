/**
 * V-Guard One - Unified App Types
 * "Bring Home a Better Tomorrow"
 */

export type AppRole = 'customer' | 'retailer' | 'distributor';

export type CustomerTab = 'home' | 'products' | 'solar' | 'services' | 'profile';
export type RetailerTab = 'dashboard' | 'catalogue' | 'orders' | 'support' | 'profile';
export type DistributorTab = 'dashboard' | 'inventory' | 'orders' | 'analytics' | 'bulletins' | 'profile';

export type ProductCategory = 'Electronics' | 'Electricals' | 'Consumer Durables' | 'Sunflame';

export interface RegisteredProduct {
  id: string;
  name: string;
  modelNumber: string;
  serialNumber: string;
  category: ProductCategory;
  subCategory: string;
  purchaseDate: string;
  warrantyExpiry: string;
  warrantyStatus: 'Active' | 'Expiring Soon' | 'Expired';
  isSmart: boolean;
  imageUrl: string;
  manualUrl?: string;
  rating?: number;
  maintenanceDue?: string;
  maintenanceNote?: string;
  smartDeviceId?: string;
}

export interface SmartDeviceState {
  id: string;
  name: string;
  type: 'geyser' | 'fan' | 'chimney' | 'stabilizer';
  isOnline: boolean;
  power: boolean;
  // Geyser specific
  currentTemp?: number;
  targetTemp?: number;
  mode?: 'Eco' | 'Power' | 'Standard';
  showerReady?: boolean;
  // Fan specific
  speed?: number; // 1-5
  breezeMode?: boolean;
  sleepTimerHours?: number;
  // Chimney specific
  fanSpeed?: 'Low' | 'Medium' | 'High';
  autoCleanProgress?: number;
  // Common
  energyTodayKWh: number;
  lastActive: string;
}

export interface SolarTelemetry {
  currentGenerationKW: number; // e.g., 4.2 kW
  peakCapacityKW: number; // e.g. 5.0 kW
  todayGenerationKWh: number; // e.g., 18.6 kWh
  monthlyGenerationKWh: number; // e.g., 460 kWh
  householdLoadKW: number; // e.g., 2.1 kW
  batteryPercentage: number; // e.g., 84%
  batteryCapacityKWh: number; // e.g., 10 kWh
  batteryBackupHours: number; // e.g., 6.5 hours
  gridExportKW: number; // e.g., 2.1 kW
  gridImportKW: number; // e.g., 0.0 kW
  co2SavedKg: number;
  equivalentTrees: number;
  rupeesSavedToday: number;
  dailyHourlyTrend: { time: string; generation: number; consumption: number }[];
  monthlyTrend: { month: string; generation: number }[];
}

export interface CatalogItem {
  id: string;
  name: string;
  code: string;
  category: ProductCategory;
  subCategory: string;
  mrp: number;
  dealerPrice?: number;
  description: string;
  features: string[];
  isSmart: boolean;
  warrantyYears: number;
  inStock: boolean;
  stockQty?: number;
  inStockUnits?: number;
  rating: number;
  tag?: string;
}

export interface ServiceTicket {
  id: string;
  productName: string;
  productModel: string;
  category: ProductCategory;
  serialNumber?: string;
  issueCategory: string;
  issueDescription: string;
  serviceType: 'On-Site Visit' | 'Installation' | 'Warranty Claim' | 'Inspection';
  status: 'Request Received' | 'Engineer Assigned' | 'Out for Service' | 'Completed';
  dateCreated: string;
  appointmentDate: string;
  appointmentSlot: string;
  engineerName?: string;
  engineerPhone?: string;
  address: string;
  ticketHistory: { date: string; title: string; desc: string }[];
}

export interface RetailerOrder {
  id: string;
  retailerName: string;
  retailerCode: string;
  city: string;
  items: { productName: string; code: string; qty: number; unitPrice: number }[];
  totalAmount: number;
  status: 'Pending Approval' | 'Pending Dispatch' | 'Dispatched' | 'Delivered' | 'Processing';
  orderDate: string;
  deliveryExpected: string;
  paymentMode: 'Dealer Credit' | 'NEFT/RTGS' | 'UPI';
}

export interface InventoryItem {
  sku: string;
  name: string;
  category: ProductCategory;
  subCategory: string;
  currentStock: number;
  reorderThreshold: number;
  depotLocation: string;
  allocatedOrders: number;
}

export interface DistributorInventoryItem {
  sku: string;
  name: string;
  category: ProductCategory;
  subCategory: string;
  inStock: number;
  reorderLevel: number;
  wholesalePrice: number;
  status: 'Optimal' | 'Low Stock' | 'Critical';
  transitQty: number;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  timestamp: string;
  actionSuggestion?: {
    type: 'service' | 'solar' | 'manual' | 'smart';
    label: string;
    payload?: any;
  };
  escalationReady?: boolean;
}
