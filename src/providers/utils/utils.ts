import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the UtilsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class Utils {

  constructor() {
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
  }

  pickRandomFromArray(items) {
    return items[Math.floor(Math.random()*items.length)];
  }

  range(start, end) {
    return Array.from({length: (end - start)}, (v, k) => k + start);
  }

  combine(alphabet, length, curstr) {
    if (curstr.length == length) return [curstr];
    var ret = [];
    for (var i = 0; i < alphabet.length; i++) {
      ret.push.apply(ret, this.combine(alphabet, length, curstr + alphabet[i]));
    }
    return ret;
  }

  permute(permutation) {
    var length = permutation.length,
        result = [permutation.slice()],
        c = new Array(length).fill(0),
        i = 1, k, p;
  
    while (i < length) {
      if (c[i] < i) {
        k = i % 2 && c[i];
        p = permutation[i];
        permutation[i] = permutation[k];
        permutation[k] = p;
        ++c[i];
        i = 1;
        result.push(permutation.slice());
      } else {
        c[i] = 0;
        ++i;
      }
    }
    return result;
  }


}
