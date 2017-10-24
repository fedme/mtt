import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Monster } from '../../models/monster';
import { TrainingMonsters } from '../../providers/providers';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public trainingMonsters: TrainingMonsters) {

    this.monsters = this.trainingMonsters.query();

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrainingPage');
  }

}
