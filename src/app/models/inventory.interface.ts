export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  category: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  totalValue: number;
  supplier: string;
  expiryDate?: Date;
  lastRestocked?: Date;
  minimumStock: number;
  status: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired';
  location: string;
  batchNumber?: string;
}

export interface InventoryFilter {
  searchTerm?: string;
  category?: string;
  status?: 'in-stock' | 'low-stock' | 'out-of-stock' | 'expired';
}
