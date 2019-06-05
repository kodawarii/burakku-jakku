import { Card } from 'src/app/models/Card';


export class Dealer{
    
    // Model of a Player 
    dealersCards: Card[];
    message:string;
    atLeastOnePlayerMadeBet: boolean;
    initialDeal: boolean;
    finalDeal: boolean;
}