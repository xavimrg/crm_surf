import { Component, Input } from '@angular/core';
import { Order } from '../../shared/interfaces/order';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-list',
  imports: [MatCardModule, TranslateModule, RouterLink, ],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.scss'
})
export class OrderListComponent {
@Input() orders : Order[] = []

}
