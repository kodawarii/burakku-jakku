import { Component, OnInit } from '@angular/core';

import {PlayerFieldSingleModel} from '../../models/PlayerFieldSingleModel';
import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-player-field',
  templateUrl: './player-field.component.html',
  styleUrls: ['./player-field.component.css']
})
export class PlayerFieldComponent implements OnInit {

  // OVERALL Player-Field Props
  private playerFieldSingleComponents:PlayerFieldSingleModel[];
  private player:Player[];

  private betIncrement:number = 100;

  constructor() { }

  ngOnInit() {

    this.player = [
      {
      money: 10000,
      }
    ];

    this.playerFieldSingleComponents = [
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [],
        seatNumber: 1,
        state: false,
      },
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [],
        seatNumber: 2,
        state: false,
      },
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [],
        seatNumber: 3,
        state: false,
      },
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [],
        seatNumber: 4,
        state: false,
      },
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [],
        seatNumber: 5,
        state: false,
      },
      {
        perfectBet: 0,
        regularBet: 0,
        cards: [],
        seatNumber: 6,
        state: false,
      },
    ]
  }

  updatePlayer(value: number){ 
    console.log("Updating Player in main player field component - the data itself. Amount: " + value);
    this.player[0].money += value;
  }

}
