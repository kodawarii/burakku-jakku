import { Component, OnInit, Input } from '@angular/core';

import { Card } from 'src/app/models/Card';
import { PlayerFieldSingleModel } from 'src/app/models/PlayerFieldSingleModel';

@Component({
  selector: 'app-card-spaces',
  templateUrl: './card-spaces.component.html',
  styleUrls: ['./card-spaces.component.css']
})
export class CardSpacesComponent implements OnInit {

  @Input() slotInfo:PlayerFieldSingleModel; // ** Still dont understand why this gives Undefined at the end??

  slotInfoCleaned:PlayerFieldSingleModel; // ** This doesnt even work still 

  actualCard1:string = "??";
  actualCard2:string = "??";
  actualCard3:string = "??";
  actualCard4:string = "??";

  constructor() { }

  ngOnInit() {
    if(this.slotInfo != undefined){
      this.slotInfoCleaned = this.slotInfo;
      // console.log(this.slotInfoCleaned); // **
    }
  }

  showCards(x:number){

    switch(x){
      case 1:
      try {
        this.actualCard1 = this.slotInfo.cards[x].value + this.slotInfo.cards[x].suite;
        throw new Error('Card' + x + ' hasnt Been dealt yet!');
      }
      catch(e) {
        console.log(e);
      }
      break;

      case 2:
      try {
        this.actualCard2 = this.slotInfo.cards[x].value + this.slotInfo.cards[x].suite;
        throw new Error('Card' + x + ' hasnt Been dealt yet!');
      }
      catch(e) {
        console.log(e);
      }
      break;

      case 3:
      try {
        this.actualCard3 = this.slotInfo.cards[x].value + this.slotInfo.cards[x].suite;
        throw new Error('Card' + x + ' hasnt Been dealt yet!');
      }
      catch(e) {
        console.log(e);
      }
      break;

      case 4:
      try {
        this.actualCard4 = this.slotInfo.cards[x].value + this.slotInfo.cards[x].suite;
        throw new Error('Card' + x + ' hasnt Been dealt yet!');
      }
      catch(e) {
        console.log(e);
      }
      break;
    }
  }
}
