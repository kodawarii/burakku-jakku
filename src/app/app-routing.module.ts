import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Anything we want to route, we have to import it 
import {PlayerFieldComponent} from './components/player-field/player-field.component';
import {LoginComponent} from './components/pages/login/login.component';
import {AboutComponent} from './components/pages/about/about.component';
import {ProfileComponent} from './components/pages/profile/profile.component';
import {LogoutComponent} from './components/pages/logout/logout.component';
import {SignupComponent} from './components/pages/signup/signup.component';

/**
 * @TODO nav Banner, About page, Login page, Logout link, etc
 */

const routes: Routes = [
  {path: '', component: PlayerFieldComponent},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'signup', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
