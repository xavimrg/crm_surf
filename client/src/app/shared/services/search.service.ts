import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

//   private http = inject(HttpClient)
//   private urlProducts = 'http://localhost:3000/products'

// private _products = signal<Product[]>([])
//  text = signal<string>('')
// private _error = signal<string | null>(null)

// filterArray = computed(() => 
// this._products().filter((product) =>
//   product.name.trim().toLocaleLowerCase().includes
// (this.text().trim().toLocaleLowerCase()))

// )
// constructor(){
// this.loadProducts
// }
// loadProducts() {
//   this.http.get<Product[]>(this.urlProducts).subscribe({
//     next: (products) => this._products.set(products),
//     error: (err) => this._error.set('Error loading products: ' + err.message),
//   });
// }
}
