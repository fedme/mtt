import { Injectable } from '@angular/core';

import { Monster } from '../../models/monster';

@Injectable()
export class TrainingMonsters {
  monsters: Monster[] = [];

  defaultMonster: Monster = new Monster();

  constructor() {

    for (let i = 0; i < 27; i++) {
      let monsterId = "monster" + (i+1);

      this.monsters.push(new Monster(monsterId, this.getRandomInt(2,4), this.getRandomInt(2,4), this.getRandomInt(2,4)));
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

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
