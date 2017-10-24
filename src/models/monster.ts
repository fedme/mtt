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
  friendly: number
  punctual: number;
  funny: number;
  criterion: number;

  constructor(id: string = "default", friendly: number = 0, punctual: number = 0, funny: number = 0) {
    this.id = id;
    this.img = "assets/img/monsters/" + id + ".png";
    this.friendly = friendly;
    this.punctual = punctual;
    this.funny = funny;
    this.criterion = (6 * friendly) + (3 * punctual) + funny - 10;
  }

}
