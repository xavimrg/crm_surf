import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Product } from '../../shared/interfaces/product';
import { ProductsService } from '../../shared/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-detail',
  imports: [MatCardModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, TranslateModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  product!: Product;
  editMode: boolean = false; // se carga sin modo editar - false
  productForm!: FormGroup;

  productService = inject(ProductsService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  fb = inject(FormBuilder);

  ngOnInit(): void {
  this.route.paramMap.subscribe((params) => {
    const productId = Number(params.get('id'));
    if (productId){
      this.loadProductDetails(productId)
    }
  })
  }

  loadProductDetails(id: number){
    this.productService.getProductById(id).subscribe((product) => {
      this.product = product;
      this.initForm(); // inicializa el formulario con los datos existentes
    });
  }
// EDICION / ACTUALIZAR PRODUCTO

initForm(){
  this.productForm = this.fb.group({
    name: [this.product.name],
    imageUrl: [this.product.imageUrl],
    price: [this.product.price],
    description: [this.product.description],
    stock: [this.product.stock],
    maxStock: [this.product.maxStock],
    stockShippingStatus: [this.product.stockShippingStatus],
    categories: [this.product.categories],
  });
}

updateProduct(){
if (this.productForm.valid && this.product.id) {
const updatedProduct: Product = {
  ...this.product,
  ...this.productForm.value, // en la constante updatedProduct con Interfaz combina los valores anteriores con los del formulario 
};

this.productService.updateProduct(updatedProduct).subscribe({
  next:  () => {
    alert('The product has been correctly updated.');
    this.editMode = false; // despues del mensaje se sale del modo edicion 
    this.loadProductDetails(this.product.id); // recarga el detalle del producto
  }, 
  error: (err) => {
  console.error('Fail to update the product.', err);
  alert('Product not updated.'); 
 }})
}
}




  deleteProduct() {
const confirmDelete = window.confirm('Are you sure to delete this product?')
if (confirmDelete && this.product.id) {
  this.productService.deleteProduct(this.product.id).subscribe({
    next: () => {
      alert('The product has been succesfully deleted.');
      this.router.navigate(['/product']); 
    },
    error: (err) => {
      console.error('Fail to delete the product.', err);
      alert('The product failed to be deleted.');
    },
  });
}
}
 
goBackToProducts() {
  this.router.navigate(['/product']);
}

}
