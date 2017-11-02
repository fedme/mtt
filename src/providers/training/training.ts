import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster';
import { Utils } from '../utils/utils';
import { Stimuli } from '../stimuli/stimuli';

@Injectable()
export class TrainingProvider {

  monsters: Monster[] = [];
  revealedMonsters: Monster[] = [];

  constructor(private utils: Utils, private stimuli: Stimuli) {
    console.log('Hello TrainingMonsters Provider');
    this.generateMonsters();
  }

  generateMonsters() {
    let genes = this.utils.combine([2, 3, 4], 3, "");
    let ids = this.utils.range(1, genes.length + 1)
    this.utils.shuffleArray(genes);
    this.utils.shuffleArray(ids);

    let i = 0;
    for (let gene of genes) {

      let monsterId = "monster" + (ids[i]);

      let feature_a = parseInt(gene.charAt(0));
      let feature_b = parseInt(gene.charAt(1));
      let feature_c = parseInt(gene.charAt(2));

      let criterion = this.stimuli.calculateCriterion(
        feature_a,
        feature_b,
        feature_c
      );

      let monster = new Monster(
        monsterId, 
        feature_a, 
        feature_b, 
        feature_c,
        criterion
      );
      this.monsters.push(monster);
      i++;
    }
  }

  getAllMonsters() {
    return this.monsters;
  }

  queryMonsters(params?: any) {
    if (!params) {
      return this.monsters;
    }

    return this.monsters.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

  add(monster: Monster) {
    this.monsters.push(monster);
  }

  delete(monster: Monster) {
    this.monsters.splice(this.monsters.indexOf(monster), 1);
  }

  addRevealedMonster(monster: Monster) {
    this.revealedMonsters.push(monster);
  }

  getRevealedMonsters() {
    return this.revealedMonsters;
  }

  getRevealedMonstersCount() {
    return this.revealedMonsters.length;
  }

}
