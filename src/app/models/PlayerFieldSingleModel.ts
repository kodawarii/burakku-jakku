import { Card } from 'src/app/models/Card';

export class PlayerFieldSingleModel{
    
    // Model of a Player Field Single Component

    perfectBet:number;
    regularBet:number;
    cards: Card[];
    seatNumber:number;
    live: boolean;
    state: boolean; // If Stopped, True
}