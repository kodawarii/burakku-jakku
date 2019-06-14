import { Component, OnInit, Input } from '@angular/core';

import { Card } from 'src/app/models/Card';
import { PlayerFieldSingleModel } from 'src/app/models/PlayerFieldSingleModel';

@Component({
  selector: 'app-card-spaces',
  templateUrl: './card-spaces.component.html',
  styleUrls: ['./card-spaces.component.css']
})
export class CardSpacesComponent implements OnInit {

  @Input() cards:Card[];


  constructor() { }

  ngOnInit() {
    
  }
}
