import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InventoryFilter,InventoryItem } from '../../models/inventory.interface';
import { InventoryService } from '../../services/inventory.service';
import { CommonModule } from '@angular/common';
import { DecimalPipe} from '@angular/common';

@Component({
  selector: 'app-inventory',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css'
})

// imnplements OnInit
export class InventoryComponent implements OnInit{

private readonly inventoryService = inject(InventoryService);
  private readonly fb = inject(FormBuilder);

  // Signals for reactive state management
  inventory = signal<InventoryItem[]>([]);
  categories = signal<string[]>([]);
  loading = signal(false);
  showModal = signal(false);
  editingItem = signal<InventoryItem | null>(null);
  filter = signal<InventoryFilter>({});

  // Form for CRUD operations
  inventoryForm: FormGroup;
  filterForm: FormGroup;

  // Computed values
  filteredInventory = computed(() => {
    const items = this.inventory();
    const currentFilter = this.filter();
    
    if (!currentFilter.category && !currentFilter.status && !currentFilter.searchTerm) {
      return items;
    }
    
    return items.filter(item => {
      const matchesCategory = !currentFilter.category || item.category === currentFilter.category;
      const matchesStatus = !currentFilter.status || item.status === currentFilter.status;
      const matchesSearch = !currentFilter.searchTerm || 
        item.name.toLowerCase().includes(currentFilter.searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(currentFilter.searchTerm.toLowerCase());
      
      return matchesCategory && matchesStatus && matchesSearch;
    });
  });

  lowStockCount = computed(() => 
    this.inventory().filter(item => item.quantity <= item.minimumStock).length
  );

  totalValue = computed(() => 
    this.inventory().reduce((sum, item) => sum + item.totalValue, 0)
  );

  constructor() {
    this.inventoryForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      unit: ['', [Validators.required]],
      unitPrice: [0, [Validators.required, Validators.min(0)]],
      supplier: ['', [Validators.required]],
      expiryDate: [''],
      minimumStock: [0, [Validators.required, Validators.min(0)]],
      location: ['', [Validators.required]],
      batchNumber: ['']
    });

    this.filterForm = this.fb.group({
      category: [''],
      status: [''],
      searchTerm: ['']
    });
  }

  
  ngOnInit(): void {
    console.log('✅ InventoryComponent loaded');
    this.loadData();
    this.setupFilterSubscription();
  }



  trackByItemId(index: number, item: InventoryItem): string {
  return item.id;
}


  private loadData(): void {
    this.loading.set(true);
    
    this.inventoryService.inventory$.subscribe(items => {
      this.inventory.set(items);
      this.loading.set(false);
    });

    this.inventoryService.getCategories().subscribe(categories => {
      this.categories.set(categories);
    });
  }

  private setupFilterSubscription(): void {
    this.filterForm.valueChanges.subscribe(filterValue => {
      this.filter.set(filterValue);
    });
  }

  openCreateModal(): void {
    this.editingItem.set(null);
    this.inventoryForm.reset();
    this.showModal.set(true);
  }

  openEditModal(item: InventoryItem): void {
    this.editingItem.set(item);
    this.inventoryForm.patchValue({
      ...item,
      expiryDate: item.expiryDate ? this.formatDateForInput(item.expiryDate) : ''
    });
    this.showModal.set(true);
  }

  closeModal(): void {
    this.showModal.set(false);
    this.editingItem.set(null);
    this.inventoryForm.reset();
  }

  onSubmit(): void {
    if (this.inventoryForm.valid) {
      const formValue = this.inventoryForm.value;
      const inventoryData = {
        ...formValue,
        expiryDate: formValue.expiryDate ? new Date(formValue.expiryDate) : undefined,
        lastRestocked: new Date(),
        status: this.calculateStatus(formValue.quantity, formValue.minimumStock, formValue.expiryDate)
      };

      if (this.editingItem()) {
        this.updateItem(this.editingItem()!.id, inventoryData);
      } else {
        this.createItem(inventoryData);
      }
    }
  }

  private createItem(itemData: any): void {
    this.inventoryService.createInventoryItem(itemData).subscribe({
      next: (newItem) => {
        this.closeModal();
        // Refresh data
        this.loadData();
      },
      error: (error) => {
        console.error('Error creating item:', error);
      }
    });
  }

  private updateItem(id: string, updates: any): void {
    this.inventoryService.updateInventoryItem(id, updates).subscribe({
      next: (updatedItem) => {
        this.closeModal();
        // Refresh data
        this.loadData();
      },
      error: (error) => {
        console.error('Error updating item:', error);
      }
    });
  }

  deleteItem(id: string): void {
    if (confirm('Are you sure you want to delete this item?')) {
      this.inventoryService.deleteInventoryItem(id).subscribe({
        next: (success) => {
          if (success) {
            // Refresh data
            this.loadData();
          }
        },
        error: (error) => {
          console.error('Error deleting item:', error);
        }
      });
    }
  }

  private calculateStatus(quantity: number, minimumStock: number, expiryDate?: string): InventoryItem['status'] {
    if (expiryDate && new Date(expiryDate) < new Date()) {
      return 'expired';
    }
    if (quantity === 0) {
      return 'out-of-stock';
    }
    if (quantity <= minimumStock) {
      return 'low-stock';
    }
    return 'in-stock';
  }

  private formatDateForInput(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'in-stock': return 'status-in-stock';
      case 'low-stock': return 'status-low-stock';
      case 'out-of-stock': return 'status-out-of-stock';
      case 'expired': return 'status-expired';
      default: return '';
    }
  }

  clearFilters(): void {
    this.filterForm.reset();
    this.filter.set({});
  }
}