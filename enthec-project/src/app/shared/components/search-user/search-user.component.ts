import { Component, inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SearchUserService } from './search-user.service';
import { ToastComponent } from '../../toast/toast.component';
import { GitHubUser } from '../../interfaces/GitHubUser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss'],
  imports: [ReactiveFormsModule, CommonModule, TranslateModule, ToastComponent],
  standalone: true,
})
export class SearchUserComponent implements OnInit {
  searchForm!: FormGroup;
  fb = inject(FormBuilder);
  searchUserService = inject(SearchUserService);
  router = inject(Router);
  required = signal(false);
  userData = signal<any>(null);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.searchForm = this.fb.group({
      username: ['', Validators.required],
    });
  }

  onSearch() {
    const usernameControl = this.searchForm.get('username');

    if (!usernameControl?.value?.trim()) {
      this.required.set(true);
      this.userData.set(null);
      usernameControl?.markAsTouched();
      return;
    }

    this.required.set(false);
    this.userData.set(null);

    const username = usernameControl.value.trim();

    this.searchUserService.getUser(username).subscribe({
      next: (data: GitHubUser) => {
        this.userData.set(data);
        this.searchForm.reset();
        this.router.navigate(['/user-detail', username], {
          state: { user: data },
        });
      },
      error: () => this.userData.set(null),
    });
  }
}
