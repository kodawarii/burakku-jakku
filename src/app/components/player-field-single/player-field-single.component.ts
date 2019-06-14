import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { PlayerFieldSingleModel } from 'src/app/models/PlayerFieldSingleModel';

import { Card } from 'src/app/models/Card';
import { Dealer } from 'src/app/models/Dealer';
import { Player } from 'src/app/models/Player';

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
  @Input() player:Player;

  @Output() updatePlayerInfo: EventEmitter<number> = new EventEmitter();
  @Output() calculateTotals: EventEmitter<object> = new EventEmitter(); // *Cannot send multiple parameters with EventEmitter() so use objects instead
  @Output() incrementStoppedPlayersCount: EventEmitter<number> = new EventEmitter();
  @Output() globalDisableBetBtns: EventEmitter<any> = new EventEmitter();
  @Output() globalEnableBetBtnsPP: EventEmitter<any> = new EventEmitter();
  @Output() globalEnableBetBtnsREG: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * BUTTON FUNCTIONS
   * 
   * Perfect Pairs -/+
   * Regular Bet -/+
   * Stop and Hit
   * 
   * @TODO[FIXED] CRITICAL BUG #1: bet Butons dont get disabled when there are multiple slots with bets. you have to make another bet in order to activate the deactivation of the button
   * --Possible Fix :: Write a globalDisableBetBtns() function and emit it back to player-field Component and handle it there globally across all slots
   * -- cont'd: similarily, we may need a re-activate global buttons function
   * 
   * @TODO CRITICAL BUG #2: Deal button is clickable after making a bet and getting rid of the bet again (e.g. bet 100 then take away 100)
   * 
   * @FEATURE Make slider for betting sizes
   *  
   * */ 
  subtractPerfectPairBet(value){
    //console.log("Subtracting Perfect Pair Bet at seat " + this.slotInformation.seatNumber);
    
    this.slotInformation.perfectBet += value;
    this.slotInformation.live = true;
    
    if(this.slotInformation.perfectBet == 0){
      this.slotInformation.isPPBetMinusEnabled = false;
      this.slotInformation.live = false;
    }

    if(!this.slotInformation.isPPBetPlusEnabled){
      this.callGlobalEnableBtnsPP();
    }

    if(!this.slotInformation.isRegBetPlusEnabled){
      this.callGlobalEnableBtnsREG();
    }
  }

  addPerfectPairBet(value){
    //console.log("Adding Perfect Pair Bet at seat " + this.slotInformation.seatNumber);

    if(this.slotInformation.perfectBet == 0){
      this.slotInformation.isPPBetMinusEnabled = null;
      this.slotInformation.live = true;
    }
    
    this.slotInformation.perfectBet += value;

    if(this.player.money <= 100){
      this.callGlobalDisableBtns();
    }
  }

  subtractRegularBet(value){
    //console.log("Subtracting Regular Bet at seat " + this.slotInformation.seatNumber);
   
    this.slotInformation.regularBet += value;
    this.slotInformation.live = true;

    if(this.slotInformation.regularBet == 0){
      this.slotInformation.isRegBetMinusEnabled = false;
      this.slotInformation.live = false;
    }

    if(!this.slotInformation.isRegBetPlusEnabled){
      this.callGlobalEnableBtnsREG();
    }

    if(!this.slotInformation.isPPBetPlusEnabled){
      this.callGlobalEnableBtnsPP();
    }
  }

  addRegularBet(value){
    //console.log("Adding Regular Bet at seat " + this.slotInformation.seatNumber);

    if(this.slotInformation.regularBet == 0){
      this.slotInformation.isRegBetMinusEnabled = null;
      this.slotInformation.live = true;
    }
    
    this.slotInformation.regularBet += value;

    if(this.player.money <= 100){
      this.callGlobalDisableBtns();
    }
  }

  stop(message:string){
    this.slotInformation.bustString = message;
    this.disableStopAndHitBtns();
    this.incrementStoppedPlayersCount.emit();
  }

  hit():number{
    /** Generate some Random Card to HIT */
    let randomNo = Math.floor(Math.random() * this.deckOfCards.length);
    let someCard:Card = this.deckOfCards[randomNo];

    /** Push that Card onto the Board AND Calculate the totals (calculateTotals() also determines BUST boolean) */
    this.slotInformation.cards.push(someCard);
    this.calculateTotals.emit({seatNumber: this.slotInformation.seatNumber, aCard: someCard}); // *Cannot send multiple parameters with EventEmitter() so use objects instead

    /**
     * Processing Hitting Cards:
     * There are 3 cases for when there is ONLY PP-Bet :
     *  - Player gets 21
     *  - Player gets PP
     *  - Player doesnt get PP / Busts
     */

    /** If there are 2 cards, check for a perfect pair */
    if(this.slotInformation.cards.length == 3){
      let card1:Card = this.slotInformation.cards[1];
      let card2:Card = this.slotInformation.cards[2];

      /** #A: If Player got a Perfect pair: 1. alert a message, 2. make gotPP property true OR false, 3. Check if REG Bet made */
      if(card1.value == card2.value && card1.suite == card2.suite && this.slotInformation.perfectBet > 0){
        this.slotInformation.bustString = "Perfect Pair!";
        this.slotInformation.gotPP = true;

        /**
         * @TODO : Add feature where if there are two same value cards, you can split them into two slots
         * 
         */

        this.stopSlotIfNoRegBetMade(); // Process Winnings
        if(this.slotInformation.madeOnlyPPBet){
          return 0;
        }
      }
      
      /** #B: Otherwise, if player didnt get Perfect pair*/
      else if (this.slotInformation.perfectBet > 0){
        this.slotInformation.bustString = "No Perfect Pair";
        this.slotInformation.gotPP = false;

        this.stopSlotIfNoRegBetMade();
        if(this.slotInformation.madeOnlyPPBet){
          return 0;
        }
      }
    }
    /**End of checking for Perfect Pair */

    /** Whether the slot is bust or not was calculated by calculateTotals() above */
    if(this.slotInformation.bust){
      this.stop("BUST");
    }

    /** Check if slot is 21 or not */
    if(this.slotInformation.total == 21){
      this.stop("TWENTY ONE");
    }

    return 0;
  }

  stopSlotIfNoRegBetMade(){
    if(this.slotInformation.madeOnlyPPBet){
      this.disableStopAndHitBtns();
      this.incrementStoppedPlayersCount.emit();
      // and Stop hit() function 
    }
    else{
      // Continue with Reg Bets....
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

  callGlobalDisableBtns(){
    this.globalDisableBetBtns.emit();
  }

  callGlobalEnableBtnsPP(){
    this.globalEnableBetBtnsPP.emit();
  }

  callGlobalEnableBtnsREG(){
    this.globalEnableBetBtnsREG.emit();
  }
}
