import { Component, OnInit, Input } from '@angular/core';

import { Card } from 'src/app/models/Card';
import { PlayerFieldSingleModel } from 'src/app/models/PlayerFieldSingleModel';

@Component({
  selector: 'app-card-spaces',
  templateUrl: './card-spaces.component.html',
  styleUrls: ['./card-spaces.component.css']
})
export class CardSpacesComponent implements OnInit {

  @Input() slotInfo:PlayerFieldSingleModel;

  actualCard1:string = "Show";
  actualCard2:string = "Show";
  actualCard3:string = "Show";
  actualCard4:string = "Show";

  constructor() { }

  ngOnInit() {
  }

  showCards1(){
    try {
      this.actualCard1 = this.slotInfo.cards[1].value + this.slotInfo.cards[1].suite;
      throw new Error('Card1 hasnt Been dealt yet!');
    }
    catch(e) {
      console.log(e);
    }
  }

  showCards2(){
    try {
      this.actualCard1 = this.slotInfo.cards[1].value + this.slotInfo.cards[1].suite;
      throw new Error('Card2 hasnt Been dealt yet!');
    }
    catch(e) {
      console.log(e);
    }
  }
  
  showCards3(){
    try {
      this.actualCard1 = this.slotInfo.cards[1].value + this.slotInfo.cards[1].suite;
      throw new Error('Card3 hasnt Been dealt yet!');
    }
    catch(e) {
      console.log(e);
    }
  }

  showCards4(){
    try {
      this.actualCard1 = this.slotInfo.cards[1].value + this.slotInfo.cards[1].suite;
      throw new Error('4');
    }
    catch(e) {
      console.log(e);
    }
  }
}
