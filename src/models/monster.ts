/**
 * A generic model that our Master-Detail pages list, create, and delete.
 *
 * Change "Item" to the noun your app will use. For example, a "Contact," or a
 * "Customer," or a "Animal," or something like that.
 *
 * The Items service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 */
export class Monster {

  id: string;
  img: string;
  feature_a: number
  feature_b: number;
  feature_c: number;
  criterion: number;

  constructor(id: string = "default", feature_a: number = 0, feature_b: number = 0, feature_c: number = 0, criterion: number = 0) {
    this.id = id;
    this.img = "assets/img/monsters/" + id + ".png";
    this.feature_a = feature_a;
    this.feature_b = feature_b;
    this.feature_c = feature_c;
    this.criterion = criterion;
  }

}
