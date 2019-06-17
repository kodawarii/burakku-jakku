import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Anything we want to route, we have to import it 
import {PlayerFieldComponent} from './components/player-field/player-field.component';
import {LoginComponent} from './components/pages/login/login.component';

const routes: Routes = [
  {path: '', component: PlayerFieldComponent},
  {path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
