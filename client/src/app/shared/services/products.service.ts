import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

 private url = 'http://localhost:3000/products'

 http = inject(HttpClient)


getAllProducts(): Observable<Product[]>  {
  return this.http.get<Product[]>(this.url);
}

getProductById(id:number): Observable<Product> {
return this.http.get<Product>(`${this.url}/${id}`);
}

createProduct(product: Product): Observable<Product>{
  return this.http.post<Product>(this.url, product)
}

updateProduct(product: Product):Observable<Product>{
  return this.http.put<Product>(`${this.url}/${product.id}`, product)
}

deleteProduct(id: number): Observable<void>{
  return this.http.delete<void>(`${this.url}/${id}`)
}



}
