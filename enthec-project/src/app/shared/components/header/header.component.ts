import { Component, inject, OnInit } from '@angular/core';
import { ThemeService } from '../../../core/services/theme.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [TranslateModule],
  standalone: true,
})
export class HeaderComponent {
  englishFlag = '../../../../assets/shared/en.png';
  spanishFlag = '../../../../assets/shared/es.png';

  themeService = inject(ThemeService);
  translate = inject(TranslateService);
  constructor() {}

  toggleDarkMode(): void {
    this.themeService.toggleTheme();
  }

  changeLanguage(language: string): void {
    this.translate.use(language);
  }
}
