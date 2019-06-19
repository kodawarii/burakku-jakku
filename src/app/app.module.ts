import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DealerComponent } from './components/dealer/dealer.component';
import { CardSpacesComponent } from './components/card-spaces/card-spaces.component';
import { GameStatusBarComponent } from './components/game-status-bar/game-status-bar.component';
import { PlayerFieldComponent } from './components/player-field/player-field.component';
import { PlayerFieldSingleComponent } from './components/player-field-single/player-field-single.component';
import { HeadsUpDisplayComponent } from './components/heads-up-display/heads-up-display.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/pages/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { AboutComponent } from './components/pages/about/about.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { LogoutComponent } from './components/pages/logout/logout.component';
import { SignupComponent } from './components/pages/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    DealerComponent,
    CardSpacesComponent,
    GameStatusBarComponent,
    PlayerFieldComponent,
    PlayerFieldSingleComponent,
    HeadsUpDisplayComponent,
    LoginComponent,
    NavComponent,
    AboutComponent,
    ProfileComponent,
    LogoutComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
