import { NgModule }       from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { LoggedInGuard }  from './logged-in-guard.service';
import { LoggedOutGuard } from './logged-out-guard.service';
import { AuthService }    from './auth.service';

import { LoginComponent }          from './login/login.component';
import { SignUpComponent }         from './sign-up/sign-up.component';
import { OauthCallbackComponent }  from './oauth-callback.component';

const routes: Routes = [
  { path: 'log-in', component: LoginComponent },
  { path: 'login', redirectTo: '/log-in' },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'signup', redirectTo: '/sign-up' }
] 

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        canActivateChild: [LoggedOutGuard],
        children: routes
      },
      { path: 'oauth_callback', component: OauthCallbackComponent }
    ])
  ],
  exports: [
    RouterModule
  ],
  providers: [
    LoggedInGuard,
    AuthService,
    LoggedOutGuard
  ]
})
export class AuthenticationRoutingModule {}
