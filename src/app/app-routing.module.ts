import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }   from './Component/login/login.component';
import { RegisterComponent }from './Component/register/register.component';
import { UserComponent }    from './Component/user/user.component';
import { NotFoundComponent }from './Component/not-found/not-found.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login',    component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
