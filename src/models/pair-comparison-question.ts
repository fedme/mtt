import { Pair } from './pair';
import { Monster } from './monster';

export class PairComparisonQuestion {

  pair: Pair;
  chosenMonster: Monster;

  constructor(questionPair: Pair) {
    this.pair = questionPair;
  }

  answer(monster: Monster) {
    this.chosenMonster = monster;
  }

  isAnswerCorrect() {
    return this.pair.getWinner() == this.chosenMonster;
  }

  getAnswerReward() {
    if (this.isAnswerCorrect()) return 20;
    return 0;
  }

  public equals(obj: PairComparisonQuestion) : boolean { 
    return this.pair === obj.pair && this.chosenMonster === obj.chosenMonster;
  } 

}
