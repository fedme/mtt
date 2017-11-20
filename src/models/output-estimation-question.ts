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

  getAnswerReward() {
    if (this.getAnswerDistance() <= 5) return 30;
    if (this.getAnswerDistance() <= 10) return 20;
    if (this.getAnswerDistance() <= 20) return 10;
    return 0;
  }

  public equals(obj: OutputEstimationQuestion) : boolean { 
    return this.type === obj.type && this.monster === obj.monster;
  } 

}
