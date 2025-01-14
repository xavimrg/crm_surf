import { Component, inject, OnInit, signal } from '@angular/core';
import { CustomerFormComponent } from "./customer-form/customer-form.component";
import { CustomerListComponent } from "./customer-list/customer-list.component";
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { CustomerService } from '../shared/services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from '../shared/interfaces/customer';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-customer',
  imports: [CustomerFormComponent, CustomerListComponent, MatButtonToggleModule, TranslateModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent implements OnInit {
  customerService = inject(CustomerService)
  customers= signal<Customer[]>([])


  snackBar = inject(MatSnackBar)
  toggleGroupValue = signal<string>('Close') 

  customerForm!: FormGroup;
   fb = inject(FormBuilder);
  isFormVisible: boolean = false;

  ngOnInit(): void {
    this.loadCustomers();


this.customerForm = this.fb.group({
  customerName: [''],
  customerSurname: [''],
  email: [''],
  gender: [''],
  age: [0],
  comparId: [''],
  profilePhoto: [''],
  companyName:[''], 
  companyId:[''],
  companyAddress:[''],

})

  }

  loadCustomers():void {this.customerService.getAllCustomers().subscribe((data)=>{
    this.customers.set(data)
  })}

  onSubmit(customer:Customer):void{
    this.customerService.createCustomer(customer).subscribe({
      next:(newCustomer)=>{
        this.customers.set([...this.customers(), newCustomer]);
      this.showNotification('Customer succesfully added.', 'success');
      this.toggleGroupValue.set('Close');
      }, error: ()=>{
        this.showNotification('Fail to add the new Customer.', 'error')
      }
    })
  
  }

private showNotification(message: string, type: 'success' | 'error'): void {
  this.snackBar.open(message, 'Close', {
    duration: 3000,
    panelClass: type === 'success' ? 'snackbar-success' : 'snackbar-error',
  });
}

}
