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
      message: "Place Your Bets",
      bustString: " ",
      atLeastOnePlayerMadeBet: true,
      atLeastOneREG: false,
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
        gotPP: false,
        madeOnlyPPBet: false,
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
        gotPP: false,
        madeOnlyPPBet: false,
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
        gotPP: false,
        madeOnlyPPBet: false,
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
        gotPP: false,
        madeOnlyPPBet: false,
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
        gotPP: false,
        madeOnlyPPBet: false,
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
        gotPP: false,
        madeOnlyPPBet: false,
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
     * ##There is only 1 deal button
     */

    /**
     *  ##A: Deal to the Dealer if first deal complete (dealing players)
     * */
    if(this.dealer.totalLive == this.dealer.totalStopped && this.dealer.totalStopped != 0){
      this.dealDealer();
      return 0;
    }

    /** 
     * ##B: else deal the first card to the players
     */
    /* #1 First Update Dealers details */
    this.dealer.initialDeal = true;
    this.dealer.atLeastOnePlayerMadeBet = true; // Disable the Deal Button after first deal
    this.dealer.message = "Good Luck!";

    /* #2 Deal cards to Dealer */
    let randomNo:number = Math.floor(Math.random() * this.deckOfCards.length);
    this.dealer.dealersCards.push(this.deckOfCards[randomNo]);
    
    /* #3 Deal cards to Players Live Slots */
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

        /** Mark whether slot has 1. Only PP Bet or 2. At least a Reg Bet */
        if(this.playerFieldSingleComponents[i].perfectBet > 0 && this.playerFieldSingleComponents[i].regularBet == 0){
          this.playerFieldSingleComponents[i].madeOnlyPPBet = true;
        }

        if(this.playerFieldSingleComponents[i].regularBet > 0){
          this.dealer.atLeastOneREG = true;
        }
      }

      /** #5.1 and Disable the betting buttons for ALL SLOTS */
      this.playerFieldSingleComponents[i].isPPBetMinusEnabled = false;
      this.playerFieldSingleComponents[i].isPPBetPlusEnabled = false;
      this.playerFieldSingleComponents[i].isRegBetMinusEnabled = false;
      this.playerFieldSingleComponents[i].isRegBetPlusEnabled = false;
    }

    /* #6 Calculate Total for Dealer */
    this.dealer.total += this.getNumberValueOf(this.dealer.dealersCards[1].value);
        
    /* ... End of dealCards2() */
    return 0;
  }

  dealDealer(){

    let dealerGotBusted:boolean = false;
    let dealerGot21:boolean = false;
    let dealerGot17ish:boolean = false;

    // Keep dealing until 17 reached or Busted or got 21
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
      * Process Winnings for each slot
      */
    this.processEndofGame(dealerGotBusted, dealerGot21, dealerGot17ish);
  }

  processEndofGame(dealerGotBusted:boolean, dealerGot21:boolean, dealerGot17ish:boolean):void{
    let i:number;
    let length = this.playerFieldSingleComponents.length;
    for(i = 0; i < length; i++){

      if(!this.playerFieldSingleComponents[i].live){
        continue;
      }

      /** Needed this if-statement to catch Perfect-Pair Winnings Awards when its over 21 aka this.playerFieldSingleComponent[i].bust = true */
      if(this.playerFieldSingleComponents[i].bust && this.playerFieldSingleComponents[i].gotPP){
        this.processWin(i, true);
        continue;
      }

      if(this.playerFieldSingleComponents[i].bust){
        continue;
      }
      
      if(dealerGotBusted){
        if(this.playerFieldSingleComponents[i].bust){
          this.processLose(i);
        }
        else{
          this.processWin(i);
          this.dealer.bustString = "DEALER BUST";
        }
      }
      
      else if(dealerGot21){
        console.log("please work ");
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
      
      /** Process Perfect Bet Winnings */
      if(this.playerFieldSingleComponents[i].gotPP){
        this.processWin(i, true);
      }
    }

    /** Disable Deal Button after dealing the dealer */
    this.dealer.atLeastOnePlayerMadeBet = false;

    /** Activate the Start New Game Button */
    this.dealer.shallWeStartNew = null;

    /**
     * @FEATURE Add Game Over Splash Screen once player reaches $0 "Game Over man, Game Over!"
     */
  }

  /**
   * resetGame() Called when Start New Game Button is clicked
   */
  resetGame(event:any){
    console.log("Starting New Game");

    /** @TODO Add "Shuffling" 'fake' Splash/Popup screen */

    /** Resetting HUD Thingies */
    this.dealer.atLeastOnePlayerMadeBet = false;
    this.dealer.message = "Place Your Bets";

    /** Resetting Dealer */
    this.dealer.atLeastOnePlayerMadeBet = false;
    this.dealer.bustString = " ";
    this.dealer.dealersCards = [{value:" ", suite: " "}];
    this.dealer.initialDeal = false;
    this.dealer.total = 0;
    this.dealer.totalLive = 0;
    this.dealer.totalStopped = 0;
    this.dealer.shallWeStartNew = false;
    this.dealer.atLeastOneREG = false;

    /** Resetting Slots */
    let i:number;
    let length = this.playerFieldSingleComponents.length;
    for(i = 0; i < length; i++){
      this.playerFieldSingleComponents[i].perfectBet = 0;
      this.playerFieldSingleComponents[i].regularBet = 0;
      this.playerFieldSingleComponents[i].gotPP = false;

      this.playerFieldSingleComponents[i].madeOnlyPPBet = false;

      this.playerFieldSingleComponents[i].cards = [{value:" ", suite: " "}];
      this.playerFieldSingleComponents[i].total = 0;

      this.playerFieldSingleComponents[i].live = false;
      this.playerFieldSingleComponents[i].bust = false;
      this.playerFieldSingleComponents[i].bustString = " ";

      this.playerFieldSingleComponents[i].isHitEnabled = false;
      this.playerFieldSingleComponents[i].isStopEnabled = false;
      
      this.playerFieldSingleComponents[i].isPPBetMinusEnabled = false;
      this.playerFieldSingleComponents[i].isPPBetPlusEnabled = null;
      this.playerFieldSingleComponents[i].isRegBetMinusEnabled = false;
      this.playerFieldSingleComponents[i].isRegBetPlusEnabled = null;

      console.log(this.playerFieldSingleComponents[i].cards);
    }
  }

  processWin(i:number, pp:boolean = false){
    /**
     * @BUG bet 100 on pp, bet 100 on reg, Get a PP, make Dealer get 21, then reg bet also wins for some reason
     * 
     * @FEATURE If Only PP bet made, then deal 2 cards and end slot
     */

    let currentRegBet:number = this.playerFieldSingleComponents[i].regularBet;
    let currentPPBet:number = this.playerFieldSingleComponents[i].perfectBet;

    let totalWinnings:number = 0;

    if(this.playerFieldSingleComponents[i].regularBet > 0){
      let winnings:number = currentRegBet * 2;
      totalWinnings += winnings;
      this.player.money += winnings;
    }

    /** Process PP winnings */
    if(pp){
      let winnings:number = currentPPBet * 35;
      totalWinnings += winnings;
      this.player.money += winnings;
    }

    this.playerFieldSingleComponents[i].bustString = "You win $" + totalWinnings;
  }

  processEven(i:number){
    if(this.playerFieldSingleComponents[i].regularBet > 0){
      let currentBet:number = this.playerFieldSingleComponents[i].regularBet;
      this.player.money += currentBet;
      this.playerFieldSingleComponents[i].bustString = "Even";
    }
  }

  processLose(i:number){
    this.playerFieldSingleComponents[i].bustString = "Loser";
  }

  incrementStoppedPlayersCount(){
    this.dealer.totalStopped++;
    console.log("TOTAL LIVE: " + this.dealer.totalLive);
    console.log("TOTAL STOPPED: " + this.dealer.totalStopped);
    
    /**
     *  Activate the Deal Button again once all seats are either BUST or Stopped 
     * 
     * */

    //// Continue game for Regular Bets (PP Bet ONLY Slots should be disabled) 
     if(this.dealer.totalLive == this.dealer.totalStopped && this.dealer.totalStopped != 0){
      this.dealer.atLeastOnePlayerMadeBet = null; // Enables Deal Button
      this.dealer.message = "Go Dealer"; // showing this message
    }
    else{
      console.log("Player still making decisions");
      // ... Player is still making bets
    }
  }

  calculateTotalsOfPlayer(seatAndCardPair:any){
    this.playerFieldSingleComponents[seatAndCardPair.seatNumber - 1].total += this.getNumberValueOf(seatAndCardPair.aCard.value);

    if(this.playerFieldSingleComponents[seatAndCardPair.seatNumber - 1].total > 21){
      this.playerFieldSingleComponents[seatAndCardPair.seatNumber - 1].bust = true;
    }
  }

  /** Disables all '+' Bet Buttons across all slots
   *  Called from player-field-single
   */
  disableBetBtns(event:any){
    let i:number;
    let length = this.playerFieldSingleComponents.length;
    for(i = 0; i < length; i++){
      this.playerFieldSingleComponents[i].isRegBetPlusEnabled = false;
      this.playerFieldSingleComponents[i].isPPBetPlusEnabled = false;
    }
  }

  /** Enables again the PP '+' Bet Buttons across all slots
   *  Called from player-field-single
   */
  enableBetBtnsPP(event:any){
    let i:number;
    let length = this.playerFieldSingleComponents.length;
    for(i = 0; i < length; i++){
      this.playerFieldSingleComponents[i].isPPBetPlusEnabled = null;
    }
  }

  /** Enables again the REG '+' Bet Buttons across all slots
   *  Called from player-field-single
   */
  enableBetBtnsREG(event:any){
    let i:number;
    let length = this.playerFieldSingleComponents.length;
    for(i = 0; i < length; i++){
      this.playerFieldSingleComponents[i].isRegBetPlusEnabled = null;
    }
  }

  initializeCardDeck(){
    this.deckOfCards = [
      {value: "A", suite: "♠"},{value: "A", suite: "♥"},{value: "A", suite: "♦"},{value: "A", suite: "♣"},
      {value: "2", suite: "♠"},{value: "2", suite: "♥"},{value: "2", suite: "♦"},{value: "2", suite: "♣"},
      {value: "3", suite: "♠"},{value: "3", suite: "♥"},{value: "3", suite: "♦"},{value: "3", suite: "♣"},
      {value: "4", suite: "♠"},{value: "4", suite: "♥"},{value: "4", suite: "♦"},{value: "4", suite: "♣"},
      {value: "5", suite: "♠"},{value: "5", suite: "♥"},{value: "5", suite: "♦"},{value: "5", suite: "♣"},
      {value: "6", suite: "♠"},{value: "6", suite: "♥"},{value: "6", suite: "♦"},{value: "6", suite: "♣"},
      {value: "7", suite: "♠"},{value: "7", suite: "♥"},{value: "7", suite: "♦"},{value: "7", suite: "♣"},
      {value: "8", suite: "♠"},{value: "8", suite: "♥"},{value: "8", suite: "♦"},{value: "8", suite: "♣"},
      {value: "9", suite: "♠"},{value: "9", suite: "♥"},{value: "9", suite: "♦"},{value: "9", suite: "♣"},
      {value: "T", suite: "♠"},{value: "T", suite: "♥"},{value: "T", suite: "♦"},{value: "T", suite: "♣"},
      {value: "J", suite: "♠"},{value: "J", suite: "♥"},{value: "J", suite: "♦"},{value: "J", suite: "♣"},
      {value: "Q", suite: "♠"},{value: "Q", suite: "♥"},{value: "Q", suite: "♦"},{value: "Q", suite: "♣"},
      {value: "K", suite: "♠"},{value: "K", suite: "♥"},{value: "K", suite: "♦"},{value: "K", suite: "♣"},
            
      /*
      {value: "A", suite: "♠"},
      {value: "K", suite: "♣"}
      */
    ]
  }

  getNumberValueOf(letter:string):number{
    switch(letter){
      case "A":
      return 11;

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
