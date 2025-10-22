import { Component, inject, OnInit } from "@angular/core";
import { ThemeService } from "../../../core/services/theme.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})

export class HeaderComponent  {
  
  themeService = inject(ThemeService)
  constructor( ) {}

  toggleDarkMode(): void {
    this.themeService.toggleTheme();
  }
 
}
