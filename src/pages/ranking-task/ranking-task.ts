import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray } from 'ionic-angular';
import { RankingTaskProvider, Stimuli, Data } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-ranking-task',
  templateUrl: 'ranking-task.html',
})
export class RankingTaskPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private rankingTask: RankingTaskProvider, 
    private data: Data,
    private stimuli: Stimuli
  ) {
      
      // Initialize provider
      this.rankingTask.initialize();
      this.stimuli.hi();

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad RankingTaskPage');
  }

  reorderFeatures(indexes) {
    this.rankingTask.features = reorderArray(this.rankingTask.features, indexes);
  }

  next() {

    // If online version, go to final registration page
    if (this.stimuli.onlineVersion) {
      this.navCtrl.push("RegistrationOnlinePage");
    }

    // Otherwise, save data and go to reward
    else {
      this.data.save();
      this.navCtrl.push("RewardPage");
    }
  }

}
