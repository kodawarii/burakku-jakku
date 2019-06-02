import { Component, OnInit, Input } from '@angular/core';

import { Player } from 'src/app/models/Player';

@Component({
  selector: 'app-heads-up-display',
  templateUrl: './heads-up-display.component.html',
  styleUrls: ['./heads-up-display.component.css']
})
export class HeadsUpDisplayComponent implements OnInit {

  /**
   * This Component actually doesnt carry the Info, it only @Inputs the data through to here from Overall PlayerFieldComponent 
   * then displays it in HTML Template file of this component
   */

  @Input() playerInfo: Player;

  constructor() { }

  ngOnInit() {
  }

}
