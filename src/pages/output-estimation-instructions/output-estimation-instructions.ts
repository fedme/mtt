import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-output-estimation-instructions',
  templateUrl: 'output-estimation-instructions.html',
})
export class OutputEstimationInstructionsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad OutputEstimationInstructionsPage');
  }

  next() {
    this.navCtrl.push("OutputEstimationPage");
  }

}
