import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductComponent } from './products/product.component';
import { OrderDetailComponent } from './order/order-detail/order-detail.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { OrderComponent } from './order/order.component';
import { CustomerComponent } from './customer/customer.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';

export const routes: Routes = [


    {
      path: '',
      component: LayoutComponent,
      children: [
        { path: '', component: DashboardComponent },
        { path: 'product', component: ProductComponent },
        { path: 'product/:id', component: ProductDetailComponent },
        { path: 'order', component: OrderComponent },
        { path: 'order/:id', component: OrderDetailComponent },
        { path: 'customer', component: CustomerComponent },
        { path: 'customer/:id', component: CustomerDetailComponent }, // Ruta directa
      ],
    },
  ];



