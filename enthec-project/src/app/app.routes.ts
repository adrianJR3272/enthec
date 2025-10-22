import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shared/components/search-user/search-user.component')
        .then(m => m.SearchUserComponent),
  },
  {
    path: 'user-detail/:username',
    loadComponent: () =>
      import('./shared/components/user-detail/user-detail.component')
        .then(m => m.UserDetailComponent),
  },
];
