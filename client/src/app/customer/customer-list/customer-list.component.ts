import { Component, Input } from '@angular/core';
import { Customer } from '../../shared/interfaces/customer';
import { TranslateModule } from '@ngx-translate/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  imports: [MatCardModule, RouterLink, TranslateModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent {
@Input() customers : Customer[] = []
}
