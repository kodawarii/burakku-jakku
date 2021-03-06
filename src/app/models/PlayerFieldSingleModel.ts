import { Card } from 'src/app/models/Card';

export class PlayerFieldSingleModel{
    
    // Model of a Player Field Single Component

    perfectBet:number;
    regularBet:number;
    gotPP: boolean;

    madeOnlyPPBet:boolean;

    cards: Card[];
    total:number;

    seatNumber:number;
    live: boolean;
    bust: boolean;
    bustString: string;

    isStopEnabled: boolean;
    isHitEnabled: boolean;

    isPPBetMinusEnabled:boolean;
    isPPBetPlusEnabled:boolean;
    isRegBetMinusEnabled:boolean;
    isRegBetPlusEnabled:boolean;
}