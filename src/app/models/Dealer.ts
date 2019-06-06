import { Card } from 'src/app/models/Card';


export class Dealer{
    
    // Model of a Player 
    dealersCards: Card[];
    total:number;
    message:string;
    atLeastOnePlayerMadeBet: boolean;
    initialDeal: boolean;
    totalLive:number;
    totalStopped:number;
}