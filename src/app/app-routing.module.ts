import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionComponent } from './components/permission/permission.component';
import { UserComponent } from './components/user/user.component';


const routes: Routes = [
  { path: '', redirectTo: '/userList', pathMatch: 'full' },
  { path: 'userList', component: UserComponent, data: { actionMode: 'List' } },
  { path: 'addUser', component: UserComponent, data: { actionMode: 'Add' } },
  { path: 'editUser', component: UserComponent, data: { actionMode: 'Edit' } },
  { path: 'permission', component: PermissionComponent },
  { path: '**', redirectTo: '/userList', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
