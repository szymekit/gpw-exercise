import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'users'
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./components/users/users.component')
        .then(m => m.UsersComponent)
  },
  {
    path: 'add-user',
    loadComponent: () =>
      import('./components/add-edit-user/add-edit-user.component')
        .then(m => m.AddEditUserComponent)
  },
  {
    path: 'edit-user/:id',
    loadComponent: () =>
      import('./components/add-edit-user/add-edit-user.component')
        .then(m => m.AddEditUserComponent)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
