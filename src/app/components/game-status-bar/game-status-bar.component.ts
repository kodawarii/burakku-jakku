import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Dealer } from 'src/app/models/Dealer';

@Component({
  selector: 'app-game-status-bar',
  templateUrl: './game-status-bar.component.html',
  styleUrls: ['./game-status-bar.component.css']
})
export class GameStatusBarComponent implements OnInit {

  @Input() dealerInfo:Dealer;
  @Output() dealCards:EventEmitter<any> = new EventEmitter();
  @Output() startNewGame:EventEmitter<any> = new EventEmitter();

  isDealEnabled:boolean;

  constructor() { }

  ngOnInit() {
  }

  deal(){
    this.dealCards.emit();
  }

  resetGame(){
    this.startNewGame.emit();
  }
}
