import { Component, Input } from '@angular/core';
import { Product } from '../../shared/interfaces/product';
import { MatCardModule} from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-product-list',
  imports: [MatCardModule, RouterLink, TranslateModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  @Input() products: Product[] = []; 




}
