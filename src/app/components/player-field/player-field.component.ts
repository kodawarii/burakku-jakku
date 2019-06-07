import { Component, OnInit } from '@angular/core';

import {PlayerFieldSingleModel} from '../../models/PlayerFieldSingleModel';
import { Player } from 'src/app/models/Player';
import { Card } from 'src/app/models/Card';
import { Dealer } from 'src/app/models/Dealer';

@Component({
  selector: 'app-player-field',
  templateUrl: './player-field.component.html',
  styleUrls: ['./player-field.component.css']
})
export class PlayerFieldComponent implements OnInit {

  // OVERALL Player-Field Props - Has All Data:
  // Player Info and Player Fields:
  private deckOfCards:Card[];
  private playerFieldSingleComponents:PlayerFieldSingleModel[];
  private player:Player;

  // Dealer Info:
  private dealer:Dealer;

  constructor() { }

  ngOnInit() {

    this.initializeCardDeck();

    this.dealer = {
      message: "Make at least 1 Bet!",
      bustString: " ",
      atLeastOnePlayerMadeBet: true,
      initialDeal: false,
      dealersCards: [{value:" ", suite: " "}],
      total: 0,
      totalLive: 0,
      totalStopped: 0,
      shallWeStartNew: false
    };

    /**
     * @TODO After every round, keep track of prevRoundMoney
     */
    this.player = {
      prevRoundMoney: 10000,
      money: 500,
    };

    this.playerFieldSingleComponents = [
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [{value:" ", suite: " "}],
        total: 0,
        seatNumber: 1,
        live: false,
        bust: false,
        isHitEnabled: false,
        isStopEnabled: false,
        bustString: " ",
        isPPBetMinusEnabled: false,
        isPPBetPlusEnabled: null,
        isRegBetMinusEnabled: false,
        isRegBetPlusEnabled: null
      },
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [{value:" ", suite: " "}],
        total: 0,
        seatNumber: 2,
        live: false,
        bust: false,
        isHitEnabled: false,
        isStopEnabled: false,
        bustString: " ",
        isPPBetMinusEnabled: false,
        isPPBetPlusEnabled: null,
        isRegBetMinusEnabled: false,
        isRegBetPlusEnabled: null
      },
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [{value:" ", suite: " "}],
        total: 0,
        seatNumber: 3,
        live: false,
        bust: false,
        isHitEnabled: false,
        isStopEnabled: false,
        bustString: " ",
        isPPBetMinusEnabled: false,
        isPPBetPlusEnabled: null,
        isRegBetMinusEnabled: false,
        isRegBetPlusEnabled: null
      },
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [{value:" ", suite: " "}],
        total: 0,
        seatNumber: 4,
        live: false,
        bust: false,
        isHitEnabled: false,
        isStopEnabled: false,
        bustString: " ",
        isPPBetMinusEnabled: false,
        isPPBetPlusEnabled: null,
        isRegBetMinusEnabled: false,
        isRegBetPlusEnabled: null
      },
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [{value:" ", suite: " "}],
        total: 0,
        seatNumber: 5,
        live: false,
        bust: false,
        isHitEnabled: false,
        isStopEnabled: false,
        bustString: " ",
        isPPBetMinusEnabled: false,
        isPPBetPlusEnabled: null,
        isRegBetMinusEnabled: false,
        isRegBetPlusEnabled: null
      },
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [{value:" ", suite: " "}],
        total: 0,
        seatNumber: 6,
        live: false,
        bust: false,
        isHitEnabled: false,
        isStopEnabled: false,
        bustString: " ",
        isPPBetMinusEnabled: false,
        isPPBetPlusEnabled: null,
        isRegBetMinusEnabled: false,
        isRegBetPlusEnabled: null
      }
    ];
  }

  updatePlayer(value: number){ 
    //console.log("Updating Player in main player field component - the data itself. Amount: " + value);
    
    this.player.money += value;

    /* Check if Player made at least one bet for dealer button to be available */
    if(this.player.money == this.player.prevRoundMoney){
      this.dealer.atLeastOnePlayerMadeBet = true;
      this.dealer.message = "Make at least 1 bet!";
    }
    else{
      this.dealer.atLeastOnePlayerMadeBet = null;
      this.dealer.message = "Deal!";
    }

    /* Catch final dealer check UPDATE: What does this do again??? */
    if(this.dealer.initialDeal){
      this.dealer.atLeastOnePlayerMadeBet = true;
      this.dealer.message = "No More Bets! DAFAQ BET BUTTONS SHOULD BE DEAD NOW";
    }
  }

  dealCards2(event:any):number{
    //console.log("Dealing Cards in main player field component");

    /**
     *  ##A: If there are  no more players to deal, deal the dealer cards 
     * */
    if(this.dealer.totalLive == this.dealer.totalStopped && this.dealer.totalStopped != 0){
      this.dealDealer();
      return 0;
    }

    /** 
     * ##B: If there are still players to deal, deal them
     */
    /* #1 First Update Dealers details */
    this.dealer.initialDeal = true;
    this.dealer.atLeastOnePlayerMadeBet = true; // Disable the Deal Button after first deal
    this.dealer.message = "Good Luck!";

    /* #2 Deal cards to Dealer */
    let randomNo:number = Math.floor(Math.random() * this.deckOfCards.length);
    this.dealer.dealersCards.push(this.deckOfCards[randomNo]);
    
    /* #3 Deal cards to Live Slots */
    for(let i = 0; i < this.playerFieldSingleComponents.length; i++){
      if(this.playerFieldSingleComponents[i].live){
        randomNo = Math.floor(Math.random() * this.deckOfCards.length);
        let someCard:Card = this.deckOfCards[randomNo];
        this.playerFieldSingleComponents[i].cards.push(someCard);

        /* #4 Calculate Totals of that Slot after dealing to each slot */
        this.calculateTotalsOfPlayer({seatNumber: i + 1, aCard:someCard});

        /* #5 Enable STOP and HITME Buttons for that slot */
        this.playerFieldSingleComponents[i].isHitEnabled = null;
        this.playerFieldSingleComponents[i].isStopEnabled = null;

        /**
         * Increment the total count of players we have dealt. So that by the end of the for loop, we know how many players are live
         */
        this.dealer.totalLive++;
      }
    }

    /* #6 Calculate Total for Dealer */
    this.dealer.total += this.getNumberValueOf(this.dealer.dealersCards[1].value);
        
    /* ... End of dealCards2() */
    return 0;
  }

  dealDealer(){
    // Keep dealing until 17 reached or Busted or got 21

    let dealerGotBusted:boolean = false;
    let dealerGot21:boolean = false;
    let dealerGot17ish:boolean = false;

    while(!dealerGotBusted && !dealerGot21 && !dealerGot17ish){
      let randomNo:number = Math.floor(Math.random() * this.deckOfCards.length);
      let randomCard:Card = this.deckOfCards[randomNo];
      this.dealer.dealersCards.push(randomCard);
      this.dealer.total += this.getNumberValueOf(randomCard.value);

      if(this.dealer.total > 21){
        dealerGotBusted = true;
      }
      else if(this.dealer.total == 21){
        dealerGot21 = true;
      }
      else if(this.dealer.total >= 17 && this.dealer.total <= 20){
        dealerGot17ish = true;
      }
    }

    /**
     * @TODO : Add feature where if there are two same value cards, you can split them into two slots
     * @TODO : Check if regular bet is made earlier up -- e.g. if(noRegBetsMade)
     * @TODO : Stop Immediatly when player total is 21
     *  */ 

     /**
      * Process Winnings for each slot
      */
    let i:number;
    let length = this.playerFieldSingleComponents.length; // Learnt that this is more efficient in JavaScript rather than putting it inside the for-loop
    for(i = 0; i < length; i++){

      if(this.playerFieldSingleComponents[i].bust){
        continue;
      }
      if(!this.playerFieldSingleComponents[i].live){
        continue;
      }
      
      
      if(dealerGotBusted){
        /** 
         * @TODO : Perfect Pair Winnings
         */
        this.processWin(i);
        this.dealer.bustString = "DEALER BUST";
      }
      
      else if(dealerGot21){        
          if(this.playerFieldSingleComponents[i].total == 21){
            this.processEven(i);
          }
          else{
            this.processLose(i);
          }
      }
        
      else if(dealerGot17ish){
        if(21 - this.playerFieldSingleComponents[i].total < 21 - this.dealer.total){
          this.processWin(i);
        }
        else if(21 - this.playerFieldSingleComponents[i].total == 21 - this.dealer.total){
          this.processEven(i);
        }
        else{
          this.processLose(i);
        }
      }
    }

    /** Disable Deal Button after dealing the dealer */
    this.dealer.atLeastOnePlayerMadeBet = false;

    /** Activate the Start New Game Button */
    this.dealer.shallWeStartNew = null;
  }

  /**
   * resetGame() Called when Start New Game Button is clicked
   */
  resetGame(event:any){
    console.log("Starting New Game");

    /** @TODO Add "Shuffling" Bullshit Splash/Popup screen */

    /** Resetting HUD Thingies */
    this.dealer.atLeastOnePlayerMadeBet = false;
    this.dealer.message = "Make at Least one Bet!";

    /** Resetting Dealer */
    this.dealer.atLeastOnePlayerMadeBet = false;
    this.dealer.bustString = " ";
    this.dealer.dealersCards = [{value:" ", suite: " "}];
    this.dealer.initialDeal = false;
    this.dealer.total = 0;
    this.dealer.totalLive = 0;
    this.dealer.totalStopped = 0;
    this.dealer.shallWeStartNew = false;

    /** Resetting Slots */
    let i:number;
    let length = this.playerFieldSingleComponents.length;
    for(i = 0; i < length; i++){
      this.playerFieldSingleComponents[i].perfectBet = 0;
      this.playerFieldSingleComponents[i].regularBet = 0;
      this.playerFieldSingleComponents[i].cards = [{value:" ", suite: " "}];
      this.playerFieldSingleComponents[i].total = 0;
      this.playerFieldSingleComponents[i].live = false;
      this.playerFieldSingleComponents[i].bust = false;
      this.playerFieldSingleComponents[i].isHitEnabled = false;
      this.playerFieldSingleComponents[i].isStopEnabled = false;
      this.playerFieldSingleComponents[i].bustString = " ";
    }
  }

  processWin(i:number){
    let winnings:number = this.playerFieldSingleComponents[i].regularBet * 2;
    this.player.money += winnings;
    this.playerFieldSingleComponents[i].bustString = "Congratulations, You win: $" + winnings;
  }

  processEven(i:number){
    let currentBet:number = this.playerFieldSingleComponents[i].regularBet;
    this.player.money += currentBet;
    this.playerFieldSingleComponents[i].bustString = "Even (You get $" + currentBet + " back)";
  }

  processLose(i:number){
    this.playerFieldSingleComponents[i].bustString = this.playerFieldSingleComponents[i].bustString + ": You Lose";
  }

  incrementStoppedPlayersCount(){
    this.dealer.totalStopped++;
    
    /**
     *  Activate the Deal Button again once all seats are either BUST or Stopped 
     * 
     * @TODO need to do something about when ALL BUST ie gameover
     * 
     * */ 
    if(this.dealer.totalLive == this.dealer.totalStopped && this.dealer.totalStopped != 0){
      this.dealer.atLeastOnePlayerMadeBet = null;
      this.dealer.message = "Ready to get scammed?";
    }
  }

  calculateTotalsOfPlayer(seatAndCardPair){
    this.playerFieldSingleComponents[seatAndCardPair.seatNumber - 1].total += this.getNumberValueOf(seatAndCardPair.aCard.value);

    if(this.playerFieldSingleComponents[seatAndCardPair.seatNumber - 1].total > 21){
      this.playerFieldSingleComponents[seatAndCardPair.seatNumber - 1].bust = true;
    }
  }

  initializeCardDeck(){
    this.deckOfCards = [
      {value: "A", suite: "s"},{value: "A", suite: "h"},{value: "A",suite: "d"},{value: "A",suite: "c"},
      {value: "2", suite: "s"},{value: "2", suite: "h"},{value: "2",suite: "d"},{value: "2",suite: "c"},
      {value: "3", suite: "s"},{value: "3", suite: "h"},{value: "3",suite: "d"},{value: "3",suite: "c"},
      {value: "4", suite: "s"},{value: "4", suite: "h"},{value: "4",suite: "d"},{value: "4",suite: "c"},
      {value: "5", suite: "s"},{value: "5", suite: "h"},{value: "5",suite: "d"},{value: "5",suite: "c"},
      {value: "6", suite: "s"},{value: "6", suite: "h"},{value: "6",suite: "d"},{value: "6",suite: "c"},
      {value: "7", suite: "s"},{value: "7", suite: "h"},{value: "7",suite: "d"},{value: "7",suite: "c"},
      {value: "8", suite: "s"},{value: "8", suite: "h"},{value: "8",suite: "d"},{value: "8",suite: "c"},
      {value: "9", suite: "s"},{value: "9", suite: "h"},{value: "9",suite: "d"},{value: "9",suite: "c"},
      {value: "T", suite: "s"},{value: "T", suite: "h"},{value: "T",suite: "d"},{value: "T",suite: "c"},
      {value: "J", suite: "s"},{value: "J", suite: "h"},{value: "J",suite: "d"},{value: "J",suite: "c"},
      {value: "Q", suite: "s"},{value: "Q", suite: "h"},{value: "Q",suite: "d"},{value: "Q",suite: "c"},
      {value: "K", suite: "s"},{value: "K", suite: "h"},{value: "K",suite: "d"},{value: "K",suite: "c"},
    ]
  }

  getNumberValueOf(letter:string):number{
    switch(letter){
      case "A":
      return 1;

      case "K":
      return 10;

      case "Q":
      return 10;

      case "J":
      return 10;

      case "T":
      return 10;

      case "9":
      return 9;

      case "8":
      return 8;

      case "7":
      return 7;

      case "6":
      return 6;

      case "5":
      return 5;

      case "4":
      return 4;

      case "3":
      return 3;

      case "2":
      return 2;
    }
  }
}
