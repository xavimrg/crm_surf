import { Component, inject, OnInit } from '@angular/core';
import { Order } from '../../shared/interfaces/order';
import { OrderService } from '../../shared/services/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  imports: [],
  templateUrl: './order-detail.component.html',
  styleUrl: './order-detail.component.scss'
})
export class OrderDetailComponent implements OnInit {
  order!: Order;

  private orderService = inject(OrderService)
  private router = inject(Router) // to navigate
  private route = inject(ActivatedRoute) // to obtain information about the 

  ngOnInit(): void {
this.route.paramMap.subscribe((params) => {
  const orderId = Number(params.get('id'));
  if (orderId){
    this.loadOrderDetails(orderId)
  }
})
  }

  loadOrderDetails(id:number){
this.orderService.getOrderById(id).subscribe((order) => {
  this.order = order;
})
  }

  goBackToOder(){
this.router.navigate(['/order'])
  }

}
