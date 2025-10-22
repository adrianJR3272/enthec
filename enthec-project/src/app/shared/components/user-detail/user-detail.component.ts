import { Router } from '@angular/router';
import { Component, OnInit, computed, inject } from '@angular/core';
import { GitHubUser } from '../../interfaces/GitHubUser';
import { RepositoriesComponent } from "../repositories/repositories.component";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  imports: [RepositoriesComponent]
})
export class UserDetailComponent implements OnInit {
  user!: GitHubUser;
  router = inject(Router);

 ngOnInit(): void {
  const state = history.state as { user: GitHubUser } | undefined;

  if (state?.user) {
    this.user = state.user;
    console.log(this.user)
  } else {
    this.user = {} as GitHubUser;
  }
}

}
