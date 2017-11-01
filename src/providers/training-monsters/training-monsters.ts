import { Injectable } from '@angular/core';
import { Monster } from '../../models/monster';
import { Utils } from '../utils/utils';
import { Stimuli } from '../stimuli/stimuli';

@Injectable()
export class TrainingMonsters {

  monsters: Monster[] = [];

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

      let features = {
        "feature_a": parseInt(gene.charAt(0)),
        "feature_b": parseInt(gene.charAt(1)),
        "feature_c": parseInt(gene.charAt(2))
      };

      let x = features[this.stimuli.featuresOrder[0]];
      let y = features[this.stimuli.featuresOrder[1]];
      let z = features[this.stimuli.featuresOrder[2]];
      let criterion = (6 * x) + (3 * y) + z - 10;

      let monster = new Monster(
        monsterId, 
        features.feature_a, 
        features.feature_b, 
        features.feature_c,
        criterion
      );
      this.monsters.push(monster);
      i++;
    }
  }

  query(params?: any) {
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



}
