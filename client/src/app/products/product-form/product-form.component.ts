import {Component,EventEmitter,Input,Output} from '@angular/core';
import {  FormGroup,  ReactiveFormsModule } from '@angular/forms';
import { Product } from '../../shared/interfaces/product';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  @Input() productForm!: FormGroup;
  @Output() sentForm = new EventEmitter<Product>();



  onSubmit(): void {
    if (this.productForm.valid) {
    const product: Product = this.productForm.value; // la constante es el Interfaz que son los valores del formulario
    this.sentForm.emit(product);}
  }
}

