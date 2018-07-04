import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pair-comparison-instructions',
  templateUrl: 'pair-comparison-instructions.html',
})
export class PairComparisonInstructionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad PairComparisonInstructionsPage');
  }

  next() {
    this.navCtrl.push("PairComparisonPage");
  }

}
