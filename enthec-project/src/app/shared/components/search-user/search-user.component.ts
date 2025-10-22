import { CommonModule } from "@angular/common";
import { Component, inject, OnInit, signal } from "@angular/core";
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-search-user",
  templateUrl: "./search-user.component.html",
  styleUrls: ["./search-user.component.scss"],
  imports: [ReactiveFormsModule,CommonModule],
  standalone: true
})
export class SearchUserComponent implements OnInit {
  searchForm!: FormGroup;
  fb = inject(FormBuilder);
  router = inject(Router);
  errorMessage: string | null = null;    
  required = signal(false)

  constructor() { }

  ngOnInit() {
    this.initForm();
  }

  onSearch() {
    const username = this.searchForm.get('username')?.value?.trim();
    if (!username) {
      this.required.set(true)
      this.errorMessage = "Por favor escribe un nombre de usuario para buscar.";
      return;
    }
    this.required.set(false)
    this.router.navigate(['/user', username]);
  }

  initForm() {
    this.searchForm = this.fb.group({
      username: ['', Validators.required]
    });
  }
}
