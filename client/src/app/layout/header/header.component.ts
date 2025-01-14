import { Component, inject } from '@angular/core';
import { SearchComponent } from "../../shared/search-component/search.component";
import { LanguageService } from '../../shared/services/language-service/language.service';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  imports: [SearchComponent, MatButtonModule, TranslateModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
private languageService = inject(LanguageService)
translante = inject(TranslateService)

changeLanguage(lang: string): void {
  this.languageService.changeLanguage(lang)
}


}
