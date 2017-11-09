import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, reorderArray } from 'ionic-angular';
import { RankingTaskProvider } from '../../providers/providers';


@IonicPage()
@Component({
  selector: 'page-ranking-task',
  templateUrl: 'ranking-task.html',
})
export class RankingTaskPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private rankingTask: RankingTaskProvider) {
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RankingTaskPage');
  }

  reorderFeatures(indexes) {
    this.rankingTask.features = reorderArray(this.rankingTask.features, indexes);
  }

  next() {
    
  }

}
