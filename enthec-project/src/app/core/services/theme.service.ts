import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private readonly darkModeKey = 'darkMode';
  public isDarkMode: boolean;

  constructor() {
    const saved = localStorage.getItem(this.darkModeKey);
    this.isDarkMode = saved !== null ? JSON.parse(saved) : true;
    this.applyTheme();
  }

  toggleTheme(): void {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem(this.darkModeKey, JSON.stringify(this.isDarkMode));
    this.applyTheme();
  }

  private applyTheme(): void {
    document.body.classList.toggle('dark', this.isDarkMode);
    document.body.classList.toggle('light', !this.isDarkMode);
  }
}
