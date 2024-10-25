import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { RoleAdminGuard } from './guards/role-admin.guard';

export const routes: Routes = [
  {
    path: 'auth',
    title: 'ELDAR | Login',
    loadComponent: () =>
      import('./auth/auth.component').then((m) => m.AuthComponent),
    canActivate: [LoginGuard],
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./auth/pages/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: '/auth/login',
      },
    ],
  },
  {
    path: 'main',
    title: 'ELDAR | Challenge Angular',
    loadComponent: () =>
      import('./main/main.component').then((m) => m.MainComponent),
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./main/pages/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'users',
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./main/pages/users/list/list.component').then(
                (m) => m.ListUserComponent
              ),
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./main/pages/users/detail/detail.component').then(
                (m) => m.DetailComponent
              ),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '/main/users/list',
          },
        ],
      },
      {
        path: 'posts',
        children: [
          {
            path: 'list',
            loadComponent: () =>
              import('./main/pages/posts/list/list.component').then(
                (m) => m.ListPostsComponent
              ),
          },
          {
            path: 'new',
            loadComponent: () =>
              import('./main/pages/posts/form/form.component').then(
                (m) => m.FormComponent
              ),
            canActivate: [RoleAdminGuard],
          },
          {
            path: 'update/:id',
            loadComponent: () =>
              import('./main/pages/posts/form/form.component').then(
                (m) => m.FormComponent
              ),
            canActivate: [RoleAdminGuard],
          },
          {
            path: ':id',
            loadComponent: () =>
              import('./main/pages/posts/detail/detail.component').then(
                (m) => m.DetailComponent
              ),
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: '/main/posts/list',
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'auth',
  },
];
