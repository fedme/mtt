import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray } from 'ionic-angular';
import { Stimuli, Data, PairComparisonProvider, OutputEstimationProvider } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-reward',
  templateUrl: 'reward.html',
})
export class RewardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private data: Data, private stimuli: Stimuli, private pairComparison: PairComparisonProvider,
    private outputEstimation: OutputEstimationProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RewardPage');
  }

  getTotalReward() {
    let totalReward = this.pairComparison.getTotalReward() + this.outputEstimation.getTotalReward();
    if (this.stimuli.onlineVersion) {
      totalReward = totalReward / 5;
    }
    return (totalReward / 100).toFixed(2);
  }

  next() {
    this.navCtrl.setRoot("RegistrationPage");
    this.navCtrl.popToRoot();
  }

}
