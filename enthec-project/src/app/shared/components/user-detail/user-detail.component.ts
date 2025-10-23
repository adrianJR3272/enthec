import { Component, OnInit, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GitHubUser } from '../../interfaces/GitHubUser';
import { SearchUserService } from '../search-user/search-user.service';
import { RepositoriesComponent } from '../repositories/repositories.component';
import { TranslateModule } from '@ngx-translate/core';
import { ToastComponent } from '../../toast/toast.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  imports: [RepositoriesComponent, TranslateModule, ToastComponent],
})
export class UserDetailComponent implements OnInit {
  user!: GitHubUser;
  router = inject(Router);
  route = inject(ActivatedRoute);
  searchUserService = inject(SearchUserService);

  ngOnInit(): void {
    const state = history.state as { user: GitHubUser } | undefined;
    const username = this.route.snapshot.paramMap.get('username');

    if (state?.user) {
      this.user = state.user;
    } else if (username) {
      this.searchUserService.getUser(username).subscribe({
        next: (data: GitHubUser) => this.user = data,
        error: () => this.user = {} as GitHubUser,
      });
    } else {
      this.user = {} as GitHubUser;
    }
  }

  goBack() {
    this.router.navigate(['']);
  }
}
