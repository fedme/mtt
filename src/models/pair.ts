import { Monster } from './monster';

export class Pair {

  left: Monster;
  right: Monster;

  constructor(leftMonster: Monster, rightMonster: Monster) {
    this.left = leftMonster;
    this.right = rightMonster;
  }

  getWinner() {
    if (this.left.criterion > this.right.criterion) {
      return this.left;
    }
    return this.right;
  }

  public equals(obj: Pair) : boolean { 
    return this.left === obj.left && this.right === obj.right;
  } 

}
