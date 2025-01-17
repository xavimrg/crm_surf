import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggle, MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslateModule } from '@ngx-translate/core';
import { OrderService } from '../shared/services/order.service';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Order } from '../shared/interfaces/order';
import { OrderListComponent } from "./order-list/order-list.component";
import { OrderFormComponent } from './order-form/order-form.component';

@Component({
  selector: 'app-order',
  imports: [MatButtonToggleModule, TranslateModule, MatButtonModule, OrderListComponent, OrderFormComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
orderService = inject(OrderService)
fb = inject(FormBuilder)
snackBar = inject(MatSnackBar)
orders = signal<Order[]>([])

toggleGroupValue = signal<string>('close')
isFormVisible: boolean = false;

loadOrders(){
  this.orderService.getAllOrders().subscribe((data)=>{
    this.orders.set(data)
  })
}

ngOnInit(): void {
  this.loadOrders();
}
}
