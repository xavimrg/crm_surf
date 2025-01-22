import { Component, Input } from '@angular/core';
import { Order } from '../../shared/interfaces/order';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-order-list',
  imports: [MatCardModule, TranslateModule, RouterLink, MatTableModule],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {
[x: string]: any;
@Input() orders : Order[] = []

displayedColumns: string[] = [
  'orderId',
  'productId',
  'customerId',
  'quantity',
  'calendarDate',
  'totalPrice',
  'orderStatus',
];

}
