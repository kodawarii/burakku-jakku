import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PlayerFieldSingleModel } from 'src/app/models/PlayerFieldSingleModel';

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
  @Output() updatePlayerInfo: EventEmitter<number> = new EventEmitter();

  // Random Properties
  isStopEnabled:boolean;
  isHitEnabled:boolean;
  
  isPPBetMinusEnabled:boolean;
  isPPBetPlusEnabled:boolean;
  isRegBetMinusEnabled:boolean;
  isRegBetPlusEnabled:boolean;

  constructor() { }

  ngOnInit() {
    this.isStopEnabled = false;
    this.isHitEnabled = false;

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
    console.log("Subtracting Perfect Pair Bet at seat " + this.slotInformation.seatNumber);
    
    this.isPPBetMinusEnabled = null;
    this.slotInformation.perfectBet += value;
    
    if(this.slotInformation.perfectBet == 0){
      this.isPPBetMinusEnabled = false;
    }
  }

  addPerfectPairBet(value){
    console.log("Adding Perfect Pair Bet at seat " + this.slotInformation.seatNumber);

    if(this.slotInformation.perfectBet == 0){ // && Player had enough money
      this.isPPBetMinusEnabled = null;
    }
    
    this.slotInformation.perfectBet += value;
  }

  subtractRegularBet(value){
    console.log("Subtracting Regular Bet at seat " + this.slotInformation.seatNumber);
   
    this.isRegBetMinusEnabled = null;
    this.slotInformation.regularBet += value;
    
    if(this.slotInformation.regularBet == 0){
      this.isRegBetMinusEnabled = false;
    }
  }

  addRegularBet(value){
    console.log("Adding Regular Bet at seat " + this.slotInformation.seatNumber);

    if(this.slotInformation.regularBet == 0){ // && Player had enough money
      this.isRegBetMinusEnabled = null;
    }
    
    this.slotInformation.regularBet += value;
  }

  stop(){
    console.log("Stopping Card Deals at seat " + this.slotInformation.seatNumber);
    
    this.slotInformation.state = true;
    console.log("State of Seat: " + this.slotInformation.state);
  }

  hit(){
    console.log("Hitting Cards at seat " + this.slotInformation.seatNumber);
    
    this.slotInformation.cards.push(0);
    console.log("Cards: " + this.slotInformation.cards);
  }

  /**
   * Outputing Player Update Details 
   * 
   * */
  onUpdatePlayer(value){
    console.log(value);
    this.updatePlayerInfo.emit(value);
  }
}
