import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { InventoryFilter,InventoryItem } from '../models/inventory.interface';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

private readonly http = inject(HttpClient);
  private readonly baseUrl = '/api/inventory';
  
  private inventorySubject = new BehaviorSubject<InventoryItem[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  readonly inventory$ = this.inventorySubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();

  constructor() {
    this.loadInventory();
  }

  private loadInventory(): void {
    this.loadingSubject.next(true);
    // Mock data for demonstration
    const mockInventory: InventoryItem[] = [
      {
        id: '1',
        name: 'Surgical Gloves',
        description: 'Latex-free surgical gloves, sterile',
        category: 'Medical Supplies',
        quantity: 500,
        unit: 'boxes',
        unitPrice: 25.99,
        totalValue: 12995,
        supplier: 'MedSupply Inc.',
        expiryDate: new Date('2025-12-31'),
        lastRestocked: new Date('2024-11-15'),
        minimumStock: 100,
        status: 'in-stock',
        location: 'Storage Room A-1',
        batchNumber: 'GL-2024-001'
      },
      {
        id: '2',
        name: 'Speculum',
        description: 'Disposable vaginal speculum',
        category: 'Medical Equipment',
        quantity: 25,
        unit: 'pieces',
        unitPrice: 8.50,
        totalValue: 212.50,
        supplier: 'CerviMed Solutions',
        lastRestocked: new Date('2024-10-20'),
        minimumStock: 50,
        status: 'low-stock',
        location: 'Examination Room Cabinet',
        batchNumber: 'SP-2024-002'
      }
    ];
    
    setTimeout(() => {
      this.inventorySubject.next(mockInventory);
      this.loadingSubject.next(false);
    }, 1000);
  }

  getInventory(filter?: InventoryFilter): Observable<InventoryItem[]> {
    return this.inventory$.pipe(
      map(items => {
        if (!filter) return items;
        
        return items.filter(item => {
          const matchesCategory = !filter.category || item.category === filter.category;
          const matchesStatus = !filter.status || item.status === filter.status;
          const matchesSearch = !filter.searchTerm || 
            item.name.toLowerCase().includes(filter.searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(filter.searchTerm.toLowerCase());
          
          return matchesCategory && matchesStatus && matchesSearch;
        });
      })
    );
  }

  getInventoryItem(id: string): Observable<InventoryItem | undefined> {
    return this.inventory$.pipe(
      map(items => items.find(item => item.id === id))
    );
  }

  createInventoryItem(item: Omit<InventoryItem, 'id' | 'totalValue'>): Observable<InventoryItem> {
    const newItem: InventoryItem= {
      ...item,
      id: Date.now().toString(),
      totalValue: item.quantity * item.unitPrice
    };

    const currentItems = this.inventorySubject.value;
    this.inventorySubject.next([...currentItems, newItem]);
    
    return of(newItem);
  }

  updateInventoryItem(id: string, updates: Partial<InventoryItem>): Observable<InventoryItem| null> {
    const currentItems = this.inventorySubject.value;
    const index = currentItems.findIndex(item => item.id === id);
    
    if (index === -1) {
      return of(null);
    }

    const updatedItem = { 
      ...currentItems[index], 
      ...updates,
      totalValue: (updates.quantity ?? currentItems[index].quantity) * 
                  (updates.unitPrice ?? currentItems[index].unitPrice)
    };
    
    const updatedItems = [...currentItems];
    updatedItems[index] = updatedItem;
    this.inventorySubject.next(updatedItems);
    
    return of(updatedItem);
  }

  deleteInventoryItem(id: string): Observable<boolean> {
    const currentItems = this.inventorySubject.value;
    const filteredItems = currentItems.filter(item => item.id !== id);
    
    if (filteredItems.length === currentItems.length) {
      return of(false);
    }
    
    this.inventorySubject.next(filteredItems);
    return of(true);
  }

  getCategories(): Observable<string[]> {
    return this.inventory$.pipe(
      map(items => [...new Set(items.map(item => item.category))])
    );
  }

  getLowStockItems(): Observable<InventoryItem[]> {
    return this.inventory$.pipe(
      map(items => items.filter(item => item.quantity <= item.minimumStock))
    );
  }
}

