import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-game-status-bar',
  templateUrl: './game-status-bar.component.html',
  styleUrls: ['./game-status-bar.component.css']
})
export class GameStatusBarComponent implements OnInit {

  @Output() dealCards: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deal(){
    console.log("Dealing");
    this.dealCards.emit();
  }

}
