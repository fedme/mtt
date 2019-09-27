import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Stimuli, PairComparisonProvider, OutputEstimationProvider } from '../../providers/providers';
import * as crypto from 'crypto-js';

@IonicPage()
@Component({
  selector: 'page-reward',
  templateUrl: 'reward.html',
})
export class RewardPage implements OnInit {

  completionCode = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public stimuli: Stimuli, 
    private pairComparison: PairComparisonProvider,
    private outputEstimation: OutputEstimationProvider
  ) {

  }

  ngOnInit(): void {
    if (this.stimuli.onlineVersion) {
      this.completionCode = this.getCompletionCode();
    }
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RewardPage');
  }

  getTotalReward() {
    let totalReward = this.pairComparison.getTotalReward() + this.outputEstimation.getTotalReward();
    if (this.stimuli.onlineVersion) {
      totalReward = totalReward / 5;
    }
    return (totalReward / 100).toFixed(2);
  }

  getCompletionCode() {
    console.log('Generating completion code');
    console.log('participant', this.stimuli.onlineParticipant);
    const a = crypto.MD5(this.stimuli.onlineParticipant.hitId).toString();
    const b = crypto.MD5(this.stimuli.onlineParticipant.assignmentId + a).toString();
    const c = crypto.MD5(this.stimuli.onlineParticipant.workerId + b).toString()
    return c.slice(0, 6).toUpperCase();
  }

  next() {
    this.navCtrl.setRoot("RegistrationPage");
    this.navCtrl.popToRoot();
  }

  nextOnlineVersion() {
    // If run inside an iframe, send data as Post Message to parent window
    if (window.parent) {
      window.parent.postMessage({
        'state': 'end-ack',
        'data': {}
      }, '*');
    }
  }

}
