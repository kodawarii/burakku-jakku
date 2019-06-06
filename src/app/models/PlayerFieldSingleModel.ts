import { Card } from 'src/app/models/Card';

export class PlayerFieldSingleModel{
    
    // Model of a Player Field Single Component

    perfectBet:number;
    regularBet:number;

    cards: Card[];
    total:number;

    seatNumber:number;
    live: boolean;
    state: boolean; // If Stopped (as in stop hitting me, Im good with my cards) then set to True
    bust: boolean;

    isStopEnabled: boolean;
    isHitEnabled: boolean;
}