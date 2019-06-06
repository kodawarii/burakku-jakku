import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PlayerFieldSingleModel } from 'src/app/models/PlayerFieldSingleModel';

import { Card } from 'src/app/models/Card';
import { Dealer } from 'src/app/models/Dealer';

@Component({
  selector: 'app-player-field-single',
  templateUrl: './player-field-single.component.html',
  styleUrls: ['./player-field-single.component.css']
})
export class PlayerFieldSingleComponent implements OnInit {

  /**
   * This Component actually doesnt carry the Info, it only @Inputs the data through to here from Overall PlayerFieldComponent 
   * then displays it in HTML Template file of this component
   */

   // Props
  @Input() slotInformation: PlayerFieldSingleModel;
  @Input() dealer: Dealer;
  @Input() deckOfCards: Card[];
  @Output() updatePlayerInfo: EventEmitter<number> = new EventEmitter();
  @Output() calculateTotals: EventEmitter<object> = new EventEmitter(); // *Cannot send multiple parameters with EventEmitter() so use objects instead

  // Button State Props
  isPPBetMinusEnabled:boolean;
  isPPBetPlusEnabled:boolean;
  isRegBetMinusEnabled:boolean;
  isRegBetPlusEnabled:boolean;

  bustString:string;

  constructor() { }

  ngOnInit() {
    this.isPPBetMinusEnabled = false;
    this.isRegBetMinusEnabled = false;
  }

  /**
   * BUTTON FUNCTIONS
   * 
   * Perfect Pairs -/+
   * Regular Bet -/+
   * Stop and Hit
   *  
   * */ 
  subtractPerfectPairBet(value){
    //console.log("Subtracting Perfect Pair Bet at seat " + this.slotInformation.seatNumber);
    
    this.isPPBetMinusEnabled = null;
    this.slotInformation.perfectBet += value;
    this.slotInformation.live = true;
    
    if(this.slotInformation.perfectBet == 0){
      this.isPPBetMinusEnabled = false;
      this.slotInformation.live = false;
    }
  }

  addPerfectPairBet(value){
    //console.log("Adding Perfect Pair Bet at seat " + this.slotInformation.seatNumber);

    if(this.slotInformation.perfectBet == 0){ // && Player had enough money
      this.isPPBetMinusEnabled = null;
      this.slotInformation.live = true;
    }
    
    this.slotInformation.perfectBet += value;
  }

  subtractRegularBet(value){
    //console.log("Subtracting Regular Bet at seat " + this.slotInformation.seatNumber);
   
    this.isRegBetMinusEnabled = null;
    this.slotInformation.regularBet += value;
    this.slotInformation.live = true;

    if(this.slotInformation.regularBet == 0){
      this.isRegBetMinusEnabled = false;
      this.slotInformation.live = false;
    }
  }

  addRegularBet(value){
    //console.log("Adding Regular Bet at seat " + this.slotInformation.seatNumber);

    if(this.slotInformation.regularBet == 0){ // && Player had enough money
      this.isRegBetMinusEnabled = null;
      this.slotInformation.live = true;
    }
    
    this.slotInformation.regularBet += value;
  }

  stop(){
    this.bustString = "Ready";
    this.slotInformation.state = true;
    this.disableStopAndHitBtns();
  }

  hit(){
    let randomNo = Math.floor(Math.random() * this.deckOfCards.length);
    let someCard:Card = this.deckOfCards[randomNo];

    this.slotInformation.cards.push(someCard);
    this.calculateTotals.emit({seatNumber: this.slotInformation.seatNumber, aCard: someCard}); // *Cannot send multiple parameters with EventEmitter() so use objects instead

    if(this.slotInformation.bust){
      this.bustString = "BUST";

      this.disableStopAndHitBtns();
    }
  }

  disableStopAndHitBtns(){
    this.slotInformation.isHitEnabled = false;
    this.slotInformation.isStopEnabled = false;
  }

  /**
   * Outputing Player Update Details 
   * 
   * */
  onUpdatePlayer(value){
    //console.log(value);
    this.updatePlayerInfo.emit(value);
  }
}
