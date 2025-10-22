import { Router } from '@angular/router';
import { Component, OnInit, computed, inject } from '@angular/core';
import { GitHubUser } from '../../interfaces/GitHubUser';
import { RepositoriesComponent } from '../repositories/repositories.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  imports: [RepositoriesComponent,TranslateModule],
})
export class UserDetailComponent implements OnInit {
  user!: GitHubUser;
  router = inject(Router);

  ngOnInit(): void {
    const state = history.state as { user: GitHubUser } | undefined;

    if (state?.user) {
      this.user = state.user;
    } else {
      this.user = {} as GitHubUser;
    }
  }

  goBack() {
    this.router.navigate(['']);
  }
}
