import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DealerComponent } from './components/dealer/dealer.component';
import { CardSpacesComponent } from './components/card-spaces/card-spaces.component';
import { GameStatusBarComponent } from './components/game-status-bar/game-status-bar.component';
import { PlayerFieldComponent } from './components/player-field/player-field.component';
import { PlayerFieldSingleComponent } from './components/player-field-single/player-field-single.component';
import { HeadsUpDisplayComponent } from './components/heads-up-display/heads-up-display.component';

@NgModule({
  declarations: [
    AppComponent,
    DealerComponent,
    CardSpacesComponent,
    GameStatusBarComponent,
    PlayerFieldComponent,
    PlayerFieldSingleComponent,
    HeadsUpDisplayComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
