import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster';
import { Pair } from '../../models/pair';
import { Utils } from '../utils/utils';
import { Stimuli } from '../stimuli/stimuli';
import 'rxjs/add/operator/map';
import { allPairComparisons } from '../stimuli/constants';

/*
  Generated class for the PairComparisonProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PairComparisonProvider {

  pairsNumber: number = 8;
  pairs: Pair[] = [];
  chosenMonsters: Monster[] = [];

  constructor(private utils: Utils, private stimuli: Stimuli) {
    console.log('Hello PairComparisonProvider Provider');
    this.generatePairs();
  }

  generatePairs() {

    // generate monsters IDs
    let ids = [];
    let counter = 28;
    while (ids.length < (this.pairsNumber*2)) {
      ids.push("monster"+counter);
      counter++;
    }
    this.utils.shuffleArray(ids);
    console.log(ids);

    // generate pairs
    let j=0;
    for (let i=0; i<this.pairsNumber; i++) {

      let pairMonsters = [];

      // generate monster a
      const features_a = allPairComparisons[i][0];
      const criterion_a = this.stimuli.calculateCriterion(
        features_a[0],
        features_a[1],
        features_a[2]
      );
      pairMonsters.push(new Monster(ids[j], features_a[0], features_a[1], features_a[2], criterion_a));
      j++;

      // generate monster b
      let features_b = allPairComparisons[i][1];
      const criterion_b = this.stimuli.calculateCriterion(
        features_b[0],
        features_b[1],
        features_b[2]
      );
      pairMonsters.push(new Monster(ids[j], features_b[0], features_b[1], features_b[2], criterion_b));
      j++;

      // generate pair
      this.utils.shuffleArray(pairMonsters);
      this.pairs.push(new Pair(pairMonsters[0], pairMonsters[1]));
    }

    console.log(this.pairs);
    
  }

  addChosenMonster(monster: Monster) {
    this.chosenMonsters.push(monster);
  }

}
