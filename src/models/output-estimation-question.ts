import { Monster } from './monster';

export class OutputEstimationQuestion {

  type: string;
  monster: Monster;
  guessedCriterion: number;

  constructor(type: string, monster: Monster) {
    this.type = type;
    this.monster = monster;
  }

  isAnswerCorrect() {
    return this.monster.criterion == this.guessedCriterion;
  }

  getAnswerDistance() {
    return Math.abs(this.guessedCriterion - this.monster.criterion);
  }

  public equals(obj: OutputEstimationQuestion) : boolean { 
    return this.type === obj.type && this.monster === obj.monster;
  } 

}
