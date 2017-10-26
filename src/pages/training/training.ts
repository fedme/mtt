import { Component, ViewChildren, QueryList } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Monster } from '../../models/monster';
import { Utils, Stimuli, TrainingMonsters} from '../../providers/providers';
import { CardComponent } from '../../components/card/card';

/**
 * Generated class for the TrainingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-training',
  templateUrl: 'training.html',
})
export class TrainingPage {

  monsters: Monster[];
  showedMonsters: Monster[];

  @ViewChildren(CardComponent) cardComponents: QueryList<CardComponent>;
  cards: CardComponent[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    private utils: Utils, private stimuli: Stimuli, private trainingMonsters: TrainingMonsters) {

    this.monsters = this.trainingMonsters.query();
    this.showedMonsters = []; 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrainingPage');

    if (this.stimuli.isPassive()) {
      this.pickRandomCards();
    }

  }

  handleCardFlipped(monster: Monster) {
    this.showedMonsters.push(monster);
    if (this.showedMonsters.length == 22) {
      this.endTraining();
    }
  }

  pickRandomCards() {
    this.cards = this.cardComponents.toArray();
    this.utils.shuffleArray(this.cards);
  }

  flipRandomCard() {
    let card = this.cards.pop();
    card.flipCard();
  }

  endTraining() {
    this.navCtrl.push("TestInstructions1Page");
  }
}
