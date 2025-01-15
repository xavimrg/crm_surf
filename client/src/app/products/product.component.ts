import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductListComponent } from "./product-list/product-list.component";
import { ProductsService } from '../shared/services/products.service';
import { Product } from '../shared/interfaces/product';
import { ProductFormComponent } from "./product-form/product-form.component";
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product',
  imports: [ProductListComponent, ProductFormComponent,  MatButtonToggleModule, TranslateModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  productService = inject(ProductsService);
  fb = inject(FormBuilder);
  snackBar = inject(MatSnackBar) // pop up de Angular Material
  products = signal<Product[]>([])

  productForm!: FormGroup;
  isFormVisible: boolean = false;

toggleGroupValue = signal<string>('close') // gestion del estado del toggle - inicialmente


ngOnInit(): void {
this.loadProducts();


// inicializa el formulario vacio en el momento de cargar los productos 
this.productForm = this.fb.group({
  name: [''],
  imageUrl: [''],
  price: [0],
  description: [''],
  stock: [0],
  maxStock: [0],
  stockShippingStatus: [''],
});

  
}
// para cargar y mantener actualizado el product list - conectamos con el servicio y el metodo del mismo
loadProducts(): void {
this.productService.getAllProducts().subscribe( // subscribe -> signal
(data) => {
  this.products.set(data) // setter de signals
});
}
//METODO SIN MENSAJES Y CAMBIO DE ESTADO EN TOGGLE
// onSubmit(product: Product): void{
// this.productService.createProduct(product).subscribe((newProduct) => { // crea el nuevo producto y lo manda pero se suscribe a los signals
//   this.products.set([...this.products(), newProduct]); // products() es el get de signals - no un metodo
// });}

onSubmit(product: Product): void {
  this.productService.createProduct(product).subscribe({ // AÑADIMOS EL NEXT para manejar el error y dividir las dos acciones 
    next: (newProduct) => {
      this.products.set([...this.products(), newProduct]); // actualiza la lista al añadir el nuevo producto
      this.showNotification('Product successfully added.', 'success');
      this.toggleGroupValue.set('close'); // setea el estado cerrado o product list
    },
    error: () => {
      this.showNotification('Fail to add the new product.', 'error');
    }
  });
}

private showNotification(message: string, type: 'success' | 'error'): void {
  this.snackBar.open(message, 'Close', {
    duration: 3000,
    panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
  });
}
}









