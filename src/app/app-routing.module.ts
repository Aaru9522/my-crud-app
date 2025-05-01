import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent }     from './Component/login/login.component';
import { RegisterComponent }  from './Component/register/register.component';
import { UserComponent }      from './Component/user/user.component';
import { NotFoundComponent }  from './Component/not-found/not-found.component';
import { AuthGuardService }   from './services/auth-guard.service';

const routes: Routes = [
  // default → login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // login
  { path: 'login', component: LoginComponent },

  // **EDIT** route (must come before the plain 'register')
  { path: 'register/:id', component: RegisterComponent },

  // create new
  { path: 'register', component: RegisterComponent },

  // users list (protected)
  {
    path: 'user',
    component: UserComponent,
    canActivate: [AuthGuardService]
  },

  // catch-all → 404
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
