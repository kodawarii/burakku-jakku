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
  private cards:Card[];
  private playerFieldSingleComponents:PlayerFieldSingleModel[];
  private player:Player;

  // Dealer Info:
  private dealer:Dealer;

  constructor() { }

  ngOnInit() {

    this.initializeCardDeck();

    this.dealer = {
      dealersCards: [],
    };

    this.player = {
      money: 10000,
    };

    this.playerFieldSingleComponents = [
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [{value:" ", suite: " "}],
        total: 0,
        seatNumber: 1,
        live: false,
        state: false,
      },
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [{value:" ", suite: " "}],
        total: 0,
        seatNumber: 2,
        live: false,
        state: false,
      },
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [{value:" ", suite: " "}],
        total: 0,
        seatNumber: 3,
        live: false,
        state: false,
      },
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [{value:" ", suite: " "}],
        total: 0,
        seatNumber: 4,
        live: false,
        state: false,
      },
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [{value:" ", suite: " "}],
        total: 0,
        seatNumber: 5,
        live: false,
        state: false,
      },
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [{value:" ", suite: " "}],
        total: 0,
        seatNumber: 6,
        live: false,
        state: false,
      }
    ];
  }

  updatePlayer(value: number){ 
    //console.log("Updating Player in main player field component - the data itself. Amount: " + value);
    
    this.player.money += value;
  }

  dealCards2(event:any){
    //console.log("Dealing Cards in main player field component");

    // Deal this to Dealer
    let randomNo:number = Math.floor(Math.random() * this.cards.length);
    this.dealer.dealersCards.push(this.cards[randomNo]);
    
    // Deal to Live Player Slots
    for(let i = 0; i < this.playerFieldSingleComponents.length; i++){
      if(this.playerFieldSingleComponents[i].live){
        randomNo = Math.floor(Math.random() * this.cards.length);
        let someCard:Card = this.cards[randomNo];
        this.playerFieldSingleComponents[i].cards.push(someCard);

        // Calculate Totals after dealing to each slot
        this.playerFieldSingleComponents[i].total += this.getNumberValueOf(someCard.value);
      }
    }

    //console.log(this.playerFieldSingleComponents);
  }

  initializeCardDeck(){
    this.cards = [
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
