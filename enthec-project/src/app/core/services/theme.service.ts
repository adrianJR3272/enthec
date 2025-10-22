import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly darkModeKey = 'darkMode';
  public isDarkMode: boolean;

  constructor() {
    this.isDarkMode = JSON.parse(localStorage.getItem(this.darkModeKey) || 'false');
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem(this.darkModeKey, JSON.stringify(this.isDarkMode));
    this.applyTheme();
  }

  private applyTheme(): void {
    const themeClass = this.isDarkMode ? 'dark' : 'light';
    document.body.classList.toggle('dark', this.isDarkMode);
    document.body.classList.toggle('light', !this.isDarkMode);
  }
}
