import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductsService } from '../services/products.service';
import { Product } from '../interfaces/product';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-search',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  private productService = inject(ProductsService);
  private router = inject(Router);

  localProducts = signal<Product[]>([]); 
  searchedProduct = signal(''); 

  constructor() {
    this.loadProducts();
  }

  updateSearch(event: Event) {
  const target = event.target as HTMLInputElement;
  this.searchedProduct.set(target.value);
}


  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (products) => { console.log('Productos cargados:', products); // Depuración
        this.localProducts.set(products); },
      error: (err) => console.error('Error loading products:', err),
    });
  }
  filteredProducts = computed(() => {
    const searchProductLower = this.searchedProduct().toLowerCase().trim();
    const filtered = this.localProducts().filter((product: Product) =>
      product.name.toLowerCase().includes(searchProductLower) ||
      product.description?.toLowerCase().includes(searchProductLower) ||
      product.stockShippingStatus?.toLowerCase().includes(searchProductLower) ||
      product.price?.toString().includes(searchProductLower) 
    );
    console.log('Productos filtrados:', filtered);
    return filtered;
  });
  goToProduct(id: number) {
    this.router.navigate([`/product/${id}`]);
  }
}
