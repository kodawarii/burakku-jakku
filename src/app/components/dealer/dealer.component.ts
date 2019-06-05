import { Component, OnInit, Input } from '@angular/core';
import { Dealer } from 'src/app/models/Dealer';


@Component({
  selector: 'app-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.css']
})
export class DealerComponent implements OnInit {

  @Input() dealerInformation:Dealer;

  constructor() { }

  ngOnInit() {
  }

}
