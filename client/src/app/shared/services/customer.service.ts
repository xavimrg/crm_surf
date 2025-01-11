import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private urlCustomer = 'http://localhost:3000/customers'

  http = inject(HttpClient)

  getAllCustomers(): Observable<Customer[]>{
    return this.http.get<Customer[]>(this.urlCustomer)
  }

  getCustomerById(id: number):Observable<Customer>{
return this.http.get<Customer>(`${this.urlCustomer}/${id}`)
  }

  createCustomer(customer: Customer): Observable<Customer>{
    return this.http.post<Customer>(this.urlCustomer, customer)
  }

  updateCustomer(customer: Customer):Observable<Customer> {
    return this.http.put<Customer>(`${this.urlCustomer}/${customer.id}`, customer)
  }

  deleteCustomer(id: number):Observable<void>{
    return this.http.delete<void>(`${this.urlCustomer}/${id}`)
  }

  
  constructor() { }
}
