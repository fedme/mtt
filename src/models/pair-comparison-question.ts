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

  public equals(obj: PairComparisonQuestion) : boolean { 
    return this.pair === obj.pair && this.chosenMonster === obj.chosenMonster;
  } 

}
