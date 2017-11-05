import { Monster } from './monster';

export class OutputEstimationQuestion {

  type: string;
  monster: Monster;
  guessedCriterion: number;

  constructor(type: string, monster: Monster) {
    this.type = type;
    this.monster = monster;
  }

  isCorrect() {
    return this.monster.criterion == this.guessedCriterion;
  }

  getDistance() {
    // TODO: ...
  }

  public equals(obj: OutputEstimationQuestion) : boolean { 
    return this.type === obj.type && this.monster === obj.monster;
  } 

}
