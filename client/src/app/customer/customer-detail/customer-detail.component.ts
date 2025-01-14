import { Component, inject, OnInit } from '@angular/core';
import { Customer } from '../../shared/interfaces/customer';
import { CustomerService } from '../../shared/services/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-customer-detail',
  imports: [MatCardModule, MatButtonModule, ReactiveFormsModule, MatFormFieldModule, TranslateModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.scss'
})
export class CustomerDetailComponent implements OnInit{
 customer!: Customer;
 editMode: boolean = false; 
 customerForm!: FormGroup;

 customerService = inject(CustomerService)
 route = inject(ActivatedRoute)
 router = inject(Router)
 fb = inject(FormBuilder)


 ngOnInit(): void {

   this.route.paramMap.subscribe((params) => {
    const customerId = Number(params.get('id'));
    if (customerId){
      this.loadCustomerDetails(customerId)
    }
   })
 }

 loadCustomerDetails(id: number) {
  this.customerService.getCustomerById(id).subscribe({
    next: (customer) => {
      this.customer = customer;
      this.initForm(); // Inicializa el formulario
    },
    error: (err) => {
      console.error('Error loading customer details:', err);
      alert('Could not load customer details.');
    },
  });
}

initForm(){
  this.customerForm = this.fb.group({
    customerName: [this.customer.customerName],
    customerSurname: [this.customer.customerSurname],
    email: [this.customer.email],
    gender: [this.customer.gender],
    age: [this.customer.age],
    comparId: [this.customer.companyId],
    profilePhoto: [this.customer.profilePhoto],
    companyName:[this.customer.companyName], 
    companyId:[this.customer.companyId],
    companyAddress:[this.customer.companyAddress],
  });
}

updateCustomer(){
  if(this.customerForm.valid && this.customer.id){
    const updatedCustomer: Customer = {
      ...this.customer, 
      ...this.customerForm.value,
    };

    this.customerService.updateCustomer(updatedCustomer).subscribe({
      next: ()=>{
        alert('The customer has been correctly updated.');
        this.editMode = false;
        this.loadCustomerDetails(this.customer.id)
      }
    })
  };



}
 
goBackToCustomers(){
  this.router.navigate(['/customer'])
}

deleteCustomer(){
  const confirmDelete = window.confirm('Are you sure to delete this customer?')
  if (confirmDelete && this.customer.id){
    this.customerService.deleteCustomer(this.customer.id).subscribe({
    next: () => {
      alert('The product has been succesfully deleted.');
      this.router.navigate(['/customer']); 
    },
    error: (err) => {
      console.error('Fail to delete the customer.', err);
      alert('The customer failed to be deleted.');
  }
})}};




}
