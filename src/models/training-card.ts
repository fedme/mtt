import { Monster } from './monster';

export class TrainingCard {

  monster: Monster;
  revealed: boolean;

  constructor(monster: Monster) {
    this.monster = monster;
    this.revealed = false;
  }

  reveal() {
    this.revealed = true;
  }

  hasBeenRevealed() {
    return this.revealed === true;
  }

  public equals(obj: TrainingCard) : boolean { 
    return this.monster === obj.monster;
  } 

}
