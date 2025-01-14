import { Component } from '@angular/core';
import { ProductComponent } from "../../products/product.component";
import { HeaderComponent } from "../header/header.component";
import { AsideComponent } from "../aside/aside.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [ HeaderComponent, AsideComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
