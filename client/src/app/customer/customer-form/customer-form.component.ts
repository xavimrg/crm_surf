import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Customer } from '../../shared/interfaces/customer';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-customer-form',
  imports: [ReactiveFormsModule, TranslateModule],
  templateUrl: './customer-form.component.html',
  styleUrl: './customer-form.component.scss'
})
export class CustomerFormComponent {
@Input() customerForm!: FormGroup
@Output() sentCustomerForm = new EventEmitter<Customer>()

onSubmit(): void{
  if (this.customerForm.valid){
    const customer: Customer = this.customerForm.value;
    this.sentCustomerForm.emit(customer)
  }
}

}
